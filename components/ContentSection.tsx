import Blocks from "@/components/Blocks";
import Reveal from "@/components/Reveal";
import type { Section } from "@/content/types";

interface ContentSectionProps {
  section: Section;
  className?: string;
}

/** A document section: h2 heading followed by its blocks (sub-titles become h3). */
export default function ContentSection({ section, className = "" }: ContentSectionProps) {
  const headingId = `${section.id}-heading`;

  return (
    <section id={section.id} aria-labelledby={headingId} className={`scroll-mt-28 ${className}`.trim()}>
      <Reveal>
        <h2 id={headingId} className="text-2xl font-bold tracking-tight sm:text-3xl">
          {section.heading}
        </h2>
        <Blocks blocks={section.blocks} level={3} labelledBy={headingId} />
      </Reveal>
    </section>
  );
}
