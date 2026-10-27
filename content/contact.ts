import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §15 CONTACT US. */
export const contact: ContentPageData = {
  path: "/contact",
  image: PHOTOS.clinicRoom,
  seo: {
    title: "Contact DentistNearMeNG | Book a Dentist in Abuja",
    description:
      "Contact DentistNearMeNG to book a dental consultation, enquire about treatment prices and confirm clinic details and appointment availability.",
  },
  h1: "Contact DentistNearMeNG",
  intro: [
    {
      type: "paragraph",
      text: "Have a question about your dental health, a treatment option or the cost of a procedure? Contact DentistNearMeNG to discuss your needs and arrange an appointment.",
    },
  ],
  sections: [
    {
      id: "book-an-appointment",
      heading: "Book an Appointment",
      blocks: [
        {
          type: "paragraph",
          text: "Use our online booking page to check available appointments, or contact our team if you need help choosing the appropriate service.",
        },
        {
          type: "labeled",
          label: "Email:",
          value: "dentistnearmeng@gmail.com",
          href: "mailto:dentistnearmeng@gmail.com",
        },
        {
          type: "labeled",
          label: "Online booking:",
          value: "https://dentistnearme.setmore.com/",
          href: "https://dentistnearme.setmore.com/",
          external: true,
        },
      ],
    },
    {
      id: "visit-our-abuja-clinic",
      heading: "Visit Our Abuja Clinic",
      blocks: [
        { type: "lines", lines: ["DentistNearMeNG", "Capital Hub Plaza, Mabushi, Abuja, FCT, Nigeria."] },
        // TODO(content): owner note, not shown: "Please confirm the complete address and current
        // clinic hours before publication."
      ],
    },
    {
      id: "send-us-an-enquiry",
      heading: "Send Us an Enquiry",
      blocks: [
        // TODO(content): the document lists "Suggested contact form fields:" (Full name, Email
        // address, Phone number, Service of interest, Preferred appointment date, Message) and the
        // note "Please avoid requesting unnecessary sensitive medical details through an unsecured
        // contact form." These are specs for a future form; until then the CTA opens an email.
        {
          type: "action",
          action: { label: "Send Enquiry", href: "mailto:dentistnearmeng@gmail.com" },
        },
      ],
    },
  ],
};
