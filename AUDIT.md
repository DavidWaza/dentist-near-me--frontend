# Codebase Audit — DentistNearMe (Phase 1)

Date: 2026-10-27 · Commit audited: `5c51d59` · Read-only: no source files were changed.

## 0. Summary

| Severity | Count | Headline |
|---|---|---|
| Critical | 1 | Real secrets (incl. Supabase **service-role** key) committed to git and pushed to GitHub |
| High | 8 | Timezone bug hides booked slots; overlapping bookings; unvalidated booking times; no abuse protection; silent availability failure; LCP text hidden until JS; auto-rotating carousel; contrast failures |
| Medium | 17 | Location data mismatch, broken links, email HTML injection, leaked error strings, missing SEO basics, all-client-side homepage, runtime Google Fonts, no lint/tests |
| Low | 22 | Dead code, ARIA nits, duplicated markup and tokens, content questions |

Good news: TypeScript `strict` is already on, `tsc` passes with zero errors, no `any` found, the build passes, server-only modules use `import "server-only"`, effects already have cleanup (cancel flags, `clearInterval`), and `lang="en"` is set.

---

## 1. Current structure

**Stack (inferred):** Next.js 14.2.15 App Router · React 18.3 · TypeScript (strict) · Tailwind 3.4 · framer-motion 11 · Supabase (Postgres + RLS) · Resend (email). **Hosting:** Vercel Hobby (from `vercel.json` and cron comments).

```
app/
  layout.tsx            root layout, global metadata, Google Fonts <link>, <Navbar/>
  page.tsx              home: Hero, StoryStats, Services, (Team commented out), WhyUs, Testimonials, Locations, Footer
  book/page.tsx         booking page (dynamic: reads searchParams.service)
  api/availability      GET booked slots for a service's specialist (service-role client)
  api/bookings          POST create booking + admin email
  api/cron/reminders    GET reminder job (hard-disabled by a constant, returns 503)
components/             13 flat files, 11 of them "use client"
lib/
  content.ts            all site copy and data (SITE, STATS, SERVICES, DOCTORS, WHY_US, TESTIMONIALS, LOCATIONS)
  scheduling.ts         pure date/slot helpers
  supabase.ts           anon client + DB types + browser fetch helpers for the API routes (mixed concerns)
  supabase-admin.ts     service-role client (server-only)
  email.ts              Resend client, HTML templates, send functions (server-only)
supabase/               schema.sql + 3 hand-run migrations
public/                 5 logo files (1 used)
```

- **Routing:** two pages (`/`, `/book`) and three API routes. In-page navigation uses hash anchors (`/#services`).
- **Data flow:** static content is imported from `lib/content.ts` straight into components. Booking: `BookingForm` (client) → `fetchAvailability` / `bookAppointment` in `lib/supabase.ts` → API routes → Supabase / Resend. Business rules (slot grid, specialist mapping, durations) are duplicated in `lib/content.ts`, `lib/scheduling.ts` and `supabase/schema.sql`.
- **State:** local `useState` only. `BookingForm` holds about 11 pieces of state plus 4 effects.
- **Styling:** Tailwind with brand colors in `tailwind.config.ts`, a few component classes in `globals.css` (`.btn-pill`, `.eyebrow`, …), and hard-coded hex values repeated in `lib/email.ts`, `layout.tsx` (`themeColor`) and `Services.tsx` (`bg-[#E3F4FD]`). No CSS variables and no dark mode (the site is light-only via `color-scheme: light`).

---

## 2. Bugs

### Critical

**C1. Live secrets are committed and pushed.** `.env` **and** `.env.example` are tracked by git, are byte-identical, and contain real values for `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS: full read and write of every patient's name, email and phone), `RESEND_API_KEY`, `CRON_SECRET`, the anon key and two personal email addresses. They have been in history since `8b24fe8` and `origin` points to `github.com/DavidWaza/dentist-near-me--frontend`. `.gitignore` only excludes `.env*.local`.
→ **Rotate all four keys in Supabase, Resend and Vercel now**, whatever happens with this refactor. Then untrack `.env`, replace `.env.example` with placeholders, and decide whether to rewrite history (only needed if the repo is or was public).

### High

**H1. Booked slots never show as taken in production (timezone).** `/api/availability` turns stored timestamps into slot keys with `getHours()` in the **server's** timezone (UTC on Vercel), while the browser builds slot keys in the **visitor's** timezone. A 09:00 Lagos (UTC+1) booking is stored as `08:00Z`, keyed `"08:00"`, so the browser's `"09:00"` button still shows as free. The day-range boundaries (`new Date(\`${from}T00:00:00\`)`) are also server-local. Separately, `toStartsAt()` uses the browser's timezone, so anyone booking from outside WAT (for example a relative abroad) books a different clinic time than the one shown. The DB unique index catches exact duplicates, so the user sees a 409 "slot was just taken" at the last step.
→ Do all slot math in `CLINIC_TIMEZONE` (`Africa/Lagos`) on both client and server.

