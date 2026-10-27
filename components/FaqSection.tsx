import FaqList from "@/components/FaqList";
import Reveal from "@/components/Reveal";
import type { HomeContent } from "@/content/types";

interface FaqSectionProps {
  content: HomeContent["faq"];
}

export default function FaqSection({ content }: FaqSectionProps) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-pad py-20 sm:py-24">
      <Reveal className="mx-auto max-w-3xl">
        <h2
          id="faq-heading"
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
        >
          {content.heading}
        </h2>
        <div className="mt-8">
          <FaqList items={content.items} headingLevel={3} />
        </div>
      </Reveal>
    </section>
  );
}
