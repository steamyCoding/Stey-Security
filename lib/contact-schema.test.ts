import { describe, expect, it } from "vitest";
import { validateContact } from "./contact-schema";
import { rateLimit, resetRateLimitForTests } from "./rate-limit";

const valid = {
  inquiryType: "free-review",
  fullName: "Ada Lovelace",
  businessEmail: "ada@example.com",
  company: "Example Ltd",
  website: "https://example.com",
  serviceOfInterest: "Web Application Penetration Testing",
  message: "We run a SaaS product and want a first look at our login flow.",
  authorized: true,
};

describe("validateContact", () => {
  it("accepts a complete, authorized request", () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
  });

  it("requires the authorization confirmation to be explicitly true", () => {
    expect(validateContact({ ...valid, authorized: false }).ok).toBe(false);
    expect(validateContact({ ...valid, authorized: "true" }).ok).toBe(false);
  });

  it("rejects unknown inquiry types and services", () => {
    expect(validateContact({ ...valid, inquiryType: "admin" }).ok).toBe(false);
    expect(validateContact({ ...valid, serviceOfInterest: "Anything" }).ok).toBe(false);
  });

  it("rejects malformed emails and non-http website values", () => {
    expect(validateContact({ ...valid, businessEmail: "not-an-email" }).ok).toBe(false);
    expect(validateContact({ ...valid, website: "javascript:alert(1)" }).ok).toBe(false);
  });

  it("allows an empty website but enforces length limits", () => {
    expect(validateContact({ ...valid, website: "" }).ok).toBe(true);
    expect(validateContact({ ...valid, message: "x".repeat(4001) }).ok).toBe(false);
  });

  it("handles non-object payloads without throwing", () => {
    expect(validateContact(null).ok).toBe(false);
    expect(validateContact("string").ok).toBe(false);
  });

  it("strips control characters from text fields", () => {
    const result = validateContact({ ...valid, fullName: "Ada\u0007 Lovelace" });
    expect(result.ok && result.data.fullName).toBe("Ada Lovelace");
  });
});

describe("rateLimit", () => {
  it("blocks after the limit within a window and resets afterwards", () => {
    resetRateLimitForTests();
    const t0 = 1_000_000;
    expect(rateLimit("ip", 2, 60_000, t0)).toBe(true);
    expect(rateLimit("ip", 2, 60_000, t0)).toBe(true);
    expect(rateLimit("ip", 2, 60_000, t0)).toBe(false);
    expect(rateLimit("ip", 2, 60_000, t0 + 60_001)).toBe(true);
  });
});
