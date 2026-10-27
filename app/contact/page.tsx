import ContentPage from "@/components/ContentPage";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(contact.seo);

export default function Page() {
  return <ContentPage page={contact} />;
}
