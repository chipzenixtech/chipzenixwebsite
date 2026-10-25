import { Hero } from "@/components/sections/Hero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Expertise } from "@/components/sections/Expertise";
import { DomainGrid } from "@/components/sections/DomainGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Capabilities } from "@/components/sections/Capabilities";
import { Industries } from "@/components/sections/Industries";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { pageSeo } from "@/lib/content";
import { pageJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main>
      <JsonLd data={pageJsonLd("/", "Home", pageSeo.home)} />
      <Hero />
      <AboutIntro />
      <Expertise />
      <DomainGrid pillar="vlsi" />
      <DomainGrid pillar="embedded" />
      <WhyChooseUs />
      <Capabilities />
      <Industries />
      <Faq />
      <ContactCta />
    </main>
  );
}
