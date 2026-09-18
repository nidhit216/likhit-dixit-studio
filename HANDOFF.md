# HANDOFF

Working notes so anyone (you or Claude Code) can pick this up cleanly.
Architecture and conventions live in `CLAUDE.md`; this file is **status + what's next**.

## Snapshot (current state)

- Clean Next.js 15 portfolio, **no database** — content is folder-driven
  (`public/work/**` + `content/clients.ts`).
- Responsive pass is applied (breakpoints 880px / 560px; mobile menu; tap
  targets; no horizontal overflow).
- Real headshot added at `public/about/headshot.jpg`.
- Routes today: `/` · `/work` · `/work/[slug]` · `/studio` (about-the-practice)
  · `/contact`. Nav labels: **Work · Studio · Contact**.
- Five projects live: Tanishq, Genki Cafe, Spoon Me, Royal Dairy Farm, DHC.
- Deployed: https://likhit-dixit-studio.vercel.app

## How we got here (short history)

1. Built the site (Direction C — minimal/editorial) as a filesystem-driven
   Next.js app.
2. Added a full responsive pass to `app/globals.css` + `components/ProjectCard.tsx`.
3. Trialed a custom **admin/CMS panel** (NextAuth + Prisma + Neon Postgres +
   Vercel Blob). It was merged into the repo by copying files in, which caused a
   build break (`@prisma/client` unresolved) and a failed `git apply`. It was
   **reverted** — the repo is intentionally back to the simple, DB-free version.
   The admin build still exists as a separate zip if it's ever wanted again;
   re-introduce it deliberately (with the DB/env setup), not by copying files.

**Lesson worth keeping:** apply changes with `git apply`/branches, not by
extracting zips over the working tree — that's what caused the tangle above.

## Queued changes (spec'd, not yet done)

Do these on a branch, run `npm run build`, then commit. Each is self-contained.

### 1. Rename "Studio" → "About"
- Move `app/studio/page.tsx` → `app/about/page.tsx` (rename the component too),
  set `metadata.title` to `"About"`.
- `components/Nav.tsx` and `components/Footer.tsx`: change the `/studio`/"Studio"
  link to `/about`/"About".
- `next.config.mjs`: add a redirect so old links survive:
  `async redirects() { return [{ source: "/studio", destination: "/about", permanent: true }]; }`
- Grep for any remaining `"/studio"` references.

### 2. Add a "Landscapes" work category (drone stills **and** videos)
- `lib/types.ts`: add
  `export type VideoItem = { provider: "youtube" | "vimeo"; id: string; title?: string };`
  and `videos?: VideoItem[];` on `Project`.
- `content/clients.ts`: add `videos?: VideoItem[]` to `ClientMeta`; add a
  `landscapes` entry (`cat: "Landscapes"`, `tags: ["Landscapes"]`, an `order`,
  copy, and `videos: []` with a comment showing the format); append
  `"Landscapes"` to `FILTER_ORDER`.
- `lib/gallery.ts`: include `videos: meta.videos ?? []` on each project, and
  change the filter to keep projects that have images **or** videos:
  `.filter((p) => p.images.length > 0 || (p.videos?.length ?? 0) > 0)`.
- New `components/VideoEmbed.tsx`: responsive 16:9 iframe for YouTube/Vimeo (take
  a `VideoItem`; build `https://www.youtube-nocookie.com/embed/<id>` or
  `https://player.vimeo.com/video/<id>`).
- `app/work/[slug]/page.tsx`: render a films block (map `p.videos` to
  `VideoEmbed`) before the stills gallery.
- `app/globals.css`: add `.films` / `.video-embed` / `.film-cap` styles
  (16:9 via `aspect-ratio`, iframe absolutely filling it).
- Create `public/work/landscapes/` and drop real drone stills in (`01-*.jpg`, …).
  Add drone film IDs to the `videos` array in the `landscapes` entry.

### 3. Remove "How a project runs" from the About page
- Delete that `<span className="lab">How a project runs</span>` block and its
  following `.rows` list from the (renamed) About page.

### 4. Add "Landscapes" to the Services list
- On the About page Services `.rows`, add a fifth row, e.g.
  `05 · Landscapes & aerial · Drone · stills & film`.
- For consistency, add the same row to the Home page studio-teaser `.rows`.

### 5. Move "Selected clients" to the homepage
- Remove the "Selected clients" block from the About page.
- Add a "Selected clients" section on `app/page.tsx`. Derive it from projects so
  it stays in sync, excluding personal categories:
  `const clients = projects.filter((p) => p.cat !== "Landscapes").map((p) => p.name);`
  Render with the existing `.clients` styling.

## Still-open content to replace
- More frames for Tanishq / Genki / DHC (only 2 each today).
- Real drone stills + film links for the new Landscapes category.
- Confirm DHC's full brand name and the real year/image counts per project.

## Running this from your terminal (Claude Code)

Claude Code reads `CLAUDE.md` automatically, so it'll know the project on launch.

Install (native installer — no Node needed for the CLI itself):
```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
# or Homebrew
brew install --cask claude-code
```
(Legacy npm alternative: `npm install -g @anthropic-ai/claude-code` — needs
Node.js; recent versions want Node 22+. Requires a Claude subscription or an
Anthropic API key.) Verify with `claude --version`; docs:
https://docs.claude.com/en/docs/claude-code/setup

Then, in the project folder:
```bash
cd likhit-dixit-studio
claude            # first run walks you through auth
```
Good first prompts:
- "Read CLAUDE.md and HANDOFF.md, then do queued task 1 (Studio → About) on a new branch and run the build."
- "Do queued task 2 (Landscapes category with video support) per HANDOFF.md."
Work one task per branch, let it run `npm run build`, review the diff, commit.
