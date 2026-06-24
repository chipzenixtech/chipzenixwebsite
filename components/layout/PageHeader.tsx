import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-bg-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,223,226,0.1), transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
        <Reveal>
          {kicker && (
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent" />
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
