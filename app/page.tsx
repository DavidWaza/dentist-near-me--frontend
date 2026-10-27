import CtaPanel from "@/components/CtaPanel";
import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import Services from "@/components/Services";
import StepList from "@/components/StepList";
import WelcomeSection from "@/components/WelcomeSection";
import WhyUs from "@/components/WhyUs";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(home.seo);

export default function HomePage() {
  return (
    <main>
      <Hero content={home.hero} />
      <WelcomeSection content={home.welcome} />
      <IntroSection content={home.intro} />
      <Services content={home.services} />
      <WhyUs content={home.whyUs} />
      <StepList content={home.firstVisit} />
      {/* TODO(content): Smile Transformations (home.smileTransformations) is held back until genuine, consented photos exist. */}
      <FaqSection content={home.faq} />
      <CtaPanel
        heading={home.finalCta.heading}
        paragraphs={home.finalCta.paragraphs}
        action={home.finalCta.cta}
      />
    </main>
  );
}
