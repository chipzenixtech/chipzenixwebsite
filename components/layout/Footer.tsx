import Link from "next/link";
import Image from "next/image";
import { navLinks, site, locations } from "@/lib/content";

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const whatsapp = `https://wa.me/${site.contact.whatsapp}`;

  return (
    <footer className="border-t border-border bg-bg-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2.5"
            aria-label="Chip Zenix home"
          >
            <Image src="/logo-icon.webp" alt="" width={36} height={36} className="h-9 w-9" />
            <span className="text-lg font-semibold tracking-tight text-ink">
              Chip<span className="text-accent">Zenix</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted">{site.taglineLong}</p>
          <div className="mt-6 flex gap-4 font-mono text-xs text-muted">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="transition-colors hover:text-accent">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Navigate</h2>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch={false}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Contact</h2>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-ink">
            WhatsApp {site.contact.whatsappDisplay}
          </a>
          <a href={`mailto:${site.contact.email}`} className="text-sm text-muted transition-colors hover:text-ink">
            {site.contact.email}
          </a>
          <div className="mt-2 flex flex-col gap-1 text-sm text-muted">
            {locations.map((loc) => (
              <span key={loc.city}>
                <span className="text-ink">{loc.city}</span>
                {loc.role ? ` · ${loc.role}` : ` · ${loc.region}`}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} Chip Zenix. All rights reserved.</p>
          <p className="font-mono">Engineering Tomorrow&rsquo;s Silicon</p>
        </div>
      </div>
    </footer>
  );
}