**H2. Specialists can be double-booked by overlapping appointments.** Slots are a fixed 45-minute grid, but Restorative is 75 min and Cosmetic 60 min. The only guard is `unique (dentist_name, starts_at)`. Dr.Bagi booked 09:00–10:15 still has the 09:45 slot available.
→ Block slots by duration in availability, and add a Postgres exclusion constraint on `tstzrange(starts_at, ends_at)` per dentist (`btree_gist`).

**H3. The booking API accepts any future timestamp.** `POST /api/bookings` only checks that `starts_at` parses and is in the future. A direct request can book 03:07 on a Tuesday, or a date two years out, regardless of opening hours, the slot grid or the 14-day window.

**H4. No abuse protection on the public booking endpoint.** There is no rate limit, honeypot or captcha. Every request sends an email through Resend (quota and cost) and inserts a `pending` row that **blocks a real slot**, so a simple script could fill a specialist's calendar.

**H5. Availability errors are silently treated as "everything is free".** `fetchAvailability` returns `{ booked: {} }` on any failure, and `BookingForm` has no error state. Confirmed locally: Supabase was unreachable, the API returned 500, and the UI showed every slot as available.

**H6. The main heading (the LCP element) and the header are sent as invisible HTML.** framer-motion's `initial` styles are server-rendered: the served HTML contains `style="opacity:0;transform:translateY(24px)"` on the hero `<h1>`, and `translateY(-24px)` on the `<header>`. Text only appears after the JS bundle downloads, hydrates and animates. This is the main cause of the **3.9 s mobile LCP**. Every `Reveal`-wrapped section behaves the same way, so with JS failing or disabled the page is mostly blank.

**H7. The testimonial carousel auto-rotates with no way to pause it (WCAG 2.2.2).** It rotates every 6 s and pauses only under `prefers-reduced-motion`, not on hover, focus or by a control. The dot buttons are 8×8 px, which fails target size 2.5.8 (Lighthouse flags this).

**H8. Text contrast fails WCAG AA in several places** (measured):

| Pair | Ratio | Needed | Where |
|---|---|---|---|
| white on `#61BDFF` (panel-gradient start) | 2.05 | 3.0 (large) / 4.5 | Testimonials panel, footer CTA, booking success |
| white/70 on `#61BDFF` | 1.66 | 4.5 | body text in those panels |
| `teal-light` highlight on the gradient | 1.17–2.07 | 3.0 | "Trust and Care", "Just a Smile Away" |
| `ink-soft/70` on white | 2.73 | 4.5 | booking stepper labels |
| `teal #2680C0` on white | 4.26 | 4.5 | "Your assigned specialist" (12 px) |
| `ink-soft` on cream / peach / mint-light | 4.22 / 4.19 / 4.45 | 4.5 | footer text, service card copy |
| white/40 dots on the gradient | 1.43 | 3.0 (UI) | carousel dots |

Lighthouse scores accessibility 96–100 because it cannot evaluate text over gradients. Fixing these **will change colors slightly**, so each fix needs your approval.

### Medium

