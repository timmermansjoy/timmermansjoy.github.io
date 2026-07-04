# AGENTS.md

Guidance for AI agents working in this repo.

## Commands

- `npm run dev` — start the dev server at http://localhost:4321
- `npm run build` — type-check (`astro check`) then build to `./dist`
- `npm run check` — run `astro check` only (type/lint diagnostics)
- `npm run preview` — preview the production build locally

Always run `npm run check` (or `npm run build`) after non-trivial edits and confirm 0 errors before considering the work done.

## Architecture

- Astro 5 static site, Tailwind CSS v4 via `@tailwindcss/vite`.
- Single **editorial** theme at root `/` (Fraunces + Inter, warm palette, asymmetric sticky-label grid). Blog at `/blog`, posts at `/blog/[slug]`.
- Sections: About, Impact (static numbers), Experience, PullQuote, Skills, Projects, Education, Community, Contact.
- **Content is data, not markup.** Edit `src/data/*.ts` and the site updates. Blog posts are Markdown in `src/content/blog/` (schema in `src/content.config.ts`).
- **Astro components are default exports** — import with `import Foo from './Foo.astro'`, not `import { Foo }`.
- **Dark mode** is class-based: `@custom-variant dark` in `src/styles/global.css`, toggled on `<html>` by `ThemeInit`/`ThemeToggle`. Keep using Tailwind `dark:` variants; don't reintroduce `prefers-color-scheme` media queries in components.
- Fonts self-hosted via `@fontsource-variable/*` (no external requests).
- `astro.config.mjs` has no `// @ts-check` (intentional) to avoid a cosmetic Vite-type mismatch with `@tailwindcss/vite`.

## Layout

```
public/        logos (cleaned), favicon, robots.txt
source/        original résumé (LaTeX + PDF), not part of the build
src/
  components/  shared/ + editorial/
  data/        typed content (single source of truth)
  content/blog markdown posts
  layouts/     BaseLayout + EditorialLayout
  pages/       index + blog/ + rss.xml + 404
  styles/global.css
  consts.ts    SITE + NAV
.github/workflows/deploy.yml   GitHub Pages deploy on push to main
```

## Deploy target

User site: repo `timmermansjoy.github.io`, served at `https://timmermansjoy.github.io`. `astro.config.mjs` `site` must match. Update it if the deploy URL changes.
