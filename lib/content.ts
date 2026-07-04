export const SITE = {
  name: "DentistNearMe",
  phone: "+234 (81) 6567-8901",
  email: "dentistnearmeng@gmail.com",
  hours: { weekdays: "Mon – Fri · 9:00 – 17:00", weekend: "Sat – Sun · 5:00 – 17:30" },
  social: {
    facebook: "https://www.facebook.com/dentistnearme",
    instagram: "https://www.instagram.com/dentistnearme",
    tiktok: "https://www.tiktok.com/@dentistnearme",
    x: "https://x.com/dentistnearme",
  },
} as const;

export const STATS = [
  {
    figure: "92%",
    label: "Comfort & Care",
    copy: "Of patients say they feel less anxiety during visits with us.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70",
  },
  {
    figure: "3/4",
    label: "Trusted by Community",
    copy: "New patients come from word-of-mouth referrals — the care speaks for itself.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=70",
  },
  {
    figure: "7 Mi",
    label: "Quick & Accessible",
    copy: "Just 7 minutes is the average wait time before being seen.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=70",
  },
  {
    figure: "24/7",
    label: "Emergency Support",
    copy: "Experiencing sudden pain, injury or issues? Our team is here for you 24/7.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=70",
  },
  {
    figure: "85%",
    label: "Healthy Smiles",
    copy: "We're proud to keep our community smiling year after year.",
    image:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=900&q=70",
  },
] as const;

export type Service = {
  index: string;
  slug: string;
  title: string;
  copy: string;
  tags: string[];
  surface: "lavender" | "peach" | "mint" | "cream";
  image: string;
  /** Appointment length in minutes — mirrors supabase/schema.sql. */
  durationMinutes: number;
};

export const SERVICES: Service[] = [
  {
    index: "[01]",
    slug: "preventive-dentistry",
    title: "Preventive dentistry",
    copy: "Early care and regular checkups are the key to avoiding serious dental issues. Our preventive treatments help you maintain strong, healthy teeth and gums.",
    tags: ["Checkups", "Cleanings", "Oral Health", "Whitening"],
    surface: "lavender",
    durationMinutes: 45,
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1100&q=70",
  },
  {
    index: "[02]",
    slug: "cosmetic-dentistry",
    title: "Cosmetic dentistry",
    copy: "Cosmetic dentistry improves the appearance of your teeth through treatments like whitening, veneers, and bonding, helping you achieve a brighter, more confident smile.",
    tags: ["Whitening", "Veneers", "Bonding", "Smile Design"],
    surface: "peach",
    durationMinutes: 60,
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=70",
  },
  {
    index: "[03]",
    slug: "restorative-dentistry",
    title: "Restorative dentistry",
    copy: "From fillings to crowns and implants, our restorative care rebuilds damaged teeth so you can chew, speak, and smile with total confidence again.",
    tags: ["Fillings", "Crowns", "Implants", "Bridges"],
    surface: "mint",
    durationMinutes: 75,
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1100&q=70",
  },
  {
    index: "[04]",
    slug: "pediatric-dentistry",
    title: "Pediatric dentistry",
    copy: "Gentle, friendly care designed for growing smiles. We make every visit feel safe and fun so children build healthy habits that last a lifetime.",
    tags: ["Kids Checkups", "Sealants", "Fluoride", "Education"],
    surface: "cream",
    durationMinutes: 40,
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1100&q=70",
  },
];

export type Doctor = {
  name: string;
  role: string;
  image: string;
  locationCity: string;
  /** Service slugs this specialist handles — one specialist per service. */
  services: readonly string[];
};

export const DOCTORS: Doctor[] = [
  {
    name: "Dr.David Waza",
    role: "Pediatric Dentist",
    locationCity: "Maitama, Abuja",
    services: ["preventive-dentistry", "pediatric-dentistry"],
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=70",
  },
  {
    name: "Dr.Excel Bagi",
    role: "Pediatric Dentist",
    locationCity: "Wuse, Abuja",
    services: ["cosmetic-dentistry"],
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=70",
  },
  {
    name: "Dr.Bagi",
    role: "Pediatric Dentist",
    locationCity: "Garki, Abuja",
    services: ["restorative-dentistry"],
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=70",
  },
];

/** Returns the specialist auto-assigned to a service, or null when unknown. */
export function getSpecialistForService(serviceSlug: string): Doctor | null {
  return DOCTORS.find((doctor) => doctor.services.includes(serviceSlug)) ?? null;
}

export const WHY_US = [
  {
    title: "Compassionate & Care",
    copy: "Our approach goes beyond treatment — we provide compassionate care that ensures every patient feels comfortable, understood, and supported throughout their dental journey.",
  },
  {
    title: "Advanced Technology",
    copy: "Digital imaging, laser dentistry, and same-day restorations mean faster visits, more precise diagnoses, and more comfortable treatment.",
  },
  {
    title: "Comprehensive Services",
    copy: "From your child's first checkup to full smile restorations, every stage of dental care lives under one roof — no referrals, no runaround.",
  },
  {
    title: "Our Honesty & Trust",
    copy: "Transparent pricing, clear treatment plans, and honest recommendations. We only suggest the care you actually need.",
  },
  {
    title: "Patient-Centered Care",
    copy: "Your schedule, comfort, and goals shape every appointment. Flexible hours, gentle techniques, and care plans built around you.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Kristin Watson",
    role: "Business Owner",
    quote:
      "I've always been nervous about visiting the dentist, but DentistNearMe changed everything. The staff is warm, and the care is exceptional. I finally enjoy smiling again.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Amara Okafor",
    role: "Teacher",
    quote:
      "Booking was effortless and the team saw my daughter the same week. Gentle, patient, and genuinely kind — we've found our family dentist for good.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Daniel Reyes",
    role: "Software Engineer",
    quote:
      "Seven-minute wait, transparent pricing, and a crown done in one visit. DentistNearMe runs like the future of dentistry should.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=70",
  },
] as const;

export const LOCATIONS = [
  {
    city: "Mabushi, Abuja",
    line: "Capital Hub Plaza, Mabushi, Abuja",
    image:
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=900&q=70",
  },
  {
    city: "Location soon in Abuja",
    line: "unknown",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=70",
  },
  {
    city: "Lokoja, Kogi",
    line: " 6, Dr. E.B Animoku street, High level community, Lokoja, Kogi state",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70",
  },
] as const;
