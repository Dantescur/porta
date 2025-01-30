/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "sans-serif"],
        mono: ["Fira Code"],
      },
      colors: {
        background: "rgb(var(--color-background) / 1)",
        text: "rgb(var(--color-text) / 1)",
        primary: "rgb(var(--color-primary) / 1)",
        accent: "rgb(var(--color-accent) / 1)",
        surface: "rgb(var(--color-surface) / 1)",
        border: "rgb(var(--color-border) / 1)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
