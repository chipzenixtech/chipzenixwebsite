import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageSeo, site } from "@/lib/content";
import { pageJsonLd, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = pageMetadata("/careers", pageSeo.careers);

const values = [
  { title: "Craft over volume", body: "We take fewer projects and do them properly. Quality is the brand." },
  { title: "Ownership, end to end", body: "Engineers own their blocks from spec to signoff, and the decisions in between." },
  { title: "Teach and be taught", body: "Reviews are how we level up. Strong opinions, held loosely, backed by data." },
  { title: "Remote-friendly", body: "Hybrid across our Telangana centres, asynchronous by default, synchronous when it matters." },
];

// Placeholder roles — replace with real openings.
const roles = [
  { title: "Senior RTL Design Engineer", location: "Hyderabad / Remote", type: "Full-time" },
  { title: "Verification Engineer (UVM)", location: "Hyderabad / Remote", type: "Full-time" },
  { title: "Embedded Firmware Engineer", location: "Satupally / Remote", type: "Full-time" },
  { title: "Physical Design Engineer", location: "Satupally", type: "Full-time" },
];

export default function CareersPage() {
  const apply = `https://wa.me/${site.contact.whatsapp}`;

  return (
    <main>
      <JsonLd data={pageJsonLd("/careers", "Careers", pageSeo.careers)} />
      <PageHeader
        kicker="Careers"
        title="Build silicon that ships at scale"
        intro="We hire VLSI and embedded engineers who care about doing it right. If that's you, we should talk."
      />

      {/* Values */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal selector="[data-val]" className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div data-val key={v.title} className="h-full">
                <SpotlightCard className="h-full rounded-lg border border-border bg-surface p-8">
                  <h2 className="text-xl font-semibold text-ink">{v.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
                </SpotlightCard>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Open roles */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">Open roles</h2>
            <p className="mt-4 text-muted">
              Don&rsquo;t see your exact role? Reach out anyway. We&rsquo;re always glad to meet
              strong engineers.
            </p>
          </Reveal>

          <Reveal selector="[data-role]" className="mt-10 flex flex-col gap-3">
            {roles.map((r) => (
              <div data-role key={r.title}>
                <SpotlightCard
                  className="rounded-lg border border-border bg-surface p-6"
                  contentClassName="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{r.title}</h3>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {r.location} · {r.type}
                    </p>
                  </div>
                  <Button href={apply} external variant="ghost" className="min-h-0 shrink-0 px-5 py-2.5">
                    Apply via WhatsApp
                  </Button>
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
