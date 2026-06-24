import { describe, it, expect } from "vitest";
import {
  site,
  stats,
  pillars,
  founders,
  capabilities,
  industries,
  processSteps,
  testimonial,
  locations,
} from "./content";
import { WHATSAPP_NUMBER } from "./whatsapp";

describe("content", () => {
  it("carries the brand identity and WhatsApp contact", () => {
    expect(site.name).toBe("Chipzenix");
    expect(site.tagline).toMatch(/silicon/i);
    expect(site.contact.whatsapp).toBe(WHATSAPP_NUMBER);
  });

  it("has three headline stats with the right figures", () => {
    expect(stats).toHaveLength(3);
    expect(stats.map((s) => s.value)).toEqual([100, 50, 99]);
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

  it("has two founders, the first being Muzammil, each with an image", () => {
    expect(founders).toHaveLength(2);
    expect(founders[0].name).toBe("Muzammil");
    for (const f of founders) {
      expect(f.image).toBeTruthy();
      expect(f.name).toBeTruthy();
    }
  });

  it("has capabilities, industries, process steps, locations, and a testimonial", () => {
    expect(capabilities.length).toBeGreaterThan(0);
    expect(industries.length).toBeGreaterThan(0);
    expect(processSteps.length).toBeGreaterThan(0);
    expect(locations.length).toBe(3);
    expect(testimonial.name).toMatch(/anika/i);
  });
});
