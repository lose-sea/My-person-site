import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const base = process.env.ASTRO_BASE || '/';

export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://lose-sea.github.io',
  base,
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
