"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "@/components/icons";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#story" },
  { label: "Services", href: "/#services" },
  { label: "Our Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50"
    >
      <div className="section-pad">
        <nav
          aria-label="Main"
          className="flex items-center justify-between rounded-full bg-deep/95 py-2.5 pl-5 pr-2.5 text-white shadow-pill backdrop-blur"
        >
          <Link href="/" className="flex shrink-0 items-center">
            <Logo className="h-9 w-auto sm:h-10" priority />
          </Link>

          <ul className="hidden items-center gap-7 text-sm text-white/80 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/book" className="btn-pill-light hidden !py-2.5 sm:inline-flex">
              Get Appointment
              <span className="arrow-badge">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 md:hidden"
            >
              <span className="space-y-1.5">
                <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-blob bg-deep p-5 text-white shadow-card md:hidden"
            >
              <ul className="space-y-3 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} onClick={() => setOpen(false)} className="block py-1 text-white/85">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/book" onClick={() => setOpen(false)} className="btn-pill-light mt-2 w-full justify-center">
                    Get Appointment
                    <span className="arrow-badge">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
