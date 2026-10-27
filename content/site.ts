import type { SiteContent } from "@/content/types";

/**
 * Site-wide content. Source: "DNM website content.docx" §19 Footer Content,
 * except where marked as kept from the previous site.
 */
export const site: SiteContent = {
  name: "DentistNearMeNG",
  email: "dentistnearmeng@gmail.com",
  // Kept from the previous site; not in the document (confirm before launch).
  phone: "+234 (81) 6567-8901",
  hours: { weekdays: "Mon – Fri · 9:00 – 17:00", weekend: "Sat – Sun · 5:00 – 17:30" },
  address: "Capital Hub Plaza, Mabushi, Abuja, FCT, Nigeria.",
  logoAlt: "DentistNearMeNG",
  // Navbar links are not specified in the document; labels are the document's page names.
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Dental Services", href: "/dental-services" },
    { label: "Dental Prices", href: "/dental-prices" },
    { label: "Contact Us", href: "/contact" },
  ],
  bookCta: { label: "Book an Appointment", href: "/book" },
  // Kept from the previous site; not in the document.
  social: [
    { label: "Facebook", href: "https://www.facebook.com/dentistnearme" },
    { label: "Instagram", href: "https://www.instagram.com/dentistnearme" },
    { label: "TikTok", href: "https://www.tiktok.com/@dentistnearme" },
    { label: "X", href: "https://x.com/dentistnearme" },
  ],
  footer: {
    description:
      "Dental care starts with understanding your needs. Explore our services, learn about treatment options and arrange an appointment with our team.",
    quickLinksHeading: "Quick links",
    // TODO(content): "Smile Gallery" and "Dental Blog" are in the document's quick links
    // but have no published page yet (gallery needs consented photos; blog is only a plan).
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Dental Services", href: "/dental-services" },
      { label: "Dental Prices", href: "/dental-prices" },
      { label: "Dental FAQs", href: "/dental-faqs" },
      { label: "Contact Us", href: "/contact" },
      { label: "Book an Appointment", href: "/book" },
    ],
    contactHeading: "Contact",
    // TODO(content): document adds "Confirm complete address before publication." (owner note, not shown).
    contactLines: [
      {
        label: "Email:",
        value: "dentistnearmeng@gmail.com",
        href: "mailto:dentistnearmeng@gmail.com",
        icon: "mail",
      },
      { label: "Abuja clinic:", value: "Capital Hub Plaza, Mabushi, Abuja, FCT, Nigeria.", icon: "map-pin" },
    ],
    followHeading: "Follow us",
    disclaimerHeading: "Disclaimer",
    disclaimer:
      "Information on this website is intended for general educational purposes and does not replace a professional dental examination, diagnosis or individual treatment advice. Treatment suitability and outcomes vary between patients. Please contact the clinic for current prices, appointment availability and service details.",
    copyright: "© DentistNearMeNG. All rights reserved.",
  },
};
