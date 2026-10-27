/**
 * Content model for pages populated from "DNM website content.docx".
 * All copy lives in content/*.ts and reaches components through props.
 */

/** Icons content can reference; rendered by components/icons.tsx. */
export type IconName =
  | "shield-heart"
  | "sun-high"
  | "mood-smile"
  | "mood-smile-beam"
  | "dental"
  | "dental-broken"
  | "dental-off"
  | "ear"
  | "file-description"
  | "stethoscope"
  | "clipboard-heart"
  | "calendar-check";

/** A photo (not from the document). alt="" marks it decorative. */
export interface Photo {
  src: string;
  alt: string;
}

export interface Seo {
  title: string;
  description: string;
}

export interface Action {
  label: string;
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string[];
}

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  /** Bold sub-title from the document, rendered as the next heading level. */
  | { type: "subsection"; title: string; href?: string; blocks: Block[] }
  | { type: "faq"; items: FaqItem[] }
  | { type: "table"; columns: [string, string]; rows: [string, string][] }
  /** "Label: value" lines such as "Email: …"; href makes the value a link. */
  | { type: "labeled"; label: string; value: string; href?: string; external?: boolean }
  /** Lines separated by manual line breaks (e.g. a postal address). */
  | { type: "lines"; lines: string[] }
  | { type: "action"; action: Action };

export interface Section {
  id: string;
  heading: string;
  blocks: Block[];
}

export interface ContentPageData {
  path: string;
  seo: Seo;
  h1: string;
  /** Blocks directly under the H1 (paragraphs, or FAQs on the FAQ page). */
  intro: Block[];
  sections: Section[];
  cta?: Action;
  /** Banner photo shown under the intro. */
  image?: Photo;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: "Facebook" | "Instagram" | "TikTok" | "X";
  href: string;
}

export interface SiteContent {
  name: string;
  email: string;
  phone: string;
  hours: { weekdays: string; weekend: string };
  address: string;
  logoAlt: string;
  nav: NavLink[];
  bookCta: Action;
  social: SocialLink[];
  footer: {
    description: string;
    quickLinksHeading: string;
    quickLinks: NavLink[];
    contactHeading: string;
    contactLines: { label: string; value: string; href?: string; icon: "mail" | "map-pin" }[];
    followHeading: string;
    disclaimerHeading: string;
    disclaimer: string;
    copyright: string;
  };
}

export interface HomeContent {
  seo: Seo;
  hero: {
    h1: string;
    /** Short line under the H1. */
    subtext: string;
    primaryCta: Action;
    secondaryCta: Action;
    image: Photo;
  };
  /** Hero body copy, shown in its own section below the hero. */
  welcome: { paragraphs: string[] };
  intro: { heading: string; paragraphs: string[]; image: Photo };
  services: {
    heading: string;
    items: { title: string; copy: string; cta: Action; icon: IconName; image: Photo }[];
  };
  whyUs: {
    heading: string;
    items: { title: string; copy: string; icon: IconName }[];
    image: Photo;
  };
  firstVisit: {
    eyebrow: string;
    heading: string;
    steps: { term: string; text: string }[];
    image: Photo;
  };
  /** Held back until genuine, consented patient photographs exist. */
  smileTransformations: {
    published: false;
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    cta: Action;
  };
  faq: { heading: string; items: FaqItem[] };
  finalCta: { heading: string; paragraphs: string[]; cta: Action };
}
