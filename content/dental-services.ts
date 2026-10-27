import { PHOTOS } from "@/content/photos";
import type { Block, ContentPageData } from "@/content/types";

const service = (title: string, paragraphs: string[], href?: string): Block => ({
  type: "subsection",
  title,
  href,
  blocks: paragraphs.map((text) => ({ type: "paragraph", text })),
});

/** Source: "DNM website content.docx" §3 DENTAL SERVICES. */
export const dentalServices: ContentPageData = {
  path: "/dental-services",
  image: PHOTOS.treatmentRoomArt,
  seo: {
    title: "Dental Services in Abuja | DentistNearMeNG",
    description:
      "Explore dental services at DentistNearMeNG, including consultations, scaling and polishing, whitening, composite veneers, fillings, root canal treatment and extractions.",
  },
  h1: "Dental Services at DentistNearMeNG",
  intro: [
    {
      type: "paragraph",
      text: "Finding the right dental treatment begins with understanding your oral health needs. DentistNearMeNG offers a range of listed dental services for patients seeking preventive care, treatment for dental problems and selected cosmetic improvements.",
    },
    {
      type: "paragraph",
      text: "Explore our services below to learn what each procedure involves and how to arrange an assessment.",
    },
  ],
  sections: [
    {
      id: "preventive-and-general-dentistry",
      heading: "Preventive and General Dentistry",
      blocks: [
        service("Dental Consultation", [
          "A dental consultation gives you the opportunity to discuss your symptoms, concerns and oral health goals with a dental professional. Your dentist may examine your teeth and gums, review your dental history and recommend further investigations or treatment.",
        ]),
        service(
          "Scaling and Polishing",
          [
            "Professional scaling and polishing helps remove plaque, hardened tartar and certain surface stains. It can support gum health and complement daily brushing and interdental cleaning.",
          ],
          "/scaling-and-polishing-abuja"
        ),
        service(
          "Dental Filling",
          [
            "A filling is used to restore a tooth affected by decay or certain forms of damage. Your dentist will assess the affected tooth and recommend the most appropriate treatment.",
          ],
          "/dental-fillings-abuja"
        ),
      ],
    },
    {
      id: "cosmetic-dentistry",
      heading: "Cosmetic Dentistry",
      blocks: [
        service(
          "Professional Teeth Whitening",
          [
            "Professional whitening can help lighten certain types of tooth discolouration. Results vary depending on the cause of staining, the starting tooth shade and individual response to treatment.",
          ],
          "/teeth-whitening-abuja"
        ),
        service(
          "Composite Veneers",
          [
            "Composite veneers involve applying tooth-coloured resin to selected teeth to improve their appearance. Depending on the case, they may address chips, shape irregularities and some gaps.",
          ],
          "/composite-veneers-abuja"
        ),
        service(
          "Dental Gap Closure",
          [
            "Dental gaps may sometimes be addressed with composite bonding or other suitable treatments. The appropriate option depends on the size of the gap, tooth position, bite and overall oral health.",
          ],
          "/dental-gap-closure-abuja"
        ),
      ],
    },
    {
      id: "restorative-dentistry",
      heading: "Restorative Dentistry",
      blocks: [
        service(
          "Root Canal Treatment",
          [
            "Root canal treatment addresses disease or damage affecting the pulp inside a tooth. The procedure involves treating the affected internal tissues and sealing the tooth to help preserve it.",
            "The appropriate restoration after treatment depends on the condition and remaining structure of the tooth.",
          ],
          "/root-canal-treatment-abuja"
        ),
      ],
    },
    {
      id: "oral-surgery",
      heading: "Oral Surgery",
      blocks: [
        service(
          "Routine Tooth Extraction",
          [
            "Routine extraction involves removing a tooth when extraction is clinically indicated and the procedure can be carried out without the additional surgical steps required for more complex cases.",
          ],
          "/tooth-extraction-abuja"
        ),
        service(
          "Surgical Tooth Extraction",
          [
            "Surgical extraction may be necessary when a tooth is impacted, broken near the gum line or otherwise difficult to remove using a routine approach.",
          ],
          "/tooth-extraction-abuja"
        ),
        service(
          "Jaw Wiring / Intermaxillary Fixation",
          [
            "Intermaxillary fixation involves stabilising the relationship between the upper and lower jaws in selected clinical situations. It requires appropriate assessment and specialist clinical judgement.",
          ],
          "/jaw-wiring-abuja"
        ),
      ],
    },
    {
      id: "orthodontic-services",
      heading: "Orthodontic Services",
      blocks: [
        service(
          "Orthodontic Consultation",
          [
            "An orthodontic consultation assesses concerns involving tooth alignment, spacing and bite. Your dentist or orthodontic clinician can discuss whether braces or another treatment option may be appropriate.",
          ],
          "/braces-consultation-abuja"
        ),
      ],
    },
    {
      id: "important-information",
      heading: "Important Information",
      blocks: [
        {
          type: "paragraph",
          text: "The services described here are subject to clinical assessment and actual service availability. Not every treatment is suitable for every patient, and some procedures may require referral, imaging or additional appointments.",
        },
      ],
    },
  ],
  cta: { label: "Discuss Your Dental Needs With Our Team", href: "/contact" },
};
