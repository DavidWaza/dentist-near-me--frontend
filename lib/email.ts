import "server-only";

import { Resend } from "resend";
import { SITE } from "@/lib/content";

/* ------------------------------------------------------------------ */
/* Configuration                                                       */
/* ------------------------------------------------------------------ */

const apiKey = process.env.RESEND_API_KEY;

/**
 * Verified sender. Until you verify your own domain in Resend you can use
 * the shared `onboarding@resend.dev` address (only delivers to your own
 * Resend account email). Set RESEND_FROM_EMAIL once your domain is verified.
 */
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "DentistNearMe <onboarding@resend.dev>";

/** Where new-booking notifications are sent (the clinic / front desk). */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? SITE.email;

/** Public site URL, used for reschedule / cancel links in emails. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://dentistnearme.com";

/** IANA timezone used to render appointment times in emails. */
export const CLINIC_TIMEZONE = process.env.CLINIC_TIMEZONE ?? "Africa/Lagos";

let resend: Resend | null = null;

/** Returns a Resend client, or null when RESEND_API_KEY is not set. */
export function getResend(): Resend | null {
  if (!apiKey) return null;
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

export const isEmailConfigured = (): boolean => Boolean(apiKey);

/**
 * Resend's shared `onboarding@resend.dev` sender only delivers to the email
 * on your Resend account. Set RESEND_SANDBOX_TO to that address during local
 * testing; remove it (or verify your own domain) before production.
 */
const RESEND_SANDBOX_FROM = "onboarding@resend.dev";
const sandboxRedirect = process.env.RESEND_SANDBOX_TO?.trim();

function usingResendSandbox(): boolean {
  return FROM_EMAIL.includes(RESEND_SANDBOX_FROM);
}

function resolveRecipient(original: string): string {
  if (sandboxRedirect && usingResendSandbox()) return sandboxRedirect;
  return original;
}

/* ------------------------------------------------------------------ */
/* Shared appointment shape used by every template                     */
/* ------------------------------------------------------------------ */

export interface AppointmentEmail {
  id?: string;
  serviceTitle: string;
  serviceSlug: string;
  durationMinutes: number;
  dentistName: string;
  locationCity: string;
  locationAddress?: string;
  startsAt: string; // ISO timestamp
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
}

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: CLINIC_TIMEZONE,
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: CLINIC_TIMEZONE,
  });
}

const firstName = (name: string): string => name.trim().split(/\s+/)[0] || "there";
const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ------------------------------------------------------------------ */
/* HTML building blocks (inline styles — required by email clients)    */
/* ------------------------------------------------------------------ */

const TEAL = "#2680C0";
const DEEP = "#1A6599";
const MINT = "#F0F9FF";
const INK_SOFT = "#4A7898";
const BRAND_GRADIENT =
  "linear-gradient(155deg, #61BDFF 0%, #4DAEF8 35%, #2680C0 70%, #1A6599 100%)";

function layout(opts: { preheader: string; heading: string; body: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(opts.heading)}</title>
</head>
<body style="margin:0;padding:0;background:${MINT};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${DEEP};">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${MINT};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 10px 40px rgba(15,61,92,0.1);">
        <tr><td style="background:${BRAND_GRADIENT};padding:28px 32px;">
          <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">${esc(SITE.name)}</span>
          <span style="float:right;font-size:12px;color:#C5E8FF;padding-top:6px;">Dental Care</span>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 8px;font-size:22px;line-height:1.3;color:${DEEP};">${esc(opts.heading)}</h1>
          ${opts.body}
        </td></tr>
        <tr><td style="padding:20px 32px;background:#F0F9FF;border-top:1px solid #C5E8FF;">
          <p style="margin:0;font-size:12px;color:${INK_SOFT};line-height:1.6;">
            ${esc(SITE.name)} · ${esc(SITE.phone)} · ${esc(SITE.email)}<br/>
            You're receiving this because an appointment was booked with this email address.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function detailsTable(appt: AppointmentEmail): string {
  const rows: Array<[string, string]> = [
    ["Service", `${appt.serviceTitle} · ${appt.durationMinutes} min`],
    ["Dentist", appt.dentistName],
    ["Date", formatDate(appt.startsAt)],
    ["Time", formatTime(appt.startsAt)],
    ["Location", appt.locationAddress ? `${appt.locationCity} — ${appt.locationAddress}` : appt.locationCity],
  ];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:${MINT};border-radius:16px;padding:8px 4px;">
    ${rows
      .map(
        ([k, v]) => `<tr>
        <td style="padding:8px 16px;font-size:13px;color:${INK_SOFT};white-space:nowrap;vertical-align:top;">${esc(k)}</td>
        <td style="padding:8px 16px;font-size:14px;font-weight:600;color:${DEEP};text-align:right;">${esc(v)}</td>
      </tr>`
      )
      .join("")}
  </table>`;
}

function actionLinks(appt: AppointmentEmail): string {
  const subject = encodeURIComponent(
    `Reschedule/Cancel — ${appt.serviceTitle} on ${formatDate(appt.startsAt)}`
  );
  const cancelMail = `mailto:${ADMIN_EMAIL}?subject=${subject}`;
  return `<p style="margin:20px 0 4px;font-size:13px;color:${INK_SOFT};">
    Need to make a change?
    <a href="${SITE_URL}/book" style="color:${TEAL};font-weight:600;text-decoration:none;">Reschedule</a>
    &nbsp;·&nbsp;
    <a href="${cancelMail}" style="color:${TEAL};font-weight:600;text-decoration:none;">Cancel</a>
  </p>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;margin-top:8px;background:${TEAL};color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:999px;">${esc(label)}</a>`;
}

