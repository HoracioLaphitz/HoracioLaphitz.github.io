import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ENTERPRISE_AI_EVIDENCE } from "@data/enterprise-ai-evidence.v1";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("project evidence rendering", () => {
  it("renders maturity on catalogue cards without dropping factual fields", () => {
    const card = read("src/presentation/components/proyectos/ProjectCard.tsx");
    expect(card).toContain("maturity");
    expect(card).toContain("tags");
    expect(card).toContain("description");
  });

  it("renders maturity on article pages while retaining resources", () => {
    const article = read("src/presentation/layouts/ArticleLayout.astro");
    const route = read("src/pages/proyectos/[slug].astro");
    expect(article).toContain("maturity");
    expect(route).toContain("resources?.notebooks");
    expect(route).toContain("resources?.pdfs");
    expect(route).toContain("resources?.datasets");
  });

  it("keeps future entry statuses constrained and free of delivery outcomes", () => {
    const contract = read("src/data/enterprise-ai-evidence.v1.ts");
    expect(contract).toContain('"Functional prototype"');
    expect(contract).toContain('"Reference architecture"');
    expect(contract).not.toMatch(/client delivered|production operated|business outcome/i);
  });

  it("does not publish a future enterprise entry without a qualifying artifact", () => {
    const futureEntries = ENTERPRISE_AI_EVIDENCE.filter(({ claimId }) => claimId !== "analytics-data-foundation");
    expect(futureEntries.every(({ sources }) => sources.length > 0)).toBe(true);
  });
});
