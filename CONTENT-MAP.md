# Content Map: "DNM website content.docx" → site

Status: **Phase 2, awaiting approval.** No site code has changed. Raw extraction: [content/_source/extracted.md](content/_source/extracted.md).

---

## 1. Extraction check (Phase 1)

Source: `DNM website content.docx`, the only `.docx` in the project root. Converted with mammoth 1.8.0 and turndown 7.2.0, installed in a temp folder (no project dependencies added).

| Element | In .docx (counted from `word/document.xml`) | In extracted.md | Match |
|---|---|---|---|
| Heading 1 | 1 | 1 | ✓ |
| Heading 2 (numbered sections) | 19 (+1 empty Heading 2 at the very end) | 19 (empty one noted as a comment) | ✓ |
| Heading 3 | 87 | 87 | ✓ |
| List items (bulleted + numbered) | 65 | 65 | ✓ |
| Tables / rows | 1 / 13 (header + 12 prices) | 1 / 13 | ✓ |
| Text paragraphs missing after conversion | — | 0 (every non-empty paragraph's text found verbatim) | ✓ |
| Images | **0** (the archive has no `word/media/`) | 0 | ✓ |
| Horizontal-rule dividers | 19 | 19, restored as `---` (mammoth drops them) | ✓ after fix |
| Hyperlinks | 0 (URLs are plain text) | 0 | ✓ |
| Page breaks | 0 | 0 | ✓ |
| Manual line breaks | 1 (Contact address) | 1 | ✓ |

Notes:
- The file is 240 KB because it embeds the Roboto Mono font files, not because of images. **There are no images in the document**, so nothing was written to `public/images/content/`.
- The source is clean: no double spaces, no non-breaking spaces, and curly apostrophes (’) used consistently (14). No encoding artifacts were found.

---

## 2. What the document is

It isn't plain page copy. It's a **content specification** for a **17-page site** (sections 1–17) plus footer content and a blog plan. For each page it gives a URL, SEO title, meta description, H1, body, FAQs and CTA labels. The current site has only `/` and `/book`, so **most of this content needs new pages**.

The document uses labels that are **metadata, not visible copy**. I plan to apply them, not print them: `URL:`, `SEO title:`, `Meta description:`, `H1:`, `CTA:` / `Primary CTA:` / `Secondary CTA:`, and the `Section:` prefix on homepage headings.

---

## 3. Page inventory

| # | Doc section | Route (from doc) | Exists today? | Content file | Page components |
|---|---|---|---|---|---|
| 1 | Homepage | `/` | ✓ (copy replaced) | `content/home.ts` | `Hero`, `IntroSection`*, `Services` (cards), `WhyUs`, `StepList`*, `SmileTransformations`*, `FaqList`*, `CtaPanel`* |
| 2 | About Us | `/about-us/` | ✗ new | `content/about.ts` | `PageIntro`*, `ContentSection`*, `CtaPanel` |
| 3 | Dental Services | `/dental-services/` | ✗ new | `content/dental-services.ts` | `PageIntro`, `ContentSection` (grouped by category, h2 category → h3 service), `CtaPanel` |
| 4 | Dental Prices | `/dental-prices/` | ✗ new | `content/dental-prices.ts` | `PageIntro`, `PriceTable`*, `ContentSection`, `FaqList`, `CtaPanel` |
| 5 | Teeth Whitening | `/teeth-whitening-abuja/` | ✗ new | `content/treatments/teeth-whitening.ts` | `TreatmentPage`* (= `PageIntro` + `ContentSection`s + `FaqList` + `CtaPanel`) |
| 6 | Composite Veneers | `/composite-veneers-abuja/` | ✗ new | `content/treatments/composite-veneers.ts` | `TreatmentPage` |
| 7 | Scaling and Polishing | `/scaling-and-polishing-abuja/` | ✗ new | `content/treatments/scaling-and-polishing.ts` | `TreatmentPage` |
| 8 | Dental Fillings | `/dental-fillings-abuja/` | ✗ new | `content/treatments/dental-fillings.ts` | `TreatmentPage` |
| 9 | Root Canal Treatment | `/root-canal-treatment-abuja/` | ✗ new | `content/treatments/root-canal-treatment.ts` | `TreatmentPage` |
| 10 | Tooth Extraction | `/tooth-extraction-abuja/` | ✗ new | `content/treatments/tooth-extraction.ts` | `TreatmentPage` |
| 11 | Orthodontic Consultation | `/braces-consultation-abuja/` | ✗ new | `content/treatments/orthodontic-consultation.ts` | `TreatmentPage` |
| 12 | Gap Closure | `/dental-gap-closure-abuja/` | ✗ new | `content/treatments/gap-closure.ts` | `TreatmentPage` |
| 13 | Jaw Wiring / IMF | `/jaw-wiring-abuja/` | ✗ new | `content/treatments/jaw-wiring.ts` | `TreatmentPage` (has no FAQ section) |
| 14 | Abuja Clinic Location | `/dentist-abuja/` | ✗ new | `content/dentist-abuja.ts` | `PageIntro`, `ContentSection` (list), `Locations` card for the clinic, `CtaPanel` |
| 15 | Contact Us | `/contact/` | ✗ new (today `#contact` is the footer) | `content/contact.ts` | `PageIntro`, `ContentSection`, `ContactForm`*, `CtaPanel` |
| 16 | Smile Gallery | `/smile-gallery/` | ✗ new | `content/smile-gallery.ts` | `PageIntro`, `ContentSection`, gallery grid* (**no photos exist**, see §6) |
| 17 | FAQs | `/dental-faqs/` | ✗ new | `content/dental-faqs.ts` | `PageIntro`, `FaqList` |
| 18 | Dental Blog Plan | — | — | — (not published) | **Not site content**: an editorial plan of 15 future article titles |
| 19 | Footer Content | every page | ✓ (copy replaced) | `content/site.ts` | `Footer` |

`*` = new component. Every new component reuses the existing visual language (`section-pad`, `.eyebrow`, `rounded-blob` cards, `btn-pill`, type scale), so no new design system is introduced.

**Shared content file** `content/site.ts`: brand name, email, address, nav links, footer text, disclaimer and copyright, with typed interfaces in `content/types.ts`. The nine treatment pages share one `TreatmentPage` component and one `TreatmentContent` type, served by a single static route `app/[slug]/page.tsx` (`generateStaticParams` with `dynamicParams = false`, so unknown slugs return 404).

---

## 4. Section-by-section mapping

### 4.1 Homepage `/`

| Doc section | Where it goes | Notes |
|---|---|---|
| SEO title / meta | `metadata` in `app/page.tsx` | Used verbatim. The layout's `%s · DentistNearMe` title template must be removed, since the doc's titles are already complete |
| Hero: H1 + 2 paragraphs + Primary/Secondary CTA | `Hero` | Replaces "Trusted Dental Care for Every Generation" and its paragraph. **Adds a second button**, "Explore Our Services" → `/dental-services/` |
| Dental Care for Every Smile (2 paras) | new `IntroSection` (eyebrow + h2 + paragraphs, same style as the existing Our Story header) | Takes the slot of the current `StoryStats` header |
| Explore Our Dental Services (7 cards with CTA) | `Services` card grid | Today there are 4 cards (Preventive/Cosmetic/Restorative/Pediatric). The doc has 7, so a 7th card leaves an odd row in the 2-column grid. Each card's CTA links to its treatment page (table in §6.4) |
| Why Choose DentistNearMeNG? (5 items) | `WhyUs` accordion | ✓ Same structure (5 title + copy items). Replaces all 5 current items |
| Your First Visit (5 numbered steps) | new `StepList` (`<ol>`) | |
| Smile Transformations | new `SmileTransformations` | **No photos, and the body text is an editorial instruction** (§6.2) |
| Frequently Asked Questions (5 Q&A) | new `FaqList` | Uses `<details>`/`<summary>` so answers stay in the HTML for search engines (the `WhyUs` accordion removes closed answers from the DOM) |
| Final call to action | `CtaPanel` (reuses the footer's gradient CTA panel) | Replaces "Let's Talk Teeth — We're Just a Smile Away" |

### 4.2 Inner pages (2–17)

All of them follow the same pattern:

- `H1:` text → the page's single `<h1>` (a `PageIntro` with the paragraphs that follow it).
- Each doc Heading 3 → `<h2>`.
- Bold sub-titles and FAQ questions → `<h3>`.
- Bulleted and numbered lists stay `<ul>` / `<ol>`.
- The price table becomes `<table>` with `<caption>`, `<th scope="col">` headers and `<th scope="row">` service names.
- The page's `CTA:` label becomes the `CtaPanel` button. Inner pages have no CTA heading or paragraph in the doc, so the panel shows **only the button**: no invented heading.
- Title and description come from the doc's `SEO title` / `Meta description`, verbatim. The doc supplies them for every page, so I won't need to derive any.

Section counts per page: About (4 h2), Dental Services (7 h2, 11 services), Prices (5 h2, 12-row table, 5 FAQs), Whitening (7 h2, 4 FAQs), Veneers (6 h2, 4 FAQs), Scaling (6 h2, 4 FAQs), Fillings (6 h2, 2 FAQs), Root Canal (6 h2, 3 FAQs), Extraction (7 h2, 2 FAQs), Orthodontic (5 h2, 2 FAQs), Gap Closure (5 h2, 1 FAQ), Jaw Wiring (3 h2), Location (4 h2, 10-item list), Contact (4 h2), Gallery (3 h2), FAQs (11 Q&A).

### 4.3 Global

| Doc content | Where | Notes |
|---|---|---|
| Footer: brand + description | `Footer` left column | Replaces "A warm, modern dental practice…" |
| Quick links (9) | `Footer` nav | Replaces the 3 columns (Company / Services / Support) with a single "Quick links" list. **"Dental Blog" has no page** (§6.5) |
| Contact: email, Abuja clinic address | `Footer` | The doc gives **no phone number** (§5) |
| Disclaimer | `Footer` bottom | New |
| `© DentistNearMeNG. All rights reserved.` | `Footer` bottom | The doc has no year; today's footer shows one |
| Navbar | `Navbar` | **The doc doesn't specify navbar links** (§7, Q6) |

---

## 5. Existing site copy the document replaces or contradicts

"The Word document wins." Approving this map approves the replacements below.

| Current site | Document | Action |
|---|---|---|
| Brand "DentistNearMe" (`SITE.name`, titles, emails, alt text) | "DentistNearMeNG" | Replace everywhere in copy. The **logo image** reads "Dentist Near Me" and stays, since it's an image, not copy |
| Hero H1 "Trusted Dental Care for Every Generation" | "Your Smile Deserves Expert Dental Care" | Replace |
| 4 services: Preventive / Cosmetic / Restorative / **Pediatric** dentistry | 11 listed services. On children the doc only says "Contact the clinic to confirm the age groups accepted and the availability of children's dental services" | Replace the homepage cards. **The booking system is built on the 4 old services** (§7, Q1) |
| Why Us items ("Compassionate & Care", "Advanced Technology: digital imaging, laser dentistry, same-day restorations"…) | 5 different items | Replace. The old items make claims the doc doesn't make |
| Stats: "92% … less anxiety", "3/4 … referrals", "7 Mi … wait", "**24/7 Emergency Support**", "85% Healthy Smiles" | Nothing. The doc's toothache guidance says to *contact the team* or seek urgent medical care, with no 24/7 claim | **No doc content.** Recommend removing (§7, Q3) |
| Testimonials (Kristin Watson, Amara Okafor, Daniel Reyes, with stock photos) | Nothing. The doc insists on genuine, consented patient material | **No doc content.** Recommend removing (§7, Q3) |
| Locations: Mabushi, "Location soon in Abuja" (address "unknown"), **Lokoja, Kogi**; "Three convenient clinics… **Walk-ins welcome, parking on site**" | One clinic: Capital Hub Plaza, Mabushi. FAQ: "Contact the clinic to confirm its current walk-in policy" | Show the one Mabushi clinic. Remove Lokoja, the placeholder location, and the walk-in and parking claims |
| Phone `+234 (81) 6567-8901` (hero, footer, emergency `tel:` link) | **No phone anywhere**; only the email | §7, Q4 |
| Hours "Mon – Fri · 9:00 – 17:00 / Sat – Sun · 5:00 – 17:30" (hero, footer) | "Please confirm … current clinic hours before publication." No hours given | §7, Q4 |
| Social links (Facebook, Instagram, TikTok, X) | Not mentioned | Keep or remove? (§7, Q4) |
| Hero info bar (Get An Appointment / Emergency Contact / Opening Hours) | Not in doc | Remove, or keep only what survives Q4 |
| Footer CTA "Let's Talk Teeth…" + Privacy Policy / Terms links (both go to `/`) | Not in doc | Replace with the doc's CTA. Drop the broken Privacy and Terms links (no doc content exists for them) |
| `/book` page intro ("Three quick steps…", overtime-fee wording) | No doc content for an on-site booking page. The doc points to **an external Setmore booking page** | §7, Q1 |

---

## 6. Flags

### 6.1 Editorial notes inside the copy (written for the site owner, not for visitors)

If copied verbatim, these sentences would publish internal instructions. **Default plan: leave them out of the page, add a `TODO(content)` comment in the content file, and list each one in the Phase 4 report.** Please confirm.

| Page | Sentence |
|---|---|
| Home → Smile Transformations | "Each case should use genuine patient photographs published with appropriate consent and should explain the treatment performed." |
| Dental Prices (italic note under the table) | "Prices above are reproduced from the existing booking page and must be confirmed before publication. The list does not establish whether prices cover every required stage of treatment, imaging, medication, laboratory work or follow-up." (The second sentence works as a public disclaimer; the first doesn't) |
| Jaw Wiring | "This price must be confirmed before publication, including what it covers and whether specialist assessment, imaging or hospital care is required." |
| Abuja Location | "Please confirm the complete street address, directions and any relevant landmark before publishing." |
| Contact | "Please confirm the complete address and current clinic hours before publication." · "Suggested contact form fields:" (the list that follows is a spec for the form, not copy) · "Please avoid requesting unnecessary sensitive medical details through an unsecured contact form." (could be shown to visitors as a privacy notice, or treated as a developer note) |
| Smile Gallery | "All patient photographs must be authentic, appropriately consented and presented without misleading editing." |
| Footer | "Confirm complete address before publication." |
| Section 18, Blog Plan | The entire section |

### 6.2 Placeholder and future-tense content
- **Smile Gallery** (`/smile-gallery/` and the homepage section): no before/after photos exist. The copy says "Our smile gallery **will** showcase…". The three case categories need real, consented images. **Recommendation:** don't publish `/smile-gallery/` or the homepage Smile Transformations section until photos exist. Alternatively, publish the text with clearly marked `TODO` image slots, which aren't visible as fake content.
- **Copy that refers to "the existing booking page"** (Prices, the treatment pages, FAQs): "The existing DentistNearMeNG booking page lists…". This is verbatim and will be kept, but on the live site it reads as if it refers to a different site (it means the Setmore page). This ties into Q1.

### 6.3 Missing images
The document has **no images**. Today the site uses Unsplash stock photos. The homepage service grid goes from 4 cards (4 images) to 7, and the new inner pages have no imagery. Options: (a) reuse the existing stock photos where the topic fits, (b) use no images on new cards and pages, or (c) leave `TODO` image slots for real clinic photos. Choosing (a) for new cards means picking stock images, which is a design and content decision, not something to "fill in". I need your call (Q5).

### 6.4 CTA destinations (the doc gives labels, not links)

| CTA label | Proposed destination |
|---|---|
| Book an Appointment / Book a Dental Appointment / Book a Consultation / Book a … Consultation / Book a … Assessment / Book a Professional Dental Cleaning | Booking (on-site `/book` or Setmore, see Q1) |
| Explore Our Services | `/dental-services/` |
| Explore Preventive Dentistry | **Ambiguous: there's no preventive page.** Proposed `/dental-services/#preventive-and-general-dentistry` |
| Explore Teeth Whitening | `/teeth-whitening-abuja/` |
| Explore Composite Veneers | `/composite-veneers-abuja/` |
| Learn About Dental Fillings | `/dental-fillings-abuja/` |
| Learn About Root Canal Treatment | `/root-canal-treatment-abuja/` |
| Explore Tooth Extraction | `/tooth-extraction-abuja/` |
| Explore Orthodontic Care | `/braces-consultation-abuja/` |
| View Our Smile Gallery | `/smile-gallery/` (subject to §6.2) |
| Discuss Your Dental Needs With Our Team / Contact the Clinic to Discuss Your Needs / Discuss Your Smile Goals | `/contact/` |
| Send Enquiry | Contact form submit (Q2) |

### 6.5 Links and pages that don't exist yet
- **"Dental Blog"** is in the footer quick links, but there's no blog. Section 18 is only a plan. Options: omit the link until the blog exists (recommended), or link to a `TODO` page.
- **"Online booking: https://dentistnearme.setmore.com/"** (Contact page). It's the only external URL in the document. It would open in a new tab with `rel="noopener noreferrer"`.

### 6.6 Duplicates (intentional, kept as written)
- The same price facts appear in several FAQs (home, prices, treatment pages, `/dental-faqs/`) with slightly different wording. Each page keeps its own wording verbatim. **All prices are consistent across the document** (checked all 12).
- "How much is teeth whitening?" appears on both `/dental-prices/` and `/dental-faqs/`, with different answers. Both are kept as written.

### 6.7 Structural inconsistencies in the document (no wording changes)
- On the homepage, the H1 is a bold paragraph (`**H1: …**`). On every other page it's a Heading 3 (`### H1: …`). Either way, it renders as the page `<h1>`.
- Homepage sections are titled `Section: X`, and some have a bold sub-title (for example "Your First Visit" / "What to Expect at DentistNearMeNG"). **Proposal:** `X` becomes the small eyebrow chip, and the bold sub-title becomes the `<h2>`. This matches the existing eyebrow + heading design. Where there's no sub-title, `X` is the `<h2>` and the eyebrow shows the same text. Inner-page Heading 3s become `<h2>`.
- The doc's URLs end in `/` (for example `/about-us/`). Next.js uses no trailing slash by default (Q7).

---

## 7. Decisions I need before Phase 3

1. **Booking.** The doc's 11 services and its "Online booking: …setmore.com" link conflict with the site's own `/book` flow, which is built on the old 4 services (Preventive/Cosmetic/Restorative/Pediatric) and their durations, the specialist mapping and the DB schema. Options:
   a. Keep `/book` unchanged for now. Booking CTAs go to `/book` and only marketing copy changes. The booking form keeps listing the old 4 services, including Pediatric.
   b. Rebuild `/book` around the doc's 12 priced services. That needs durations and specialist assignments the doc doesn't provide, plus a DB migration, so it's a separate task.
   c. Point booking CTAs to Setmore and retire `/book`.
2. **Contact form ("Send Enquiry").** Build a real form? It needs a new API route that emails the clinic through the existing Resend setup, plus validation, spam protection and the fields the doc suggests. Or use a `mailto:` link for now?
3. **Sections with no doc content:** Stats, Testimonials, the hero info bar, and the Team component (already hidden). Remove them? I recommend removing them: the stats and testimonials make claims the doc doesn't support. Keeping them contradicts "the document wins"; removing them changes the homepage layout.
4. **Contact details not in the doc:** the phone number, opening hours and social links. Keep them, or remove them until confirmed?
5. **Images:** for new service cards and pages, choose (a) reuse stock, (b) no images, or (c) `TODO` slots (§6.3).
6. **Navbar links:** the doc doesn't define them. Proposal (using doc page names): Home · About Us · Dental Services · Dental Prices · Contact Us, plus a button labelled "Book an Appointment" (the doc's Primary CTA) replacing "Get Appointment".
7. **Trailing slashes:** match the doc's URLs exactly (`trailingSlash: true`; `/book` would then redirect to `/book/`), or use slash-less URLs?
8. **Editorial notes and Smile Gallery:** OK to leave the §6.1 sentences out (as marked TODOs), and to hold back the gallery page and homepage section until photos exist?
