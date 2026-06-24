# Chipzenix — Build & Deploy

Static-exported Next.js site. No server required — the build produces a folder of static
HTML/CSS/JS you can host anywhere.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run test     # unit tests (Vitest)
npm run build    # production static export → ./out
```

## What the build produces

`npm run build` writes the full site to **`./out`** (HTML per route + assets, `sitemap.xml`,
`robots.txt`, `og.png`, favicon). Preview it locally with any static server:

```bash
npx serve out
# or: python -m http.server 8080 --directory out
```

## Deploy

Upload the contents of **`out/`** to any static host:

- **Netlify** — drag-and-drop `out/`, or connect the repo with build command `npm run build`
  and publish directory `out`.
- **Cloudflare Pages / GitHub Pages / S3+CloudFront / any static host** — serve `out/` at the
  domain root.
- **Vercel** — connect the repo; it auto-detects Next.js. (Static export still works.)

`trailingSlash` is enabled, so nested routes resolve as `/about/` → `out/about/index.html`.

## Before launch — update these

1. **Production domain.** Replace the placeholder `https://chipzenix.com` in:
   - `app/layout.tsx` (`metadataBase`, OpenGraph `url`)
   - `app/sitemap.ts` and `app/robots.ts` (`BASE`)
2. **Founder content.** `lib/content.ts` → `founders` currently has `Muzammil` + a `Founder Two`
   placeholder, both using `/founder.webp`. Swap in real names, roles, bios, and professional
   headshots (drop new images in `public/` and update the `image` paths).
3. **Real details.** Confirm the display email (`hello@chipzenix.com`) and phone in
   `lib/content.ts`. WhatsApp number is wired to **+91 96181 02268** (`wa.me/919618102268`).
4. **Testimonials / roles.** The Anika Rao testimonial and the Careers roles are illustrative —
   replace with real ones in `lib/content.ts` and `app/careers/page.tsx`.
5. **Social links.** Footer LinkedIn/X currently point to `#`.

## Notes

- **Contact form** has no backend by design: it composes the enquiry and opens WhatsApp to
  +91 96181 02268 with the message pre-filled (`lib/whatsapp.ts`).
- **Imagery** in `public/images/` is brand-duotoned semiconductor photography from Wikimedia
  Commons (CC-licensed). Replace with owned/licensed assets if preferred.
- **Fonts** are self-hosted (Clash Display, General Sans via Fontshare; JetBrains Mono via Google)
  in `public/fonts/` — no external font requests at runtime.
- **Accessibility/motion:** all animations respect `prefers-reduced-motion`; the native scrollbar
  is hidden but scrolling works via wheel/keyboard/touch.
