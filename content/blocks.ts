import type { Block, FaqItem, Section } from "@/content/types";

/** Small builders that keep content files close to the document's own layout. */

export const p = (text: string): Block => ({ type: "paragraph", text });

export const ul = (...items: string[]): Block => ({ type: "list", items });

export const faq = (...items: FaqItem[]): Block => ({ type: "faq", items });

export const qa = (question: string, ...answer: string[]): FaqItem => ({ question, answer });

export const section = (id: string, heading: string, ...blocks: Block[]): Section => ({
  id,
  heading,
  blocks,
});
