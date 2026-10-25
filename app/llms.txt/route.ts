import { faqs, industries, locations, pageSeo, pillars, processSteps, site } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

// llms.txt (llmstxt.org): a plain-Markdown brief for AI assistants and answer
// engines, generated from the same content module as the site at build time.
export const dynamic = "force-static";

export function GET() {
  const page = (path: string, label: string, note: string) => `- [${label}](${SITE_URL}${path}): ${note}`;
  const body = [
    `# ${site.name}`,
    "",
    `> ${pageSeo.home.description}`,
    "",
    site.intro,
    "",
    "## Pages",
    page("/", "Home", "overview, industries, engagement model, FAQ"),
    page("/services/", "Services", pageSeo.services.description),
    page("/about/", "About", pageSeo.about.description),
    page("/careers/", "Careers", pageSeo.careers.description),
    page("/contact/", "Contact", pageSeo.contact.description),
    "",
    ...pillars.flatMap((p) => [
      `## ${p.title} — ${p.tagline}`,
      p.description,
      "",
      ...p.services.map((s) => `- ${s.name}: ${s.description}`),
      "",
    ]),
    "## Industries",
    industries.join(", "),
    "",
    "## How an engagement works",
    ...processSteps.map((s, i) => `${i + 1}. ${s.title}: ${s.description}`),
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
