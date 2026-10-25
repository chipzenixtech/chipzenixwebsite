import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageSeo, site, locations } from "@/lib/content";
import { pageJsonLd, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = pageMetadata("/contact", pageSeo.contact);

export default function ContactPage() {
  const wa = `https://wa.me/${site.contact.whatsapp}`;

  return (
    <main>
      <JsonLd data={pageJsonLd("/contact", "Contact", pageSeo.contact)} />
      <PageHeader
        kicker="Contact"
        title="Start a project"
        intro="Tell us what you're designing. We'll come back — usually within a day — with how we'd de-risk and accelerate it."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal className="flex flex-col gap-8">
            <div>
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-faint">Direct</h2>
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-ink transition-colors hover:text-accent"
                >
                  WhatsApp {site.contact.whatsappDisplay}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-lg text-ink transition-colors hover:text-accent"
                >
                  {site.contact.email}
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-faint">Locations</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {locations.map((l) => (
                  <li key={l.city}>
                    <span className="text-ink">{l.city}</span>
                    <span className="text-muted"> — {l.role ?? l.region}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
