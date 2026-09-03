import type { CollectionEntry } from "astro:content";

export interface HomeProject {
  slug: string;
  title: string;
  description: string;
  maturity?: string;
  githubUrl?: string;
  dashboardUrl?: string;
}

const FEATURED_SLUGS = [
  "ai-sales-assistant",
  "nb-capitalizacion-bancos-etl",
  "dashboards-ventas-marketing-powerbi",
  "sano-y-fresco-market-basket",
];

const maturityTranslations: Record<string, string> = {
  "Delivered work": "Trabajo entregado",
  "Portfolio project": "Proyecto de portfolio",
  "Functional prototype": "Prototipo funcional",
  "Reference architecture": "Arquitectura de referencia",
  "In development": "En desarrollo",
  "Currently deepening expertise in": "Actualmente profundizando conocimientos en",
};

type ProyectoEntry = CollectionEntry<"proyectos">;

export function getHomeProjects(allProjects: ProyectoEntry[]): HomeProject[] {
  return FEATURED_SLUGS.map((slug) => {
    const project = allProjects.find((p) => p.id === slug);
    if (!project) {
      throw new Error(`Featured project not found: ${slug}`);
    }

    return {
      slug: project.id,
      title: project.data.title,
      description: project.data.description,
      maturity: project.data.maturity ? maturityTranslations[project.data.maturity] : undefined,
      githubUrl: project.data.github,
      dashboardUrl: project.data.dashboard,
    };
  });
}

export function mergeHomeProjectData<T extends { slug: string }>(
  homeProjects: HomeProject[],
  serializedProjects: T[]
): Array<T & HomeProject> {
  const projectsBySlug = new Map(
    serializedProjects.map((project) => [project.slug, project])
  );

  return homeProjects.map((homeProject) => {
    const serializedProject = projectsBySlug.get(homeProject.slug);
    if (!serializedProject) {
      throw new Error(`Serialized featured project not found: ${homeProject.slug}`);
    }

    return { ...serializedProject, ...homeProject };
  });
}
