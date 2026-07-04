import type { Config } from "tailwindcss";

/**
 * DentistNearMe brand palette — primary #61BDFF with accessible darker steps
 * for text, nav, and surfaces (same hue family throughout).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: "#0F3D5C",
          800: "#0A3048",
          700: "#144563",
          600: "#2680C0",
        },
        teal: {
          DEFAULT: "#2680C0",
          dark: "#1A6599",
          light: "#61BDFF",
        },
        mint: { DEFAULT: "#E3F4FD", light: "#F0F9FF" },
        cream: { DEFAULT: "#F7F1E8", dark: "#EFE6D8" },
        peach: { DEFAULT: "#FBEFE2" },
        ink: { DEFAULT: "#0A3048", soft: "#4A7898" },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        blob: "1.75rem",
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(15, 61, 92, 0.2)",
        pill: "0 6px 20px -6px rgba(15, 61, 92, 0.38)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(140deg, #3DABF5 0%, #2680C0 45%, #0F3D5C 100%)",
        "panel-gradient":
          "linear-gradient(155deg, #61BDFF 0%, #4DAEF8 35%, #2680C0 70%, #1A6599 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
