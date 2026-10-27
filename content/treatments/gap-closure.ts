import { faq, p, qa, section } from "@/content/blocks";
import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §12 GAP CLOSURE. */
export const gapClosure: ContentPageData = {
  path: "/dental-gap-closure-abuja",
  image: PHOTOS.healthyTeeth,
  seo: {
    title: "Dental Gap Closure in Abuja | DentistNearMeNG",
    description:
      "Explore dental gap closure options in Abuja. Learn about composite bonding, treatment suitability and the published gap closure price at DentistNearMeNG.",
  },
  h1: "Dental Gap Closure in Abuja",
  intro: [
    p("Spaces between teeth can occur for several reasons, including natural tooth proportions, tooth position and differences in jaw size."),
    p("Depending on the cause and size of the gap, a dentist may discuss options such as composite bonding, orthodontic treatment or other suitable approaches."),
  ],
  sections: [
    section(
      "what-is-dental-gap-closure",
      "What Is Dental Gap Closure?",
      p("Dental gap closure describes treatment intended to reduce or close spaces between selected teeth. The appropriate technique depends on the patient’s oral health, bite, tooth shape and the size of the gap.")
    ),
    section(
      "is-composite-bonding-suitable-for-every-gap",
      "Is Composite Bonding Suitable for Every Gap?",
      p("No. Bonding may be suitable for selected cases, but larger gaps or alignment concerns may require a different approach. The dentist should assess the risks, benefits and expected appearance before treatment.")
    ),
    section(
      "price",
      "Price",
      p("The existing booking page lists gap closure at ₦50,000. Confirm the current price, the number of teeth involved and the exact treatment included.")
    ),
    section(
      "faqs",
      "FAQs",
      faq(
        qa(
          "Can gaps be closed without braces?",
          "Some gaps can be addressed using composite bonding or other approaches, while others are better managed with orthodontic treatment. Suitability depends on the individual case."
        )
      )
    ),
  ],
  cta: { label: "Book a Smile Assessment", href: "/book" },
};
