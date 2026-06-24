# Chip Zenix Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, dark, brand-true marketing website for Chip Zenix (semiconductor engineering services) with smooth scroll, horizontal-scroll sections, hidden scrollbar, and full responsiveness.

**Architecture:** Next.js (App Router) + TypeScript, statically exported. Tailwind v4 CSS-first tokens (OKLCH) drive a single design system shared with Impeccable's `DESIGN.md`. Motion = Lenis smooth scroll + GSAP/ScrollTrigger behind a React provider, all reduced-motion aware. Contact is a backend-free WhatsApp click-to-chat composer. Each visual section is built with Impeccable (`craft → critique → polish`) and gated on build + detector + responsive checks.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · GSAP 3 + ScrollTrigger + `@gsap/react` · Lenis · `next/font` · Vitest + Testing Library · Impeccable (design skill + detector hook).

> **Process note (verification model):** Pure logic (WhatsApp builder, form validation, content shape) is built test-first with Vitest. Visual sections cannot be meaningfully unit-tested; their "test" is: `npm run build` passes, the Impeccable detector reports no new findings, and the section renders correctly at every breakpoint (360 / 768 / 1024 / 1440 / 1920) including reduced-motion. Those are the gates listed in each visual task. Commit after every task.

## Global Constraints

Copied from the spec (`docs/superpowers/specs/2026-06-24-chipzenix-website-design.md`). Every task inherits these.

- **Framework:** Next.js App Router + TypeScript; **static export** (`output: 'export'`, `images.unoptimized: true`).
- **Styling:** Tailwind CSS v4; all colors authored in **OKLCH** as CSS variables/`@theme` tokens; single source of truth shared with `DESIGN.md`.
- **Register:** brand. Personality: precision & authority · trusted & enterprise-grade · bold & ambitious.
- **Color:** one disciplined accent (logo cyan→teal). Body text ≥ **4.5:1**, large text ≥ **3:1**, placeholders ≥ 4.5:1.
- **Type:** Space Grotesk (display/UI, multiple weights) + JetBrains Mono (technical/data). One proportional family + mono (contrast axis). Display clamp max ≤ **6rem**; display letter-spacing ≥ **-0.04em**; `text-wrap: balance` on h1–h3.
- **Scrollbar:** native scrollbar **hidden globally** (`scrollbar-width:none` + `::-webkit-scrollbar{display:none}`); scroll stays fully functional; Lenis drives smoothing.
- **Horizontal scroll:** ≥ 1–2 GSAP-pinned horizontal sections; on touch/small screens degrade to native `scroll-snap` carousel; under reduced-motion degrade to simple scroll/stack.
- **Responsiveness (mandatory):** flawless at 360 / 768 / 1024 / 1440 / 1920; mobile-first; no horizontal overflow; tap targets ≥ 44px; headings tested for overflow at every breakpoint.
- **Motion:** exponential ease-out, no bounce/elastic; reveals vary per section; content visible by default; every animation has a `prefers-reduced-motion: reduce` fallback.
- **Impeccable absolute bans:** no gradient *text* (`background-clip:text`), no side-stripe borders, no default glassmorphism, no hero-metric template cliché, no identical card grids, no tracked-uppercase eyebrow on every section, no `01/02/03` markers as default scaffolding, no text overflow.
- **Contact:** WhatsApp click-to-chat → `https://wa.me/919618102268`. No backend.
- **Founders:** two cards — **Muzammil** + **Founder Two** (placeholder); both use `founder.png`/`founder.webp` for now.
- **A11y:** WCAG 2.1 AA; keyboard-navigable; focus-visible; semantic landmarks; labeled fields + accessible errors.
- **Detector hook:** the Impeccable `PostToolUse` hook runs after each UI edit; treat its findings as required fixes before completing a task.

---

## Phase 0 — Foundation

### Task 1: Scaffold Next.js app + tooling + assets

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `public/logo.webp`, `public/logo-transparent.webp`, `public/founder.webp` (from existing assets)
- Create: `vitest.config.ts`, `vitest.setup.ts`

