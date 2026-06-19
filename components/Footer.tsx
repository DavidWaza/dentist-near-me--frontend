"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Sparkle } from "@/components/icons";
import Logo from "@/components/Logo";
import { SITE } from "@/lib/content";

const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/#story" },
      { label: "Our Team", href: "/#team" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Locations", href: "/#locations" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Preventive", href: "/#services" },
      { label: "Cosmetic", href: "/#services" },
      { label: "Restorative", href: "/#services" },
      { label: "Pediatric", href: "/#services" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Book Appointment", href: "/book" },
      { label: "Emergency Care", href: `tel:${SITE.phone.replace(/[^+\d]/g, "")}` },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Use", href: "/" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer id="contact" className="section-pad pb-10">
      {/* CTA panel */}
      <Reveal>
        <div className="rounded-blob bg-panel-gradient p-8 text-center text-white shadow-card sm:p-12">
          <span className="eyebrow-dark">
            <Sparkle className="h-3 w-3 text-teal-light" /> Get In Touch
          </span>
          <h2 className="mx-auto mt-4 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s Talk Teeth — We&apos;re <span className="text-teal-light">Just a Smile Away</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
            Our friendly team is ready to answer your questions and get you booked in.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/book" className="btn-pill-light">
              Book Appointment
              <span className="arrow-badge">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </Reveal>

      {/* Cream footer card */}
      <Reveal delay={0.1}>
        <div className="mt-6 rounded-blob bg-cream p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
            <div>
              <Link href="/" className="inline-flex">
                <Logo onLight className="h-10 w-auto" />
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                A warm, modern dental practice combining expertise, compassion and technology
                to keep every generation smiling.
              </p>
              <div className="mt-5 space-y-1 text-sm font-semibold">
                <p>{SITE.phone}</p>
                <p>{SITE.email}</p>
              </div>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading}>
                  <h3 className="text-sm font-bold">{column.heading}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="transition-colors hover:text-deep">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-deep/10 pt-5 text-xs text-ink-soft sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
            <p>
              {SITE.hours.weekdays} · {SITE.hours.weekend}
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
