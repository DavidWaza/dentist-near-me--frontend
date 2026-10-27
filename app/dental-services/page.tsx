import ContentPage from "@/components/ContentPage";
import { dentalServices } from "@/content/dental-services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(dentalServices.seo);

export default function Page() {
  return <ContentPage page={dentalServices} />;
}