**Interfaces:**
- Produces: a runnable Next app (`npm run dev`, `npm run build`), Vitest runner (`npm test`), and assets available under `/`.

- [ ] **Step 1: Initialize the Next.js app in the current directory.** Verify current `create-next-app` flags first (context7 or `npx create-next-app@latest --help`), then run with: TypeScript, Tailwind, App Router, no `src/` dir, import alias `@/*`. Scaffold into the existing `Chip Zenix` folder (use a temp dir + move, or `.` if empty enough). Keep the existing `logo*.webp`, `founder.png`, `docs/`, `.claude/`.

- [ ] **Step 2: `git init`** (project is not yet versioned). Add a `.gitignore` covering `node_modules`, `.next`, `out`, `.DS_Store`. Do an initial commit of the scaffold.

- [ ] **Step 3: Configure static export** in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // required: static export has no image optimizer
  trailingSlash: true,           // clean static hosting of nested routes
};

export default nextConfig;
```

- [ ] **Step 4: Install runtime + dev deps.**

```bash
npm i gsap @gsap/react lenis
npm i -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

- [ ] **Step 5: Convert the founder photo to WebP** into `public/`:

```bash
python -c "from PIL import Image; Image.open(r'founder.png').convert('RGBA').save(r'public/founder.webp','WEBP',quality=90,method=6)"
```

Also copy `logo.webp` and `logo-transparent.webp` into `public/`.

- [ ] **Step 6: Configure Vitest** (`vitest.config.ts` with `jsdom` env, `@vitejs/plugin-react`, setup file importing `@testing-library/jest-dom`; alias `@` → project root). Add `"test": "vitest"` to `package.json` scripts.

- [ ] **Step 7: Verify build + dev + test.**

Run: `npm run build` → Expected: succeeds, emits `out/`.
Run: `npm run dev` then load `/` → Expected: default page renders.
Run: `npm test -- --run` → Expected: "no test files" (runner works).

- [ ] **Step 8: Commit.** `git add -A && git commit -m "chore: scaffold Next.js static-export app with tooling and assets"`

---

### Task 2: Design system — `/impeccable init` + OKLCH tokens + global styles + fonts + hidden scrollbar

**Files:**
- Create: `PRODUCT.md`, `DESIGN.md` (via Impeccable)
- Modify: `app/globals.css` (tokens + base), `app/layout.tsx` (fonts, metadata shell)
- Create: `lib/fonts.ts`

**Interfaces:**
- Produces: CSS variables/Tailwind tokens (`--color-bg`, `--color-surface`, `--color-ink`, `--color-muted`, `--color-accent`, `--color-accent-2`, `--color-border`, radii, z-scale); font CSS variables `--font-display`, `--font-mono`; a globally hidden scrollbar; `DESIGN.md` as the visual contract every later task reads.

- [ ] **Step 1: Run `/impeccable init`.** Answer from the approved spec (register=brand; users/goals/personality/anti-references per spec §1–2; a11y AA). It runs the palette helper (new project) — anchor the primary brand color on the logo cyan→teal and compose bg/surface/ink/muted/border around it in OKLCH. Write `PRODUCT.md` + `DESIGN.md`.

- [ ] **Step 2: Define fonts** in `lib/fonts.ts` using `next/font/google`:

```ts
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

export const display = Space_Grotesk({
  subsets: ["latin"], variable: "--font-display", display: "swap",
});
export const mono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-mono", display: "swap",
});
```

Apply `${display.variable} ${mono.variable}` on `<html>` in `app/layout.tsx`.

- [ ] **Step 3: Write tokens + base in `app/globals.css`** (Tailwind v4 CSS-first). Use the OKLCH values produced by `DESIGN.md` in Step 1. Skeleton (fill real values from DESIGN.md):

