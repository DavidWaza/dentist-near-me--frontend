import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, ICONS } from "@/components/icons";
import type { HomeContent } from "@/content/types";

interface ServicesProps {
  content: HomeContent["services"];
}

/** Card surfaces cycle in the original order. */
const SURFACES = ["bg-[#E3F4FD]", "bg-peach", "bg-mint-light", "bg-cream"] as const;

export default function Services({ content }: ServicesProps) {
  return (
    <section id="services" aria-labelledby="services-heading" className="section-pad py-20 sm:py-24">
      <Reveal>
        <h2
          id="services-heading"
          className="max-w-md text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
        >
          {content.heading}
        </h2>
      </Reveal>

      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {content.items.map((service, index) => {
          const Icon = ICONS[service.icon];
          return (
            <li key={service.title} className="lg:[&:last-child:nth-child(odd)]:col-span-2">
              <Reveal delay={(index % 2) * 0.12} className="h-full">
                <Link
                  href={service.cta.href}
                  className={`group flex h-full flex-col gap-6 rounded-blob p-7 transition-all hover:ring-2 hover:ring-teal/30 sm:p-8 ${
                    SURFACES[index % SURFACES.length]
                  }`}
                >
                  <div className="flex flex-1 flex-col gap-6 sm:flex-row">
                    <div className="flex flex-1 flex-col">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-teal-dark shadow-card">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-auto pt-8 text-xl font-bold">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.copy}</p>
                    </div>

                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl sm:w-56 lg:w-60">
                      <Image
                        src={service.image.src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) calc(100vw - 96px), 240px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <span className="btn-pill-light w-full justify-between !py-2.5 ring-1 ring-deep/10 transition-transform group-hover:-translate-y-0.5">
                    {service.cta.label}
                    <span className="arrow-badge">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
