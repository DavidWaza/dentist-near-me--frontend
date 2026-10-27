import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §2 ABOUT US. */
export const about: ContentPageData = {
  path: "/about-us",
  image: PHOTOS.orangeChairRoom,
  seo: {
    title: "About DentistNearMeNG | Dental Care in Abuja",
    description:
      "Learn about DentistNearMeNG, our patient-focused approach to dental care, our services and how we help patients make informed decisions about oral health.",
  },
  h1: "About DentistNearMeNG",
  intro: [
    {
      type: "paragraph",
      text: "At DentistNearMeNG, we believe that accessing dental care should begin with clear information, professional guidance and a welcoming patient experience.",
    },
    {
      type: "paragraph",
      text: "We provide dental services designed to support oral health and address a range of dental concerns, from routine preventive care to selected restorative and cosmetic treatments.",
    },
    {
      type: "paragraph",
      text: "Our goal is to help patients understand their dental needs, explore suitable treatment options and make informed decisions about their care.",
    },
  ],
  sections: [
    {
      id: "our-approach-to-dental-care",
      heading: "Our Approach to Dental Care",
      blocks: [
        {
          type: "subsection",
          title: "Patient-focused care",
          blocks: [
            {
              type: "paragraph",
              text: "We encourage patients to discuss their symptoms, concerns and expectations openly. Understanding each patient’s needs helps inform appropriate clinical assessment and treatment planning.",
            },
          ],
        },
        {
          type: "subsection",
          title: "Clear communication",
          blocks: [
            {
              type: "paragraph",
              text: "Dental procedures can sometimes feel unfamiliar. We aim to explain what a treatment involves, why it may be recommended, what it costs and what patients should expect afterward.",
            },
          ],
        },
        {
          type: "subsection",
          title: "Individualised recommendations",
          blocks: [
            {
              type: "paragraph",
              text: "No two patients have exactly the same dental needs. Treatment recommendations should be based on a proper assessment rather than a one-size-fits-all approach.",
            },
          ],
        },
        {
          type: "subsection",
          title: "Prevention and education",
          blocks: [
            {
              type: "paragraph",
              text: "Regular dental assessments, appropriate oral hygiene and early attention to dental problems can contribute to better long-term oral health.",
            },
          ],
        },
      ],
    },
    {
      id: "our-services",
      heading: "Our Services",
      blocks: [
        {
          type: "paragraph",
          text: "Our listed services include dental consultations, orthodontic consultations, scaling and polishing, teeth whitening, composite veneers, gap closure, fillings, root canal treatment, routine tooth extraction, surgical tooth extraction and jaw wiring.",
        },
        {
          type: "paragraph",
          text: "Service availability and suitability depend on the clinic, the clinician and the patient’s individual needs.",
        },
      ],
    },
    {
      id: "our-commitment-to-patients",
      heading: "Our Commitment to Patients",
      blocks: [
        {
          type: "paragraph",
          text: "We aim to create an environment where patients can ask questions, understand their options and receive appropriate dental guidance without unnecessary confusion.",
        },
        {
          type: "paragraph",
          text: "Whether you are visiting for preventive care or seeking advice about a particular dental problem, our team can help you understand the next steps.",
        },
      ],
    },
  ],
  cta: { label: "Book an Appointment", href: "/book" },
};