```css
@import "tailwindcss";

@theme {
  --color-bg: oklch(0.17 0.03 250);        /* near-black navy */
  --color-surface: oklch(0.21 0.035 250);  /* elevated panel */
  --color-ink: oklch(0.97 0.01 250);       /* primary text */
  --color-muted: oklch(0.78 0.02 250);     /* secondary text, ≥4.5:1 on bg */
  --color-accent: oklch(0.78 0.14 200);    /* cyan */
  --color-accent-2: oklch(0.82 0.13 175);  /* teal */
  --color-border: oklch(0.30 0.02 250);    /* hairline */
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);
}

/* Hidden scrollbar — global, scroll still works */
html { scrollbar-width: none; -ms-overflow-style: none; }
html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; width: 0; height: 0; }

html { color-scheme: dark; }
body { background: var(--color-bg); color: var(--color-ink); font-family: var(--font-display), system-ui, sans-serif; }

h1, h2, h3 { text-wrap: balance; letter-spacing: -0.04em; }
p { text-wrap: pretty; max-width: 70ch; }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 4: Verify contrast + tokens.** Confirm muted-on-bg ≥ 4.5:1 and accent-on-bg ≥ 3:1 (adjust OKLCH lightness if not). Run `node .claude/skills/impeccable/scripts/detect.mjs --json app/globals.css` → Expected: no contrast/slop findings.

- [ ] **Step 5: Verify scrollbar is hidden** in the running dev server (page scrolls via wheel/keyboard, no visible track). Run `npm run build` → Expected: passes.

- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat: design system — tokens, fonts, hidden scrollbar, PRODUCT/DESIGN"`

---

### Task 3: Motion infrastructure — Lenis provider, GSAP setup, reveal/horizontal hooks, scroll progress

**Files:**
- Create: `lib/motion/SmoothScrollProvider.tsx`, `lib/motion/useReveal.ts`, `lib/motion/useHorizontalScroll.ts`, `lib/motion/usePrefersReducedMotion.ts`, `components/ScrollProgress.tsx`
- Modify: `app/layout.tsx` (wrap children in provider + progress bar)

**Interfaces:**
- Produces:
  - `<SmoothScrollProvider>{children}</SmoothScrollProvider>` — mounts Lenis, syncs to GSAP ScrollTrigger, disables smoothing under reduced-motion.
  - `useReveal<T extends HTMLElement>(opts?: { y?: number; delay?: number; stagger?: number }): RefObject<T>` — scroll-triggered reveal that enhances already-visible content; no-op under reduced-motion.
  - `useHorizontalScroll<T extends HTMLElement>(): { containerRef, trackRef }` — pins a section and translates its track horizontally on scroll; no-op (native scroll) under reduced-motion or coarse pointer.
  - `usePrefersReducedMotion(): boolean`.
  - `<ScrollProgress />` — thin top progress bar (only visible scroll indicator).

- [ ] **Step 1: `usePrefersReducedMotion`** — subscribe to `matchMedia('(prefers-reduced-motion: reduce)')`, SSR-safe (default `false`, update on mount).

