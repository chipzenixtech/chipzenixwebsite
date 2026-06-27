import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
      <Reveal className="max-w-2xl">
        <p className="font-label text-xs uppercase tracking-[0.16em] text-accent">
          Engagement
        </p>
        <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold text-ink">
          How we engage
        </h2>
        <p className="mt-4 text-lg text-muted">
          A disciplined, transparent flow from the first call to a clean handoff your team can own.
        </p>
      </Reveal>

      <Reveal selector="[data-step]" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <div data-step key={s.title} className="h-full">
            <SpotlightCard topAccent className="h-full rounded-lg border border-border bg-surface p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-2 w-2 rounded-full bg-accent/30 transition-colors duration-300 group-hover:bg-accent" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
            </SpotlightCard>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
