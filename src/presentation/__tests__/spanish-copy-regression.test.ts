import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Spanish editorial copy", () => {
  it("keeps audited global copy grammatical and consistent", () => {
    const sources = [
      "src/presentation/components/sections/Hero.tsx",
      "src/presentation/components/sections/About.tsx",
      "src/presentation/components/sections/Contact.tsx",
      "src/presentation/components/layout/Footer.tsx",
      "src/presentation/components/sections/Skills.tsx",
      "src/presentation/layouts/Layout.astro",
      "src/presentation/components/sections/FeaturedProjects.astro",
      "src/data/experience.ts",
      "src/data/profile-data.ts",
      "src/data/public-positioning.v1.ts",
    ].map(read).join("\n");

    expect(sources).toContain("¡Hablemos!");
    expect(sources).not.toMatch(/\b(?:Dic|Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sept|Oct|Nov) \d{4}\b/);
    expect(sources).not.toMatch(/Support Profesional Informatics|\bvs\.|Soft Skills|Bases de Datos & Cloud|Dev & Herramientas/);
  });

  it("removes audited errors from curated project copy", () => {
    const dir = resolve(process.cwd(), "src/content/proyectos");
    const copy = readdirSync(dir)
      .filter((name) => name.endsWith(".md") && !name.startsWith("github-"))
      .map((name) => readFileSync(resolve(dir, name), "utf8"))
      .join("\n")
      .replace(/^\s*(?:path|github|dashboard):.*$/gm, "");

    expect(copy).not.toMatch(/GenAIbordes|resutado|aplicados análisis|desarrollado con TensorFlow|\b4\.9M\+|\b100k\+|\b48%|\+15-20%|\b0\.99\b/);
    expect(copy).not.toMatch(/\b(?:insights|layout|bundles|accuracy|features|baseline|dataset|pipeline|stack)\b/i);
  });
});
