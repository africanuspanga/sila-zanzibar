import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SILA brand — navy is dominant, red is a highlight accent.
        navy: {
          50: "#eef2f8",
          100: "#d6e0ee",
          200: "#adc0dc",
          300: "#7594bf",
          400: "#3f65a0",
          500: "#1c437f",
          600: "#123566",
          700: "#0d2f5c",
          800: "#082B5C", // primary blue (brand)
          900: "#06203f",
          950: "#03132a",
        },
        crimson: {
          50: "#fdf2f3",
          100: "#fbe0e2",
          200: "#f6c3c7",
          300: "#ef9aa1",
          400: "#e5636e",
          500: "#d63a47",
          600: "#C91F2C", // primary red (brand)
          700: "#a71722",
          800: "#8a1620",
          900: "#741820",
          950: "#3f090d",
        },
        sand: {
          50: "#faf9f6",
          100: "#f7f7f5", // soft background (brand)
          200: "#efeee9",
          300: "#e7e7e3", // light border (brand)
          400: "#d6d5cd",
          500: "#b8b6aa",
        },
        ink: "#171717", // dark text
        muted: "#6B6B6B", // muted text
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.28em",
      },
      maxWidth: {
        container: "1240px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(8,43,92,0.04), 0 12px 32px -12px rgba(8,43,92,0.14)",
        "card-hover": "0 2px 4px rgba(8,43,92,0.06), 0 30px 60px -20px rgba(8,43,92,0.28)",
        float: "0 24px 70px -24px rgba(3,19,42,0.45)",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 38s linear infinite",
        "slow-zoom": "slow-zoom 18s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
