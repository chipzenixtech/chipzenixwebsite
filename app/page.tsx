import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Industries } from "@/components/sections/Industries";
import { Pillars } from "@/components/sections/Pillars";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { Testimonial } from "@/components/sections/Testimonial";
import { Teasers } from "@/components/sections/Teasers";
import { ContactCta } from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Industries />
      <Pillars />
      <Capabilities />
      <Process />
      <Testimonial />
      <Teasers />
      <ContactCta />
    </main>
  );
}
