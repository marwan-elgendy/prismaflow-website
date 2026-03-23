# PrismaFlow Website

**"SHAPING THE DESIRE"** — Neuromarketing agency website built with Next.js 16, Sanity CMS, Tailwind CSS v4, Framer Motion, and next-intl (Arabic + English, full RTL).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| CMS | Sanity v3 (headless) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| i18n | next-intl (EN + AR / RTL) |
| Fonts | Space Grotesk (Latin) + Cairo (Arabic) |
| Language | TypeScript |

---

## Environment Setup

Copy `.env.local` and fill in real Sanity credentials:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
REVALIDATE_SECRET=your-revalidate-secret
```

**Get Sanity credentials:**
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create a new project (name: PrismaFlow, dataset: production)
3. Copy the **Project ID** → `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. Under API → Tokens, create a token with **Editor** permissions → `SANITY_API_TOKEN`

---

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) (English) or [http://localhost:3000/ar](http://localhost:3000/ar) (Arabic).

---

## CMS — Sanity Studio

Access the embedded Studio at: [http://localhost:3000/studio](http://localhost:3000/studio)

**First-time setup:**
1. Set real Sanity credentials in `.env.local`
2. From the project root, run: `npx sanity deploy` (optional, for hosted studio)
3. In Studio, create documents for: **Home Page**, **About Page**, **Services Page**, **Apply Page**, **Site Settings**

**Adding blog posts:**
1. Go to `/studio` → Blog Post → New
2. Fill in Title (EN + AR), Slug (auto-generated from EN title), body content
3. Publish → site updates via ISR or webhook revalidation

---

## i18n — Adding/Editing Translations

Static UI strings live in:
- `src/messages/en.json` — English
- `src/messages/ar.json` — Arabic

Dynamic content (page copy, blog) is managed in Sanity with `localizedString` fields (en + ar per field).

To add a new language:
1. Add locale to `src/i18n/routing.ts`
2. Create `src/messages/{locale}.json`
3. Add font subset if needed in `src/app/[locale]/layout.tsx`

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add all `.env.local` variables as Vercel Environment Variables
4. Deploy

**Sanity webhook for ISR revalidation:**
1. In Sanity → API → Webhooks, create a webhook pointing to: `https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
2. Set method: POST, trigger on: publish/unpublish
3. Add `REVALIDATE_SECRET` to Vercel env vars

---

## Project Structure

```
src/
  app/
    [locale]/          ← All user-facing pages (en/ar)
    studio/            ← Embedded Sanity Studio
    api/revalidate/    ← ISR webhook endpoint
    sitemap.ts         ← Auto-generated sitemap
    robots.ts
  components/
    effects/           ← NeuralBackground, GlowText
    ui/                ← Button, Badge, SectionLabel
    layout/            ← Navbar, Footer, LanguageSwitcher
    sections/          ← Page sections (Hero, Problem, Process, etc.)
    blog/              ← BlogCard, BlogGrid
    forms/             ← ApplicationForm, LeadCaptureForm
  lib/
    sanity.ts          ← Sanity client
    queries.ts         ← GROQ queries
    utils.ts           ← Helpers
  messages/            ← i18n JSON files
  i18n/                ← next-intl config
sanity/
  schemas/             ← All Sanity document schemas
  sanity.config.ts
  sanity.cli.ts
```
