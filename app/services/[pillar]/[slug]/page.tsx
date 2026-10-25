import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { domainHref, domainPillars, domains, domainSeo, domainsFor } from "@/lib/content";
import { pageJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

type Params = { pillar: string; slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return domains.map((d) => ({ pillar: d.pillar, slug: d.slug }));
}

const find = ({ pillar, slug }: Params) => domains.find((d) => d.pillar === pillar && d.slug === slug);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const d = find(await params);
  if (!d) return {};
  return pageMetadata(domainHref(d), domainSeo(d));
}

export default async function DomainPage({ params }: { params: Promise<Params> }) {
  const d = find(await params);
  if (!d) notFound();

  const pillar = domainPillars[d.pillar];
  const siblings = domainsFor(d.pillar).filter((s) => s.slug !== d.slug);
  const path = domainHref(d);

  return (
    <main>
      <JsonLd
        data={pageJsonLd(path, d.pageTitle, domainSeo(d), [
          { name: "Services", path: "/services" },
          { name: pillar.label, path: `/services#${d.pillar}` },
        ])}
      />
      <JsonLd data={serviceJsonLd(d)} />

      <PageHeader
        breadcrumb={[
          { label: "Services", href: "/services" },
          { label: pillar.label, href: `/services#${d.pillar}` },
        ]}
        kicker={pillar.heading}
        title={d.pageTitle}
        intro={d.tagline}
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <Reveal className="space-y-5">
            {d.intro.map((para, i) => (
              <p key={i} className={i === 0 ? "text-xl leading-relaxed text-ink sm:text-2xl" : "text-lg leading-relaxed text-muted"}>
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal>
            <nav
              aria-label="On this page"
              className="rounded-[var(--radius-lg)] border border-border bg-surface/60 p-6 lg:sticky lg:top-28"
            >
              <p className="font-label text-xs uppercase tracking-[0.16em] text-faint">What we cover</p>
              <ul className="mt-4 space-y-2.5">
                {d.groups.map((g) => (
                  <li key={g.title} className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-ink">{g.title}</span>
                    <span className="font-mono text-xs text-accent">{String(g.items.length).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                prefetch={false}
                className="mt-6 inline-flex w-full items-center justify-center rounded-[var(--radius)] bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
              >
                Discuss your project
              </Link>
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal selector="[data-group]" className="grid gap-4 md:grid-cols-2">
            {d.groups.map((g) => (
              <div data-group key={g.title} className={g.items.length > 6 ? "md:col-span-2" : ""}>
                <SpotlightCard className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-7 sm:p-8">
                  <h2 className="font-label text-sm uppercase tracking-[0.16em] text-accent">{g.title}</h2>
                  <ul
                    className={`mt-5 grid gap-x-8 gap-y-3 ${g.items.length > 6 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
                  >
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-label text-xs uppercase tracking-[0.16em] text-faint">More {pillar.label}</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link
                  href={domainHref(s)}
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  {s.title}
                  <span aria-hidden="true" className="text-accent">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
