import { faq, p, qa, section, ul } from "@/content/blocks";
import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §6 COMPOSITE VENEERS. */
export const compositeVeneers: ContentPageData = {
  path: "/composite-veneers-abuja",
  image: PHOTOS.smileCloseUp,
  seo: {
    title: "Composite Veneers in Abuja | DentistNearMeNG",
    description:
      "Explore composite veneers in Abuja at DentistNearMeNG. Learn how composite bonding can improve the appearance of selected teeth and what treatment may cost.",
  },
  h1: "Composite Veneers in Abuja",
  intro: [
    p("If you want to improve the appearance of chipped, uneven or discoloured teeth, composite veneers may be one option worth discussing with a dentist."),
    p("At DentistNearMeNG, our listed composite veneer service allows patients to enquire about cosmetic treatment designed to improve selected aspects of their smiles."),
  ],
  sections: [
    section(
      "what-are-composite-veneers",
      "What Are Composite Veneers?",
      p("Composite veneers use tooth-coloured resin that is shaped and bonded to the surface of selected teeth. Depending on the case, this may help improve the appearance of chips, minor shape irregularities, some discolouration and certain gaps."),
      p("Composite veneers are different from porcelain veneers, which are fabricated from ceramic materials.")
    ),
    section(
      "what-concerns-can-composite-veneers-address",
      "What Concerns Can Composite Veneers Address?",
      p("Depending on the patient’s dental condition, composite treatment may help with:"),
      ul(
        "Minor chips or uneven edges.",
        "Selected shape irregularities.",
        "Certain gaps between teeth.",
        "Some cosmetic concerns involving the visible surfaces of teeth."
      ),
      p("A dental assessment is needed to determine whether veneers are suitable or whether another treatment would be more appropriate.")
    ),
    section(
      "what-happens-during-treatment",
      "What Happens During Treatment?",
      p("The process varies by case. It may include a consultation, assessment of tooth shape and colour, discussion of the desired outcome, preparation where indicated, placement of composite material and finishing or polishing."),
      p("Your dentist should explain the treatment plan, any limitations and the care required afterward.")
    ),
    section(
      "how-much-do-composite-veneers-cost",
      "How Much Do Composite Veneers Cost?",
      p("The existing DentistNearMeNG booking page lists composite veneers at ₦100,000 per unit."),
      p("For illustration, 6 units at that listed rate would total ₦600,000, and 10 units would total ₦1,000,000, before any additional charges that may apply."),
      p("These calculations are not treatment quotes. Confirm the current rate, number of units required and full treatment costs with the clinic.")
    ),
    section(
      "composite-veneers-faqs",
      "Composite Veneers FAQs",
      faq(
        qa(
          "Are composite veneers the same as porcelain veneers?",
          "No. Composite veneers use resin-based material, while porcelain veneers use ceramic. Their durability, appearance, repair options and treatment requirements differ."
        ),
        qa(
          "How long do composite veneers last?",
          "Longevity varies with the material, bite, oral hygiene, habits and maintenance. Your dentist can discuss expected maintenance and possible repairs."
        ),
        qa(
          "Can composite veneers close gaps?",
          "They may be suitable for some gaps, but the correct approach depends on the size of the gap, tooth position and bite."
        ),
        qa(
          "Are composite veneers suitable for everyone?",
          "No. Cavities, gum disease, bite issues and other factors may affect suitability. A dental examination is essential."
        )
      )
    ),
  ],
  cta: { label: "Book a Veneer Consultation", href: "/book" },
};
