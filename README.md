# Chipzenix

Marketing website for **Chipzenix** — a semiconductor engineering services company
(VLSI & ASIC design, embedded systems, and AI hardware acceleration), based in
Hyderabad and Satupally, Telangana, India.

Dark, brand-true marketing site with an animated circuit/wafer visual language,
smooth scrolling, and scroll-triggered reveals. Built as a fully static site so it
can be hosted on any static host or CDN.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, OKLCH tokens) |
| Motion | GSAP 3 + ScrollTrigger, `@gsap/react`, Lenis smooth scroll |
| Fonts | `next/font` — Clash Display, General Sans, JetBrains Mono, Chakra Petch |
| Testing | Vitest + Testing Library; Playwright (visual checks) |
| Output | Static export (`output: "export"`) |

## Getting started

```bash
npm install
npm run dev          # dev server at http://localhost:3000
```

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build → static export into `out/` |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (watch) |
| `npm run test:run` | Vitest (single run, CI) |

## Project structure

```
app/                 App Router routes (home, services, about, careers, contact)
  services/[pillar]/[slug]/  15 statically generated VLSI + embedded domain pages
  layout.tsx         Root layout — metadata, JSON-LD, fonts, providers, nav, footer
  sitemap.ts         /sitemap.xml (force-static)
  llms.txt/          /llms.txt brief for AI assistants (force-static)
  robots.ts          /robots.txt (force-static)
components/
  layout/            PillNav, MobileMenu, Footer, PageHeader
  sections/          Page sections (Hero, AboutIntro, Expertise, DomainGrid, WhyChooseUs, …)
  ui/                Reusable UI (ChipButton, Eyebrow, SpotlightCard, Reveal, Button, …)
  visual/            Canvas backgrounds (CircuitField, WaferField), GrainOverlay
  forms/             ContactForm (WhatsApp hand-off, no backend)
lib/
  content.ts         Single source of truth for site copy & data
  seo.ts             SITE_URL, share image, per-page metadata + JSON-LD helpers
  theme.ts           Accent colour for canvas drawing
  fonts.ts           next/font definitions
  whatsapp.ts        WhatsApp deep-link builder
  motion/            Lenis provider (incl. scroll reset on navigation), hash navigation,
                     reduced-motion hook
```

## Content

All copy and structured data live in `lib/content.ts` — there is no CMS. Sales/marketing
edits are made there. Notably, the site uses **truthful positioning statements**
rather than fabricated metrics, since the company is pre-launch. Service domains
(`domains`) drive the cards and the generated `/services/[pillar]/[slug]` detail pages.

The home page follows the client's change brief (Oct 2026): Hero (rotating photo slideshow) →
About (mission & vision) → Domains of Expertise (VLSI / Embedded chip buttons) → VLSI Domains →
Embedded Domains → Why choose us → Technology → Industries → FAQ → Contact. Visible copy uses no
em dashes (a test enforces it).

## Contact

The only live contact channel is **WhatsApp** (`+91 96181 02268`). The contact form
composes a pre-filled WhatsApp message — there is no server-side form handling.

## Motion & accessibility

- **Decorative canvas effects** (hero `CircuitField`, `WaferField`) animate on every
  device, independent of OS reduced-motion, but are intentionally low-amplitude,
  slow, and non-flashing. They **pause when scrolled off-screen or when the tab is
  hidden** (IntersectionObserver + `visibilitychange`) to save CPU.
- **Heavier, motion-sensitive effects** (splash, scroll reveals, pinned/horizontal
  scrollers) honour `prefers-reduced-motion`.
- Smooth scrolling is via Lenis (`lerp: 0.1`); reveals use `gsap.fromTo` so content
  is never left stuck at `opacity: 0`.

## SEO

- Per-page metadata (title template, description, keywords) and canonicals.
- OpenGraph + Twitter cards, brand favicon, and a generated OG image.
- `Organization` + `WebSite` JSON-LD structured data in the root layout.
- `sitemap.xml` and `robots.txt` covering all routes; AI crawlers explicitly allowed.
- `/llms.txt` — a plain-Markdown brief for AI assistants, generated from `lib/content.ts`.
- Visible FAQ on the home page with matching `FAQPage` JSON-LD; `WebPage` + breadcrumb
  JSON-LD on every route.
- All of it is driven by `lib/seo.ts` (`SITE_URL`, share image, per-page metadata helper)
  and the `pageSeo` / `faqs` copy in `lib/content.ts`.

The site is live at **https://www.chipzenix.com** (Vercel; the apex domain redirects to
www). If the primary domain ever changes, update `SITE_URL` in `lib/seo.ts` only.


## Build & deploy

```bash
npm run build        # emits a static site to ./out
```

`out/` is a self-contained static bundle (no Node server required). Serve it from any
static host/CDN. `next.config.ts` sets `output: "export"`, `images.unoptimized`, and
`trailingSlash` for clean nested-route hosting.
