import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { ContactCta } from "@/components/sections/ContactCta";
import { mission, vision, stats, founders, locations } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Chip Zenix is a semiconductor engineering services company across Silicon Valley, Bengaluru, and Munich.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        kicker="About"
        title="People who take silicon seriously"
        intro="Chip Zenix is a semiconductor and embedded engineering team built around one idea: hard silicon problems deserve engineers who sweat the details."
      />

      {/* Mission & Vision */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Mission</h2>
            <p className="mt-4 text-2xl font-medium leading-snug text-ink">{mission}</p>
          </Reveal>
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Vision</h2>
            <p className="mt-4 text-2xl font-medium leading-snug text-ink">{vision}</p>
          </Reveal>
        </div>
      </section>

      {/* Cleanroom image band */}
      <section className="relative h-[42vh] min-h-[18rem] w-full overflow-hidden border-b border-border">
        <Image
          src="/images/cleanroom.webp"
          alt="Engineers in cleanroom suits operating semiconductor fabrication equipment"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/30 to-transparent" />
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-16 gap-y-10 px-5 py-20 sm:px-8">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* Founders */}
      <section id="founders" className="scroll-mt-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">Founders</h2>
            <p className="mt-4 text-muted">
              The people accountable for every engagement at Chip Zenix.
            </p>
          </Reveal>
          <Reveal selector="[data-founder]" className="mt-12 grid gap-8 sm:grid-cols-2">
            {founders.map((f) => (
              <article
                data-founder
                key={f.name}
                className="overflow-hidden rounded-lg border border-border bg-surface"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-deep">
                  <Image
                    src={f.image}
                    alt={`Portrait of ${f.name}, ${f.role} of Chip Zenix`}
                    fill
                    sizes="(min-width:640px) 46vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ink">{f.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    {f.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.bio}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Locations */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">Where we work</h2>
            <p className="mt-4 text-muted">Three hubs, one continuous engineering day.</p>
          </Reveal>
          <Reveal
            selector="[data-loc]"
            className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3"
          >
            {locations.map((l) => (
              <div data-loc key={l.city} className="bg-bg p-8">
                <h3 className="text-2xl font-semibold text-ink">{l.city}</h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  {l.role ?? "Engineering hub"}
                </p>
                <p className="mt-1 text-sm text-muted">{l.region}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
