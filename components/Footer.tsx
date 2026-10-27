"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  XIcon,
} from "@/components/icons";
import Logo from "@/components/Logo";
import type { SiteContent, SocialLink } from "@/content/types";

const SOCIAL_ICONS: Record<SocialLink["label"], typeof FacebookIcon> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  X: XIcon,
};

const CONTACT_ICONS = { mail: MailIcon, "map-pin": MapPinIcon } as const;

interface FooterProps {
  site: SiteContent;
}

export default function Footer({ site }: FooterProps) {
  const { footer } = site;

  return (
    <footer className="section-pad pb-10">
      <Reveal delay={0.1}>
        <div className="mt-6 rounded-blob bg-cream p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
            <div>
              <Link href="/" className="inline-flex">
                <Logo onLight className="h-10 w-auto" alt={site.logoAlt} />
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{footer.description}</p>
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">{footer.followHeading}</p>
                <ul className="mt-3 flex flex-wrap gap-2.5" aria-label="Social media">
                  {site.social.map(({ label, href }) => {
                    const Icon = SOCIAL_ICONS[label];
                    return (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${site.name} on ${label}`}
                          className="grid h-10 w-10 place-items-center rounded-full bg-deep text-white transition-transform hover:-translate-y-0.5 hover:bg-deep-700"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <nav aria-labelledby="footer-quick-links">
                <h2 id="footer-quick-links" className="text-sm font-bold">
                  {footer.quickLinksHeading}
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {footer.quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition-colors hover:text-deep">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div>
                <h2 className="text-sm font-bold">{footer.contactHeading}</h2>
                <ul className="mt-3 space-y-3 text-sm text-ink-soft">
                  {footer.contactLines.map((line) => {
                    const Icon = CONTACT_ICONS[line.icon];
                    return (
                      <li key={line.label} className="flex gap-2.5">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-dark" />
                        <span className="min-w-0">
                          <span className="font-semibold text-ink">{line.label}</span>{" "}
                          {line.href ? (
                            <a href={line.href} className="break-all transition-colors hover:text-deep">
                              {line.value}
                            </a>
                          ) : (
                            line.value
                          )}
                        </span>
                      </li>
                    );
                  })}
                  {/* Kept from the previous site; not in the document. */}
                  <li className="flex gap-2.5 font-semibold text-ink">
                    <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-dark" />
                    {site.phone}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-deep/10 pt-5">
            <h2 className="text-sm font-bold">{footer.disclaimerHeading}</h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">{footer.disclaimer}</p>
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-deep/10 pt-5 text-xs text-ink-soft sm:flex-row sm:justify-between">
            <p>{footer.copyright}</p>
            <p className="flex items-center gap-1.5">
              <ClockIcon className="h-3.5 w-3.5 shrink-0" />
              {site.hours.weekdays} · {site.hours.weekend}
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
