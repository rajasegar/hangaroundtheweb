// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';
// import org from 'astro-org'

// https://astro.build/config
export default defineConfig({
  site: 'https://hangaroundtheweb.com',
  integrations: [ mdx(), sitemap()],
  adapter: netlify(),
});