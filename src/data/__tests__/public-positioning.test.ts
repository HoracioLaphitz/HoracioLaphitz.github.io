import { describe, expect, it } from "vitest";
import { PUBLIC_POSITIONING } from "../public-positioning.v1";

describe("public positioning contract", () => {
  it("publishes one shared identity, contact, canonical URL and approved positioning", () => {
    expect(PUBLIC_POSITIONING.identity.name).toBe("Horacio Laphitz");
    expect(PUBLIC_POSITIONING.contact.email).toBe("horaciolaphitz99@gmail.com");
    expect(PUBLIC_POSITIONING.siteUrl).toMatch(/^https:\/\//);
    expect(PUBLIC_POSITIONING.positioning.focus).toMatch(/Enterprise AI/i);
    expect(PUBLIC_POSITIONING.maturityStatuses).toContain("In development");
  });

  it("connects every capability claim to evidence or an approved developing status", () => {
    expect(PUBLIC_POSITIONING.capabilities.length).toBeGreaterThan(0);
    for (const capability of PUBLIC_POSITIONING.capabilities) {
      expect(capability.claimId).toBeTruthy();
      expect(capability.sources.length).toBeGreaterThan(0);
      if (capability.status) {
        expect(PUBLIC_POSITIONING.maturityStatuses).toContain(capability.status);
      }
    }
  });
});
