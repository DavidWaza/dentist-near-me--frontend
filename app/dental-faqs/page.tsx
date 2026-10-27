import ContentPage from "@/components/ContentPage";
import { dentalFaqs } from "@/content/dental-faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(dentalFaqs.seo);

export default function Page() {
  return <ContentPage page={dentalFaqs} />;
}
