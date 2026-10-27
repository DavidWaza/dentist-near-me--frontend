import { PlusIcon } from "@/components/icons";
import type { FaqItem } from "@/content/types";

interface FaqListProps {
  items: FaqItem[];
  /** Heading level for each question, following the surrounding heading order. */
  headingLevel?: 2 | 3 | 4;
}

/**
 * Question/answer list. Native <details> keeps every answer in the HTML (crawlable,
 * works without JavaScript) and is keyboard-operable by default.
 */
export default function FaqList({ items, headingLevel = 3 }: FaqListProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <ul className="mt-4">
      {items.map((item) => (
        <li key={item.question} className="border-b border-ink/10">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center gap-3 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal [&::-webkit-details-marker]:hidden">
              <Heading className="flex-1 text-base font-bold sm:text-lg">{item.question}</Heading>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint-light text-teal-dark transition-colors group-open:bg-deep group-open:text-white">
                <PlusIcon className="h-4 w-4 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" />
              </span>
            </summary>
            <div className="space-y-3 pb-5 pr-12 text-sm leading-relaxed text-ink-soft">
              {item.answer.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
