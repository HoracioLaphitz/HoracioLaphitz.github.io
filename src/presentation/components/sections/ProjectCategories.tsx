import { useState, useMemo, useEffect, useRef } from "react";
import ProjectCard from "@presentation/components/proyectos/ProjectCard";
import ProjectFilters from "@presentation/components/proyectos/ProjectFilters";
import { FolderIcon } from "@presentation/components/ui/Icons";
import { useProjectMotion } from "@presentation/hooks/useScopedMotion";
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
  claimId?: string;
  maturity?: string;
  evidenceId?: string;
  boundaries?: readonly string[];
}

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
    claimId: p.claimId,
    maturity: p.maturity,
    evidenceId: p.evidenceId,
    boundaries: p.boundaries,
  }));

interface ProjectCategoriesProps {
  posts: SerializedProject[];
  showHeading?: boolean;
}

const ProjectCategories = ({ posts, showHeading = true }: ProjectCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const projectRoot = useRef<HTMLElement>(null);

  useEffect(() => {
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

  useProjectMotion({
    root: projectRoot,
    cardIds: filteredPosts.map(({ slug }) => slug),
  });

  return (
    <section
      id="proyectos"
      className="bg-skin-secondary py-16 md:py-20"
      ref={projectRoot}
    >
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        {showHeading && <header
          className="mb-10 lg:mb-12"
          data-motion="projects-heading"
        >
          <h2
            className="text-display-sm font-bold text-skin-text tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Proyectos
          </h2>
        </header>}

        {/* Filters */}
        <div data-motion="projects-filters">
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
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  maturity={project.maturity}
                  evidenceId={project.evidenceId}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
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
