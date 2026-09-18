# CLAUDE.md

Guidance for Claude Code (and any AI assistant) working in this repo. Read this
first, then `HANDOFF.md` for current status and the queued tasks.

## What this is

A portfolio site for **Likhit Dixit**, a product & food photographer in Mumbai.
The goal is to win high-end commercial clients — the aesthetic is deliberately
minimal and editorial (Swiss/architectural), **not** a busy Instagram grid.
Live at https://likhit-dixit-studio.vercel.app.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- Styling: a single global stylesheet, `app/globals.css` — **no Tailwind, no CSS
  modules**. Components attach plain class names that this file styles.
- Images: `next/image`; fonts: `next/font/google` (Space Grotesk + Inter).
- No database. Content is read from the filesystem at build time (see below).
- Deploys on Vercel.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (also the type-check gate)
npm run start   # serve the production build
npm run lint
```

Requires Node.js 18.18+ or 20+. `npm run build` fetches Google Fonts, so it needs
network access (it runs fine on Vercel and any normal machine).

## Project structure

```
app/
  layout.tsx            # root layout; sets --font-grotesk / --font-inter, Nav + Footer
  page.tsx              # Home (hero, Selected Work, studio teaser)
  work/page.tsx         # Work index — grid + category filter chips
  work/[slug]/page.tsx  # Project detail — story, meta, gallery, next-project
  studio/page.tsx       # "Studio" = the about-the-practice page (bio, services, clients)
  contact/page.tsx      # Contact form
  api/inquiry/route.ts  # Contact form handler
  globals.css           # ALL styling + the responsive layer
components/             # Nav, Footer, ProjectCard, WorkGridClient, Photo, Reveal, ContactForm
content/clients.ts      # Per-project metadata + filter order (the content you edit)
lib/gallery.ts          # Reads public/work/** at build time -> Project[]
lib/types.ts            # GalleryImage, Project types
public/work/<slug>/     # One folder per project; images live here
public/about/           # headshot.jpg
```

Path alias: `@/*` maps to the repo root (e.g. `@/components/Nav`, `@/lib/gallery`).

## Content model — how the site gets its work (important)

Work is **folder-driven**. `lib/gallery.ts` reads every directory in
`public/work/` at build time and builds the project list.

To add a project:
1. Create `public/work/<slug>/` and drop images in, named `01-*.jpg`, `02-*.jpg`, …
   Filenames are sorted; **the first image is the cover** (grid + page lead).
   Export around 2000px on the long edge — `next/image` makes the responsive
   sizes automatically.
2. Add a matching entry in `content/clients.ts` (`CLIENT_META[slug]`): `name`,
   `cat`, `tags`, `order`, `year`, `services`, `deliverables`, `summary`,
   `approach`. A folder with no entry still shows up with a title-cased name and
   the "Work" category.

Filters/categories come from each project's `tags`. The chip order is
`FILTER_ORDER` in `content/clients.ts`; any tag not listed there is appended.
A project only appears if its folder contains at least one image.

`approach` may contain a single `<b>…</b>` for emphasis (rendered as HTML).

## Design conventions

- Palette and type live as CSS variables at the top of `app/globals.css`
  (`--paper`, `--ink`, `--slate`, `--font-grotesk`, `--font-inter`, etc.). Reuse
  them; don't hard-code hex values in components.
- Layout is a 12-column grid via `grid-template-columns: repeat(12, 1fr)`, with
  generous `clamp()`-based whitespace and hairline rules.
- **Responsive layer** (bottom of `globals.css`): breakpoints at **880px**
  (stacks the grids, shows the mobile menu) and **560px** (small-phone tuning).
  Keep tap targets ≥ 44px, form font-size 16px (prevents iOS zoom), and add
  `min-width: 0` on grid children so long words can't cause horizontal scroll.
- Scroll-reveal is the `Reveal` component + `.reveal`/`.in` classes; it respects
  `prefers-reduced-motion`.
- Copy voice: plain, precise, confident. No exclamation-mark marketing.

## Contact form

`ContactForm` POSTs to `app/api/inquiry/route.ts`. If `RESEND_API_KEY` is set it
emails via Resend; if not, it still succeeds and logs to the server console.
Env vars (see `.env.example`): `INQUIRY_TO_EMAIL`, `RESEND_API_KEY`,
`INQUIRY_FROM_EMAIL`. Never commit real secrets — use `.env.local` / Vercel env.

## Guardrails — please respect these

- **Keep it database-free and filesystem-driven.** An admin/CMS + Prisma/Postgres
  build was trialed and deliberately reverted (see `HANDOFF.md`). Do **not**
  reintroduce Prisma, NextAuth, or an `/admin` area unless a task explicitly asks
  for it — it turns a static site into one that needs a live DB to render.
- Don't add Tailwind or a CSS framework; extend `globals.css` in the existing
  style.
- Don't use `localStorage`/`sessionStorage` in components rendered on the server.
- Make edits **surgical**. Prefer editing files in place over regenerating them,
  and run `npm run build` before considering a change done.
- When changing routes, update `components/Nav.tsx`, `components/Footer.tsx`, and
  add a redirect in `next.config.mjs` for the old path.

## Where the current tasks are

See **`HANDOFF.md`** for the project snapshot and the queued, spec'd changes.
