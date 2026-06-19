import { NextResponse } from "next/server";
import { getSpecialistForService, SERVICES } from "@/lib/content";
import { slotFromIso, toIsoDate, type BookedSlotsByDay } from "@/lib/scheduling";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceSlug = searchParams.get("service_slug")?.trim() ?? "";
  const from = searchParams.get("from")?.trim() ?? "";
  const to = searchParams.get("to")?.trim() ?? "";

  if (!serviceSlug) return bad("Please choose a service.");
  if (!SERVICES.some((s) => s.slug === serviceSlug)) return bad("Unknown service.");

  const specialist = getSpecialistForService(serviceSlug);
  if (!specialist) return bad("No specialist is available for this service.");

  if (!ISO_DATE_RE.test(from) || !ISO_DATE_RE.test(to)) {
    return bad("Please provide valid from and to dates (yyyy-mm-dd).");
  }
  if (from > to) return bad("The from date must be on or before the to date.");

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({
      ok: true,
      specialist: { name: specialist.name, role: specialist.role, locationCity: specialist.locationCity },
      booked: {} satisfies BookedSlotsByDay,
    });
  }

  const rangeStart = new Date(`${from}T00:00:00`).toISOString();
  const rangeEnd = new Date(`${to}T23:59:59.999`).toISOString();

  const { data, error } = await admin
    .from("appointments")
    .select("starts_at")
    .eq("dentist_name", specialist.name)
    .in("status", ["pending", "confirmed"])
    .gte("starts_at", rangeStart)
    .lte("starts_at", rangeEnd);

  if (error) {
    console.error("[availability] query failed:", error.message);
    return bad("Could not load availability. Please try again.", 500);
  }

  const booked: BookedSlotsByDay = {};
  for (const row of data ?? []) {
    const startsAt = row.starts_at as string;
    const dateIso = toIsoDate(new Date(startsAt));
    const slot = slotFromIso(startsAt);
    booked[dateIso] ??= [];
    if (!booked[dateIso].includes(slot)) booked[dateIso].push(slot);
  }

  return NextResponse.json({
    ok: true,
    specialist: { name: specialist.name, role: specialist.role, locationCity: specialist.locationCity },
    booked,
  });
}
