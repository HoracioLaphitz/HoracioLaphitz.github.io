import { describe, expect, it } from "vitest";
import { ProjectMapper } from "../project.mapper";
import type { ProyectoEntry } from "../../types/astro-content-server.types";

const entry = {
  id: "analytics-example",
  data: {
    title: "Analytics example",
    description: "A factual analytics project",
    pubDate: new Date("2026-01-01"),
    author: "Horacio Laphitz",
    category: "Análisis de datos",
    tags: ["Python", "SQL"],
    draft: false,
    github: "https://github.com/example",
    featured: false,
    claimId: "analytics-data-foundation",
    maturity: "Portfolio project",
    evidenceId: "project:analytics-example",
    boundaries: ["analytics", "data integration"],
  },
} as unknown as ProyectoEntry;

describe("project evidence mapping", () => {
  it("maps optional claim, maturity, evidence, and boundaries fields", () => {
    const project = ProjectMapper.toDomain(entry);
    expect(project.claimId).toBe("analytics-data-foundation");
    expect(project.maturity).toBe("Portfolio project");
    expect(project.evidenceId).toBe("project:analytics-example");
    expect(project.boundaries).toEqual(["analytics", "data integration"]);
  });

  it("keeps existing project documents valid with a truthful default maturity", () => {
    const project = ProjectMapper.toDomain({
      ...entry,
      data: { ...entry.data, claimId: undefined, maturity: undefined, evidenceId: undefined, boundaries: undefined },
    } as unknown as ProyectoEntry);
    expect(project.maturity).toBe("Portfolio project");
  });
});
