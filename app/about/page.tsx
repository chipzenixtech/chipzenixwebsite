import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Propositions } from "@/components/ui/Propositions";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { mission, vision, locations } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Chipzenix is a semiconductor engineering services company based in Hyderabad and Satupally, Telangana.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        kicker="About"
        title="People who take silicon seriously"
        intro="Chipzenix is a semiconductor and embedded engineering team built around one idea: hard silicon problems deserve engineers who sweat the details."
      />

      {/* Mission & Vision */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-label text-xs uppercase tracking-[0.16em] text-accent">Mission</h2>
            <p className="mt-4 text-2xl font-medium leading-snug text-ink">{mission}</p>
          </Reveal>
          <Reveal>
            <h2 className="font-label text-xs uppercase tracking-[0.16em] text-accent">Vision</h2>
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

      {/* How we work */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">How we work</h2>
            <p className="mx-auto mt-4 text-muted">
              Full ownership of hard silicon problems — from architecture to signoff.
            </p>
          </Reveal>
          <div className="mt-12">
            <Propositions />
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">Where we work</h2>
            <p className="mt-4 text-muted">Two engineering centres in Telangana, one accountable team.</p>
          </Reveal>
          <Reveal selector="[data-loc]" className="mt-12 grid gap-4 sm:grid-cols-2">
            {locations.map((l) => (
              <div data-loc key={l.city} className="h-full">
                <SpotlightCard className="h-full rounded-lg border border-border bg-surface p-8">
                  <h3 className="text-2xl font-semibold text-ink">{l.city}</h3>
                  <p className="mt-2 font-label text-xs uppercase tracking-[0.14em] text-accent">
                    {l.role ?? "Engineering hub"}
                  </p>
                  <p className="mt-1 text-sm text-muted">{l.region}</p>
                </SpotlightCard>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
