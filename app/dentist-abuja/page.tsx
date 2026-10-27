import ContentPage from "@/components/ContentPage";
import { dentistAbuja } from "@/content/dentist-abuja";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(dentistAbuja.seo);

export default function Page() {
  return <ContentPage page={dentistAbuja} />;
}
