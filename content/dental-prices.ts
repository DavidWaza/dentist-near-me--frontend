import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §4 DENTAL PRICES. */
export const dentalPrices: ContentPageData = {
  path: "/dental-prices",
  image: PHOTOS.dentalMirror,
  seo: {
    title: "Dental Treatment Prices in Abuja | DentistNearMeNG",
    description:
      "View published prices for selected dental services at DentistNearMeNG, including teeth whitening, scaling and polishing, veneers, fillings and tooth extraction.",
  },
  h1: "Dental Treatment Prices",
  intro: [
    {
      type: "paragraph",
      text: "We believe that clear pricing information helps patients plan their dental visits. Below is a guide to the prices published on our existing online booking page.",
    },
    {
      type: "paragraph",
      text: "Please contact our team to confirm current prices, appointment availability and whether additional treatment costs may apply.",
    },
  ],
  sections: [
    {
      id: "published-service-prices",
      heading: "Published Service Prices",
      blocks: [
        {
          type: "table",
          columns: ["Dental service", "Published price"],
          rows: [
            ["Basic dental consultation", "₦7,000"],
            ["Orthodontic consultation (braces)", "₦15,000"],
            ["Scaling and polishing", "₦29,000"],
            ["Professional teeth whitening", "₦69,000"],
            ["Composite veneers", "₦100,000 per unit"],
            ["Gap closure", "₦50,000"],
            ["Dental filling", "₦30,000"],
            ["Root canal treatment — anterior tooth", "₦100,000"],
            ["Root canal treatment — posterior tooth", "₦140,000"],
            ["Routine tooth extraction", "₦50,000"],
            ["Surgical tooth extraction", "₦100,000"],
            ["Jaw wiring (IMF)", "₦80,000"],
          ],
        },
        // TODO(content): owner note under the table, not shown:
        // "Prices above are reproduced from the existing booking page and must be confirmed before
        // publication. The list does not establish whether prices cover every required stage of
        // treatment, imaging, medication, laboratory work or follow-up."
      ],
    },
    {
      id: "what-determines-the-cost-of-dental-treatment",
      heading: "What Determines the Cost of Dental Treatment?",
      blocks: [
        { type: "paragraph", text: "The cost of treatment may depend on:" },
        {
          type: "list",
          items: [
            "The type of dental procedure required.",
            "The number of teeth involved.",
            "The condition and complexity of the affected tooth or teeth.",
            "Whether imaging, laboratory work or additional procedures are necessary.",
            "The type of restoration or materials required.",
            "Any follow-up care included in the treatment plan.",
          ],
        },
      ],
    },
    {
      id: "do-i-need-a-consultation-before-treatment",
      heading: "Do I Need a Consultation Before Treatment?",
      blocks: [
        {
          type: "paragraph",
          text: "Some procedures can only be recommended after an examination. If you are experiencing pain, swelling, sensitivity or another dental concern, a consultation can help determine the cause and the appropriate next steps.",
        },
      ],
    },
    {
      id: "frequently-asked-questions-about-dental-prices",
      heading: "Frequently Asked Questions About Dental Prices",
      blocks: [
        {
          type: "faq",
          items: [
            {
              question: "How much is scaling and polishing at DentistNearMeNG?",
              answer: [
                "The existing booking page lists scaling and polishing at ₦29,000. Confirm the current price before booking.",
              ],
            },
            {
              question: "How much is teeth whitening?",
              answer: [
                "The existing booking page lists professional teeth whitening at ₦69,000. Contact us to confirm current pricing and any applicable promotional terms.",
              ],
            },
            {
              question: "How much are composite veneers?",
              answer: [
                "The listed price is ₦100,000 per unit. The total cost depends on the number of teeth being treated and the agreed treatment plan.",
              ],
            },
            {
              question: "How much does root canal treatment cost?",
              answer: [
                "The published prices are ₦100,000 for an anterior tooth and ₦140,000 for a posterior tooth. A dental examination is needed to confirm the diagnosis and treatment required.",
              ],
            },
            {
              question: "Is the consultation fee included in the treatment price?",
              answer: [
                "Do not assume that consultation fees are included. Contact our team to clarify which fees apply to your specific appointment and treatment plan.",
              ],
            },
          ],
        },
      ],
    },
  ],
  cta: { label: "Book a Consultation", href: "/book" },
};
