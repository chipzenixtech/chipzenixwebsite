# Design

Visual system for Chip Zenix. The OKLCH tokens here are the single source of truth, implemented in
`app/globals.css` (Tailwind v4 `@theme`). Identity is preserved from the existing logo (deep navy
field + cyan→teal mark); colors below are derived from it, not invented.

## Vibe

Deep-tech, precise, instrument-grade. A near-black navy field that stays calm so a single cyan
signal carries the brand. Bold through scale and typographic confidence, not decoration. Reference
points: the restraint of Vercel/Linear dark, the precision of a measurement instrument — but
differentiated from generic dark-SaaS by engineered typography, real technical detail, and a
circuit-trace motif drawn from the logo.

**Color strategy:** Committed (disciplined). The dark field dominates; cyan is the decisive,
sparing accent (interaction, key highlights, the circuit motif, restrained glow). Teal is a sibling
used for gradients/depth in the motif and imagery — never as gradient *text*.

## Color (OKLCH — never hex in code)

| Token | OKLCH | Role |
|---|---|---|
| `--color-bg` | `oklch(0.16 0.022 255)` | Base page background (deep navy near-black) |
| `--color-bg-deep` | `oklch(0.12 0.020 258)` | Deepest sections (hero, footer) |
| `--color-surface` | `oklch(0.20 0.024 254)` | Panels, raised sections |
| `--color-surface-2` | `oklch(0.24 0.026 252)` | Higher elevation, inputs |
| `--color-border` | `oklch(0.32 0.022 250)` | Hairline borders/dividers (non-text) |
| `--color-border-strong` | `oklch(0.44 0.030 246)` | Emphasis borders, focus outlines base |
| `--color-ink` | `oklch(0.97 0.012 235)` | Primary text (≥15:1 on bg) |
| `--color-muted` | `oklch(0.75 0.020 240)` | Secondary text (≥4.5:1 on bg) |
| `--color-faint` | `oklch(0.62 0.018 245)` | Tertiary/labels only (decorative, not body) |
| `--color-accent` | `oklch(0.82 0.140 196)` | Cyan — the single brand accent |
| `--color-accent-strong` | `oklch(0.76 0.150 198)` | Cyan hover/active |
| `--color-accent-2` | `oklch(0.85 0.120 178)` | Teal — gradients/motif depth only |
| `--color-accent-ink` | `oklch(0.15 0.020 250)` | Near-black text used ON cyan fills |
| `--color-danger` | `oklch(0.68 0.190 25)` | Form errors only |

Rules: text on cyan fills uses `--color-accent-ink` (cyan is L≥0.82, a pale fill → dark text reads
crisp). Accent never carries body text on the dark field beyond links/labels. No gradient text
(`background-clip:text`) anywhere — the logo gradient lives only in the logo image.

## Typography

Font procedure applied (3 voice words: precise · engineered · authoritative). Reflex picks
(Space Grotesk / Inter / IBM Plex) rejected per the ban list.

- **Display + UI + body:** **Archivo** (Google Fonts, variable weight) — an engineered grotesque
  with a full Thin→Black range for confident headlines; one family in multiple weights.
  CSS var `--font-display`.
- **Technical / data:** **JetBrains Mono** (Google Fonts) — for specs, the tech arsenal, stats,
  code-like labels. Authentic to the domain (HDL/datasheets), not banned, not costume.
  CSS var `--font-mono`.

Scale: fluid `clamp()`, ratio ≥1.25. **Display heading clamp max ≤ 6rem; letter-spacing ≥ -0.04em.**
`text-wrap: balance` on h1–h3; `text-wrap: pretty` + `max-width: ~70ch` on prose. Light-on-dark:
add 0.05–0.1 line-height. Emphasis comes from weight/size and solid cyan on key words — never
gradient text, never all-caps body.

## Spacing & Layout

- Fluid spacing via `clamp()`; vary rhythm (generous section breaks, tight groupings). Mobile-first.
- Flexbox for 1D, Grid for 2D. Breakpoint-free grids: `repeat(auto-fit, minmax(280px,1fr))`.
- Cards only when truly the best affordance; **no identical card grids**, no nested cards. Give each
  section its own treatment / art direction; consistency of voice over consistency of layout.
- Radii: crisp/precise — `--radius-sm: 4px`, `--radius: 8px`, `--radius-lg: 14px`. No pill-everything.
- Semantic z-index scale: `--z-base:0 · --z-sticky:100 · --z-overlay:200 · --z-modal:300 · --z-toast:400`. No 9999.

## Motion

Lenis smooth scroll + GSAP/ScrollTrigger. Exponential ease-out (power3/quart/expo), no bounce/elastic.
Reveals **vary per section** (not one uniform fade); content is visible by default and only enhanced.
Hero gets one orchestrated moment (circuit traces drawing in / subtle data pulse). Premium materials
allowed sparingly: restrained glow on the accent, blur/mask on the motif. **Every animation has a
`prefers-reduced-motion: reduce` fallback.** Native scrollbar hidden globally; a thin cyan
scroll-progress bar is the only visible scroll indicator.

## Imagery (mandatory — zero images is a bug)

- **Hero:** a custom, branded canvas/SVG circuit-trace + silicon scene (distinctive, on-brand) —
  preferred over stock for the hero.
- **Atmospheric sections:** real macro/technical photography (silicon wafers, chip dies, clean-room,
  PCB macro) from verified Unsplash URLs (`https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=1600&q=80`),
  duotoned toward the brand cool palette so they don't fight the system. Verify each URL resolves
  before shipping; never ship colored-`<div>` placeholders.
- **Founders:** `/founder.webp` placeholder (both), structured for real headshots later.
- Alt text is part of the voice (specific, not "image of chip").

## Components

Primitives: `Button` (primary = cyan fill + accent-ink text; ghost = hairline border), `SectionHeading`
(eyebrow optional, used ≤ twice site-wide — never per-section), `TechChip` (mono, hairline, subtle
surface), `StatCounter` (mono figures, counts up on reveal, final value shown under reduced-motion).
Layout: sticky `Nav` (transparent→surface on scroll) with focus-trapped mobile drawer, `Footer`.
Forms: accessible inputs on `--color-surface-2` with `--color-accent` focus ring; errors in
`--color-danger` with `role="alert"`.

## Accessibility

WCAG 2.1 AA per PRODUCT.md. Visible focus uses an accent ring (never `outline:none` without a
replacement). Hidden scrollbar must not break keyboard/touch scroll. Horizontal-scroll sections are
keyboard-operable and fall back to native scroll/stack under reduced-motion.
