import { faq, p, qa, section, ul } from "@/content/blocks";
import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §9 ROOT CANAL TREATMENT. */
export const rootCanalTreatment: ContentPageData = {
  path: "/root-canal-treatment-abuja",
  image: PHOTOS.dentalNurseTreating,
  seo: {
    title: "Root Canal Treatment in Abuja | DentistNearMeNG",
    description:
      "Learn about root canal treatment in Abuja, when it may be needed, what the procedure involves and the published prices at DentistNearMeNG.",
  },
  h1: "Root Canal Treatment in Abuja",
  intro: [
    p("Persistent tooth pain or sensitivity can sometimes indicate a problem affecting the pulp inside a tooth. Root canal treatment may be recommended when this tissue becomes inflamed or infected and the tooth can be preserved."),
    p("At DentistNearMeNG, a dental assessment can help determine the cause of your symptoms and the appropriate treatment."),
  ],
  sections: [
    section(
      "what-is-root-canal-treatment",
      "What Is Root Canal Treatment?",
      p("Root canal treatment involves accessing the inside of the tooth, removing diseased or infected pulp tissue, cleaning and shaping the root canal system, and sealing it."),
      p("Depending on the condition of the tooth, a further restoration may be needed to protect it and restore function.")
    ),
    section(
      "what-symptoms-may-require-assessment",
      "What Symptoms May Require Assessment?",
      p("Possible symptoms include persistent toothache, sensitivity to hot or cold, pain when chewing, swelling or changes in the colour of a tooth. Some teeth with pulp disease may have few or no obvious symptoms."),
      p("These symptoms can have other causes, so an examination is necessary.")
    ),
    section(
      "what-happens-during-the-procedure",
      "What Happens During the Procedure?",
      p("The dentist assesses the tooth and may recommend dental imaging. If root canal treatment is appropriate, the procedure is planned according to the tooth’s anatomy and condition."),
      p("Follow-up appointments or additional restoration may be required.")
    ),
    section(
      "root-canal-treatment-prices",
      "Root Canal Treatment Prices",
      p("The existing booking page lists:"),
      ul("Anterior root canal treatment: ₦100,000.", "Posterior root canal treatment: ₦140,000."),
      p("Confirm the current prices and whether the proposed treatment plan includes any required final restoration.")
    ),
    section(
      "faqs",
      "FAQs",
      faq(
        qa(
          "Can root canal treatment save a tooth?",
          "It can help preserve a tooth when the pulp is irreversibly damaged or infected and the tooth is suitable for treatment."
        ),
        qa(
          "Does every toothache require a root canal?",
          "No. Toothache has several possible causes. A dental examination is needed to establish the diagnosis."
        ),
        qa(
          "Will the tooth need a crown afterward?",
          "Some teeth benefit from a crown or another protective restoration, depending on the tooth type, the amount of remaining structure and the clinical assessment."
        )
      )
    ),
  ],
  cta: { label: "Book a Dental Assessment", href: "/book" },
};
