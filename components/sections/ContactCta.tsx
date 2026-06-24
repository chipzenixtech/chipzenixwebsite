import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CircuitField } from "@/components/visual/CircuitField";
import { site } from "@/lib/content";

export function ContactCta() {
  const wa = `https://wa.me/${site.contact.whatsapp}`;
  return (
    <section className="relative isolate overflow-hidden border-t border-border bg-bg-deep">
      <CircuitField className="pointer-events-none absolute inset-0 h-full w-full opacity-40 [mask-image:radial-gradient(120%_120%_at_50%_25%,black,transparent_72%)]" />
      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold text-ink">
            Let&rsquo;s build your next chip
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Tell us what you&rsquo;re designing. We&rsquo;ll come back — usually within a day — with
            how we&rsquo;d de-risk and accelerate it.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/contact">Start a project</Button>
            <Button href={wa} external variant="ghost">
              Message us on WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
