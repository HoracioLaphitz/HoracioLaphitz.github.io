import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const heroSource = readFileSync(
  resolve(process.cwd(), "src/presentation/components/sections/Hero.tsx"),
  "utf8",
);

const aboutSource = readFileSync(
  resolve(process.cwd(), "src/presentation/components/sections/About.tsx"),
  "utf8",
);

describe("home capability presentation", () => {
  it("Hero no longer renders Enterprise AI evidence inline", () => {
    expect(heroSource).not.toContain("ENTERPRISE_AI_EVIDENCE");
    expect(heroSource).not.toContain("capability.claimId");
    expect(heroSource).not.toContain("capability.scope");
    expect(heroSource).not.toContain("capability.status");
    expect(heroSource).not.toContain("Currently deepening expertise in");
  });

  it("retains project discovery and avoids unsupported enterprise case-study language", () => {
    expect(heroSource).toContain('href="#featured-projects"');
    expect(heroSource).not.toMatch(/client|production|deployed|security assurance/i);
  });

  it("qualifies private agent infrastructure as an area in development", () => {
    expect(aboutSource).toContain(
      "Exploración de agentes y subagentes en infraestructura privada",
    );
    expect(aboutSource).toContain(
      "Investigo cómo coordinar especialistas sin",
    );
    expect(aboutSource).not.toContain(
      "Agentes y Subagentes autónomos en infraestructura privada",
    );
    expect(aboutSource).not.toContain(
      "Los datos son tuyos, y tenes control total sobre ellos.",
    );
  });
});
