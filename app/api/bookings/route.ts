import { NextResponse } from "next/server";
import { getSpecialistForService, LOCATIONS, SERVICES } from "@/lib/content";
import { getSupabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendBookingEmails, type AppointmentEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BookingBody {
  service_slug?: string;
  starts_at?: string;
  patient_name?: string;
  patient_email?: string;
  patient_phone?: string;
  notes?: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

/** Maps a Supabase insert error to a user-facing response. */
function bookingError(error: { code?: string }) {
  // 23505 = unique_violation from the double-booking guard.
  return error.code === "23505"
    ? bad("That time slot was just taken. Please pick another time.", 409)
    : bad("Something went wrong while booking. Please try again.", 500);
}

export async function POST(request: Request) {
  let body: BookingBody;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid request body.");
  }

  /* ---- Validate against the same rules as the DB schema ---- */
  const service = SERVICES.find((s) => s.slug === body.service_slug);
  if (!service) return bad("Please choose a valid service.");

  const specialist = getSpecialistForService(service.slug);
  if (!specialist) return bad("No specialist is available for this service.");

  const name = (body.patient_name ?? "").trim();
  const email = (body.patient_email ?? "").trim();
  const phone = (body.patient_phone ?? "").trim();
  const notes = (body.notes ?? "").trim();
  const dentist = specialist.name;
  const city = specialist.locationCity;

  if (name.length < 2 || name.length > 120) return bad("Please enter your full name.");
  if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address.");
  if (phone.length < 7 || phone.length > 32) return bad("Please enter a valid phone number.");
  if (notes.length > 1000) return bad("Notes are too long.");

  const startsAtMs = Date.parse(body.starts_at ?? "");
  if (Number.isNaN(startsAtMs)) return bad("Please choose a valid date and time.");
  if (startsAtMs <= Date.now()) return bad("Please choose a time in the future.");
  const startsAt = new Date(startsAtMs).toISOString();

  const location = LOCATIONS.find((l) => l.city === city);

  const emailPayload: AppointmentEmail = {
    serviceTitle: service.title,
    serviceSlug: service.slug,
    durationMinutes: service.durationMinutes,
    dentistName: dentist,
    locationCity: city,
    locationAddress: location?.line,
    startsAt,
    patientName: name,
    patientEmail: email,
    patientPhone: phone,
    notes: notes || undefined,
  };

  /* ----------------------------------------------------------------
   * Persist. Prefer the service-role client (can read back the row id);
   * otherwise fall back to the anon client, whose RLS policy still permits
   * inserting a pending booking. With neither configured we run in demo mode.
   * ---------------------------------------------------------------- */
  const admin = getSupabaseAdmin();
  const supabase = admin ?? getSupabase();
  let demo = false;

  const row = {
    service_slug: service.slug,
    dentist_name: dentist,
    location_city: city,
    starts_at: startsAt,
    patient_name: name,
    patient_email: email,
    patient_phone: phone,
    notes: notes || null,
  };

  if (supabase) {
    if (admin) {
      // Service role can SELECT the inserted row to capture the id for emails.
      const { data, error } = await supabase
        .from("appointments")
        .insert(row)
        .select("id")
        .single();
      if (error) return bookingError(error);
      emailPayload.id = data?.id;
    } else {
      // Anon RLS allows INSERT but not SELECT — insert without returning.
      const { error } = await supabase.from("appointments").insert(row);
      if (error) return bookingError(error);
    }
  } else {
    // No Supabase configured — run in demo mode so the UI flow works.
    demo = true;
  }

  /* ---- Notify clinic (booking email only). Email failure never fails the booking. ---- */
  const emailResult = await sendBookingEmails(emailPayload);
  if (!emailResult.sent && emailResult.errors.length) {
    console.error("[bookings] email send failed:", emailResult.errors.join("; "));
  }

  return NextResponse.json({
    ok: true,
    demo,
    emailed: emailResult.sent,
    emailErrors: emailResult.errors.length ? emailResult.errors : undefined,
  });
}
