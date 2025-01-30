// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "http://brawny-range.surge.sh/",
  integrations: [
    tailwind(),
    mdx(),
    icon({
      iconDir: "./src/icons",
    }),
    sitemap(),
    (await import("@playform/compress")).default(),
  ],
});

