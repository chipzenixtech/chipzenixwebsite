# Chip Zenix — Website Design Spec

**Date:** 2026-06-24
**Status:** Draft for review
**Register:** brand (marketing site — design IS the product)

---

## 1. Overview

A marketing/brand website for **Chip Zenix**, a semiconductor engineering services company
(VLSI & ASIC design, embedded systems, AI hardware acceleration). The site rebuilds and elevates
the existing reference site at `chipzenix.lovable.app` into a premium, brand-true experience.

**Tagline:** "Engineering Tomorrow's Silicon"

### Goals (all four, in priority order)
1. **Win B2B clients** — primary conversion: start a project / get in touch.
2. **Credibility / investors** — survive due-diligence scrutiny; look like a serious player.
3. **Recruit engineers** — a Careers surface and an engineer-credible voice.
4. **General brand presence** — a world-class calling card.

### Success criteria
- A visitor immediately understands what Chip Zenix does and trusts they are expert.
- Clear, low-friction path to contact (WhatsApp) from every major section.
- Reads as bespoke, precise engineering — not a template, not generic SaaS.
- Passes Impeccable's detector (no AI-slop tells) and WCAG 2.1 AA.

---

## 2. Brand strategy

- **Personality:** Precision & authority · Trusted & enterprise-grade · Bold & ambitious.
- **Voice:** Exact, confident, technically literate. Bold through clarity and scale, never hype.
- **Anti-references (explicitly NOT this):**
  - Generic SaaS template (gradient blobs, identical feature-card grids, hero-metric cliché)
  - Dense corporate/legacy consultancy (cramped, text-heavy, brochure density)
  - Flashy gamer / neon-RGB (aggressive, toy-like)
  - Cheap / free-theme look (erodes B2B + investor trust)

---

## 3. Visual system (direction)

Final tokens are formalized in `DESIGN.md` via `/impeccable init`; this is the agreed direction.

- **Theme:** dark, brand-true. Near-black canvas with a subtle navy tint (from the logo
  background) — **not** pure black. One committed dark surface; hairline-bordered panels rather
  than cards everywhere.
- **Color strategy:** *Committed/restrained* — one disciplined accent. The logo's **cyan→teal**
  is the single accent (interaction, highlights, circuit motif). Expressed as fills/strokes and in
  the logo image only — **never as gradient text** (Impeccable ban + "not flashy" requirement).
  All colors authored in **OKLCH**.
- **Contrast:** body text ≥ 4.5:1, large text ≥ 3:1, placeholders ≥ 4.5:1 (no washed-out grays).
- **Typography:** contrast-axis pairing — an engineered **display sans** + a **monospace** for
  technical data (specs, the tech arsenal, stats, labels). Mono is the deliberate "real engineers
  built this" signal. Avoid overused defaults (e.g. plain Inter) that read as templated. Display
  clamp max ≤ 6rem; letter-spacing ≥ -0.04em; `text-wrap: balance` on headings.
- **Motif:** the logo's fine circuit-trace linework reused sparingly — dividers, subtle background
  detail, schematic accents. Measured, never busy.
- **Layout:** generous, rhythm-varied spacing; intentional asymmetry for boldness; strong
  hierarchy; **no identical card grids** — each section gets a distinct treatment. Semantic z-index
  scale, no magic 9999s.
- **Motion:** Lenis smooth scroll + GSAP ScrollTrigger. Reveals vary per section (no uniform fade
  reflex); subtle parallax on circuit traces; a hero moment (traces drawing in / data pulse).
  Exponential ease-out, no bounce/elastic. Content is visible by default and *enhanced* by motion.
  Full `prefers-reduced-motion: reduce` fallbacks (crossfade/instant) on every animation.
- **Scrollbar (mandatory):** the native right-side scrollbar is **hidden globally** (no visible
  track/thumb) while scroll stays fully functional via wheel, keyboard, touch, and Lenis smooth
  scroll. Implemented with `scrollbar-width: none` + `::-webkit-scrollbar { display: none }` on the
  scroll container. Optionally a thin custom top **scroll-progress bar** as the only visible
  scroll indicator (kept subtle, on-brand).
- **Horizontal scroll (mandatory):** at least one or two **pinned horizontal-scroll** sections
  driven by GSAP ScrollTrigger (vertical wheel/scroll → horizontal translate while the section is
  pinned). Candidates: the **Capabilities / tech arsenal** rail and/or the **Services pillars** or
  **Process** steps. Must degrade gracefully — see §9: on touch/small screens it becomes a native
  swipeable horizontal carousel with CSS `scroll-snap` (no pinning), and under reduced-motion it
  falls back to a simple horizontal scroll or vertical stack.

---

## 4. Information architecture

**Hybrid:** a cinematic single-scroll Home plus deeper pages.

### Home (single scroll)
1. **Hero** — logo + "Engineering Tomorrow's Silicon" + dual CTA (*Start a project* / *See capabilities*).
2. **Trust strip** — 100+ projects · 50+ engineers · 99% client satisfaction; industries served.
3. **Two pillars** — VLSI & ASIC | Embedded Systems (overview → links to Services detail).
4. **Capabilities** — the tech arsenal (Verilog, SystemVerilog, UVM, VHDL, Cadence, Synopsys,
   Mentor Graphics, Embedded C/C++, Python, RTOS, Linux, ARM, RISC-V).
5. **Process** — how an engagement works (builds B2B trust).
6. **Testimonial** — Anika Rao, VP Engineering, Helix Silicon.
7. **About + Careers teasers** — mission/vision snippet → deep pages.
8. **Contact CTA** — strong closing conversion block (→ Contact / WhatsApp).

