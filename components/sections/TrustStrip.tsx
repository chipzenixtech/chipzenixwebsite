import { StatCounter } from "@/components/ui/StatCounter";
import { Reveal } from "@/components/ui/Reveal";
import { stats, industries } from "@/lib/content";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-bg">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="flex flex-wrap gap-x-12 gap-y-8">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>

        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            Industries we ship into
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {industries.map((i) => (
              <li
                key={i}
                className="rounded-sm border border-border bg-surface px-3 py-1.5 text-sm text-muted"
              >
                {i}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
