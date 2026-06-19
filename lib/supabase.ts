import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/* Types mirroring supabase/schema.sql                                 */
/* ------------------------------------------------------------------ */

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface AppointmentInsert {
  service_slug: string;
  starts_at: string; // ISO timestamp
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  notes?: string;
}

/* ------------------------------------------------------------------ */
/* Client                                                              */
/* ------------------------------------------------------------------ */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/** Returns a Supabase client, or null when env vars are not configured. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) client = createClient(url, anonKey);
  return client;
}

/**
 * Books an appointment via the server API route, which persists the booking
 * and sends the confirmation + admin emails (Resend). Routing through the
 * server keeps the Resend key and service-role key off the client. When
 * neither Supabase nor Resend is configured the route resolves in demo mode
 * so the UI flow remains fully testable.
 */
import type { BookedSlotsByDay } from "@/lib/scheduling";

/** Fetches booked time slots for a service's assigned specialist within a date range. */
export async function fetchAvailability(
  serviceSlug: string,
  from: string,
  to: string
): Promise<{
  booked: BookedSlotsByDay;
  specialist: { name: string; role: string; locationCity: string } | null;
}> {
  try {
    const params = new URLSearchParams({
      service_slug: serviceSlug,
      from,
      to,
    });
    const response = await fetch(`/api/availability?${params.toString()}`);
    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      booked?: BookedSlotsByDay;
      specialist?: { name: string; role: string; locationCity: string };
    };
    if (!response.ok || !data.ok) return { booked: {}, specialist: null };
    return {
      booked: data.booked ?? {},
      specialist: data.specialist ?? null,
    };
  } catch {
    return { booked: {}, specialist: null };
  }
}

export async function bookAppointment(
  payload: AppointmentInsert
): Promise<
  | { ok: true; demo: boolean; emailed: boolean; emailErrors?: string[] }
  | { ok: false; message: string }
> {
  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      demo?: boolean;
      emailed?: boolean;
      emailErrors?: string[];
      message?: string;
    };

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        message: data.message ?? "Something went wrong while booking. Please try again.",
      };
    }

    return {
      ok: true,
      demo: Boolean(data.demo),
      emailed: Boolean(data.emailed),
      emailErrors: data.emailErrors,
    };
  } catch {
    return {
      ok: false,
      message: "We couldn't reach the server. Please check your connection and try again.",
    };
  }
}
