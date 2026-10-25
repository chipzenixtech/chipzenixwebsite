import { about, domainPillars, domainsFor, faqs, industries, locations, mission, pageSeo, reasons, site, vision } from "@/lib/content";
import { SITE_URL, domainPages } from "@/lib/seo";

// llms.txt (llmstxt.org): a plain-Markdown brief for AI assistants and answer
// engines, generated from the same content module as the site at build time.
export const dynamic = "force-static";

export function GET() {
  const link = (path: string, label: string, note: string) => `- [${label}](${SITE_URL}${path}/): ${note}`;
  const body = [
    `# ${site.name}`,
    "",
    `> ${pageSeo.home.description}`,
    "",
    about.body,
    "",
    `Mission: ${mission}`,
    `Vision: ${vision}`,
    "",
    "## Pages",
    `- [Home](${SITE_URL}/): overview, domains of expertise, why choose us, FAQ`,
    link("/services", "Services", pageSeo.services.description),
    link("/about", "About", pageSeo.about.description),
    link("/careers", "Careers", pageSeo.careers.description),
    link("/contact", "Contact", pageSeo.contact.description),
    "",
    ...Object.values(domainPillars).flatMap((p) => [
      `## ${p.label}: ${p.heading}`,
      "",
      ...domainsFor(p.id).map((d) => {
        const page = domainPages.find((x) => x.domain === d)!;
        return `- [${d.pageTitle}](${SITE_URL}${page.path}/): ${d.tagline} Covers ${d.groups
          .map((g) => g.title.toLowerCase())
          .join(", ")}.`;
      }),
      "",
    ]),
    "## Why choose us",
    ...reasons.map((r) => `- ${r.title}: ${r.detail}`),
    "",
    "## Industries",
    industries.join(", "),
    "",
    "## Locations",
    ...locations.map((l) => `- ${l.city}, ${l.region}${l.role ? ` (${l.role})` : ""}`),
    "",
    "## Contact",
    `- WhatsApp: ${site.contact.whatsappDisplay} (https://wa.me/${site.contact.whatsapp})`,
    `- Email: ${site.contact.email}`,
    `- Contact page: ${SITE_URL}/contact/`,
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
