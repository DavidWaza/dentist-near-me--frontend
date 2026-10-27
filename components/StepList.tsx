import Image from "next/image";
import Reveal from "@/components/Reveal";
import { DentalIcon } from "@/components/icons";
import type { HomeContent } from "@/content/types";

interface StepListProps {
  content: HomeContent["firstVisit"];
}

export default function StepList({ content }: StepListProps) {
  return (
    <section aria-labelledby="first-visit-heading" className="bg-mint py-20 sm:py-24">
      <div className="section-pad">
        <Reveal className="text-center">
          <span className="eyebrow bg-white">
            <DentalIcon className="h-3.5 w-3.5 text-teal" /> {content.eyebrow}
          </span>
          <h2
            id="first-visit-heading"
            className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
          >
            {content.heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-blob shadow-card lg:aspect-[4/5]">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(max-width: 1024px) calc(100vw - 40px), 440px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <ol className="grid gap-4">
            {content.steps.map((step, index) => (
              <li key={step.term}>
                <Reveal delay={index * 0.08} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card sm:p-6">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-deep text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1.5 text-sm leading-relaxed text-ink-soft sm:text-base">
                    <strong className="font-bold text-ink">{step.term}</strong> {step.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
