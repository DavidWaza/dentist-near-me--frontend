import type { Config } from "tailwindcss";

/**
 * DentistNearMe — accessible darker blues derived from brand palette
 * (#3BAEE0 · #2897CC · #1A7BAF), tuned for WCAG contrast on light backgrounds.
 *
 * bright #3BAEE0 → teal-light only (highlights on dark panels, not body text)
 * mid    #2897CC → gradients & deep-600
 * deep   #1A7BAF → accents; darker steps for surfaces & headlines
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: "#0F4563",
          800: "#0C3549",
          700: "#124E6F",
          600: "#1A7BAF",
        },
        teal: {
          DEFAULT: "#155F85",
          dark: "#124E6F",
          light: "#5BAFD4",
        },
        mint: { DEFAULT: "#E2EEF4", light: "#EDF4F8" },
        cream: { DEFAULT: "#F7F1E8", dark: "#EFE6D8" },
        peach: { DEFAULT: "#FBEFE2" },
        ink: { DEFAULT: "#0C3549", soft: "#3A6578" },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        blob: "1.75rem",
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(12, 53, 73, 0.2)",
        pill: "0 6px 20px -6px rgba(12, 53, 73, 0.38)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(140deg, #1A7BAF 0%, #124E6F 50%, #0C3549 100%)",
        "panel-gradient":
          "linear-gradient(155deg, #2897CC 0%, #1A7BAF 45%, #124E6F 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
