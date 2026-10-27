"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import PillLink from "@/components/PillLink";
import type { HomeContent } from "@/content/types";

interface HeroProps {
  content: HomeContent["hero"];
}

export default function Hero({ content }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="section-pad pt-24">
      <div className="relative overflow-hidden rounded-blob bg-hero-gradient text-white">
        {/* dental-scene backdrop */}
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          priority
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-deep/30" aria-hidden="true" />

        <div className="relative px-6 pb-14 pt-16 sm:px-10 sm:pb-20 sm:pt-24 lg:px-14">
          <motion.h1
            {...rise(0.1)}
            className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {content.h1}
          </motion.h1>

          <motion.p {...rise(0.25)} className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {content.subtext}
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-7 flex flex-wrap items-center gap-3">
            <PillLink action={content.primaryCta} variant="light" />
            <PillLink action={content.secondaryCta} variant="outline-light" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