### Deeper pages
- **Services** — full VLSI (12) + Embedded (11) breakdowns as anchored subsections (SEO depth).
- **About** — mission, vision, story, the three locations (Silicon Valley · Bengaluru · Munich),
  and the **Founders** section (see §6).
- **Careers** — culture + roles (recruiting goal). Placeholder roles until client supplies real ones.
- **Contact** — WhatsApp form (see §5) + email/phone + locations.

### Global
- Sticky **Nav** (logo, section/page links, prominent Contact CTA) + **Footer**
  (nav, contact, locations, socials placeholder, copyright).

---

## 5. Contact form → WhatsApp

No backend (static export). The form is a **WhatsApp click-to-chat** composer.

- Fields: Name, Email, Company (optional), Message. Inline validation, accessible labels/errors.
- On submit: build a formatted text body from the fields, URL-encode it, and open
  `https://wa.me/919618102268?text=<encoded>` (target `_blank`). The user then taps **send** in
  WhatsApp. Number: **+91 96181 02268** → `919618102268`.
- The same WhatsApp action backs the primary CTAs across the site.

---

## 6. Founders (placeholder content)

Two founder cards in About:
- **Muzammil** — image `founder.png` (placeholder), role/bio TBD.
- **Founder Two** — name/role/bio TBD; image `founder.png` (placeholder) for now.

Structured so real names, roles, bios, and professional headshots drop in later without layout
changes. (Current `founder.png` is a low-res casual photo — flagged for replacement.)

---

## 7. Content sourcing

"Refine & expand existing" — base content from `chipzenix.lovable.app`, with copy sharpened and
thin sections expanded. A **humanizer** pass on all copy to remove AI-tells. Real testimonials,
founder bios, and final careers roles to be supplied by the client; well-structured placeholders
until then.

---

## 8. Technical architecture

- **Framework:** Next.js (App Router) + **TypeScript**, **static export** (`output: 'export'`) →
  hostable on any static host (Vercel/Netlify/etc.).
- **Styling:** Tailwind CSS. Design tokens authored in **OKLCH** as CSS variables, wired into the
  Tailwind theme — single source of truth shared with `DESIGN.md`.
- **Motion:** GSAP + ScrollTrigger + Lenis behind a React provider/hook; reduced-motion aware.
- **Fonts:** `next/font` (self-hosted; no layout shift).
- **Images:** assets converted to WebP (logos done: `logo.webp`, `logo-transparent.webp`;
  `founder.png` → WebP at scaffold). Note: static export does not run Next's image optimizer, so
  pre-optimized WebP assets matter.
- **SEO:** Metadata API (titles/descriptions/canonicals), Open Graph image, `sitemap.xml`,
  `robots.txt`.
- **Component structure:** one component per Home section; shared `Nav`/`Footer`; primitives
  (`Button`, `SectionHeading`, `TechChip`, `StatCounter`, `WhatsAppForm`). Focused files.

### Project layout (in current root `Chip Zenix/`)
```
app/                # routes: / , /services , /about , /careers , /contact
components/         # sections + primitives
lib/                # motion provider, whatsapp helper, content data
public/             # logo.webp, logo-transparent.webp, founder.webp, og image
styles/ or app/globals.css  # tokens + Tailwind layers
PRODUCT.md, DESIGN.md        # Impeccable design contracts
```

---

## 9. Responsiveness (mandatory) & Accessibility

### Responsiveness — non-negotiable
- **Every** section, component, and animation must work flawlessly across breakpoints:
  mobile (~360px), large phone, tablet (~768px), laptop (~1024px), desktop (~1440px), and wide
  (≥1920px). Tested at each before a section is considered done.
- Mobile-first Tailwind: layouts reflow (multi-column → stacked), type scales via `clamp()`,
  spacing scales, tap targets ≥ 44px, no horizontal *overflow* (headings tested for overflow at
  every breakpoint per Impeccable rule).
- **Horizontal-scroll sections** (§3) on touch/small screens become native swipeable carousels
  (`scroll-snap-type: x mandatory`) instead of GSAP-pinned scroll — finger-swipeable, no jank.
- The hidden-scrollbar rule (§3) applies on all platforms without breaking touch scrolling.
- Nav collapses to an accessible mobile menu (hamburger → dialog/drawer, focus-trapped).

### Accessibility
- WCAG **2.1 AA**: contrast targets per §3, keyboard-navigable, focus-visible, semantic landmarks,
  alt text, labeled form fields with accessible error messaging.
- `prefers-reduced-motion: reduce` fallback for every animation (including horizontal-scroll
  sections, which fall back to a simple scroll or vertical stack).

---

## 10. Build phases

1. Scaffold (Next + TS + Tailwind + tokens + fonts + Lenis/GSAP motion provider); convert
   `founder.png` → WebP.
2. **`/impeccable init`** → write `PRODUCT.md` + `DESIGN.md` (lock the visual system).
3. Shared layout (Nav/Footer) + primitives.
4. Home sections, built one at a time (`craft` → `critique` → `polish`).
5. Deeper pages (Services, About, Careers, Contact).
6. Final passes: `animate`, `audit` (a11y/perf), `optimize`, humanizer pass on copy.
7. Build static export + deploy.

---

## 11. Open items / to be supplied by client
- Final founder names, roles, bios, professional headshots.
- Real client testimonials and any client/industry logos.
- Final careers roles.
- Real contact email/phone for display (WhatsApp number confirmed: +91 96181 02268).

## 12. Out of scope (YAGNI for v1)
- CMS / blog backend (can add later if needed).
- Multi-language i18n.
- Server-side forms / databases (WhatsApp covers contact).
- Authenticated areas / client portal.
