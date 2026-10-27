import { faq, p, qa, section } from "@/content/blocks";
import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §11 ORTHODONTIC CONSULTATION. */
export const orthodonticConsultation: ContentPageData = {
  path: "/braces-consultation-abuja",
  image: PHOTOS.showingSmile,
  seo: {
    title: "Braces Consultation in Abuja | DentistNearMeNG",
    description:
      "Considering braces in Abuja? Learn what an orthodontic consultation involves and how to arrange an assessment at DentistNearMeNG.",
  },
  h1: "Orthodontic Consultation in Abuja",
  intro: [
    p("Crooked teeth, gaps and bite concerns can affect appearance, cleaning and dental function. An orthodontic consultation helps assess tooth alignment and discuss possible treatment options."),
  ],
  sections: [
    section(
      "what-is-an-orthodontic-consultation",
      "What Is an Orthodontic Consultation?",
      p("An orthodontic consultation involves assessing the teeth, bite and alignment to determine whether orthodontic treatment may be appropriate."),
      p("Further records, photographs or imaging may be required before a full treatment plan can be confirmed.")
    ),
    section(
      "what-are-braces-used-for",
      "What Are Braces Used For?",
      p("Braces can help move teeth into planned positions and improve selected alignment and bite problems. Treatment duration and complexity vary from one patient to another.")
    ),
    section(
      "consultation-price",
      "Consultation Price",
      p("The existing booking page lists an orthodontic consultation at ₦15,000. Confirm the current fee and whether additional diagnostic records are charged separately.")
    ),
    section(
      "faqs",
      "FAQs",
      faq(
        qa(
          "Does an orthodontic consultation mean I will get braces immediately?",
          "No. The consultation helps determine the problem, treatment suitability and what additional assessment may be needed."
        ),
        qa(
          "How long does braces treatment take?",
          "Duration varies depending on the complexity of the case, the treatment approach and adherence to clinical instructions."
        )
      )
    ),
  ],
  cta: { label: "Book an Orthodontic Consultation", href: "/book" },
};
