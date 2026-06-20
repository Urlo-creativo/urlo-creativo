import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--uc-ink)",
        black: "var(--uc-black)",
        paper: "var(--uc-paper)",
        yellow: "var(--uc-yellow)",
        gray: {
          50: "var(--uc-gray-50)",
          100: "var(--uc-gray-100)",
          200: "var(--uc-gray-200)",
          300: "var(--uc-gray-300)",
          400: "var(--uc-gray-400)",
          500: "var(--uc-gray-500)",
          600: "var(--uc-gray-600)",
          700: "var(--uc-gray-700)",
          800: "var(--uc-gray-800)",
          900: "var(--uc-gray-900)"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      borderRadius: {
        pill: "var(--radius-pill)"
      },
      maxWidth: {
        content: "var(--content-max)"
      }
    },
  },
  plugins: [],
};

export default config;
