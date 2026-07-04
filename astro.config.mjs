import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// IMPORTANT: update `site` to your real GitHub Pages URL (or custom domain later).
// User site for "timmermansjoy" => https://timmermansjoy.github.io
export default defineConfig({
  site: 'https://timmermansjoy.github.io',
  integrations: [sitemap(), mdx()],
  vite: {
    // Cast avoids a Vite-version type mismatch between @tailwindcss/vite and
    // Astro's bundled Vite (cosmetic only; runtime is unaffected).
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory',
  },
  prefetch: {
    prefetchAll: true,
  },
});
