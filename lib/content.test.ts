import { describe, it, expect } from "vitest";
import {
  site,
  propositions,
  pillars,
  capabilities,
  industries,
  processSteps,
  testimonials,
  locations,
  faqs,
  pageSeo,
} from "./content";
import { WHATSAPP_NUMBER } from "./whatsapp";

describe("content", () => {
  it("carries the brand identity and WhatsApp contact", () => {
    expect(site.name).toBe("Chipzenix");
    expect(site.tagline).toMatch(/silicon/i);
    expect(site.contact.whatsapp).toBe(WHATSAPP_NUMBER);
  });

  it("has positioning propositions (not fabricated metrics)", () => {
    expect(propositions.length).toBeGreaterThanOrEqual(3);
    for (const p of propositions) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.detail.length).toBeGreaterThan(0);
    }
  });

  it("has VLSI (12) and Embedded (11) service pillars", () => {
    expect(pillars.find((p) => p.id === "vlsi")?.services).toHaveLength(12);
    expect(pillars.find((p) => p.id === "embedded")?.services).toHaveLength(11);
  });

  it("gives every service a name and description", () => {
    for (const p of pillars)
      for (const s of p.services) {
        expect(s.name.length).toBeGreaterThan(0);
        expect(s.description.length).toBeGreaterThan(0);
      }
  });

  it("has capabilities, industries, process steps, locations, and testimonials", () => {
    expect(capabilities.length).toBeGreaterThan(0);
    expect(industries.length).toBeGreaterThan(0);
    expect(processSteps.length).toBeGreaterThan(0);
    expect(locations.length).toBe(2);
    expect(locations.map((l) => l.city)).toEqual(["Hyderabad", "Satupally"]);
    expect(testimonials.length).toBeGreaterThanOrEqual(3);
    expect(testimonials[0].name).toMatch(/anika/i);
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
