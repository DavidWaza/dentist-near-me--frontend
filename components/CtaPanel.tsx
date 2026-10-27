import PillLink from "@/components/PillLink";
import Reveal from "@/components/Reveal";
import type { Action } from "@/content/types";

interface CtaPanelProps {
  action: Action;
  heading?: string;
  paragraphs?: string[];
}

/**
 * End-of-page call to action. With a heading it renders the gradient panel;
 * with only a button label (most document pages) it renders the button alone.
 */
export default function CtaPanel({ action, heading, paragraphs = [] }: CtaPanelProps) {
  if (!heading) {
    return (
      <div className="section-pad flex justify-center pb-16">
        <PillLink action={action} />
      </div>
    );
  }

  return (
    <section aria-labelledby="cta-heading" className="section-pad">
      <Reveal>
        <div className="rounded-blob bg-panel-gradient p-8 text-center text-white shadow-card sm:p-12">
          <h2 id="cta-heading" className="mx-auto max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          {paragraphs.map((text) => (
            <p key={text} className="mx-auto mt-3 max-w-md text-sm text-white/70">
              {text}
            </p>
          ))}
          <div className="mt-7 flex justify-center">
            <PillLink action={action} variant="light" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
