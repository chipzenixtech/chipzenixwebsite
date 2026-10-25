import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { reasons } from "@/lib/content";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Why Chipzenix</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] text-ink">
            Why choose us
          </h2>
        </Reveal>

        <Reveal
          selector="[data-reason]"
          className="mt-14 grid overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border gap-px sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map((r, i) => (
            <div data-reason key={r.title} className="group relative overflow-hidden bg-bg p-7">
              {/* glow that rises from the cell's lower corner on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(120% 90% at 100% 100%, color-mix(in oklch, var(--color-accent) 16%, transparent), transparent 60%)",
                }}
              />
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-accent/35 font-mono text-sm text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative mt-5 text-lg font-semibold leading-snug text-ink">{r.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{r.detail}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
