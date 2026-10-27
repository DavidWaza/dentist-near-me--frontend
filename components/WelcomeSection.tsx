import Reveal from "@/components/Reveal";
import type { HomeContent } from "@/content/types";

interface WelcomeSectionProps {
  content: HomeContent["welcome"];
}

/** The hero's body copy, given room below the hero: first paragraph as a lead. */
export default function WelcomeSection({ content }: WelcomeSectionProps) {
  const [lead, ...rest] = content.paragraphs;

  return (
    <div className="section-pad pt-16 sm:pt-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-lg font-semibold leading-relaxed text-ink sm:text-2xl sm:leading-snug">{lead}</p>
        {rest.map((text) => (
          <p key={text} className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            {text}
          </p>
        ))}
      </Reveal>
    </div>
  );
}
