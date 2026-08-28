/**
 * Domain Entity: Project
 * Pure business logic, framework-agnostic
 * Nueva Identidad: Data & Strategy - Enfoque en impacto medible
 */

export enum ProjectCategory {
  MachineLearning = "Machine Learning",
  DataAnalysis = "Análisis de datos",
  BusinessIntelligence = "Business Intelligence",
  DataVisualization = "Data Visualization",
  NotebooksAnalytics = "Notebooks Analytics",
  GenAI = "GenAI",
}

export enum ProjectStatus {
  Completed = "completed",
  InProgress = "in-progress",
  Archived = "archived",
}

export type ProjectMaturity =
  | "Delivered work"
  | "Portfolio project"
  | "Functional prototype"
  | "Reference architecture"
  | "In development"
  | "Currently deepening expertise in";

/**
 * Métricas de Impacto del Proyecto
 * Representa el valor medible entregado al cliente/negocio
 */
export interface ProjectImpact {
  /** Mejora en eficiencia (porcentaje) */
  efficiencyGain?: number;
  /** Ahorro de costos (en moneda o porcentaje) */
  costSavings?: string;
  /** Reducción de tiempo (ej: "50% menos tiempo") */
  timeReduction?: string;
  /** Incremento en revenue/ventas */
  revenueIncrease?: string;
  /** Otras métricas personalizadas */
  customMetrics?: Record<string, string | number>;
}

export class ProjectEntity {
  constructor(
    public readonly slug: string,
    public readonly title: string,
    public readonly description: string,
    public readonly category: ProjectCategory,
    public readonly tags: readonly string[],
    public readonly publishDate: Date,
    public readonly author: string,
    public readonly githubUrl?: string,
    public readonly dashboardUrl?: string,
    public readonly status: ProjectStatus = ProjectStatus.Completed,
    public readonly featured: boolean = false,
    public readonly impact?: ProjectImpact,
    public readonly claimId?: string,
    public readonly maturity: ProjectMaturity = "Portfolio project",
    public readonly evidenceId?: string,
    public readonly boundaries: readonly string[] = []
  ) {}

  isPublishable(): boolean {
    return (
      this.status === ProjectStatus.Completed &&
      this.description.trim().length > 0 &&
      this.title.trim().length > 0 &&
      !this.hasWIPIndicators()
    );
  }

  /**
   * Un proyecto es "Featured" si:
   * 1. Es publicable
   * 2. Tiene métricas de impacto definidas
   * 3. Tiene dashboard o GitHub URL
   */
  isFeatured(): boolean {
    return (
      this.featured &&
      this.isPublishable() &&
      this.hasImpactMetrics() &&
      this.hasExternalLinks()
    );
  }

  /**
   * Verifica si el proyecto tiene métricas de impacto medibles
   */
  hasImpactMetrics(): boolean {
    if (!this.impact) return false;

    return Boolean(
      this.impact.efficiencyGain ||
        this.impact.costSavings ||
        this.impact.timeReduction ||
        this.impact.revenueIncrease ||
        (this.impact.customMetrics &&
          Object.keys(this.impact.customMetrics).length > 0)
    );
  }

  /**
   * Obtiene la métrica de impacto principal para mostrar
   */
  getPrimaryImpactMetric(): { label: string; value: string } | null {
    if (!this.impact) return null;

    if (this.impact.efficiencyGain) {
      return {
        label: "Mejora en Eficiencia",
        value: `+${this.impact.efficiencyGain}%`,
      };
    }

    if (this.impact.costSavings) {
      return {
        label: "Ahorro de Costos",
        value: this.impact.costSavings,
      };
    }

    if (this.impact.timeReduction) {
      return {
        label: "Reducción de Tiempo",
        value: this.impact.timeReduction,
      };
    }

    if (this.impact.revenueIncrease) {
      return {
        label: "Incremento en Revenue",
        value: this.impact.revenueIncrease,
      };
    }

    return null;
  }

  matchesSearch(query: string): boolean {
    if (!query.trim()) return true;

    const searchableText = [
      this.title,
      this.description,
      this.category,
      ...this.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query.toLowerCase().trim());
  }

  matchesCategory(category: string): boolean {
    if (category === "all") return true;
    return this.category === category;
  }

  hasExternalLinks(): boolean {
    return Boolean(this.githubUrl || this.dashboardUrl);
  }

  private hasWIPIndicators(): boolean {
    const wipPatterns = [
      /work in progress/i,
      /wip/i,
      /initial commit/i,
      /under construction/i,
      /coming soon/i,
      /to be updated/i,
    ];

    const textToCheck = `${this.title} ${this.description}`;
    return wipPatterns.some((pattern) => pattern.test(textToCheck));
  }

  equals(other: ProjectEntity): boolean {
    return this.slug === other.slug;
  }
}
