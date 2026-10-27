import { PHOTOS } from "@/content/photos";
import type { ContentPageData } from "@/content/types";

/** Source: "DNM website content.docx" §17 FREQUENTLY ASKED QUESTIONS. */
export const dentalFaqs: ContentPageData = {
  path: "/dental-faqs",
  image: PHOTOS.dentistPortrait,
  seo: {
    title: "Dental FAQs | DentistNearMeNG Abuja",
    description:
      "Find answers to common questions about dental consultations, treatment prices, teeth whitening, veneers, fillings, root canal treatment and extractions.",
  },
  h1: "Frequently Asked Questions About Dental Care",
  intro: [
    {
      type: "faq",
      items: [
        {
          question: "How do I book an appointment?",
          answer: [
            "Use the online booking page or email our team to ask about appointment availability.",
          ],
        },
        {
          question: "How much does a dental consultation cost?",
          answer: [
            "The existing booking page lists a basic consultation at ₦7,000. Confirm the current fee before booking.",
          ],
        },
        {
          question: "How much is teeth whitening?",
          answer: [
            "The published booking page lists teeth whitening at ₦69,000. Contact the clinic to confirm the current price and treatment details.",
          ],
        },
        {
          question: "How much are composite veneers?",
          answer: [
            "The listed price is ₦100,000 per unit. Your total cost depends on the number of teeth treated and the agreed treatment plan.",
          ],
        },
        {
          question: "How much is scaling and polishing?",
          answer: ["The existing booking page lists scaling and polishing at ₦29,000."],
        },
        {
          question: "Can a tooth be saved instead of extracted?",
          answer: [
            "In some cases, a tooth may be preserved through treatment such as a filling or root canal treatment. The appropriate option depends on the tooth’s condition and prognosis.",
          ],
        },
        {
          question: "Do I need an X-ray before dental treatment?",
          answer: [
            "Not every treatment requires an X-ray. Your dentist will determine whether imaging is necessary based on your symptoms and clinical findings.",
          ],
        },
        {
          question: "Can I visit without an appointment?",
          answer: ["Contact the clinic to confirm its current walk-in policy and availability."],
        },
        {
          question: "What should I do if I have severe tooth pain?",
          answer: [
            "Arrange a prompt dental assessment. If you have facial swelling, difficulty breathing or swallowing, or rapidly worsening symptoms, seek urgent medical attention.",
          ],
        },
        {
          question: "Does DentistNearMeNG treat children?",
          answer: [
            "Contact the clinic to confirm the age groups accepted and the availability of children’s dental services.",
          ],
        },
        {
          question: "Does DentistNearMeNG accept health insurance?",
          answer: [
            "Please contact our team to confirm whether your insurance provider is accepted and which services are covered.",
          ],
        },
      ],
    },
  ],
  sections: [],
};
