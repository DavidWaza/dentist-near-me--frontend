"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkle } from "@/components/icons";
import { TESTIMONIALS } from "@/lib/content";

const ROTATE_MS = 6000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = TESTIMONIALS[index];

  const goTo = useCallback((next: number) => {
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => goTo(index + 1), ROTATE_MS);
    return () => clearInterval(timer);
  }, [index, goTo, reduceMotion]);

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-28">
      <Image
        src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1800&q=70"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" aria-hidden="true" />

      <div className="section-pad relative flex justify-center">
        <div className="w-full max-w-xl rounded-blob bg-panel-gradient p-7 text-center text-white shadow-card sm:p-10">
          <span className="eyebrow-dark">
            <Sparkle className="h-3 w-3 text-teal-light" /> Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Voices of <span className="text-teal-light">Trust and Care</span>
          </h2>

          <div className="mt-7 rounded-2xl bg-white p-6 text-ink sm:p-8">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.name}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduceMotion ? 0 : -32 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-2xl">
                  <Image src={current.image} alt={current.name} fill sizes="80px" className="object-cover" />
                </div>
                <figcaption className="mt-3">
                  <p className="text-sm font-bold">{current.name}</p>
                  <p className="text-xs text-ink-soft">{current.role}</p>
                </figcaption>
                <blockquote className="mt-4 text-sm font-semibold leading-relaxed sm:text-base">
                  “{current.quote}”
                </blockquote>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((item, dot) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={dot === index}
                aria-label={`Show testimonial from ${item.name}`}
                onClick={() => goTo(dot)}
                className={`h-2 rounded-full transition-all ${
                  dot === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
