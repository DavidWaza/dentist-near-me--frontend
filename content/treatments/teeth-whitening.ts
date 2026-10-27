import { faq, p, qa, section, ul } from "@/content/blocks";
import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §5 TEETH WHITENING. */
export const teethWhitening: ContentPageData = {
  path: "/teeth-whitening-abuja",
  image: PHOTOS.whiteningTreatment,
  seo: {
    title: "Teeth Whitening in Abuja | DentistNearMeNG",
    description:
      "Looking for teeth whitening in Abuja? Learn about professional teeth whitening, suitability, expected results and published treatment pricing at DentistNearMeNG.",
  },
  h1: "Professional Teeth Whitening in Abuja",
  intro: [
    p("A brighter smile starts with understanding what causes tooth discolouration and which treatment options are suitable for you."),
    p("DentistNearMeNG offers professional teeth whitening for patients who want to address certain types of tooth staining and improve the appearance of their natural teeth."),
  ],
  sections: [
    section(
      "what-is-professional-teeth-whitening",
      "What Is Professional Teeth Whitening?",
      p("Professional teeth whitening uses dental bleaching agents to lighten the colour of natural teeth. Depending on the method used, treatment may be carried out in the dental clinic or prescribed for use at home under professional guidance."),
      p("The appropriate approach depends on your oral health, the cause of discolouration and your treatment goals.")
    ),
    section(
      "what-causes-tooth-discolouration",
      "What Causes Tooth Discolouration?",
      p("Tooth colour can change for several reasons, including:"),
      ul(
        "Staining from tea, coffee and other foods or drinks.",
        "Tobacco use.",
        "Natural changes in tooth colour over time.",
        "Certain medications or developmental conditions.",
        "Trauma or changes affecting an individual tooth.",
        "Plaque, tartar and surface deposits."
      ),
      p("Not all discolouration responds to whitening. A dental assessment can help identify the cause.")
    ),
    section(
      "who-may-be-suitable-for-teeth-whitening",
      "Who May Be Suitable for Teeth Whitening?",
      p("Whitening may be appropriate for some adults with healthy teeth and gums who want to reduce certain stains."),
      p("Patients with untreated cavities, gum disease, significant sensitivity or other dental problems may need treatment or further assessment before whitening."),
      p("Crowns, fillings and veneers do not whiten in the same way as natural tooth enamel, so existing dental restorations may affect the final appearance.")
    ),
    section(
      "what-should-i-expect",
      "What Should I Expect?",
      p("Your dentist may examine your teeth and gums, discuss your expectations and explain the available options. Treatment and the expected outcome depend on the whitening method and the type of staining."),
      p("Some patients experience temporary tooth sensitivity or gum irritation.")
    ),
    section(
      "how-much-does-teeth-whitening-cost",
      "How Much Does Teeth Whitening Cost?",
      p("The existing DentistNearMeNG booking page lists teeth whitening at ₦69,000. Please confirm the current price and the precise treatment included before booking.")
    ),
    section(
      "teeth-whitening-faqs",
      "Teeth Whitening FAQs",
      faq(
        qa(
          "Does teeth whitening work on every stain?",
          "No. Some stains respond better than others, and certain types of discolouration may require alternative treatments."
        ),
        qa(
          "Is professional teeth whitening permanent?",
          "No. The duration of the result varies with diet, oral hygiene, tobacco use and individual factors. Maintenance may be required."
        ),
        qa(
          "Can I whiten teeth that have fillings or veneers?",
          "Natural teeth and dental restorations respond differently to whitening. Your dentist can explain how existing restorations may affect the result."
        ),
        qa(
          "Will teeth whitening cause sensitivity?",
          "Some patients experience temporary sensitivity. Discuss any existing sensitivity or dental problems with your dentist before treatment."
        )
      )
    ),
  ],
  cta: { label: "Book a Teeth Whitening Consultation", href: "/book" },
};
