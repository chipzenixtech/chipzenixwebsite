import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  kicker,
  title,
  intro,
  breadcrumb,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Ancestor links shown above the kicker; the current page is the title. */
  breadcrumb?: { label: string; href: string }[];
}) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-bg-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--color-accent) 10%, transparent), transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
        <Reveal>
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-faint">
                {breadcrumb.map((b) => (
                  <li key={b.href} className="flex items-center gap-2">
                    <Link href={b.href} prefetch={false} className="transition-colors hover:text-accent">
                      {b.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {kicker && (
            <p className="font-label text-xs uppercase tracking-[0.18em] text-accent">
              {kicker}
            </p>
          )}
          <h1 className="mt-5 text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold leading-[0.96] text-ink">
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>}
        </Reveal>
      </div>
    </header>
  );
}
