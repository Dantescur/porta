// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import partytown from '@astrojs/partytown'

import tailwindcss from "@tailwindcss/vite";

import Sonda from 'sonda/astro'

import sitemap from "@astrojs/sitemap";

import vue from "@astrojs/vue";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://thedaniweb.eu.org",
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true
    }
  },
  integrations: [icon(), sitemap(), Sonda(), partytown(), (await import("@playform/compress")).default(), vue(), robotsTxt()],
});
