import type { Metadata } from "next";
import type { Seo } from "@/content/types";

/** The document supplies complete titles, so they bypass the layout's title template. */
export function pageMetadata(seo: Seo): Metadata {
  return {
    title: { absolute: seo.title },
    description: seo.description,
  };
}
