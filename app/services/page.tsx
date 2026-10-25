import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { expertise, pageSeo } from "@/lib/content";
import { pageJsonLd, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { DomainGrid } from "@/components/sections/DomainGrid";
import { Process } from "@/components/sections/Process";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = pageMetadata("/services", pageSeo.services);

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={pageJsonLd("/services", "Services", pageSeo.services)} />
      <PageHeader
        kicker={expertise.kicker}
        title={
          <>
            {expertise.title} <span className="whitespace-nowrap text-accent">{expertise.titleAccent}</span>{" "}
            {expertise.titleEnd}
          </>
        }
        intro={expertise.intro}
      />
      <DomainGrid pillar="vlsi" />
      <DomainGrid pillar="embedded" />
      <div className="border-b border-border">
        <Process />
      </div>
      <ContactCta />
    </main>
  );
}
