import { faq, p, qa, section, ul } from "@/content/blocks";
import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §10 TOOTH EXTRACTION. */
export const toothExtraction: ContentPageData = {
  path: "/tooth-extraction-abuja",
  image: PHOTOS.dentistTreatingMouth,
  seo: {
    title: "Tooth Extraction in Abuja | DentistNearMeNG",
    description:
      "Learn about routine and surgical tooth extraction in Abuja, when removal may be necessary and the published extraction prices at DentistNearMeNG.",
  },
  h1: "Tooth Extraction in Abuja",
  intro: [
    p("A tooth may need to be removed when it cannot be predictably preserved or when removal is recommended as part of a wider treatment plan."),
    p("DentistNearMeNG lists routine and surgical tooth extraction services. The appropriate procedure depends on the tooth’s condition, position and the complexity of removal."),
  ],
  sections: [
    section(
      "what-is-routine-tooth-extraction",
      "What Is Routine Tooth Extraction?",
      p("Routine extraction involves removing a tooth using an approach appropriate for teeth that can be accessed and removed without additional surgical steps.")
    ),
    section(
      "what-is-surgical-tooth-extraction",
      "What Is Surgical Tooth Extraction?",
      p("Surgical extraction may be required for impacted teeth, teeth broken near the gum line or cases where access and removal are more complex."),
      p("Your dentist will explain the recommended approach following an assessment.")
    ),
    section(
      "what-happens-before-extraction",
      "What Happens Before Extraction?",
      p("The dentist examines the affected tooth and surrounding tissues and may recommend imaging. Your medical history, medications and other health considerations are also relevant to treatment planning.")
    ),
    section(
      "aftercare-following-extraction",
      "Aftercare Following Extraction",
      p("Aftercare instructions may include protecting the blood clot, avoiding smoking, following advice about food and oral hygiene, and taking medication only as directed."),
      p("Contact your dentist if pain worsens, swelling increases or you have concerns about healing. Significant bleeding, difficulty swallowing or difficulty breathing requires urgent assessment.")
    ),
    section(
      "tooth-extraction-prices",
      "Tooth Extraction Prices",
      p("The existing booking page lists:"),
      ul("Routine extraction: ₦50,000.", "Surgical extraction: ₦100,000."),
      p("Confirm the current price and whether the particular tooth or procedure involves additional charges.")
    ),
    section(
      "faqs",
      "FAQs",
      faq(
        qa(
          "Is routine extraction the same as surgical extraction?",
          "No. Surgical extraction involves additional steps when a tooth cannot be removed using a routine approach."
        ),
        qa(
          "Will every wisdom tooth need removal?",
          "No. Removal depends on the tooth’s condition, position, symptoms and potential risks."
        )
      )
    ),
  ],
  cta: { label: "Book an Extraction Assessment", href: "/book" },
};
