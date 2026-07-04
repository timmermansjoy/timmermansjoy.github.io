# joy-timmermans-site

Personal site for Joy Timmermans — AI & Computer Vision Engineer. Built with Astro + Tailwind CSS v4, deployed to GitHub Pages.

## Theme

The site uses a single **editorial** design: large Fraunces display serif paired with Inter for body, an asymmetric sticky-label grid, and a warm off-white palette (`#f6efe1` light / `#17120b` dark) with a burnt-sienna accent (`#8a3a14` / `#e07a3e`). Light + dark modes are both supported, toggled from the header.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
```

Open `/` for the landing page, `/blog` for the journal.

## Build & preview

```bash
npm run build    # type-checks (astro check) then builds to ./dist
npm run preview  # preview the production build locally
```

## Content

All copy comes from typed data files in `src/data/` — edit those and the site updates:

- `profile.ts` — name, title, location, email, socials
- `summary.ts` — professional summary
- `experience.ts` — roles; `LeftFields` uses nested `clients` (Rematics / Daymaker / RapidFit)
- `education.ts`, `projects.ts`, `opensource.ts`, `skills.ts`, `languages.ts`
- `impact.ts` — headline metrics shown in the Impact section

Blog posts are Markdown in `src/content/blog/` (frontmatter schema defined in `src/content.config.ts`). An RSS feed is generated at `/rss.xml`.

The original résumé (LaTeX + PDF) is preserved in `source/` for reference and is not part of the build.

## Logos

`public/logo-black.svg` and `public/logo-white.svg` are the JT monogram. The fragile Figma `foreignObject` conic-gradient hack on the circle was rewritten as a native SVG `radialGradient` so it renders in all browsers. `public/favicon.svg` is a simplified solid version for crisp small-size rendering. The `Logo` component swaps between the two by color mode.

## Deploy to GitHub Pages (user site)

This project is configured for a **user site** (repo named `timmermansjoy.github.io`, served at `https://timmermansjoy.github.io`). The `.github/workflows/deploy.yml` workflow builds and publishes on every push to `main`.

1. Create an empty repo named `timmermansjoy.github.io` on GitHub.
2. Push this project to `main`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: personal site"
   git branch -M main
   git remote add origin git@github.com:timmermansjoy/timmermansjoy.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The `Deploy to GitHub Pages` workflow runs on push and publishes `./dist`. Watch it under the **Actions** tab. When green, the site is live at `https://timmermansjoy.github.io`.

> `astro.config.mjs` sets `site: 'https://timmermansjoy.github.io'` (used for sitemap, RSS, canonical URLs). Update it if you change the deploy URL.

## Custom domain (later)

1. Add a `CNAME` file at `public/CNAME` containing your domain (e.g. `joy.example.com`).
2. In **Settings → Pages → Custom domain**, enter the domain and verify.
3. At your DNS provider, add a CNAME record pointing the subdomain to `timmermansjoy.github.io` (or A/AAAA records pointing the apex to GitHub Pages IPs for an apex domain). See GitHub's docs.
4. Update `site` in `astro.config.mjs` to the new URL and rebuild.

## Tech notes

- **Astro 5** static output, `@astrojs/sitemap`, `@astrojs/mdx`, `@astrojs/rss`.
- **Tailwind CSS v4** via `@tailwindcss/vite` (config is in `src/styles/global.css` using `@theme` and a class-based `dark:` variant toggled on `<html>`).
- Self-hosted variable fonts via `@fontsource-variable/inter` and `@fontsource-variable/fraunces` (no external requests).
- Color mode: `no-FOUC` inline script in `<head>`, manual toggle persisted in `localStorage`, respects OS preference as the default.
- Accessibility: skip link, semantic landmarks, visible focus, `prefers-reduced-motion` honored.
- SEO: per-page `<title>`/description, canonical, Open Graph, Twitter, JSON-LD `Person`, sitemap, `robots.txt`.
