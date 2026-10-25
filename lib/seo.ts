import type { Metadata } from "next";
import {
  site,
  locations,
  faqs,
  domains,
  domainPillars,
  domainsFor,
  domainHref,
  type Domain,
  type PageSeo,
} from "./content";

/**
 * Canonical origin. Vercel serves the site on www and 308-redirects the apex
 * domain to it, so canonicals, the sitemap and structured data use www. If the
 * primary domain is ever flipped in Vercel, change it here only.
 */
export const SITE_URL = "https://www.chipzenix.com";

export const OG_IMAGE = {
  url: "/og-chipzenix.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: `${site.name}: ${site.tagline}`,
};

export const LOGO_URL = `${SITE_URL}/brand/chipzenix-logo-square.png`;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const socialProfiles = Object.values(site.socials).filter(Boolean);

/**
 * Full metadata for one route: title, description, canonical, and its own
 * OpenGraph/Twitter card (so a shared /about link previews as About, not Home).
 */
export function pageMetadata(path: string, seo: PageSeo, opts: { absoluteTitle?: boolean } = {}): Metadata {
  const shareTitle = opts.absoluteTitle ? seo.title : `${seo.title} | ${site.name}`;
  return {
    title: opts.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description: seo.description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_IN",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: seo.description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Site-wide Organization + WebSite graph, rendered once in the root layout. */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.name,
      alternateName: "Chipzenix Tech",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL, width: 1200, height: 1200 },
      image: `${SITE_URL}${OG_IMAGE.url}`,
      slogan: site.tagline,
      description: site.intro,
      email: site.contact.email,
      telephone: `+${site.contact.whatsapp}`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${site.contact.whatsapp}`,
        email: site.contact.email,
        url: `${SITE_URL}/contact/`,
        availableLanguage: ["English"],
      },
      foundingLocation: { "@type": "Place", name: "Hyderabad, Telangana, India" },
      address: locations.map((l) => ({
        "@type": "PostalAddress",
        addressLocality: l.city,
        addressRegion: "Telangana",
        addressCountry: "IN",
      })),
      areaServed: "Worldwide",
      knowsAbout: [
        "Semiconductor engineering",
        "VLSI design",
        "ASIC and SoC design",
        "Analog and mixed-signal IC design",
        "Analog layout",
        "Physical design",
        "RTL design",
        "Design verification",
        "UVM",
        "Static timing analysis",
        "Design for testability",
        "Advanced process nodes",
        "Embedded systems",
        "Embedded firmware",
        "Embedded Linux",
        "RTOS",
        "AUTOSAR",
        "IoT and edge computing",
        "Embedded AI",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Semiconductor engineering services",
        itemListElement: Object.values(domainPillars).map((p) => ({
          "@type": "OfferCatalog",
          name: p.label,
          description: p.heading,
          itemListElement: domainsFor(p.id).map((d) => ({
            "@type": "Offer",
            itemOffered: { "@id": `${SITE_URL}${domainHref(d)}/#service` },
          })),
        })),
      },
      ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: site.name,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
  ],
};

const absolute = (path: string) => {
  const [p, hash] = path.split("#");
  const base = `${SITE_URL}${p === "/" ? "/" : `${p}/`}`;
  return hash ? `${base}#${hash}` : base;
};

/**
 * WebPage + breadcrumb for a route. `name` is this page's crumb label; `parents`
 * are the crumbs between Home and this page.
 */
export function pageJsonLd(
  path: string,
  name: string,
  seo: PageSeo,
  parents: { name: string; path: string }[] = [],
) {
  const url = absolute(path);
  const crumbs = [
    { name: "Home", url: `${SITE_URL}/` },
    ...parents.map((c) => ({ name: c.name, url: absolute(c.path) })),
    ...(path === "/" ? [] : [{ name, url }]),
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${OG_IMAGE.url}` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.url,
        })),
      },
    ],
  };
}

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

/** Service schema for a domain detail page, linked to the organization. */
export function serviceJsonLd(d: Domain) {
  const url = absolute(domainHref(d));
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: d.pageTitle,
    serviceType: d.title,
    description: d.description,
    url,
    category: domainPillars[d.pillar].label,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: d.pageTitle,
      itemListElement: d.groups.map((g) => ({
        "@type": "OfferCatalog",
        name: g.title,
        itemListElement: g.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item },
        })),
      })),
    },
  };
}

/** Every domain detail page, for the sitemap and llms.txt. */
export const domainPages = domains.map((d) => ({ domain: d, path: domainHref(d) }));
