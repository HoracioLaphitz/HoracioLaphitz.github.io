import { RobotIcon, ChartBarIcon, BriefcaseIcon, PresentationChartLineIcon, DocumentIcon, GithubMarkIcon, DashboardIcon, ArrowRightIcon } from "@presentation/components/ui/Icons";
import type { ReactElement } from "react";
import { getProjectCategoryLabel, getProjectMaturityLabel } from "@shared/project-labels";

interface ProjectCardProps {
    title: string;
    description: string;
    slug: string;
    category: string;
    tags: readonly string[];
    github?: string;
    dashboard?: string;
    featured?: boolean;
    maturity?: string;
    syncStatus?: string;
}

const ProjectCard = ({ title, description, slug, category, tags, github, dashboard, maturity = "Proyecto personal", syncStatus }: ProjectCardProps) => {
    const categoryLabel = getProjectCategoryLabel(category);
    const maturityLabel = getProjectMaturityLabel(maturity) ?? maturity;
    const categoryIcons: Record<string, ReactElement> = {
        "Machine Learning": <RobotIcon className="w-4 h-4" />,
        "Análisis de datos": <ChartBarIcon className="w-4 h-4" />,
        "Business Intelligence": <BriefcaseIcon className="w-4 h-4" />,
        "Data Visualization": <PresentationChartLineIcon className="w-4 h-4" />,
        "Notebooks Analytics": <DocumentIcon className="w-4 h-4" />,
        "GenAI": <RobotIcon className="w-4 h-4" />,
    };

    return (
        <article
            className="group relative overflow-hidden rounded-xl bg-skin-secondary transition-all duration-300 hover:bg-skin-tertiary hover:-translate-y-1 hover:shadow-lg"
            data-motion="project-card"
        >
            <div className="p-6 flex flex-col h-full">
                {/* Header con categoría */}
                <div className="flex items-center gap-2 mb-3 text-skin-muted">
                    {categoryIcons[category] || <DocumentIcon className="w-4 h-4 text-brand-primary" />}
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-skin-muted">
                        {categoryLabel}
                    </span>
                </div>
                {/* Título */}
                <h3 className="text-lg md:text-xl font-semibold text-skin-text mb-2 tracking-tight transition-colors duration-200 line-clamp-2">
                    {title}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-skin-muted mb-5 leading-relaxed line-clamp-3 flex-grow font-normal">
                    {description}
                </p>

                <div className="text-xs text-skin-muted mb-3" data-maturity={maturity} aria-label={`Etapa: ${maturityLabel}`}>
                    {maturityLabel}
                    {syncStatus && <span className="ml-2 text-brand-primary" aria-label={`Estado: ${syncStatus}`}>{syncStatus}</span>}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-skin-primary/70 text-skin-muted border border-skin-border/40 rounded-full font-medium tracking-tight"
                        >
                            {tag}
                        </span>
                    ))}
                    {tags.length > 3 && (
                        <span className="text-xs px-2.5 py-1 bg-skin-primary/70 text-skin-muted border border-skin-border/40 rounded-full font-medium">
                            +{tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-skin-border/40">
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-skin-primary text-skin-text border border-skin-border/40 hover:bg-skin-primary/80 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <GithubMarkIcon className="w-3.5 h-3.5" />
                            Código
                        </a>
                    )}
                    {dashboard && (
                        <a
                            href={dashboard}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-skin-primary text-skin-text border border-skin-border/40 hover:bg-skin-primary/80 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DashboardIcon className="w-3.5 h-3.5" />
                            Dashboard
                        </a>
                    )}
                    <a
                        href={`/proyectos/${slug}`}
                        className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-medium rounded-full bg-brand-primary text-white hover:opacity-90 transition-opacity ml-auto shadow-xs"
                    >
                        Ver más
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
