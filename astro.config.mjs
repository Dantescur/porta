// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://thedaniweb.eu.org",
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    icon({
      iconDir: "./src/icons",
    }),
    sitemap(),
    (await import("@playform/compress")).default(),
    vue(),
  ],
});
