import { p, section } from "@/content/blocks";
import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §13 JAW WIRING / INTERMAXILLARY FIXATION. */
export const jawWiring: ContentPageData = {
  path: "/jaw-wiring-abuja",
  image: PHOTOS.touchingJaw,
  seo: {
    title: "Jaw Wiring Consultation in Abuja | DentistNearMeNG",
    description:
      "Learn about jaw wiring, also known as intermaxillary fixation, and arrange a dental assessment to discuss treatment suitability and referral needs.",
  },
  h1: "Jaw Wiring and Intermaxillary Fixation",
  intro: [
    p("Intermaxillary fixation is a clinical technique used in selected situations to stabilise the relationship between the upper and lower jaws. It may form part of the management of certain jaw injuries or other conditions."),
  ],
  sections: [
    section(
      "is-jaw-wiring-suitable-for-everyone",
      "Is Jaw Wiring Suitable for Everyone?",
      p("No. The indication, method and duration depend on the diagnosis, the patient’s condition and the clinician’s treatment plan. Jaw injuries and suspected fractures require appropriate assessment and may need specialist care.")
    ),
    section(
      "consultation-and-pricing",
      "Consultation and Pricing",
      // TODO(content): the document's paragraph continues with an owner note, not shown:
      // "This price must be confirmed before publication, including what it covers and whether
      // specialist assessment, imaging or hospital care is required."
      p("The existing booking page lists jaw wiring (IMF) at ₦80,000."),
      p("If you have sustained a serious facial injury or have difficulty breathing or swallowing, seek urgent medical attention.")
    ),
  ],
  cta: { label: "Contact the Clinic to Discuss Your Needs", href: "/contact" },
};
