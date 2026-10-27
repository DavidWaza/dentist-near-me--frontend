import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { HomeContent } from "@/content/types";

interface IntroSectionProps {
  content: HomeContent["intro"];
}

export default function IntroSection({ content }: IntroSectionProps) {
  return (
    <section aria-labelledby="intro-heading" className="section-pad py-20 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <Reveal>
          <h2
            id="intro-heading"
            className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
          >
            {content.heading}
          </h2>
          <div className="mt-4 max-w-xl space-y-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            {content.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-blob shadow-card">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(max-width: 1024px) calc(100vw - 40px), 480px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
