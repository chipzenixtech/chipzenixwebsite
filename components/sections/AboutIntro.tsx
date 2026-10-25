import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { about, mission, vision } from "@/lib/content";

const statements = [
  { label: "Our Mission", text: mission },
  { label: "Our Vision", text: vision },
];

/** Mission + vision cards; shared by the home About section and the About page. */
export function MissionVision() {
  return (
    <Reveal selector="[data-mv]" className="grid gap-4 md:grid-cols-2">
      {statements.map((s) => (
        <div data-mv key={s.label} className="h-full">
          <SpotlightCard
            className="h-full rounded-[var(--radius-lg)] border border-border-strong/70 bg-gradient-to-br from-surface-2 to-surface p-8 text-center sm:p-10"
          >
            <h3 className="font-label text-sm uppercase tracking-[0.18em] text-accent">{s.label}</h3>
            <p className="mx-auto mt-5 max-w-md text-xl font-medium leading-snug text-ink sm:text-2xl">{s.text}</p>
          </SpotlightCard>
        </div>
      ))}
    </Reveal>
  );
}

export function AboutIntro() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{about.kicker}</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] text-ink">
            {about.title} <span className="text-accent">{about.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{about.body}</p>
        </Reveal>
        <div className="mx-auto mt-14 max-w-5xl">
          <MissionVision />
        </div>
      </div>
    </section>
  );
}
