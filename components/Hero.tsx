"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import BookNowLink from "@/components/BookNowLink";
import { ArrowUpRight, ClockIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { SITE } from "@/lib/content";

const INFO = [
  {
    icon: PhoneIcon,
    title: "Get An Appointment",
    lines: ["Ready for a healthier smile?", "Book your visit today — click here."],
    href: "/book",
  },
  {
    icon: MailIcon,
    title: "Emergency Contact",
    lines: [`Call: ${SITE.phone}`, `Email: ${SITE.email}`],
    href: `tel:${SITE.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: ClockIcon,
    title: "Opening Hours",
    lines: [SITE.hours.weekdays, SITE.hours.weekend],
    href: "/#contact",
  },
] as const;

export default function Hero() {
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
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=70"
          alt="Patient receiving gentle dental care"
          fill
          priority
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-deep/30" aria-hidden="true" />

        <div className="relative px-6 pb-8 pt-16 sm:px-10 sm:pt-24 lg:px-14">
          <motion.h1
            {...rise(0.1)}
            className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Trusted Dental Care for Every Generation
          </motion.h1>

          <motion.p {...rise(0.25)} className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
            We combine modern technology with heartfelt service to ensure every generation
            leaves with a healthier, happier smile.
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-7">
            <BookNowLink variant="light" />
          </motion.div>

          {/* Info bar */}
          <motion.div
            {...rise(0.55)}
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 backdrop-blur-sm sm:grid-cols-3"
          >
            {INFO.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-deep/80 p-5 transition-colors hover:bg-deep-700"
              >
                <div className="flex items-center gap-2.5 text-sm font-semibold">
                  <item.icon className="h-4 w-4 text-teal-light" />
                  {item.title}
                  <ArrowUpRight className="ml-auto h-4 w-4 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-light" />
                </div>
                <div className="mt-2.5 space-y-0.5 text-xs leading-relaxed text-white/65">
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
