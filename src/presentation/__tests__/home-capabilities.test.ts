import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ENTERPRISE_AI_EVIDENCE } from "@data/enterprise-ai-evidence.v1";

const heroSource = readFileSync(
  resolve(process.cwd(), "src/presentation/components/sections/Hero.tsx"),
  "utf8",
);

describe("home capability presentation", () => {
  it("renders every approved capability title and scope without maturity status", () => {
    expect(ENTERPRISE_AI_EVIDENCE.length).toBeGreaterThan(0);
    expect(heroSource).toContain("ENTERPRISE_AI_EVIDENCE");
    expect(heroSource).toContain("capability.claimId");
    expect(heroSource).toContain("capability.scope");
    expect(heroSource).not.toContain("capability.status");
    expect(heroSource).not.toContain("Currently deepening expertise in");
  });

  it("retains project discovery and avoids unsupported enterprise case-study language", () => {
    expect(heroSource).toContain('href="#proyectos"');
    expect(heroSource).toMatch(/Ver proyectos/);
    expect(heroSource).not.toMatch(/client|production|deployed|security assurance/i);
  });

  it("qualifies private agent infrastructure as an area in development", () => {
    expect(heroSource).toContain(
      "Exploración de agentes y subagentes en infraestructura privada",
    );
    expect(heroSource).toContain(
      "Estoy profundizando en despliegues privados orientados a mantener los datos bajo control del usuario.",
    );
    expect(heroSource).not.toContain(
      "Agentes y Subagentes autónomos en infraestructura privada",
    );
    expect(heroSource).not.toContain(
      "Los datos son tuyos, y tenes control total sobre ellos.",
    );
  });
});
