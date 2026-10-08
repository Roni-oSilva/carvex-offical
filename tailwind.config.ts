import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "rgb(var(--brand) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        deep: "rgb(var(--deep) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Archivo", "system-ui", "sans-serif"],
      },
      maxWidth: { shell: "1240px" },
      borderRadius: {
        panel: "clamp(26px, 3.4vw, 46px)",
        slab: "clamp(18px, 2.2vw, 28px)",
      },
    },
  },
  plugins: [],
};
export default config;
