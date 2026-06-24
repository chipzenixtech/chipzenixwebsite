import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
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
      <Pillars />
      <Capabilities />
      <Process />
      <Testimonial />
      <Teasers />
      <ContactCta />
    </main>
  );
}
