import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageSeo, site, headquarters, addressLine } from "@/lib/content";
import { pageJsonLd, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = pageMetadata("/contact", pageSeo.contact);

export default function ContactPage() {

  return (
    <main>
      <JsonLd data={pageJsonLd("/contact", "Contact", pageSeo.contact)} />
      <PageHeader
        kicker="Contact"
        title="Start a project"
        intro="Tell us what you're designing. We'll usually come back within a day with how we'd de-risk and accelerate it."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal className="flex flex-col gap-8">
            <div>
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-faint">Phone</h2>
              <a
                href={`tel:+${site.contact.phone}`}
                className="mt-4 inline-block text-lg text-ink transition-colors hover:text-accent"
              >
                {site.contact.phoneDisplay}
              </a>
            </div>

            <div>
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-faint">Address</h2>
              <address className="mt-4 max-w-xs text-lg not-italic text-ink">
                <span className="block text-sm text-muted">{headquarters.role}</span>
                {addressLine(headquarters)}
              </address>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
