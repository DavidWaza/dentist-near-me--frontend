"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { Sparkle } from "@/components/icons";
import { WHY_US, SITE } from "@/lib/content";

export default function WhyUs() {
  const [active, setActive] = useState(0);

  return (
    <section id="why-us" className="section-pad py-20 sm:py-24">
      <Reveal>
        <span className="eyebrow">
          <Sparkle className="h-3 w-3 text-teal" /> Why Choose Us
        </span>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
          We Treat You Like Family — Because Your <span className="text-teal">Smile Matters Most</span>
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          At {SITE.name}, we combine expertise, compassion, and modern technology to create a
          dental experience that patients truly value.
        </p>
      </Reveal>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ul>
          {WHY_US.map((item, index) => {
            const isOpen = active === index;
            return (
              <li key={item.title} className="border-b border-ink/10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActive(index)}
                  className="flex w-full items-center gap-3 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                >
                  <Sparkle className={`h-3.5 w-3.5 shrink-0 ${isOpen ? "text-teal" : "text-ink/50"}`} />
                  <span className="text-base font-bold sm:text-lg">{item.title}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pl-6 pr-2 text-sm leading-relaxed text-ink-soft">
                        {item.copy}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/4.4] overflow-hidden rounded-blob shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=70"
              alt={`${SITE.name} dental team standing together`}
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
