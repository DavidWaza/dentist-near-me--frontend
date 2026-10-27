import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import type { Action } from "@/content/types";

interface PillLinkProps {
  action: Action;
  variant?: "primary" | "light" | "outline-light";
  className?: string;
}

const VARIANTS = {
  primary: "btn-pill",
  light: "btn-pill-light",
  "outline-light":
    "inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
} as const;

/** Pill-shaped call-to-action link. Internal routes use next/link; mailto and external URLs use <a>. */
export default function PillLink({ action, variant = "primary", className = "" }: PillLinkProps) {
  const classes = `${VARIANTS[variant]} ${className}`.trim();
  const content = (
    <>
      {action.label}
      {variant !== "outline-light" && (
        <span className="arrow-badge">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      )}
    </>
  );

  if (action.href.startsWith("/")) {
    return (
      <Link href={action.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={action.href}
      className={classes}
      {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
