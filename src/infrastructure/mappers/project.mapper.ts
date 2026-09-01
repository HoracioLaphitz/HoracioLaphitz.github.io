/**
 * Mapper: Project
 * Transforms data between infrastructure and domain layers
 * Nueva Identidad: Data & Strategy - Mapeo de métricas de impacto
 *
 * ⚠️ This file uses server-side types and should ONLY be imported in server-side code
 */

import {
  ProjectEntity,
  ProjectCategory,
  ProjectStatus,
  type ProjectMaturity,
  type ProjectImpact,
} from "@domain/entities/project.entity";
import type { ProyectoEntry } from "../types/astro-content-server.types";

export class ProjectMapper {
  static toDomain(entry: ProyectoEntry): ProjectEntity {
    return new ProjectEntity(
      entry.id,
      entry.data.title,
      entry.data.description,
      this.mapCategory(entry.data.category),
      Object.freeze([...entry.data.tags]),
      entry.data.pubDate,
      entry.data.author,
      entry.data.github,
      entry.data.dashboard,
      ProjectStatus.Completed,
      entry.data.featured ?? false,
      this.mapImpact(entry.data.impact),
      entry.data.claimId,
      (entry.data.maturity as ProjectMaturity | undefined) ?? "Portfolio project",
      entry.data.status
    );
  }

  static toDomainArray(entries: ProyectoEntry[]): ProjectEntity[] {
    return entries
      .filter((entry) => !entry.data.draft)
      .map((entry) => this.toDomain(entry));
  }

  private static mapCategory(category: string): ProjectCategory {
    const categoryMap: Record<string, ProjectCategory> = {
      "Machine Learning": ProjectCategory.MachineLearning,
      "Análisis de datos": ProjectCategory.DataAnalysis,
      "Business Intelligence": ProjectCategory.BusinessIntelligence,
      "Data Visualization": ProjectCategory.DataVisualization,
      "Notebooks Analytics": ProjectCategory.NotebooksAnalytics,
      GenAI: ProjectCategory.GenAI,
    };

    return categoryMap[category] || ProjectCategory.DataAnalysis;
  }

  /**
   * Mapea las métricas de impacto desde el frontmatter
   */
  private static mapImpact(
    impact?: Record<string, unknown>
  ): ProjectImpact | undefined {
    if (!impact) return undefined;

    return {
      efficiencyGain:
        typeof impact.efficiencyGain === "number"
          ? impact.efficiencyGain
          : undefined,
      costSavings:
        typeof impact.costSavings === "string" ? impact.costSavings : undefined,
      timeReduction:
        typeof impact.timeReduction === "string"
          ? impact.timeReduction
          : undefined,
      revenueIncrease:
        typeof impact.revenueIncrease === "string"
          ? impact.revenueIncrease
          : undefined,
      customMetrics:
        impact.customMetrics &&
        typeof impact.customMetrics === "object" &&
        !Array.isArray(impact.customMetrics)
          ? (impact.customMetrics as Record<string, string | number>)
          : undefined,
    };
  }
}
