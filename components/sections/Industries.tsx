import { Reveal } from "@/components/ui/Reveal";
import { WaferField } from "@/components/visual/WaferField";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <section
      id="industries"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-border bg-bg-deep"
    >
      <WaferField className="pointer-events-none absolute inset-0 h-full w-full opacity-100 [mask-image:radial-gradient(135%_135%_at_50%_0%,black_25%,transparent_95%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-accent">
            Coverage · {String(industries.length).padStart(2, "0")} sectors
          </p>
          <h2 className="mt-3 text-balance text-[clamp(2.2rem,4.8vw,3.5rem)] font-bold leading-[1.04] text-ink">
            Industries we <span className="text-accent">ship into</span>
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-muted">
            Our VLSI, embedded, and AI-hardware work powers products across
            performance-critical, regulated industries.
          </p>
        </Reveal>

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {industries.map((name, i) => (
            <li
              key={name}
              className="group flex items-center gap-4 border-b border-border/60 py-4 transition-colors duration-300 hover:border-accent/40"
            >
              <span className="font-mono text-xs text-faint transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 bg-accent transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_8px_1px_rgba(0,223,226,0.7)]"
              />
              <span className="text-base text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink sm:text-lg">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
