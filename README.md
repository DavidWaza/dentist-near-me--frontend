# DentistNearMe — Dental Care Website & Booking App

A high-profile dental practice website with a four-step appointment-booking flow, built
from the DentistNearMe design screenshots. Brand colors, layout, typography (Plus Jakarta Sans)
and section structure follow the reference designs exactly.

**Stack:** Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · Supabase · Resend (transactional email)

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

The booking flow works immediately in **demo mode** (no database writes). To persist
bookings, connect Supabase:

1. Create a project at supabase.com.
2. Open the SQL editor and run `supabase/schema.sql` (tables, RLS policies, seed data).
3. Copy `.env.example` → `.env.local` and fill in your project URL + anon key.
4. Restart the dev server. Bookings now insert into `public.appointments`.

## Email & reminders (Resend)

On every successful booking the server sends **two** emails via [Resend](https://resend.com):
a confirmation to the patient and a notification to the clinic (`ADMIN_EMAIL`). A cron job
then sends each patient **one reminder** within `REMINDER_WINDOW_HOURS` (default 48h) of
their appointment. Everything runs server-side — the Resend key and Supabase service-role
key are never shipped to the browser.

```
Booking  ──POST /api/bookings──▶  insert appointment  ──▶  sendBookingEmails()
                                                            ├─ patient confirmation
                                                            └─ admin notification

Hourly cron ──GET /api/cron/reminders──▶  find appts in next 48h w/o reminder
                                          ──▶ sendReminderEmail() + mark reminder_sent_at
```

**Setup**

1. Create a [Resend](https://resend.com) account and an API key (`re_…`). For production,
   verify your sending domain and set `RESEND_FROM_EMAIL` to an address on it; until then
   the shared `onboarding@resend.dev` sender works but only delivers to your own Resend email.
2. Run `supabase/migrations/0001_reminder_sent_at.sql` on an existing database (the full
   `schema.sql` already includes the `reminder_sent_at` column for fresh installs).
3. Fill these env vars (see `.env`):

   | Variable                    | Purpose                                                        |
   | --------------------------- | -------------------------------------------------------------- |
   | `RESEND_API_KEY`            | Resend API key (server-only).                                  |
   | `RESEND_FROM_EMAIL`         | Verified sender, e.g. `DentistNearMe <hello@yourclinic.com>`.       |
   | `ADMIN_EMAIL`               | Clinic inbox that receives new-booking notifications.          |
   | `SUPABASE_SERVICE_ROLE_KEY` | Server-only key used to insert bookings and run the reminder cron. |
   | `NEXT_PUBLIC_SITE_URL`      | Used for reschedule/cancel links in emails.                    |
   | `CLINIC_TIMEZONE`           | IANA tz for rendering times (default `America/New_York`).      |
   | `CRON_SECRET`               | Protects the reminder endpoint; set the same value in Vercel.  |
   | `REMINDER_WINDOW_HOURS`     | Hours before an appointment to remind (default `48`).          |

**Reminders in production.** `vercel.json` schedules `GET /api/cron/reminders` hourly.
Set `CRON_SECRET` in the Vercel project and Vercel Cron will pass it automatically. The
`reminder_sent_at` flag guarantees exactly one reminder per appointment even if the cron
runs many times. Trigger a run manually with:

```bash
curl "http://localhost:3000/api/cron/reminders?secret=$CRON_SECRET"
```

Both email and DB persistence **degrade gracefully**: with no `RESEND_API_KEY` the booking
still saves (emails skipped, logged); with no `SUPABASE_SERVICE_ROLE_KEY` the flow runs in
demo mode so the UI is fully testable without any backend.

## Scripts

| Command             | Purpose                       |
| ------------------- | ----------------------------- |
| `npm run dev`       | Local development             |
| `npm run build`     | Production build (zero-error) |
| `npm run typecheck` | `tsc --noEmit` strict check   |
| `npm run lint`      | Next.js ESLint                |

## Project structure

```
app/
  layout.tsx            Root layout, fonts, metadata
  page.tsx              Landing page (all sections)
  book/page.tsx         Booking page (reads ?service= & ?dentist=)
  globals.css           Tailwind + brand component classes
components/
  Navbar.tsx            Floating dark pill nav + mobile menu
  Hero.tsx              Dark-teal hero + info bar
  StoryStats.tsx        "Our Story" stat cards (92%, 3/4, 7 Mi, 24/7, 85%)
  Services.tsx          Numbered [01]–[04] service cards with tag pills
  Team.tsx              "Our Experts in Oral Health" doctor cards
  WhyUs.tsx             "We Treat You Like Family" animated accordion
  Testimonials.tsx      Auto-rotating carousel on clinic backdrop
  Locations.tsx         "Where You Can Find Us" clinic cards
  Footer.tsx            CTA panel + cream footer
  BookingForm.tsx       4-step booking wizard (Framer Motion transitions)
  Reveal.tsx            Reusable scroll-reveal wrapper
app/api/
  bookings/route.ts        POST — validates, inserts, sends confirmation + admin email
  cron/reminders/route.ts  GET  — hourly cron, sends reminders 48h out (CRON_SECRET-guarded)
lib/
  content.ts            All site copy/data in one place (incl. service durations)
  scheduling.ts         Day list + 45-min slot generation from opening hours
  supabase.ts           Browser client + bookAppointment() → POSTs to /api/bookings
  supabase-admin.ts     Server-only service-role client (insert + cron)
  email.ts              Resend client + branded confirmation/admin/reminder templates
supabase/
  schema.sql            Full database schema (see below)
  migrations/           Incremental migrations for existing databases
vercel.json             Hourly cron schedule for reminders
```

## Database schema (`supabase/schema.sql`)

- `locations`, `services`, `dentists`, `dentist_services`, `dentist_availability` —
  public-readable catalogue tables, seeded to match the site content.
- `appointments` — bookings with patient details, validated by CHECK constraints
  (email format, future start time, note length).
- **Double-booking guard:** partial unique index on `(dentist_name, starts_at)` for
  pending/confirmed rows; the UI surfaces the conflict as "slot just taken".
- **Trigger** `resolve_appointment_refs` resolves FK ids and computes `ends_at` from the
  service duration.
- **Row Level Security:** anonymous visitors can *insert* bookings only; reading and
  managing appointments requires an authenticated (staff) session.

## Design tokens

| Token   | Hex       | Use                              |
| ------- | --------- | -------------------------------- |
| `deep`  | `#0C332E` | Hero/footer panels, buttons      |
| `teal`  | `#3D9DA1` | Accent words, arrow badges       |
| `mint`  | `#DCEAE6` | Section backgrounds              |
| `cream` | `#F7F1E8` | Footer card                      |
| `peach` | `#FBEFE2` | Alternating service-card surface |
| `ink`   | `#0B1E1B` | Headlines                        |

Accessibility: keyboard-visible focus rings, `aria-pressed`/`aria-expanded` on interactive
controls, and all Framer Motion effects respect `prefers-reduced-motion`.

Note: imagery uses Unsplash placeholder URLs — swap in your own clinic photography in
`lib/content.ts` before launch.
