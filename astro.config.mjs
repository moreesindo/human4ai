// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://human4ai.ai',
  adapter: cloudflare({
    imageService: 'compile',
    sessionKVBindingName: null,
  }),
  integrations: [tailwind()],
});
