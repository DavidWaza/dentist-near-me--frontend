import { p, section } from "@/content/blocks";
import type { ContentPageData } from "@/content/types";

/**
 * Source: "DNM website content.docx" §16 SMILE GALLERY.
 *
 * TODO(content): NOT PUBLISHED. No route renders this yet: the page needs genuine,
 * consented before-and-after photographs for each case category. Add an
 * app/smile-gallery/page.tsx (and the footer "Smile Gallery" link) once they exist.
 * The document also says: "All patient photographs must be authentic, appropriately
 * consented and presented without misleading editing." (owner note, not for display).
 */
export const smileGallery: ContentPageData = {
  path: "/smile-gallery",
  seo: {
    title: "Dental Smile Transformations in Abuja | DentistNearMeNG",
    description:
      "Explore genuine dental treatment cases from DentistNearMeNG, including selected cosmetic smile improvements. Book a consultation to discuss your own dental goals.",
  },
  h1: "Smile Transformations at DentistNearMeNG",
  intro: [
    p("Every smile is different. Our smile gallery will showcase selected dental cases to help patients understand the types of cosmetic improvements that may be possible with appropriate treatment."),
    p("Explore genuine before-and-after photographs of treatments performed by our clinicians, published with patient consent."),
  ],
  sections: [
    section(
      "explore-selected-treatment-cases",
      "Explore Selected Treatment Cases",
      {
        type: "subsection",
        title: "Composite Veneers",
        blocks: [p("See selected cases involving improvements to tooth shape, chips or other appropriate cosmetic concerns.")],
      },
      {
        type: "subsection",
        title: "Dental Gap Closure",
        blocks: [p("Explore cases where selected gaps have been addressed using an appropriate treatment approach.")],
      },
      {
        type: "subsection",
        title: "Professional Teeth Whitening",
        blocks: [p("View selected cases illustrating changes in tooth shade following professional whitening.")],
      }
    ),
    section(
      "important-information",
      "Important Information",
      p("Photographs represent individual cases and are not a guarantee of identical results. Treatment suitability and outcomes vary according to dental condition, treatment approach and individual factors.")
    ),
  ],
  cta: { label: "Discuss Your Smile Goals", href: "/contact" },
};
