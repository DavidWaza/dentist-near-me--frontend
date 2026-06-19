import { NextResponse } from "next/server";
import { LOCATIONS, SERVICES } from "@/lib/content";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendReminderEmail, type AppointmentEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Reminder cron. Sends one reminder per appointment that starts within the
 * next REMINDER_WINDOW_HOURS and has not yet been reminded. Designed to be
 * called hourly (see vercel.json). The `reminder_sent_at` column guarantees
 * each patient is reminded exactly once.
 *
 * Auth: Vercel Cron sends `Authorization: Bearer <CRON_SECRET>` automatically
 * when CRON_SECRET is set. A `?secret=` query param is accepted for manual runs.
 */

const REMINDER_WINDOW_HOURS = Number(process.env.REMINDER_WINDOW_HOURS ?? 48);

interface AppointmentRow {
  id: string;
  service_slug: string;
  dentist_name: string;
  location_city: string;
  starts_at: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  notes: string | null;
}

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // No secret configured → allow (dev convenience).
  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;
  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "SUPABASE_SERVICE_ROLE_KEY not configured" },
      { status: 503 }
    );
  }

  const now = new Date();
  const windowEnd = new Date(now.getTime() + REMINDER_WINDOW_HOURS * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, service_slug, dentist_name, location_city, starts_at, patient_name, patient_email, patient_phone, notes"
    )
    .in("status", ["pending", "confirmed"])
    .is("reminder_sent_at", null)
    .gt("starts_at", now.toISOString())
    .lte("starts_at", windowEnd.toISOString())
    .order("starts_at", { ascending: true });

  if (error) {
    console.error("[cron/reminders] query failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as AppointmentRow[];
  let sent = 0;
  const failures: string[] = [];

  for (const row of rows) {
    const service = SERVICES.find((s) => s.slug === row.service_slug);
    const location = LOCATIONS.find((l) => l.city === row.location_city);

    const appt: AppointmentEmail = {
      id: row.id,
      serviceTitle: service?.title ?? row.service_slug,
      serviceSlug: row.service_slug,
      durationMinutes: service?.durationMinutes ?? 45,
      dentistName: row.dentist_name,
      locationCity: row.location_city,
      locationAddress: location?.line,
      startsAt: row.starts_at,
      patientName: row.patient_name,
      patientEmail: row.patient_email,
      patientPhone: row.patient_phone,
      notes: row.notes ?? undefined,
    };

    const result = await sendReminderEmail(appt);
    if (!result.sent) {
      failures.push(`${row.id}: ${result.error}`);
      continue; // Leave reminder_sent_at null so the next run retries.
    }

    const { error: updateError } = await supabase
      .from("appointments")
      .update({ reminder_sent_at: new Date().toISOString() })
      .eq("id", row.id);

    if (updateError) {
      // Email went out but the flag didn't persist — log so we can avoid dupes.
      console.error(`[cron/reminders] failed to mark ${row.id}:`, updateError.message);
    }
    sent += 1;
  }

  if (failures.length) console.error("[cron/reminders] send failures:", failures.join("; "));

  return NextResponse.json({
    ok: true,
    candidates: rows.length,
    sent,
    failed: failures.length,
    windowHours: REMINDER_WINDOW_HOURS,
  });
}
