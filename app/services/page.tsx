import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactCta } from "@/components/sections/ContactCta";
import { pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "VLSI & ASIC design and embedded systems engineering services from Chip Zenix — RTL to tapeout, firmware to the field.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        kicker="Services"
        title="Full-stack silicon engineering"
        intro="From front-end RTL through physical signoff, and from bare-metal firmware to embedded Linux — the disciplines below run under one roof, with one accountable team."
      />

      {pillars.map((p) => (
        <section key={p.id} id={p.id} className="scroll-mt-24 border-b border-border">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {p.tagline}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{p.title}</h2>
              <p className="mt-4 text-muted">{p.description}</p>
            </Reveal>

            <Reveal
              selector="[data-svc]"
              className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
            >
              {p.services.map((s) => (
                <div data-svc key={s.name} className="flex flex-col bg-bg p-6">
                  <h3 className="font-semibold text-ink">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
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
