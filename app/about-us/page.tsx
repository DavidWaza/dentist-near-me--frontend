import ContentPage from "@/components/ContentPage";
import { about } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(about.seo);

export default function Page() {
  return <ContentPage page={about} />;
}