- [ ] **Step 2: `SmoothScrollProvider`** — `"use client"`. Init Lenis (`lenis`), `requestAnimationFrame` loop, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t*1000))`, register `ScrollTrigger`. If reduced-motion: skip Lenis (native scroll), still register ScrollTrigger. Clean up on unmount.

- [ ] **Step 3: `useReveal`** — `"use client"`, uses `@gsap/react` `useGSAP`. Sets initial `opacity/translateY` and animates to visible with `ScrollTrigger` (`start: "top 85%"`, ease `power3.out`). Under reduced-motion: set final state immediately (no transition). Content must be readable even if JS never runs (initial CSS visible; the hook only enhances).

- [ ] **Step 4: `useHorizontalScroll`** — `"use client"`. Desktop + motion-allowed + fine pointer: pin `containerRef`, animate `trackRef` `x` from 0 to `-(scrollWidth - innerWidth)` with `scrub`. Else: leave the track as a native horizontally-scrollable, `scroll-snap` flex row (CSS class toggle). Recompute on resize; `ScrollTrigger.refresh()`.

- [ ] **Step 5: `ScrollProgress`** — `"use client"`, fixed top 0, height 2px, width scales with scroll progress (via Lenis/ScrollTrigger), `var(--color-accent)`; hidden/again static under reduced-motion is fine (it's an indicator, keep it).

- [ ] **Step 6: Wire into `app/layout.tsx`** — wrap `{children}` with `<SmoothScrollProvider>` and render `<ScrollProgress/>`.

- [ ] **Step 7: Verify.** `npm run build` passes. In dev: smooth scrolling active, no visible scrollbar, progress bar tracks scroll. Toggle OS reduced-motion → smoothing off, content fully visible, no broken layout.

- [ ] **Step 8: Commit.** `git add -A && git commit -m "feat: motion infra — Lenis provider, reveal/horizontal hooks, scroll progress"`

---

### Task 4: WhatsApp helper + contact form (TDD)

**Files:**
- Create: `lib/whatsapp.ts`, `lib/whatsapp.test.ts`
- Create: `components/forms/ContactForm.tsx`, `components/forms/ContactForm.test.tsx`

**Interfaces:**
- Consumes: tokens/primitives (Button from Task 5 may not exist yet — use a styled button here, refactor to `Button` in Task 5).
- Produces:
  - `buildWhatsAppUrl(fields: ContactFields): string` where `type ContactFields = { name: string; email: string; company?: string; message: string }`. Returns `https://wa.me/919618102268?text=<urlencoded body>`.
  - `validateContact(fields: Partial<ContactFields>): Record<string,string>` → field→error map (empty = valid).
  - `<ContactForm />` — accessible form; on valid submit opens the WhatsApp URL in a new tab.

- [ ] **Step 1: Write failing tests** `lib/whatsapp.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl, validateContact } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  it("targets the configured number and encodes the body", () => {
    const url = buildWhatsAppUrl({ name: "Asha", email: "a@x.com", company: "Acme", message: "Hi there & welcome" });
    expect(url.startsWith("https://wa.me/919618102268?text=")).toBe(true);
    expect(url).toContain("Asha");
    expect(url).toContain(encodeURIComponent("Hi there & welcome").replace(/%20/g, "%20"));
    expect(url).not.toContain("\n"); // newlines are encoded
  });
  it("omits the company line when absent", () => {
    const url = buildWhatsAppUrl({ name: "A", email: "a@x.com", message: "m" });
    expect(decodeURIComponent(url)).not.toContain("Company:");
  });
});

describe("validateContact", () => {
  it("flags missing required fields", () => {
    const e = validateContact({ name: "", email: "", message: "" });
    expect(e.name).toBeTruthy(); expect(e.email).toBeTruthy(); expect(e.message).toBeTruthy();
  });
  it("flags malformed email", () => {
    expect(validateContact({ name: "A", email: "nope", message: "m" }).email).toBeTruthy();
  });
  it("passes valid input", () => {
    expect(validateContact({ name: "A", email: "a@x.com", message: "m" })).toEqual({});
  });
});
```

- [ ] **Step 2: Run tests, verify they fail.** `npm test -- --run lib/whatsapp.test.ts` → Expected: FAIL (module not found).

- [ ] **Step 3: Implement `lib/whatsapp.ts`:**

```ts
export type ContactFields = { name: string; email: string; company?: string; message: string };
export const WHATSAPP_NUMBER = "919618102268";

export function validateContact(f: Partial<ContactFields>): Record<string, string> {
  const e: Record<string, string> = {};
  if (!f.name?.trim()) e.name = "Please enter your name.";
  if (!f.email?.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Please enter a valid email.";
  if (!f.message?.trim()) e.message = "Please enter a message.";
  return e;
}

export function buildWhatsAppUrl(f: ContactFields): string {
  const lines = [
    `New enquiry from the Chip Zenix website`,
    ``,
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    ...(f.company?.trim() ? [`Company: ${f.company}`] : []),
    ``,
    `Message:`,
    f.message,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
```

