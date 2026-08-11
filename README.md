# Likhit Dixit — Photography Portfolio

A Next.js 15 (App Router) portfolio for a product & food photographer.
Optimised images via `next/image`, a working contact form, and a folder-per-client
content system so the site grows as you drop in new work.

## Requirements
- Node.js 18.18+ or 20+
- npm (or pnpm / yarn)

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```
Production build: `npm run build && npm start`

---

## Adding & managing work (the important part)

Each client is **a folder inside `public/work/`**. The site reads those folders at
build time — so adding a client, or adding photos to a client, just makes them appear.

```
public/work/
  tanishq/        01-bangles.jpg  02-earrings.jpg
  genki-cafe/     01-tray.jpg     02-berry.jpg
  spoon-me/       01-plates.jpg   02-slice.jpg   03-biscoff.jpg
  royal-dairy/    01-jalebi.jpg   02-laddoo.jpg  03-rasgulla.jpg
  dhc/            01-row.jpg      02-tree.jpg
```

**Add photos to an existing client** → drop JPG/PNG/WebP files into that client's
folder. They appear on the project page automatically, at their natural proportions.

**Control order & cover** → files are sorted by name, so prefix them `01-`, `02-`, …
The **first image is the cover** (shown on the grid and as the lead on the project page).

**Add a whole new client**
1. Create `public/work/<client-slug>/` and add images.
2. (Optional but recommended) add a matching block in **`content/clients.ts`** with the
   display name, category, tags, year and copy. A folder with no entry still shows up —
   it just uses a title-cased name and the "Work" category until you fill it in.

**Rename / recategorise / rewrite copy** → edit `content/clients.ts`. Nothing else to touch;
the grid, filters, project pages and "next project" links all update automatically.

**Image tip**: export around 2000px on the long edge. `next/image` generates the smaller
responsive/AVIF/WebP versions for you — you don't need to pre-resize per breakpoint.

---

## Other content

| What | Where |
| --- | --- |
| Client metadata & copy | `content/clients.ts` |
| Photos | `public/work/<client>/` |
| Likhit's headshot (Studio page) | `public/about/headshot.jpg` — **replace this file** |
| Design / styling | `app/globals.css` |
| Site name, SEO, fonts | `app/layout.tsx` |
| Nav / Footer (email, Instagram) | `components/Nav.tsx`, `components/Footer.tsx` |
| Contact details | `app/contact/page.tsx` |

Contact links are already set to `likhitdixit@gmail.com` and `@likhitdixit`.

---

## Contact form

The form validates and returns success out of the box (submissions log to the server
console until email is configured). To actually receive emails:

1. Create a free [resend.com](https://resend.com) account and get an API key.
2. Copy `.env.example` → `.env.local` and fill in:
   ```
   RESEND_API_KEY=re_xxxxxxxx
   INQUIRY_TO_EMAIL=likhitdixit@gmail.com
   INQUIRY_FROM_EMAIL=Likhit Dixit Studio <onboarding@resend.dev>
   ```
   (Use `onboarding@resend.dev` as the sender until you verify a domain in Resend.)
3. On Vercel add the same variables under **Settings → Environment Variables**.

Prefer no backend? Point the form at a hosted service like Formspree — only
`components/ContactForm.tsx` changes.

---

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. [vercel.com](https://vercel.com) → **Add New → Project** → import the repo → **Deploy**
   (Next.js is auto-detected).
3. Add the contact-form env vars and redeploy.
4. Add a custom domain under **Settings → Domains**, then update `SITE` in `app/layout.tsx`.

Image optimisation, caching and the API route all work automatically on Vercel.
