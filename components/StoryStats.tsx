"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import BookNowLink from "@/components/BookNowLink";
import { Sparkle } from "@/components/icons";
import { STATS } from "@/lib/content";

export default function StoryStats() {
  return (
    <section id="story" className="overflow-hidden py-20 sm:py-24">
      <Reveal className="section-pad text-center">
        <span className="eyebrow">
          <Sparkle className="h-3 w-3 text-teal" /> Our Story
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
          Redefining Dental Care with Trust, Innovation in{" "}
          <span className="text-teal">Dental Wellness</span>
        </h2>
        <div className="mt-7 flex justify-center">
          <BookNowLink />
        </div>
      </Reveal>

      {/* Horizontally scrollable stat cards, edge-to-edge like the mock */}
      <div className="mt-12">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.1 }}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:thin]"
        >
          {STATS.map((stat) => (
            <motion.li
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
              }}
              className="group relative h-72 w-64 shrink-0 snap-center overflow-hidden rounded-2xl text-white shadow-card sm:w-72"
            >
              <Image
                src={stat.image}
                alt=""
                fill
                sizes="288px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/35 to-deep/5" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{stat.figure}</span>
                  <span className="pb-1 text-[11px] font-semibold leading-tight text-white/85">
                    {stat.label}
                  </span>
                  <span className="mb-2 ml-auto h-px w-10 border-t border-dashed border-white/50" aria-hidden="true" />
                </div>
                <p className="mt-2 text-sm font-medium leading-snug">{stat.copy}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
