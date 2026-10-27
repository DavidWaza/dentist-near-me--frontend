import { faq, p, qa, section } from "@/content/blocks";
import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §7 SCALING AND POLISHING. */
export const scalingAndPolishing: ContentPageData = {
  path: "/scaling-and-polishing-abuja",
  image: PHOTOS.cleaningTeeth,
  seo: {
    title: "Scaling and Polishing in Abuja | DentistNearMeNG",
    description:
      "Learn about professional scaling and polishing in Abuja. Discover how dental cleaning helps remove plaque and tartar and view the published service price.",
  },
  h1: "Scaling and Polishing in Abuja",
  intro: [
    p("Keeping your teeth clean involves more than brushing alone. Professional scaling and polishing helps remove deposits that can accumulate on the teeth and around the gum line."),
    p("DentistNearMeNG lists scaling and polishing among its dental services for patients seeking professional cleaning and preventive oral care."),
  ],
  sections: [
    section(
      "what-is-scaling-and-polishing",
      "What Is Scaling and Polishing?",
      p("Scaling is the removal of plaque and hardened deposits known as tartar or calculus from the teeth. Polishing helps remove certain surface stains and smooth the tooth surfaces after cleaning."),
      p("The procedure complements daily brushing and cleaning between the teeth; it does not replace them.")
    ),
    section(
      "why-is-professional-cleaning-important",
      "Why Is Professional Cleaning Important?",
      p("Plaque can contribute to gum inflammation and tooth decay. When plaque hardens into tartar, it cannot be removed effectively by ordinary brushing."),
      p("Professional cleaning allows a dental professional to remove these deposits and assess the health of your teeth and gums.")
    ),
    section(
      "what-happens-during-the-procedure",
      "What Happens During the Procedure?",
      p("Your dental professional will assess your mouth and determine the appropriate cleaning approach. Instruments are used to remove deposits from the teeth, followed by polishing where indicated."),
      p("You may experience some temporary sensitivity, especially if your gums are inflamed or significant deposits are present.")
    ),
    section(
      "how-much-does-scaling-and-polishing-cost",
      "How Much Does Scaling and Polishing Cost?",
      p("The existing DentistNearMeNG booking page lists scaling and polishing at ₦29,000. Contact the clinic to confirm the current price and what is included.")
    ),
    section(
      "scaling-and-polishing-faqs",
      "Scaling and Polishing FAQs",
      faq(
        qa(
          "How often should I have my teeth cleaned professionally?",
          "The recommended interval depends on your oral health, gum condition and risk factors. Your dentist can advise you on a suitable schedule."
        ),
        qa(
          "Does scaling damage the teeth?",
          "When properly performed, scaling removes deposits from the teeth. It may reveal spaces or tooth surfaces previously covered by tartar, which can make changes in the mouth more noticeable."
        ),
        qa(
          "Can scaling remove every type of tooth stain?",
          "It can remove many external deposits and surface stains, but it does not change the underlying colour of teeth in the same way as bleaching."
        ),
        qa(
          "Is scaling and polishing painful?",
          "Comfort varies with sensitivity, gum inflammation and the amount of deposit present. Tell your dental professional if you experience discomfort."
        )
      )
    ),
  ],
  cta: { label: "Book a Professional Dental Cleaning", href: "/book" },
};
