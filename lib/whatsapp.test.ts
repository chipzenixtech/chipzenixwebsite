import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl, validateContact, WHATSAPP_NUMBER } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  it("targets the configured number", () => {
    const url = buildWhatsAppUrl({ name: "Asha", email: "a@x.com", message: "Hello" });
    expect(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`)).toBe(true);
  });

  it("encodes the field values into the message body", () => {
    const url = buildWhatsAppUrl({
      name: "Asha Rao",
      email: "a@x.com",
      company: "Acme",
      message: "Hi & welcome",
    });
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Asha Rao");
    expect(decoded).toContain("a@x.com");
    expect(decoded).toContain("Acme");
    expect(decoded).toContain("Hi & welcome");
  });

  it("omits the company line when absent or blank", () => {
    expect(decodeURIComponent(buildWhatsAppUrl({ name: "A", email: "a@x.com", message: "m" }))).not.toContain("Company:");
    expect(decodeURIComponent(buildWhatsAppUrl({ name: "A", email: "a@x.com", company: "  ", message: "m" }))).not.toContain("Company:");
  });

  it("produces a url with no raw spaces or newlines", () => {
    const url = buildWhatsAppUrl({ name: "A B", email: "a@x.com", message: "line one\nline two" });
    expect(url).not.toMatch(/\s/);
  });
});

describe("validateContact", () => {
  it("flags missing required fields", () => {
    const e = validateContact({ name: "", email: "", message: "" });
    expect(e.name).toBeTruthy();
    expect(e.email).toBeTruthy();
    expect(e.message).toBeTruthy();
  });

  it("flags malformed email", () => {
    expect(validateContact({ name: "A", email: "nope", message: "m" }).email).toBeTruthy();
  });

  it("treats whitespace-only as empty", () => {
    expect(validateContact({ name: "   ", email: "a@x.com", message: "m" }).name).toBeTruthy();
  });

  it("passes valid input with no errors", () => {
    expect(validateContact({ name: "A", email: "a@x.com", message: "m" })).toEqual({});
  });
});
