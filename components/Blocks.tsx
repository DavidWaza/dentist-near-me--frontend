import Link from "next/link";
import FaqList from "@/components/FaqList";
import PillLink from "@/components/PillLink";
import PriceTable from "@/components/PriceTable";
import type { Block } from "@/content/types";

type HeadingLevel = 2 | 3 | 4;

interface BlocksProps {
  blocks: Block[];
  /** Heading level for sub-titles and FAQ questions inside these blocks. */
  level: HeadingLevel;
  /** id of the enclosing section heading (labels tables). */
  labelledBy?: string;
}

const linkClass =
  "font-semibold text-deep underline decoration-teal/50 underline-offset-2 transition-colors hover:decoration-teal";

/** Renders document blocks with the heading hierarchy continuing from the parent. */
export default function Blocks({ blocks, level, labelledBy }: BlocksProps) {
  return (
    <>
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} level={level} labelledBy={labelledBy} />
      ))}
    </>
  );
}

function BlockView({
  block,
  level,
  labelledBy,
}: {
  block: Block;
  level: HeadingLevel;
  labelledBy?: string;
}) {
  switch (block.type) {
    case "paragraph":
      return <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">{block.text}</p>;

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={`mt-4 space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft marker:text-teal sm:text-base ${
            block.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }

    case "subsection": {
      const Heading = `h${level}` as "h2" | "h3" | "h4";
      const childLevel = Math.min(level + 1, 4) as HeadingLevel;
      return (
        <div className="mt-6">
          <Heading className="text-lg font-bold">
            {block.href ? (
              <Link href={block.href} className={linkClass}>
                {block.title}
              </Link>
            ) : (
              block.title
            )}
          </Heading>
          <div className="[&>*:first-child]:mt-2">
            <Blocks blocks={block.blocks} level={childLevel} labelledBy={labelledBy} />
          </div>
        </div>
      );
    }

    case "faq":
      return <FaqList items={block.items} headingLevel={level} />;

    case "table":
      return <PriceTable columns={block.columns} rows={block.rows} labelledBy={labelledBy} />;

    case "labeled":
      return (
        <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
          <strong className="font-bold text-ink">{block.label}</strong>{" "}
          {block.href ? (
            <a
              href={block.href}
              className={`${linkClass} break-all`}
              {...(block.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {block.value}
            </a>
          ) : (
            block.value
          )}
        </p>
      );

    case "lines":
      return (
        <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
          {block.lines.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      );

    case "action":
      return (
        <div className="mt-5">
          <PillLink action={block.action} />
        </div>
      );
  }
}