- [ ] **Step 4: Run tests, verify pass.** `npm test -- --run lib/whatsapp.test.ts` → Expected: PASS.

- [ ] **Step 5: Write `ContactForm.test.tsx`** — render form, submit empty → assert error messages shown (`getByText`), assert no navigation; fill valid → assert `window.open` called with a `wa.me/919618102268` URL (mock `window.open`).

- [ ] **Step 6: Implement `ContactForm.tsx`** (`"use client"`) — controlled fields (name/email/company/message), `validateContact` on submit, render accessible errors (`aria-invalid`, `aria-describedby`, `role="alert"`), on valid call `window.open(buildWhatsAppUrl(fields), "_blank", "noopener")`. Labels associated, ≥44px targets, focus-visible.

- [ ] **Step 7: Run all tests.** `npm test -- --run` → Expected: PASS. Run detector on the form file → no findings.

- [ ] **Step 8: Commit.** `git add -A && git commit -m "feat: WhatsApp click-to-chat helper + accessible contact form (TDD)"`

---

### Task 5: Layout shell + primitives

**Files:**
- Create: `components/layout/Nav.tsx`, `components/layout/Footer.tsx`, `components/layout/MobileMenu.tsx`
- Create: `components/ui/Button.tsx`, `components/ui/SectionHeading.tsx`, `components/ui/TechChip.tsx`, `components/ui/StatCounter.tsx`
- Create: `components/ui/Button.test.tsx`, `components/ui/StatCounter.test.tsx`
- Modify: `app/layout.tsx` (render Nav + Footer), `components/forms/ContactForm.tsx` (use `Button`)

**Interfaces:**
- Produces:
  - `<Button variant="primary"|"ghost" href? onClick? children />` — renders `<a>` or `<button>`; primary uses accent; ≥44px; focus-visible.
  - `<SectionHeading title eyebrow? align? />` — **eyebrow optional and used at most once or twice site-wide** (not per section — ban).
  - `<TechChip label />` — mono, hairline border, subtle surface.
  - `<StatCounter value label suffix? />` — counts up on reveal; shows final value immediately under reduced-motion / no-JS.
  - `<Nav />` — sticky, logo (`logo-transparent.webp`), links, prominent Contact CTA; collapses to `<MobileMenu/>` (focus-trapped dialog) below `lg`.

- [ ] **Step 1: `Button.test.tsx`** — renders `<a>` when `href` given, `<button>` otherwise; click handler fires. Run → fails.
- [ ] **Step 2: Implement `Button.tsx`.** Run test → passes.
- [ ] **Step 3: `StatCounter.test.tsx`** — renders final value text immediately (reduced-motion path / initial). Implement `StatCounter.tsx` (GSAP count-up via `useReveal`-style trigger; final value as initial text). Run → passes.
- [ ] **Step 4: Implement `SectionHeading`, `TechChip`.** Keep eyebrow optional; no per-section eyebrow.
- [ ] **Step 5: Implement `Nav` + `MobileMenu`** — responsive; hamburger below `lg`; dialog with focus trap + `Esc` close + body-scroll lock; tap targets ≥44px.
- [ ] **Step 6: Implement `Footer`** — nav, contact (WhatsApp link), locations (Silicon Valley · Bengaluru · Munich), socials placeholder, copyright.
- [ ] **Step 7: Wire Nav + Footer into `app/layout.tsx`; refactor `ContactForm` to use `Button`.**
- [ ] **Step 8: Verify.** `npm test -- --run` passes; detector clean; Nav/Footer correct and non-overflowing at 360/768/1024/1440/1920; mobile menu keyboard-accessible.
- [ ] **Step 9: Commit.** `git add -A && git commit -m "feat: layout shell (Nav/Footer/MobileMenu) + UI primitives"`

---

### Task 6: Content data module