- **M1. Location data no longer matches.** After `5c51d59`, the specialists' `locationCity` values (Maitama, Wuse, Garki) no longer exist in `LOCATIONS` (Mabushi, "Location soon in Abuja", Lokoja). As a result the booking form never shows a clinic address, emails have no address, and the success message has no city. The DB seed and migration 0003 still use Maitama/Wuse/Garki. The public site shows the address **"unknown"**, and the copy says "Three convenient clinics" when one isn't open yet.
- **M2. Broken links.** "Our Team" in the navbar and footer points to `/#team`, but the Team section is commented out. "Privacy Policy" and "Terms of Use" both link to `/`.
- **M3. HTML attribute injection in the admin email.** `esc()` doesn't escape `"` or `'`. The patient's email and phone are interpolated into `href="mailto:…"` and `href="tel:…"`, the email regex allows quotes, and the phone number has no character check.
- **M4. Internal error strings reach the public.** `emailErrors` is returned to the browser and shown ("Email issue: RESEND_API_KEY not configured"). The cron route returns raw DB `error.message`.
- **M5. Misleading success copy.** In demo mode the screen says "Your appointment is saved" when nothing was saved. Also, patients receive **no confirmation email**: the `patientConfirmation` template exists but is never sent. Is that intentional?
- **M6. Hydration mismatch risk.** `BookingForm` calls `getUpcomingDays()` (`new Date()` plus `toLocaleDateString`) during SSR on a UTC server and again in the browser. Around midnight, or in other locales, the day lists differ.
- **M7. The booking wizard is hard to follow by keyboard and screen reader.** Focus stays on "Continue" when the step changes, the new step isn't announced, the stepper has no `aria-current`, step labels are hidden on mobile so progress is visual only, and the "Loading available times…" message isn't in a live region.
- **M8. Mobile menu.** No Escape to close, no `aria-controls`, no focus handling, and no visible focus style on the hamburger button.
- **M9. Cron route (currently disabled).** It allows **all** requests when `CRON_SECRET` is unset, accepts the secret in the query string (where it ends up in logs), compares it without constant-time comparison, and doesn't guard `REMINDER_WINDOW_HOURS` against `NaN`.
- **M10. No runtime validation at boundaries.** The request body is cast to an interface, Supabase rows are cast (`as AppointmentRow[]`, `as string`), and the client casts API responses.

### Low

- **L1.** `days` is computed once, so a tab left open past midnight offers yesterday as "tomorrow".
- **L2.** The footer's `© {new Date().getFullYear()}` is frozen at build time because `/` is statically generated.
- **L3.** `/api/availability` returns `ok: true, booked: {}` when the service-role key is missing, with no log.
- **L4.** Day buttons set both `disabled` and `aria-disabled`, which is redundant.

---

## 3. Performance

**Lighthouse baseline** (Lighthouse 12.2.1, local `next start`, headless Chrome, default simulated throttling; no `sharp` installed, so local image optimization is slower than on Vercel):

| Page | Mode | Perf | A11y | Best Pr. | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | **81** | 96 | 100 | 100 | **3.9 s** | 0 | 180 ms | 2.7 s |
| `/` | desktop | 97 | 96 | 100 | 100 | 1.0 s | 0.005 | 0 ms | 1.0 s |
| `/book` | mobile | 90 | 100 | 100 | 100 | 3.0 s | 0.001 | 0 ms | 2.6 s |
| `/book` | desktop | 97 | 96 | 100 | 100 | 1.0 s | 0 | 0 ms | 1.0 s |

INP can't be measured in a lab run. TBT, the lab stand-in, is 0–180 ms. Mobile main-thread work: 3.6 s.

**Bundle:** shared first-load JS 87.1 kB. `/` 144 kB, `/book` 145 kB. Lighthouse reports 25 KiB of unused JS.

| Finding | Severity |
|---|---|
| LCP heading and header server-rendered at `opacity:0` (H6) | High |
| **M11.** 11 of 13 components are `"use client"`, mostly just for scroll-reveal animation, so all homepage markup ships twice (HTML plus RSC/JS). framer-motion (~35–45 kB gzipped) is on every page | Medium |
| **M12.** Fonts: Google Fonts CSS loaded at runtime via `<link>` with `optimizeFonts: false`. It's a render-blocking third-party request, 5 weights, not self-hosted, and contributes to the 2.6–2.7 s mobile FCP. `next/font` would self-host and subset it with no visual change | Medium |
| Logo `<img>` is lazy-loaded even though it's above the fold, and is served larger than displayed (25 KiB savings flagged) | Low |
| `sharp` not installed (matters only for self-hosting; Vercel optimizes images itself) | Low |
| All images go through `next/image` with `sizes` and reserved space, so CLS is already ~0 ✓ | — |
| Dependencies: all 7 runtime deps are used. framer-motion is the only heavy one and is a candidate for CSS animations (needs your OK, since motion details may differ slightly) | — |
| No caching headers configured. `/` is static ✓. `/book` is dynamic only because it reads `searchParams` | Low |

---

## 4. SEO

| Finding | Severity |
|---|---|
| **M13.** No `robots.txt` and no `sitemap.xml` (both return 404) | Medium |
| **M14.** No `metadataBase` or canonical URLs, and no Open Graph or Twitter tags (shared links get no preview card) | Medium |
| **M15.** No structured data. `Dentist` / `LocalBusiness` JSON-LD with address, hours and phone matters a lot for a "dentist near me" search | Medium |
| Titles and descriptions are unique for `/` and `/book` ✓. `keywords` meta is ignored by search engines (harmless) | — |
| Exactly one `h1` per page, and section `h2`/`h3` order is logical ✓ | — |
| Navigation uses real `<a href>` via `next/link` ✓. Link text is repeated "Book Now" ×8 (low) | Low |
| 404: the default Next.js page, which returns a correct 404 status ✓, but it's unbranded and has no way back to the site | Low |
| Lighthouse SEO = 100, but it doesn't check the items above | — |

---

## 5. Accessibility (WCAG 2.2 AA)

| Finding | Severity |
|---|---|
| H7 carousel auto-rotation and target size; H8 contrast | High |
| M7 wizard focus and announcements; M8 mobile menu | Medium |
| **M16.** No skip-to-content link. `<Footer>` is rendered **inside `<main>`** on both pages, so the page has no `contentinfo` landmark | Medium |
| The testimonial dots use `role="tablist"`/`role="tab"` with no tabpanel and no arrow-key support, which is ARIA misuse (plain buttons with `aria-current` would be correct) | Low |
| Custom focus styles exist only on `.btn-pill` and the Why Us accordion. Other links rely on the browser default, which is weak on the dark navbar | Low |
| Hero animation (`rise`) and `Reveal` respect reduced motion. **The Navbar entrance and the StoryStats card animation don't** | Low |
| Alt text: decorative images use `alt=""` ✓. Meaningful images have alt ✓. Testimonial avatar alt repeats the name shown right below (minor) | — |
| Form fields have proper `<label>`s ✓ and the error has `role="alert"` ✓, but the error isn't linked to fields via `aria-describedby` and fields don't set `aria-invalid` | Low |
| `lang="en"` ✓, `smooth` scroll is disabled under reduced motion ✓ | — |

---

## 6. Code quality

| Finding | Severity |
|---|---|
| **M17.** No ESLint config (`next lint` would prompt interactively), no Prettier, no tests, no pre-commit hook, no CI | Medium |
| `BookingForm.tsx` is 590 lines: wizard state, data fetching, 3 steps, success screen and a `Field` component in one file | Low |
| `lib/supabase.ts` mixes DB types, the anon client, and browser `fetch` helpers that have nothing to do with Supabase. It also has an `import` in the middle of the file | Low |
| The section header markup (eyebrow + `h2` + teal span) is repeated 7×, the "pill + arrow-badge" markup about 6×, and the "At {SITE.name}, we combine expertise…" paragraph is duplicated in Services and WhyUs | Low |
| Colors are duplicated across `tailwind.config.ts`, `lib/email.ts`, `layout.tsx` and an arbitrary `bg-[#E3F4FD]` | Low |
| Business rules are duplicated in TS and SQL (durations, specialist mapping, opening hours), and dentist and location names are used as **string foreign keys**, so renaming one needs a data migration | Low |
| **Possibly unused — flagged, not deleted:** `components/Team.tsx` (commented out), `ToothMark` icon, `isEmailConfigured`, `AppointmentStatus`, the `patientConfirmation` template, 4 unused logo files in `public/` (two with spaces in their names), empty `docs/` folder | Low |
| Content questions: weekend hours "**5:00** – 17:30" (5 AM?) produce 05:00 slots. All three doctors are listed as "Pediatric Dentist" although two do cosmetic and restorative work. Hero info cards pair a phone icon with "Get An Appointment" and a mail icon with "Emergency Contact" (the call link) | Low |
| `CRON_REMINDERS_ENABLED = false` is a code constant rather than an env flag | Low |
| No security headers (CSP, `X-Frame-Options`, `Referrer-Policy`) | Low |

---

## 7. Questions before Phase 2

The prompt's context section was left as placeholders, so I need these answers:

1. **Secrets (C1):** Will you rotate the keys yourself? May I untrack `.env` and replace `.env.example` with placeholders as the first Phase 3 commit? Is the GitHub repo public?
2. **Must-not-change:** Hosting is Vercel Hobby, correct? Any analytics, or external links to `/book?service=…`, that must keep working?
3. **Visual changes:** H8 (contrast) can't be fixed without slightly changing colors. Should I propose exact replacement shades for you to approve?
4. **Locations (M1):** What are the real clinics, and which clinic does each specialist work at?
5. **Business rules:** Are weekend hours really from 05:00? Should patients get a confirmation email (M5)?
6. **framer-motion:** May I replace scroll-reveal animations with CSS and server components? It would look nearly identical and save about 40 kB JS. Or keep framer-motion and only fix the SSR `opacity:0` problem?
7. **Known issues:** Are there bugs you already know about that I should prioritize?
