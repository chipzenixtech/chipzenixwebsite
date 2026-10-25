import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageSeo, pillars } from "@/lib/content";
import { pageJsonLd, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = pageMetadata("/services", pageSeo.services);

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={pageJsonLd("/services", "Services", pageSeo.services)} />
      <PageHeader
        kicker="Services"
        title="Full-stack silicon engineering"
        intro="From front-end RTL through physical signoff, and from bare-metal firmware to embedded Linux — the disciplines below run under one roof, with one accountable team."
      />

      {pillars.map((p) => (
        <section key={p.id} id={p.id} className="scroll-mt-24 border-b border-border">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal className="max-w-2xl">
              <p className="font-label text-xs uppercase tracking-[0.16em] text-accent">
                {p.tagline}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{p.title}</h2>
              <p className="mt-4 text-muted">{p.description}</p>
            </Reveal>

            <Reveal
              selector="[data-svc]"
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {p.services.map((s) => (
                <div data-svc key={s.name} className="h-full">
                  <SpotlightCard className="h-full rounded-lg border border-border bg-surface p-6">
                    <h3 className="font-semibold text-ink">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                  </SpotlightCard>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      ))}

      <ContactCta />
    </main>
  );
}