**Files:**
- Create: `lib/content.ts`, `lib/content.test.ts`

**Interfaces:**
- Produces typed content consumed by all sections/pages: `site` (name, tagline, taglineLong, contact), `stats[]`, `pillars[]` (VLSI, Embedded — with `services[]`), `capabilities[]`, `industries[]`, `process[]`, `testimonial`, `founders[]` (Muzammil + Founder Two), `locations[]`, `mission`, `vision`.

- [ ] **Step 1: `lib/content.test.ts`** — assert: two founders with `name`/`image`; VLSI pillar has 12 services, Embedded has 11; stats has the three figures; WhatsApp number present. Run → fails.
- [ ] **Step 2: Implement `lib/content.ts`** with the refined/humanized copy from the spec (verbatim figures: 100+/50+/99%; all 12 VLSI + 11 Embedded services; capabilities list; industries; mission/vision; testimonial Anika Rao / Helix Silicon; founders Muzammil + "Founder Two", `image: "/founder.webp"`). Apply a humanizer pass to all prose.
- [ ] **Step 3: Run test → passes.** Commit. `git add -A && git commit -m "feat: typed, humanized content module"`

---

## Phase 1 — Home (one section per task; build with Impeccable)

> For each task below: invoke `/impeccable craft <section>` (or `shape` then build), implement the section as a focused component in `components/sections/`, render it on `app/page.tsx`, then run the **visual gate**: `npm run build` passes · detector reports no new findings · renders correctly + no overflow at 360/768/1024/1440/1920 · reduced-motion fallback verified · then `/impeccable critique` + `/impeccable polish` on the section · commit.

### Task 7: Hero
- [ ] Build `components/sections/Hero.tsx`: logo, H1 "Engineering Tomorrow's Silicon", supporting line, dual CTA (*Start a project* → Contact/WhatsApp, *See capabilities* → scroll). Hero motion moment (circuit traces draw-in / subtle data pulse) via GSAP, reduced-motion = static. No gradient text (H1 solid ink; accent via weight/scale).
- [ ] Visual gate (above). Commit `feat: hero section`.

### Task 8: Trust strip
- [ ] Build `components/sections/TrustStrip.tsx`: three `StatCounter`s (100+ projects, 50+ engineers, 99% satisfaction) + industries served. Not the banned hero-metric template — integrate into a band, not big-number-with-gradient.
- [ ] Visual gate. Commit `feat: trust strip`.

### Task 9: Two pillars
- [ ] Build `components/sections/Pillars.tsx`: VLSI & ASIC | Embedded Systems overview, each linking to `/services#vlsi` / `/services#embedded`. Two distinct treatments (not identical cards).
- [ ] Visual gate. Commit `feat: pillars section`.

### Task 10: Capabilities — **horizontal-scroll section**
- [ ] Build `components/sections/Capabilities.tsx` using `useHorizontalScroll`: the tech arsenal as a pinned horizontal rail of `TechChip`/panels on desktop; native `scroll-snap` swipe carousel on touch/small screens; simple scroll under reduced-motion. **This satisfies the mandatory horizontal-scroll requirement.**
- [ ] Visual gate — pay special attention to touch carousel at 360/768 and reduced-motion. Commit `feat: capabilities horizontal-scroll section`.

### Task 11: Process
- [ ] Build `components/sections/Process.tsx`: how an engagement works. If shown as steps, a numbered sequence here is legitimate (it IS an ordered flow) — but do not reuse numbered markers elsewhere. Optionally a second horizontal-scroll treatment.
- [ ] Visual gate. Commit `feat: process section`.

### Task 12: Testimonial
- [ ] Build `components/sections/Testimonial.tsx`: Anika Rao quote, attribution. Structured to accept more testimonials later.
- [ ] Visual gate. Commit `feat: testimonial section`.

### Task 13: About + Careers teasers
- [ ] Build `components/sections/AboutTeaser.tsx` + `components/sections/CareersTeaser.tsx`: mission/vision snippet → `/about`; culture line → `/careers`.
- [ ] Visual gate. Commit `feat: about & careers teasers`.

