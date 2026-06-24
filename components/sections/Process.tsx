import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold text-ink">How we engage</h2>
        <p className="mt-4 text-lg text-muted">
          A disciplined, transparent flow from the first call to a clean handoff your team can own.
        </p>
      </Reveal>

      <Reveal
        selector="[data-step]"
        className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {processSteps.map((s, i) => (
          <div data-step key={s.title} className="bg-bg p-8">
            <span className="font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
