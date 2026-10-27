import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { home } from "@/content/home";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: home.seo.title,
    template: `%s · ${site.name}`,
  },
  description: home.seo.description,
  keywords: ["dentist", "dental care", "appointment booking", site.name],
};

export const viewport: Viewport = {
  themeColor: "#0F3D5C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/dentist-near-me-logo.png" type="image/png" />
      </head>
      <body>
        <Navbar links={site.nav} bookCta={site.bookCta} logoAlt={site.logoAlt} />
        {children}
        <Footer site={site} />
      </body>
    </html>
  );
}
