import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ChipButton } from "@/components/ui/ChipButton";
import { domainPillars, expertise } from "@/lib/content";

export function Expertise() {
  return (
    <section id="expertise" className="relative isolate scroll-mt-24 overflow-hidden border-b border-border bg-bg-deep">
      {/* faint board grid under the two packages */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_65%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--color-accent) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-accent) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{expertise.kicker}</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] text-ink">
            {expertise.title} <span className="whitespace-nowrap text-accent">{expertise.titleAccent}</span>{" "}
            {expertise.titleEnd}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{expertise.intro}</p>
        </Reveal>

        <Reveal
          selector="[data-chip]"
          className="mt-14 flex flex-col items-center justify-center gap-16 md:flex-row md:gap-24 lg:gap-32"
        >
          {Object.values(domainPillars).map((p) => (
            <div data-chip key={p.id}>
              <ChipButton href={`/#${p.id}`} label={p.chipLabel} partNo={p.partNo} caption={p.heading} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
