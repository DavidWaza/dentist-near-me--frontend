"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Sparkle } from "@/components/icons";
import { LOCATIONS, SITE } from "@/lib/content";

export default function Locations() {
  return (
    <section id="locations" className="section-pad py-20 sm:py-24">
      <Reveal className="text-center">
        <span className="eyebrow">
          <Sparkle className="h-3 w-3 text-teal" /> Locations
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem]">
          Where You Can <span className="text-teal">Find Us</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Three convenient clinics, one standard of care. Walk-ins welcome, parking on site.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {LOCATIONS.map((location, index) => (
          <Reveal key={location.city} delay={index * 0.12}>
            <article className="group relative aspect-[4/3] overflow-hidden rounded-blob shadow-card">
              <Image
                src={location.image}
                alt={`${SITE.name} clinic in ${location.city}`}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-base font-bold">{location.city}</h3>
                <p className="mt-0.5 text-xs text-white/75">{location.line}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
