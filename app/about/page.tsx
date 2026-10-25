import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageSeo, about, locations } from "@/lib/content";
import { pageJsonLd, pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MissionVision } from "@/components/sections/AboutIntro";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = pageMetadata("/about", pageSeo.about);

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={pageJsonLd("/about", "About", pageSeo.about)} />
      <PageHeader
        kicker={about.kicker}
        title={
          <>
            {about.title} <span className="text-accent">{about.titleAccent}</span>
          </>
        }
        intro={about.body}
      />

      {/* Mission & Vision */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <MissionVision />
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

      <WhyChooseUs />

      {/* Locations */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">Where we work</h2>
            <p className="mt-4 text-muted">Two engineering centres in Telangana, India.</p>
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
