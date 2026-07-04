import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DentistNearMe — Trusted Dental Care for Every Generation",
    template: "%s · DentistNearMe",
  },
  description:
    "DentistNearMe combines modern technology with heartfelt service — preventive, cosmetic, restorative and pediatric dentistry with easy online booking.",
  keywords: ["dentist", "dental care", "appointment booking", "DentistNearMe"],
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
