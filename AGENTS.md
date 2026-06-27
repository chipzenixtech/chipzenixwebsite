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
  (`propositions`), not invented stats (projects/engineers/satisfaction %).
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
- **Brand styling:** accent is greenish-blue cyan (`--color-accent`, `#00dfe2`); label
  text uses the Chakra Petch font (`font-label`).
- **SEO:** keep per-page metadata + canonicals, the layout's `Organization`/`WebSite`
  JSON-LD, and `sitemap.ts`/`robots.ts` in sync when routes change. `SITE_URL`/`BASE`
  are placeholders (`https://chipzenix.com`) until the real domain is set.
- **Verify before claiming done:** `npx tsc --noEmit`, `npm run test:run`, and
  `npm run build` should all pass. Temporary helper scripts go to the scratchpad and
  must be removed, not committed.
