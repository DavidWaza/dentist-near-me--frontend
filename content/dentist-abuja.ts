import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §14 ABUJA CLINIC LOCATION PAGE. */
export const dentistAbuja: ContentPageData = {
  path: "/dentist-abuja",
  image: PHOTOS.clinicWide,
  seo: {
    title: "Dental Clinic in Abuja | DentistNearMeNG, Mabushi",
    description:
      "Looking for a dental clinic in Mabushi, Abuja? Explore dental consultations, teeth whitening, veneers, scaling and polishing and other services at DentistNearMeNG.",
  },
  h1: "DentistNearMeNG — Dental Clinic in Abuja",
  intro: [
    {
      type: "paragraph",
      text: "If you are looking for a dentist in Abuja, DentistNearMeNG provides access to selected preventive, restorative and cosmetic dental services.",
    },
    {
      type: "paragraph",
      text: "Our Abuja clinic serves patients seeking dental assessments, professional cleaning, advice about tooth pain, and treatments designed to address selected dental concerns and smile goals.",
    },
  ],
  sections: [
    {
      id: "dental-services-in-abuja",
      heading: "Dental Services in Abuja",
      blocks: [
        { type: "paragraph", text: "Our listed services include:" },
        {
          type: "list",
          items: [
            "Dental consultations.",
            "Scaling and polishing.",
            "Professional teeth whitening.",
            "Composite veneers.",
            "Dental gap closure.",
            "Dental fillings.",
            "Root canal treatment.",
            "Routine and surgical tooth extraction.",
            "Orthodontic consultations.",
            "Jaw wiring, subject to clinical suitability and confirmed availability.",
          ],
        },
      ],
    },
    {
      id: "our-clinic-location",
      heading: "Our Clinic Location",
      blocks: [
        {
          type: "subsection",
          title: "DentistNearMeNG, Mabushi, Abuja",
          blocks: [
            { type: "paragraph", text: "Capital Hub Plaza, Mabushi, Abuja, FCT, Nigeria." },
            // TODO(content): owner note, not shown: "Please confirm the complete street address,
            // directions and any relevant landmark before publishing."
          ],
        },
      ],
    },
    {
      id: "planning-your-visit",
      heading: "Planning Your Visit",
      blocks: [
        {
          type: "paragraph",
          text: "We recommend contacting our team before visiting to confirm appointment availability, the treatment you require and the current price.",
        },
        {
          type: "labeled",
          label: "Email:",
          value: "dentistnearmeng@gmail.com",
          href: "mailto:dentistnearmeng@gmail.com",
        },
      ],
    },
  ],
  cta: { label: "Book an Appointment", href: "/book" },
};
