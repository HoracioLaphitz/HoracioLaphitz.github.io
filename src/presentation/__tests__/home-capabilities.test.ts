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
  it("Hero renders Enterprise AI evidence in a collapsible details element", () => {
    expect(heroSource).toContain("ENTERPRISE_AI_EVIDENCE");
    expect(heroSource).toContain("capability.claimId");
    expect(heroSource).toContain("capability.scope");
    expect(heroSource).toContain("<details");
    expect(heroSource).toContain("Pruebas y estudios con IA");
  });

  it("retains project discovery and avoids unsupported enterprise case-study language", () => {
    expect(heroSource).toContain('href="#proyectos"');
    expect(heroSource).not.toMatch(/client|production|deployed|security assurance/i);
  });

  it("qualifies private agent infrastructure as an area in development", () => {
    expect(aboutSource).toContain(
      "Flujos con agentes",
    );
    expect(aboutSource).toContain(
      "Diseño y orquestación de flujos con agentes",
    );
    expect(aboutSource).not.toContain(
      "Agentes y Subagentes autónomos en infraestructura privada",
    );
    expect(aboutSource).not.toContain(
      "Los datos son tuyos, y tenes control total sobre ellos.",
    );
  });
});
