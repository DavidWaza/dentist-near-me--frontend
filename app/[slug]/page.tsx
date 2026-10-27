import { notFound } from "next/navigation";
import ContentPage from "@/components/ContentPage";
import { getTreatmentBySlug, TREATMENTS } from "@/content/treatments";
import { pageMetadata } from "@/lib/seo";

interface TreatmentPageProps {
  params: { slug: string };
}

/** Only the treatment slugs below exist; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return TREATMENTS.map((page) => ({ slug: page.path.slice(1) }));
}

export function generateMetadata({ params }: TreatmentPageProps) {
  const page = getTreatmentBySlug(params.slug);
  return page ? pageMetadata(page.seo) : {};
}

export default function TreatmentPage({ params }: TreatmentPageProps) {
  const page = getTreatmentBySlug(params.slug);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
