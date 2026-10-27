import { PHOTOS } from "@/content/photos";
import type { HomeContent } from "@/content/types";

/** Source: "DNM website content.docx" §1 HOMEPAGE. */
export const home: HomeContent = {
  seo: {
    title: "Dentist in Abuja | DentistNearMeNG",
    description:
      "Looking for a dentist in Abuja? Explore dental check-ups, teeth whitening, veneers, scaling and polishing, fillings and other dental services at DentistNearMeNG.",
  },
  hero: {
    h1: "Your Smile Deserves Expert Dental Care",
    // Not from the document: short hero line requested by the site owner (2026-10-27),
    // using the document's own wording from §14. The document's hero copy is in `welcome`.
    subtext: "Preventive, restorative and cosmetic dental care in Abuja.",
    primaryCta: { label: "Book an Appointment", href: "/book" },
    secondaryCta: { label: "Explore Our Services", href: "/dental-services" },
    image: PHOTOS.heroTreatment,
  },
  welcome: {
    paragraphs: [
      "Looking for a dentist in Abuja? DentistNearMeNG helps you take care of your oral health with dental consultations, preventive treatments, restorative dentistry and cosmetic dental services.",
      "Whether you want to maintain healthy teeth, address a dental concern or improve the appearance of your smile, our team can help you explore appropriate treatment options.",
    ],
  },
  intro: {
    heading: "Dental Care for Every Smile",
    paragraphs: [
      "Your oral health is an important part of your overall well-being. From routine dental check-ups and professional teeth cleaning to treatments for tooth pain, damaged teeth and smile enhancement, DentistNearMeNG provides dental care tailored to individual needs.",
      "We believe patients should understand their dental concerns, available treatment options and the costs involved before making decisions about their care.",
    ],
    image: PHOTOS.brushingTeeth,
  },
  services: {
    heading: "Explore Our Dental Services",
    items: [
      {
        title: "Preventive Dentistry",
        copy: "Protect your teeth and gums with professional dental assessments, scaling and polishing, and practical oral hygiene advice. Regular dental visits can help identify potential problems before they become more complex.",
        cta: {
          label: "Explore Preventive Dentistry",
          href: "/dental-services#preventive-and-general-dentistry",
        },
        icon: "shield-heart",
        image: PHOTOS.smilingPatient,
      },
      {
        title: "Teeth Whitening",
        copy: "Looking for a brighter smile? Professional teeth whitening may help reduce certain types of tooth discolouration. Our dental team can assess your teeth and advise whether whitening is suitable for you.",
        cta: { label: "Explore Teeth Whitening", href: "/teeth-whitening-abuja" },
        icon: "sun-high",
        image: PHOTOS.whiteningTreatment,
      },
      {
        title: "Composite Veneers",
        copy: "Composite veneers can improve the appearance of selected teeth by addressing concerns such as minor chips, shape irregularities and certain gaps. A consultation helps determine whether veneers are appropriate for your smile.",
        cta: { label: "Explore Composite Veneers", href: "/composite-veneers-abuja" },
        icon: "mood-smile-beam",
        image: PHOTOS.smileCloseUp,
      },
      {
        title: "Dental Fillings",
        copy: "Cavities and some forms of tooth damage can be treated with dental fillings. The appropriate filling material and treatment plan depend on the condition and location of the affected tooth.",
        cta: { label: "Learn About Dental Fillings", href: "/dental-fillings-abuja" },
        icon: "dental",
        image: PHOTOS.patientInChair,
      },
      {
        title: "Root Canal Treatment",
        copy: "When the pulp inside a tooth becomes inflamed or infected, root canal treatment may help preserve the tooth. A dental assessment is necessary to determine whether this treatment is indicated.",
        cta: { label: "Learn About Root Canal Treatment", href: "/root-canal-treatment-abuja" },
        icon: "dental-broken",
        image: PHOTOS.dentalNurseTreating,
      },
      {
        title: "Tooth Extractions",
        copy: "When a tooth cannot be predictably preserved, extraction may be recommended. Our listed services include routine and surgical extractions, depending on the clinical circumstances.",
        cta: { label: "Explore Tooth Extraction", href: "/tooth-extraction-abuja" },
        icon: "dental-off",
        image: PHOTOS.dentistTreatingMouth,
      },
      {
        title: "Orthodontic Consultation",
        copy: "Concerned about crooked teeth, spacing or your bite? An orthodontic consultation can help assess your teeth and discuss possible treatment options, including braces where clinically appropriate.",
        cta: { label: "Explore Orthodontic Care", href: "/braces-consultation-abuja" },
        icon: "mood-smile",
        image: PHOTOS.showingSmile,
      },
    ],
  },
  whyUs: {
    heading: "Why Choose DentistNearMeNG?",
    items: [
      {
        title: "Care That Starts With Listening",
        copy: "We want to understand your concerns, symptoms and expectations before discussing possible treatments.",
        icon: "ear",
      },
      {
        title: "Clear Treatment Information",
        copy: "We aim to explain recommended procedures, available options and associated costs so you can make informed decisions.",
        icon: "file-description",
      },
      {
        title: "A Range of Dental Services",
        copy: "From preventive care to selected restorative and cosmetic procedures, our services address a variety of common dental needs.",
        icon: "stethoscope",
      },
      {
        title: "Individualised Treatment Planning",
        copy: "Every smile is different. Recommendations depend on your dental examination, oral health and treatment goals.",
        icon: "clipboard-heart",
      },
      {
        title: "Convenient Appointment Booking",
        copy: "Get in touch with our team to arrange a consultation and confirm the best appointment option for your needs.",
        icon: "calendar-check",
      },
    ],
    image: PHOTOS.dentistPortrait,
  },
  firstVisit: {
    eyebrow: "Your First Visit",
    heading: "What to Expect at DentistNearMeNG",
    steps: [
      {
        term: "Book an appointment:",
        text: "Choose an available appointment or contact our team.",
      },
      {
        term: "Discuss your concerns:",
        text: "Tell the dentist about your symptoms, dental history and treatment goals.",
      },
      {
        term: "Receive an assessment:",
        text: "Your dentist will examine your teeth and gums and may recommend additional investigations where necessary.",
      },
      {
        term: "Understand your options:",
        text: "Discuss the proposed treatment, expected costs, benefits, limitations and aftercare.",
      },
      {
        term: "Plan your next steps:",
        text: "Proceed with treatment when appropriate, or schedule follow-up appointments as advised.",
      },
    ],
    image: PHOTOS.smileInMirror,
  },
  // TODO(content): held back until genuine, consented before-and-after photos exist.
  // The document also says: "Each case should use genuine patient photographs published with
  // appropriate consent and should explain the treatment performed." (owner note, not shown).
  smileTransformations: {
    published: false,
    eyebrow: "Smile Transformations",
    heading: "Small Changes Can Make a Meaningful Difference",
    paragraphs: [
      "Explore selected patient cases showcasing treatments performed at DentistNearMeNG.",
      "Individual results vary, and not every treatment is suitable for every patient.",
    ],
    cta: { label: "View Our Smile Gallery", href: "/smile-gallery" },
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "How much does dental treatment cost at DentistNearMeNG?",
        answer: [
          "Our published booking page lists prices for selected dental services. The final cost may depend on your diagnosis, the complexity of the procedure and any additional treatment required. Contact us to confirm current prices.",
        ],
      },
      {
        question: "Do I need an appointment before visiting?",
        answer: [
          "We recommend arranging an appointment so the team can confirm availability and prepare for your visit.",
        ],
      },
      {
        question: "Do you offer teeth whitening?",
        answer: [
          "Yes. Teeth whitening is listed among our services. A dental assessment helps determine whether professional whitening is suitable for you.",
        ],
      },
      {
        question: "Do you provide veneers?",
        answer: [
          "We list composite veneers at a published price per unit. Your dentist can assess your teeth and explain whether veneers are appropriate.",
        ],
      },
      {
        question: "What should I do if I have a toothache?",
        answer: [
          "Persistent or severe tooth pain should be assessed by a dentist. Contact our team to discuss an appointment. Facial swelling, difficulty swallowing or difficulty breathing may require urgent medical attention.",
        ],
      },
    ],
  },
  finalCta: {
    heading: "Take the Next Step Towards Better Oral Health",
    paragraphs: [
      "Whether you need a routine dental check-up, help with a dental concern or advice about improving your smile, start with a professional assessment.",
      "Book your appointment with DentistNearMeNG today.",
    ],
    cta: { label: "Book a Dental Appointment", href: "/book" },
  },
};
