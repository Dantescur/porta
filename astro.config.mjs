// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

import vue from "@astrojs/vue";

// import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "http://brawny-range.surge.sh/",
  integrations: [
    tailwind(),
    icon({
      iconDir: "./src/icons",
    }),
    sitemap(),
    (await import("@playform/compress")).default(),
    vue(),
  ],
});

