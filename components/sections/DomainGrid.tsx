import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { domainHref, domainPillars, domainsFor, type DomainPillarId } from "@/lib/content";

/**
 * One pillar's domains as a grid of cards, each opening its detail page.
 * Cards are centred so a short last row sits in the middle, as in the brand deck.
 */
export function DomainGrid({ pillar, as: Heading = "h2" }: { pillar: DomainPillarId; as?: "h1" | "h2" }) {
  const p = domainPillars[pillar];
  const items = domainsFor(pillar);

  return (
    <section id={pillar} className="scroll-mt-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{p.label}</Eyebrow>
          <Heading className="mt-5 text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] text-ink">
            {p.heading}
          </Heading>
        </Reveal>

        <Reveal selector="[data-domain]" className="mt-12 flex flex-wrap justify-center gap-4">
          {items.map((d) => (
            <div
              data-domain
              key={d.slug}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <Link href={domainHref(d)} prefetch={false} className="group block h-full rounded-[var(--radius-lg)]">
                <SpotlightCard
                  className="h-full rounded-[var(--radius-lg)] border border-border bg-gradient-to-b from-surface-2 to-bg-deep p-7"
                  contentClassName="flex h-full flex-col"
                >
                  <h3 className="text-xl font-semibold leading-tight text-ink">{d.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{d.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-label text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    Explore services
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </SpotlightCard>
              </Link>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
