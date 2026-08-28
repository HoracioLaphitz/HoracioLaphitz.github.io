/**
 * Unit Tests: ProjectMapper
 * Testing data transformation from Astro Content to Domain
 */

import { describe, it, expect } from "vitest";
import { ProjectMapper } from "../project.mapper";
import {
  ProjectCategory,
  ProjectStatus,
} from "@domain/entities/project.entity";
import type { ProyectoEntry } from "../../types/astro-content-server.types";

describe("ProjectMapper", () => {
  const createMockEntry = (
    overrides: Partial<ProyectoEntry> = {}
  ): ProyectoEntry => {
    return {
      id: "test-project",
      data: {
        title: "Test Project",
        description: "Test description",
        category: "Machine Learning",
        tags: ["python", "ml"],
        pubDate: new Date("2024-01-01"),
        author: "Test Author",
        github: "https://github.com/test/project",
        dashboard: undefined,
        draft: false,
      },
      ...overrides,
    } as ProyectoEntry;
  };

  describe("toDomain", () => {
    it("should map basic fields correctly", () => {
      const entry = createMockEntry();
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.slug).toBe("test-project");
      expect(entity.title).toBe("Test Project");
      expect(entity.description).toBe("Test description");
      expect(entity.author).toBe("Test Author");
    });

    it("should map Machine Learning category", () => {
      const entry = createMockEntry({
        data: {
          ...createMockEntry().data,
          category: "Machine Learning",
        },
      });
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.category).toBe(ProjectCategory.MachineLearning);
    });

    it("should map Data Analysis category", () => {
      const entry = createMockEntry({
        data: {
          ...createMockEntry().data,
          category: "Análisis de datos",
        },
      });
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.category).toBe(ProjectCategory.DataAnalysis);
    });

    it("should map Business Intelligence category", () => {
      const entry = createMockEntry({
        data: {
          ...createMockEntry().data,
          category: "Business Intelligence",
        },
      });
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.category).toBe(ProjectCategory.BusinessIntelligence);
    });

    it("should map Data Visualization category", () => {
      const entry = createMockEntry({
        data: {
          ...createMockEntry().data,
          category: "Data Visualization",
        },
      });
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.category).toBe(ProjectCategory.DataVisualization);
    });

    it("should default to Data Analysis for unknown category", () => {
      const entry = createMockEntry({
        data: {
          ...createMockEntry().data,
          category: "Unknown Category",
        },
      });
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.category).toBe(ProjectCategory.DataAnalysis);
    });

    it("should map tags as frozen array", () => {
      const entry = createMockEntry();
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.tags).toEqual(["python", "ml"]);
      expect(Object.isFrozen(entity.tags)).toBe(true);
    });

    it("should map optional github URL", () => {
      const entry = createMockEntry({
        data: {
          ...createMockEntry().data,
          github: "https://github.com/test/repo",
        },
      });
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.githubUrl).toBe("https://github.com/test/repo");
    });

    it("should map optional dashboard URL", () => {
      const entry = createMockEntry({
        data: {
          ...createMockEntry().data,
          dashboard: "https://dashboard.example.com",
        },
      });
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.dashboardUrl).toBe("https://dashboard.example.com");
    });

    it("should handle undefined github URL", () => {
      const entry = createMockEntry({
        data: {
          ...createMockEntry().data,
          github: undefined,
        },
      });
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.githubUrl).toBeUndefined();
    });

    it("should set status to Completed by default", () => {
      const entry = createMockEntry();
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.status).toBe(ProjectStatus.Completed);
    });

    it("should set featured to false by default", () => {
      const entry = createMockEntry();
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.isFeatured()).toBe(false);
    });

    it("should preserve pubDate", () => {
      const pubDate = new Date("2024-06-15");
      const entry = createMockEntry({
        data: {
          ...createMockEntry().data,
          pubDate,
        },
      });
      const entity = ProjectMapper.toDomain(entry);

      expect(entity.publishDate).toEqual(pubDate);
    });
  });

  describe("toDomainArray", () => {
    it("should map array of entries", () => {
      const entries = [
        createMockEntry({ id: "project-1" }),
        createMockEntry({ id: "project-2" }),
        createMockEntry({ id: "project-3" }),
      ];

      const entities = ProjectMapper.toDomainArray(entries);

      expect(entities).toHaveLength(3);
      expect(entities[0].slug).toBe("project-1");
      expect(entities[1].slug).toBe("project-2");
      expect(entities[2].slug).toBe("project-3");
    });

    it("should filter out draft entries", () => {
      const entries = [
        createMockEntry({ id: "published-1" }),
        createMockEntry({
          id: "draft-1",
          data: {
            ...createMockEntry().data,
            draft: true,
          },
        }),
        createMockEntry({ id: "published-2" }),
        createMockEntry({
          id: "draft-2",
          data: {
            ...createMockEntry().data,
            draft: true,
          },
        }),
      ];

      const entities = ProjectMapper.toDomainArray(entries);

      expect(entities).toHaveLength(2);
      expect(entities[0].slug).toBe("published-1");
      expect(entities[1].slug).toBe("published-2");
    });

    it("should handle empty array", () => {
      const entities = ProjectMapper.toDomainArray([]);

      expect(entities).toHaveLength(0);
    });

    it("should handle array with only drafts", () => {
      const entries = [
        createMockEntry({
          id: "draft-1",
          data: {
            ...createMockEntry().data,
            draft: true,
          },
        }),
        createMockEntry({
          id: "draft-2",
          data: {
            ...createMockEntry().data,
            draft: true,
          },
        }),
      ];

      const entities = ProjectMapper.toDomainArray(entries);

      expect(entities).toHaveLength(0);
    });

    it("should preserve order of non-draft entries", () => {
      const entries = [
        createMockEntry({ id: "project-a" }),
        createMockEntry({
          id: "draft",
          data: {
            ...createMockEntry().data,
            draft: true,
          },
        }),
        createMockEntry({ id: "project-b" }),
        createMockEntry({ id: "project-c" }),
      ];

      const entities = ProjectMapper.toDomainArray(entries);

      expect(entities).toHaveLength(3);
      expect(entities[0].slug).toBe("project-a");
      expect(entities[1].slug).toBe("project-b");
      expect(entities[2].slug).toBe("project-c");
    });
  });
});
