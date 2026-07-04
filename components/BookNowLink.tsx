import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

interface BookNowLinkProps {
  service?: string;
  className?: string;
  variant?: "primary" | "light";
}

export function bookServiceHref(service?: string) {
  return service ? { pathname: "/book", query: { service } } : { pathname: "/book" };
}

export default function BookNowLink({
  service,
  className = "",
  variant = "primary",
}: BookNowLinkProps) {
  const btnClass = variant === "primary" ? "btn-pill" : "btn-pill-light";

  return (
    <Link href={bookServiceHref(service)} className={`${btnClass} ${className}`.trim()}>
      Book Now
      <span className="arrow-badge">
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
