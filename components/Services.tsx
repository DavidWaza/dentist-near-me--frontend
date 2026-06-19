"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Sparkle } from "@/components/icons";
import { SERVICES, SITE, type Service } from "@/lib/content";

const SURFACES: Record<Service["surface"], string> = {
  lavender: "bg-[#E2EEF4]",
  peach: "bg-peach",
  mint: "bg-mint-light",
  cream: "bg-cream",
};

export default function Services() {
  return (
    <section id="services" className="section-pad py-20 sm:py-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <span className="eyebrow">
            <Sparkle className="h-3 w-3 text-teal" /> Our Services
          </span>
          <h2 className="mt-4 max-w-md text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
            Comprehensive Dental Care for <span className="text-teal">Every Smile</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            At {SITE.name}, we combine expertise, compassion, and modern technology to create a
            dental experience that patients truly value.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link href="/book" className="btn-pill">
            See All Services
            <span className="arrow-badge">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {SERVICES.map((service, index) => (
          <Reveal key={service.slug} delay={(index % 2) * 0.12}>
            <article
              className={`flex h-full flex-col gap-6 rounded-blob p-7 sm:flex-row sm:p-8 ${SURFACES[service.surface]}`}
            >
              <div className="flex flex-1 flex-col">
                <span className="font-mono text-xl font-semibold tracking-tight text-ink/70">
                  {service.index}
                </span>
                <h3 className="mt-auto pt-10 text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.copy}</p>
                <Link
                  href={{ pathname: "/book", query: { service: service.slug } }}
                  className="btn-pill-light mt-5 w-fit !py-2.5 ring-1 ring-deep/10"
                >
                  View Details
                  <span className="arrow-badge">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:w-64 lg:w-72">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 288px"
                  className="object-cover"
                />
                <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-deep/75 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