### Task 14: Contact CTA
- [ ] Build `components/sections/ContactCta.tsx`: strong closing block → Contact page / direct WhatsApp.
- [ ] Visual gate. Assemble final `app/page.tsx` order (Hero→TrustStrip→Pillars→Capabilities→Process→Testimonial→About/Careers teasers→ContactCta). Commit `feat: contact CTA + assemble home`.

---

## Phase 2 — Deeper pages

### Task 15: Services page (`/services`)
- [ ] Build `app/services/page.tsx`: anchored `#vlsi` + `#embedded` subsections listing all 12 + 11 services (from `content.ts`), with distinct, non-repetitive layout. Metadata. Visual gate. Commit `feat: services page`.

### Task 16: About page (`/about`) + **Founders**
- [ ] Build `app/about/page.tsx`: mission, vision, story, three locations, and **Founders** section — two cards (Muzammil + Founder Two) using `/founder.webp`, with structure ready for real names/roles/bios/headshots. Metadata. Visual gate. Commit `feat: about page with founders`.

### Task 17: Careers page (`/careers`)
- [ ] Build `app/careers/page.tsx`: culture + placeholder roles, CTA to apply (WhatsApp/email). Metadata. Visual gate. Commit `feat: careers page`.

### Task 18: Contact page (`/contact`)
- [ ] Build `app/contact/page.tsx`: `<ContactForm/>` + email/phone + locations. Metadata. Visual gate (test the WhatsApp open on a real device/emulator if possible). Commit `feat: contact page`.

---

## Phase 3 — SEO, polish, QA, ship

### Task 19: SEO + metadata + OG
- [ ] Per-route Metadata (titles/descriptions/canonical), site-wide defaults in `app/layout.tsx`, Open Graph image (use logo on brand bg), `app/sitemap.ts`, `app/robots.ts`. Verify in `out/`. Commit `feat: SEO metadata, OG image, sitemap, robots`.

### Task 20: Global motion + delight pass
- [ ] `/impeccable animate` across the site: ensure reveals vary per section (no uniform reflex), motion is purposeful, all reduced-motion fallbacks intact. Commit `feat: motion polish pass`.

### Task 21: Responsive + a11y + detector audit
- [ ] `/impeccable audit` (a11y/perf/responsive). Manually verify every page at 360/768/1024/1440/1920: no horizontal overflow, headings don't overflow, tap targets ≥44px, hidden scrollbar everywhere, horizontal sections swipe on touch. Run `node .claude/skills/impeccable/scripts/detect.mjs --json app components` → resolve findings. Keyboard-only pass + focus-visible. Commit `fix: responsive + a11y + detector findings`.

### Task 22: Build, optimize, deploy prep
- [ ] `npm run build` → inspect `out/`. `/impeccable optimize` for any perf issues (image sizes, font loading, JS). Document deploy steps (drop `out/` on any static host; or Vercel/Netlify). Final commit `chore: production build + deploy notes`.

---

## Self-Review (completed during planning)

- **Spec coverage:** every spec section maps to ≥1 task — tokens/visual (T2), scrollbar hidden (T2), motion/smooth scroll (T3), horizontal scroll (T10, optional T11), WhatsApp contact (T4/T18), founders (T16), responsiveness (every visual gate + T21), a11y (T2/T4/T5/T21), SEO (T19), content refine/humanize (T6), all home sections (T7–14), deeper pages (T15–18), build/export (T1/T22). No gaps found.
- **Placeholder scan:** code-bearing steps include real code; visual sections intentionally use Impeccable craft + explicit visual gates rather than pre-written JSX (see process note). Client-supplied content (real founder bios, testimonials, roles) is the only deferred data, flagged in spec §11.
- **Type consistency:** `ContactFields`, `buildWhatsAppUrl`, `validateContact`, hook signatures, and content shape are consistent across tasks.
