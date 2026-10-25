<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Chipzenix — project conventions

Marketing site for Chipzenix (semiconductor engineering services). Dark, brand-true,
fully static. See `README.md` for the full overview. Key rules when working here:

- **Content lives in `lib/content.ts`** — it is the single source of truth for all copy
  and data. Don't hardcode marketing text in components. Tests in `lib/content.test.ts`
  guard its shape.
- **No fabricated metrics.** The company is pre-launch. Use truthful positioning
  (`reasons`, `domains`), not invented stats (projects/engineers/satisfaction %) or
  testimonials. Visible copy has no em dashes (client preference; a test enforces it).
- **Services:** each entry in `domains` (content.ts) is a card plus a statically
  generated page at `/services/<vlsi|embedded>/<slug>`; add a domain there, not a page file.
- **Static export only.** `next.config.ts` uses `output: "export"`; there is no server
  runtime. No server actions, route handlers with dynamic behaviour, or
  `next/image` optimization (images are `unoptimized`). `npm run build` emits `out/`.
- **Contact is WhatsApp-only** (`+91 96181 02268`, see `lib/whatsapp.ts`). No backend
  form handling. WhatsApp bold uses *single* asterisks, not Markdown's double.
- **Motion policy:**
  - Decorative canvas backgrounds (`CircuitField`, `WaferField`) animate on every
    device regardless of OS reduced-motion, but stay low-amplitude/slow/non-flashing
    and must pause off-screen (IntersectionObserver) and on tab-hide
    (`visibilitychange`).
  - Heavier effects (splash, scroll reveals, pinned/horizontal scrollers) must honour
    `prefers-reduced-motion`.
  - Use `gsap.fromTo` (never `gsap.from`) for reveals so content can't get stuck at
    `opacity: 0`. Smooth scroll is Lenis with `lerp: 0.1`.
- **Brand styling:** accent is the new logo's azure blue (`--color-accent`, ≈`#2ea8ff`,
  adopted 2026-10-25; the previous cyan values are noted in `globals.css`). Never
  hard-code accent colours: use the tokens, `color-mix(in oklch, var(--color-accent) N%,
  transparent)` for glows, and `--accent-rgb`/`accentRgb()` for canvas. Hero photos are
  duotoned to the same blue. Label text uses Chakra Petch (`font-label`); section labels
  use `<Eyebrow>` (no pill badges) and card hovers use `SpotlightCard` (lift + edge glow,
  no top-line wipes).
- **SEO:** keep per-page metadata + canonicals, the layout's `Organization`/`WebSite`
  JSON-LD, and `sitemap.ts`/`robots.ts`/`llms.txt` in sync when routes change. The origin
  is `SITE_URL` in `lib/seo.ts` (`https://www.chipzenix.com`, live on Vercel); page
  metadata goes through `pageMetadata()` so each route gets its own share card.
- **Logo:** `public/logo.webp` (white wordmark for the dark site); full-size white/black
  transparent variants and the square icon live in `public/brand/`.
- **Verify before claiming done:** `npx tsc --noEmit`, `npm run test:run`, and
  `npm run build` should all pass. Temporary helper scripts go to the scratchpad and
  must be removed, not committed.
