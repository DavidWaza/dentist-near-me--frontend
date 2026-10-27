import Image from "next/image";

const LOGO_SRC = "/dentist-near-me-logo.png";

interface LogoProps {
  className?: string;
  /** Dark backing for light surfaces (logo text is white). */
  onLight?: boolean;
  priority?: boolean;
  alt: string;
}

export default function Logo({
  className = "h-10 w-auto",
  onLight = false,
  priority,
  alt,
}: LogoProps) {
  const image = (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={160}
      height={120}
      priority={priority}
      className={className}
    />
  );

  if (onLight) {
    return <span className="inline-flex rounded-2xl bg-deep px-3 py-1.5">{image}</span>;
  }

  return image;
}
