import { describe, it, expect } from "vitest";
import { getHomeProjects, mergeHomeProjectData, type HomeProject } from "../home-projects";
import type { CollectionEntry } from "astro:content";

const mockProjects: CollectionEntry<"proyectos">[] = [
  {
    id: "ai-sales-assistant",
    collection: "proyectos",
    data: {
      title: "AI Sales Assistant",
      description: "An AI-powered sales assistant",
      maturity: "Portfolio project",
      github: "https://github.com/HoracioLaphitz/ai-sales-assistant",
    },
    body: "",
    slug: "ai-sales-assistant",
  } as any,
  {
    id: "nb-capitalizacion-bancos-etl",
    collection: "proyectos",
    data: {
      title: "NB Capitalizacion Bancos ETL",
      description: "ETL pipeline for bank capitalization data",
      maturity: "Delivered work",
      github: "https://github.com/HoracioLaphitz/nb-capitalizacion-bancos-etl",
    },
    body: "",
    slug: "nb-capitalizacion-bancos-etl",
  } as any,
  {
    id: "dashboards-ventas-marketing-powerbi",
    collection: "proyectos",
    data: {
      title: "Dashboards Ventas Marketing PowerBI",
      description: "Sales and marketing dashboards",
      maturity: "Functional prototype",
      dashboard: "https://app.powerbi.com/reports/123",
    },
    body: "",
    slug: "dashboards-ventas-marketing-powerbi",
  } as any,
  {
    id: "sano-y-fresco-market-basket",
    collection: "proyectos",
    data: {
      title: "Sano y Fresco Market Basket",
      description: "Market basket analysis for a grocery store",
      maturity: "Reference architecture",
    },
    body: "",
    slug: "sano-y-fresco-market-basket",
  } as any,
];

describe("Home Projects", () => {
  it("returns exactly the 4 required featured projects in order", () => {
    const projects = getHomeProjects(mockProjects);
    expect(projects.length).toBe(4);

    const slugs = projects.map((p) => p.slug);
    expect(slugs).toEqual([
      "ai-sales-assistant",
      "nb-capitalizacion-bancos-etl",
      "dashboards-ventas-marketing-powerbi",
      "sano-y-fresco-market-basket",
    ]);
  });

  it("omits internal evidence IDs", () => {
    const projects = getHomeProjects(mockProjects);
    for (const project of projects) {
      expect((project as any).internalId).toBeUndefined();
    }
  });

  it("maps maturity to Spanish", () => {
    const projects = getHomeProjects(mockProjects);
    const validSpanishMaturities = [
      "Trabajo entregado",
      "Proyecto de portfolio",
      "Prototipo funcional",
      "Arquitectura de referencia",
      "En desarrollo",
      "Profundizando conocimiento en",
    ];

    for (const project of projects) {
      if (project.maturity) {
        expect(validSpanishMaturities).toContain(project.maturity);
      }
    }
  });

  it("merges the helper projection into complete serialized home projects", () => {
    const homeProjects = getHomeProjects(mockProjects);
    const serializedProjects = homeProjects.map((project) => ({
      ...project,
      title: `stale ${project.title}`,
      description: `stale ${project.description}`,
      maturity: "Portfolio project",
      category: "Análisis de datos",
      tags: [],
      publishDate: "2026-01-02T00:00:00.000Z",
      author: "Horacio Laphitz",
      status: "completed",
      featured: true,
    }));

    const merged = mergeHomeProjectData(homeProjects, serializedProjects);

    expect(merged[0].title).toBe("AI Sales Assistant");
    expect(merged[0].maturity).toBe("Proyecto de portfolio");
    expect(merged[0].category).toBe("Análisis de datos");
  });

  it("throws when a featured project is missing", () => {
    const incomplete = mockProjects.slice(0, 2);
    expect(() => getHomeProjects(incomplete)).toThrow("Featured project not found");
  });
});
