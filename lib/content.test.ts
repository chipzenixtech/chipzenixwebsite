import { describe, it, expect } from "vitest";
import {
  site,
  about,
  mission,
  vision,
  domains,
  domainsFor,
  domainHref,
  reasons,
  capabilities,
  industries,
  processSteps,
  locations,
  heroSlides,
  faqs,
  pageSeo,
} from "./content";
import { WHATSAPP_NUMBER } from "./whatsapp";

const visibleCopy = () =>
  JSON.stringify({ site, about, mission, vision, domains, reasons, industries, faqs, pageSeo, heroSlides });

describe("content", () => {
  it("carries the brand identity and WhatsApp contact", () => {
    expect(site.name).toBe("Chipzenix");
    expect(site.tagline).toMatch(/silicon/i);
    expect(site.contact.whatsapp).toBe(WHATSAPP_NUMBER);
  });

  it("uses the client's hero line, mission and vision", () => {
    expect(site.heroIntro).toMatch(/^Innovating Silicon, Delivering Excellence, Building Lasting Connections/);
    expect(mission).toMatch(/^Deliver innovative, reliable, and cost-effective engineering solutions/);
    expect(vision).toMatch(/^To become a trusted global partner/);
  });

  it("has the deck's VLSI and embedded domains", () => {
    expect(domainsFor("vlsi").map((d) => d.title)).toEqual([
      "Analog Layout",
      "Analog Circuit",
      "Physical Design (PD)",
      "RTL Design",
      "Design Verification (DV)",
      "Static Timing Analysis (STA)",
      "Design for Testability (DFT)",
    ]);
    expect(domainsFor("embedded")).toHaveLength(8);
  });

  it("gives every domain a unique page with a write-up and capability lists", () => {
    const hrefs = domains.map(domainHref);
    expect(new Set(hrefs).size).toBe(domains.length);
    for (const d of domains) {
      expect(d.slug).toMatch(/^[a-z0-9-]+$/);
      expect(d.intro.length).toBeGreaterThan(0);
      expect(d.groups.length).toBeGreaterThan(0);
      for (const g of d.groups) expect(g.items.length).toBeGreaterThan(0);
      expect(d.pageTitle.length).toBeLessThanOrEqual(60);
      expect(d.description.length).toBeGreaterThanOrEqual(110);
      expect(d.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("lists all eight reasons to choose us, each with a one-liner", () => {
    expect(reasons).toHaveLength(8);
    for (const r of reasons) expect(r.detail.length).toBeGreaterThan(20);
  });

  it("has a multi-image hero slideshow with alt text and captions", () => {
    expect(heroSlides.length).toBeGreaterThanOrEqual(3);
    for (const s of heroSlides) {
      expect(s.alt.length).toBeGreaterThan(10);
      expect(s.caption.length).toBeGreaterThan(0);
    }
  });

  it("keeps visible copy free of em dashes", () => {
    expect(visibleCopy()).not.toContain("—");
  });

  it("has capabilities, industries, process steps and locations", () => {
    expect(capabilities.length).toBeGreaterThan(0);
    expect(industries.length).toBeGreaterThan(0);
    expect(processSteps.length).toBeGreaterThan(0);
    expect(locations.map((l) => l.city)).toEqual(["Hyderabad", "Satupally"]);
  });

  it("has FAQ answers built from real content", () => {
    expect(faqs.length).toBeGreaterThanOrEqual(6);
    for (const f of faqs) {
      expect(f.question.endsWith("?")).toBe(true);
      expect(f.answer).not.toMatch(/undefined/);
      expect(f.answer.length).toBeGreaterThan(40);
    }
  });

  it("keeps page titles and descriptions short enough for search and link previews", () => {
    for (const seo of Object.values(pageSeo)) {
      expect(seo.title.length).toBeLessThanOrEqual(60);
      expect(seo.description.length).toBeGreaterThanOrEqual(110);
      expect(seo.description.length).toBeLessThanOrEqual(160);
    }
  });
});
