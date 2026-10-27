import { faq, p, qa, section } from "@/content/blocks";
import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §8 DENTAL FILLINGS. */
export const dentalFillings: ContentPageData = {
  path: "/dental-fillings-abuja",
  image: PHOTOS.patientInChair,
  seo: {
    title: "Dental Fillings in Abuja | DentistNearMeNG",
    description:
      "Need a dental filling in Abuja? Learn how fillings restore teeth affected by cavities or damage and how to book an assessment at DentistNearMeNG.",
  },
  h1: "Dental Fillings in Abuja",
  intro: [
    p("Tooth decay and certain types of damage can affect how your teeth look and function. A dental filling may be recommended to restore a tooth after the affected area has been treated."),
    p("DentistNearMeNG lists dental fillings among its services."),
  ],
  sections: [
    section(
      "what-is-a-dental-filling",
      "What Is a Dental Filling?",
      p("A filling is a restorative material used to repair a tooth affected by decay or selected forms of damage. The dentist removes the affected tissue where necessary and restores the tooth’s shape and function using an appropriate material.")
    ),
    section(
      "when-might-you-need-a-filling",
      "When Might You Need a Filling?",
      p("A filling may be recommended when a tooth has a cavity or certain types of structural damage. Not every damaged tooth can be treated with a filling; extensive damage may require a different restoration.")
    ),
    section(
      "what-happens-during-treatment",
      "What Happens During Treatment?",
      p("The dentist examines the tooth and determines the extent of the problem. Treatment may involve removing decayed tissue, placing a suitable restorative material and checking the bite."),
      p("The procedure depends on the location, size and condition of the affected area.")
    ),
    section(
      "dental-filling-price",
      "Dental Filling Price",
      p("The existing DentistNearMeNG booking page lists fillings at ₦30,000. Confirm the current price and whether additional treatment or imaging may be needed.")
    ),
    section(
      "faqs",
      "FAQs",
      faq(
        qa(
          "Can a filling treat every cavity?",
          "No. The treatment depends on the size and depth of the cavity and the condition of the remaining tooth."
        ),
        qa(
          "Will I need a root canal instead of a filling?",
          "If the tooth’s pulp is significantly affected, root canal treatment or another treatment may be necessary. Your dentist must assess the tooth to determine the appropriate option."
        )
      )
    ),
  ],
  cta: { label: "Book a Dental Assessment", href: "/book" },
};