/* ------------------------------------------------------------------ */
/* Templates                                                           */
/* ------------------------------------------------------------------ */

function patientConfirmation(appt: AppointmentEmail): { subject: string; html: string } {
  const body = `
    <p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:${INK_SOFT};">
      Hi ${esc(firstName(appt.patientName))}, your appointment is confirmed. We can't wait to see you!
    </p>
    ${detailsTable(appt)}
    ${appt.notes ? `<p style="margin:0 0 8px;font-size:13px;color:${INK_SOFT};"><strong>Your note:</strong> ${esc(appt.notes)}</p>` : ""}
    <p style="margin:16px 0 0;font-size:13px;color:${INK_SOFT};line-height:1.6;">
      Please arrive 5–10 minutes early. If this is your first visit, bring any insurance details and a list of current medications.
    </p>
    ${actionLinks(appt)}`;
  return {
    subject: `Your ${appt.serviceTitle} appointment is confirmed — ${formatDate(appt.startsAt)}`,
    html: layout({
      preheader: `${formatDate(appt.startsAt)} at ${formatTime(appt.startsAt)} with ${appt.dentistName}`,
      heading: "Appointment confirmed ✓",
      body,
    }),
  };
}

function adminNotification(appt: AppointmentEmail): { subject: string; html: string } {
  const body = `
    <p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:${INK_SOFT};">
      A new booking just came in${appt.id ? ` (ref <strong>${esc(appt.id.slice(0, 8))}</strong>)` : ""}.
    </p>
    ${detailsTable(appt)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0;">
      <tr><td style="padding:6px 16px;font-size:13px;color:${INK_SOFT};">Patient</td>
          <td style="padding:6px 16px;font-size:14px;font-weight:600;text-align:right;">${esc(appt.patientName)}</td></tr>
      <tr><td style="padding:6px 16px;font-size:13px;color:${INK_SOFT};">Email</td>
          <td style="padding:6px 16px;font-size:14px;text-align:right;"><a href="mailto:${esc(appt.patientEmail)}" style="color:${TEAL};text-decoration:none;">${esc(appt.patientEmail)}</a></td></tr>
      <tr><td style="padding:6px 16px;font-size:13px;color:${INK_SOFT};">Phone</td>
          <td style="padding:6px 16px;font-size:14px;text-align:right;"><a href="tel:${esc(appt.patientPhone)}" style="color:${TEAL};text-decoration:none;">${esc(appt.patientPhone)}</a></td></tr>
    </table>
    ${appt.notes ? `<p style="margin:8px 0 0;font-size:13px;color:${INK_SOFT};"><strong>Notes:</strong> ${esc(appt.notes)}</p>` : ""}`;
  return {
    subject: `New booking — ${appt.patientName} · ${appt.serviceTitle} · ${formatDate(appt.startsAt)}`,
    html: layout({
      preheader: `${appt.patientName} booked ${appt.serviceTitle} on ${formatDate(appt.startsAt)}`,
      heading: "New appointment booked",
      body,
    }),
  };
}

function reminder(appt: AppointmentEmail): { subject: string; html: string } {
  const body = `
    <p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:${INK_SOFT};">
      Hi ${esc(firstName(appt.patientName))}, this is a friendly reminder about your upcoming visit.
    </p>
    ${detailsTable(appt)}
    <p style="margin:8px 0 12px;font-size:13px;color:${INK_SOFT};line-height:1.6;">
      Please arrive 5–10 minutes early. If you can no longer make it, let us know as soon as possible so we can offer the slot to someone on the waitlist.
    </p>
    ${button(`${SITE_URL}/book`, "Reschedule appointment")}
    ${actionLinks(appt)}`;
  return {
    subject: `Reminder: ${appt.serviceTitle} on ${formatDate(appt.startsAt)} at ${formatTime(appt.startsAt)}`,
    html: layout({
      preheader: `See you ${formatDate(appt.startsAt)} at ${formatTime(appt.startsAt)}`,
      heading: "Your appointment is coming up 🦷",
      body,
    }),
  };
}

/* ------------------------------------------------------------------ */
/* Send functions                                                      */
/* ------------------------------------------------------------------ */

/**
 * Sends the clinic booking notification (admin only).
 * Never throws — failures are reported in the returned result so a booking
 * is never lost just because an email failed.
 */
export async function sendBookingEmails(
  appt: AppointmentEmail
): Promise<{ sent: boolean; errors: string[] }> {
  const client = getResend();
  if (!client) return { sent: false, errors: ["RESEND_API_KEY not configured"] };

  const admin = adminNotification(appt);

  try {
    const { error } = await client.emails.send({
      from: FROM_EMAIL,
      to: resolveRecipient(ADMIN_EMAIL),
      subject: admin.subject,
      html: admin.html,
      replyTo: appt.patientEmail,
    });
    if (error) return { sent: false, errors: [error.message] };
    return { sent: true, errors: [] };
  } catch (err) {
    return { sent: false, errors: [String(err)] };
  }
}

/** Sends a single reminder email to the patient. Never throws. */
export async function sendReminderEmail(
  appt: AppointmentEmail
): Promise<{ sent: boolean; error?: string }> {
  const client = getResend();
  if (!client) return { sent: false, error: "RESEND_API_KEY not configured" };

  const mail = reminder(appt);
  try {
    const { error } = await client.emails.send({
      from: FROM_EMAIL,
      to: resolveRecipient(appt.patientEmail),
      subject: mail.subject,
      html: mail.html,
      replyTo: ADMIN_EMAIL,
    });
    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (err) {
    return { sent: false, error: String(err) };
  }
}
