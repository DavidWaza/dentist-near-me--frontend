import type { ContentPageData } from "@/content/types";
import { compositeVeneers } from "@/content/treatments/composite-veneers";
import { dentalFillings } from "@/content/treatments/dental-fillings";
import { gapClosure } from "@/content/treatments/gap-closure";
import { jawWiring } from "@/content/treatments/jaw-wiring";
import { orthodonticConsultation } from "@/content/treatments/orthodontic-consultation";
import { rootCanalTreatment } from "@/content/treatments/root-canal-treatment";
import { scalingAndPolishing } from "@/content/treatments/scaling-and-polishing";
import { teethWhitening } from "@/content/treatments/teeth-whitening";
import { toothExtraction } from "@/content/treatments/tooth-extraction";

/** Treatment pages, served by app/[slug]/page.tsx. Order follows the document. */
export const TREATMENTS: ContentPageData[] = [
  teethWhitening,
  compositeVeneers,
  scalingAndPolishing,
  dentalFillings,
  rootCanalTreatment,
  toothExtraction,
  orthodonticConsultation,
  gapClosure,
  jawWiring,
];

export function getTreatmentBySlug(slug: string): ContentPageData | undefined {
  return TREATMENTS.find((page) => page.path === `/${slug}`);
}
