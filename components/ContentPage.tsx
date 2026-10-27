import Image from "next/image";
import Blocks from "@/components/Blocks";
import ContentSection from "@/components/ContentSection";
import CtaPanel from "@/components/CtaPanel";
import type { ContentPageData } from "@/content/types";

interface ContentPageProps {
  page: ContentPageData;
}

/** Inner page layout: H1 + intro, document sections in order, then the page's CTA. */
export default function ContentPage({ page }: ContentPageProps) {
  return (
    <main>
      <div className="section-pad pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{page.h1}</h1>
          <Blocks blocks={page.intro} level={2} />

          {page.image && (
            <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-blob shadow-card">
              <Image
                src={page.image.src}
                alt={page.image.alt}
                fill
                priority
                sizes="(max-width: 808px) calc(100vw - 40px), 768px"
                className="object-cover"
              />
            </div>
          )}

          {page.sections.map((section) => (
            <ContentSection key={section.id} section={section} className="mt-12" />
          ))}
        </div>
      </div>

      {page.cta && <CtaPanel action={page.cta} />}
    </main>
  );
}
