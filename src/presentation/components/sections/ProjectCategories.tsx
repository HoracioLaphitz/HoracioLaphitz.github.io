import { useState, useMemo, useEffect } from "react";
import ProjectCard, {
  type ImpactMetric,
} from "@presentation/components/proyectos/ProjectCard";
import ProjectFilters from "@presentation/components/proyectos/ProjectFilters";
import { FolderIcon } from "@presentation/components/ui/Icons";
import type { ProjectEntity } from "@domain/entities/project.entity";

export interface SerializedProject {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: readonly string[];
  publishDate: string;
  author: string;
  githubUrl?: string;
  dashboardUrl?: string;
  status: string;
  featured: boolean;
  impact: ImpactMetric[];
}

const serializeImpact = (p: ProjectEntity): ImpactMetric[] => {
  if (!p.impact || !p.hasImpactMetrics()) return [];

  const metrics: ImpactMetric[] = [];
  const primary = p.getPrimaryImpactMetric();
  if (primary) metrics.push(primary);

  if (p.impact.customMetrics) {
    Object.entries(p.impact.customMetrics).forEach(([label, value]) =>
      metrics.push({ label, value: String(value) })
    );
  }

  return metrics.slice(0, 4);
};

export const serializeProjects = (
  projects: ProjectEntity[]
): SerializedProject[] =>
  projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    tags: [...p.tags],
    publishDate: p.publishDate.toISOString(),
    author: p.author,
    githubUrl: p.githubUrl,
    dashboardUrl: p.dashboardUrl,
    status: p.status,
    featured: p.featured,
    impact: serializeImpact(p),
  }));

interface ProjectCategoriesProps {
  posts: SerializedProject[];
}

const ProjectCategories = ({ posts }: ProjectCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      if (categoryParam) {
        setSelectedCategory(categoryParam);
      }
    }
  }, []);

  // Get unique categories
  const projectCategories = useMemo(() => {
    const categories = new Set<string>();
    posts.forEach((project) => {
      categories.add(project.category);
    });
    return Array.from(categories).sort();
  }, [posts]);

  // Filter projects
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Featured projects first, preserving original order within each group
    filtered.sort((a, b) => Number(b.featured) - Number(a.featured));

    return filtered;
  }, [posts, selectedCategory]);

  const getAnimationClass = (index: number) =>
    `transition-all duration-200 delay-${index * 75} ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
    }`;

  return (
    <section
      id="proyectos"
      className="bg-skin-secondary py-16 md:py-20"
    >
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <header
          className={`mb-12 lg:mb-16 ${getAnimationClass(0)}`}
        >
          <h2 className="text-display-sm font-bold text-skin-text tracking-tight">
            Proyectos
          </h2>
        </header>

        {/* Filters */}
        <div className={getAnimationClass(1)}>
          <ProjectFilters
            categories={projectCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            totalPosts={posts.length}
            filteredCount={filteredPosts.length}
          />
        </div>

        {/* Projects Grid */}
        {filteredPosts.length > 0 && (
          <div className={`mb-12 ${getAnimationClass(2)}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  description={project.description}
                  slug={project.slug}
                  category={project.category}
                  tags={project.tags}
                  github={project.githubUrl}
                  dashboard={project.dashboardUrl}
                  featured={project.featured}
                  impact={project.impact}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className={`text-center py-16 ${getAnimationClass(2)}`}>
            <div className="text-6xl mb-4 flex justify-center">
              <FolderIcon className="w-16 h-16 text-skin-muted" />
            </div>
            <h3 className="text-xl font-bold text-skin-text mb-2">
              No se encontraron resultados con estos filtros
            </h3>
            <p className="text-skin-muted mb-6">
              Ajustá los filtros para ver más proyectos
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => setSelectedCategory("all")}
                className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-skin-primary font-semibold rounded-lg transition-all duration-300"
              >
                Mostrar todo
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectCategories;
