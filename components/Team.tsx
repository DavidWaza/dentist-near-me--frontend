"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Sparkle } from "@/components/icons";
import { DOCTORS } from "@/lib/content";

export default function Team() {
  return (
    <section id="team" className="bg-mint py-20 sm:py-24">
      <div className="section-pad">
        <Reveal className="text-center">
          <span className="eyebrow bg-white">
            <Sparkle className="h-3 w-3 text-teal" /> Our Team
          </span>
          <h2 className="mx-auto mt-4 max-w-md text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
            Our <span className="text-teal">Experts</span> in Oral Health
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Each member of our clinical staff is not only highly qualified but deeply
            passionate about helping patients achieve healthier smiles.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {DOCTORS.map((doctor, index) => (
            <Reveal key={doctor.name} delay={index * 0.12}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-blob shadow-card">
                <Image
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-card">
                  <div>
                    <h3 className="text-sm font-bold">{doctor.name}</h3>
                    <p className="text-xs text-ink-soft">{doctor.role}</p>
                  </div>
                  <Link
                    href={{
                      pathname: "/book",
                      query: { service: doctor.services[0] },
                    }}
                    aria-label={`Book ${doctor.name}`}
                    className="arrow-badge h-8 w-8 transition-transform hover:scale-110"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Link href="/book" className="btn-pill">
            View All Doctors
            <span className="arrow-badge">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
