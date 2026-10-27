import ContentPage from "@/components/ContentPage";
import { dentalPrices } from "@/content/dental-prices";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(dentalPrices.seo);

export default function Page() {
  return <ContentPage page={dentalPrices} />;
}
