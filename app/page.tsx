import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Industries } from "@/components/sections/Industries";
import { Pillars } from "@/components/sections/Pillars";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { Testimonial } from "@/components/sections/Testimonial";
import { Teasers } from "@/components/sections/Teasers";
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
      <TrustStrip />
      <Industries />
      <Pillars />
      <Capabilities />
      <Process />
      <Testimonial />
      <Teasers />
      <Faq />
      <ContactCta />
    </main>
  );
}
