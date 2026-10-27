"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { ICONS } from "@/components/icons";
import type { HomeContent } from "@/content/types";

interface WhyUsProps {
  content: HomeContent["whyUs"];
}

export default function WhyUs({ content }: WhyUsProps) {
  const [active, setActive] = useState(0);

  return (
    <section id="why-us" aria-labelledby="why-us-heading" className="section-pad py-20 sm:py-24">
      <Reveal>
        <h2
          id="why-us-heading"
          className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
        >
          {content.heading}
        </h2>
      </Reveal>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ul>
          {content.items.map((item, index) => {
            const isOpen = active === index;
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title} className="border-b border-ink/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`why-us-panel-${index}`}
                    onClick={() => setActive(index)}
                    className="flex w-full items-center gap-3 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${
                        isOpen ? "bg-deep text-white" : "bg-mint-light text-teal-dark"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-base font-bold sm:text-lg">{item.title}</span>
                  </button>
                </h3>
                {/* Panels stay in the HTML (crawlable); closed ones collapse to zero height. */}
                <motion.div
                  id={`why-us-panel-${index}`}
                  initial={false}
                  animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  aria-hidden={!isOpen}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pl-12 pr-2 text-sm leading-relaxed text-ink-soft">
                    {item.copy}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/4.4] overflow-hidden rounded-blob shadow-card">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
