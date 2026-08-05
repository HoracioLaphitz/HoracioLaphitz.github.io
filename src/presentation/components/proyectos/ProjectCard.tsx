import { RobotIcon, ChartBarIcon, BriefcaseIcon, PresentationChartLineIcon, DocumentIcon, GithubMarkIcon, DashboardIcon, ArrowRightIcon } from "@presentation/components/ui/Icons";
import type { ReactElement } from "react";

export interface ImpactMetric {
    label: string;
    value: string;
}

interface ProjectCardProps {
    title: string;
    description: string;
    slug: string;
    category: string;
    tags: readonly string[];
    github?: string;
    dashboard?: string;
    featured?: boolean;
    impact?: ImpactMetric[];
}

const ProjectCard = ({ title, description, slug, category, tags, github, dashboard, impact }: ProjectCardProps) => {
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
            className="card-elevated group relative overflow-hidden hover:border-skin-border-medium"
        >
            <div className="p-5 flex flex-col h-full">
                {/* Header con categoría */}
                <div className="flex items-center gap-2 mb-3 text-skin-muted">
                    {categoryIcons[category] || <DocumentIcon className="w-4 h-4" />}
                    <span className="text-xs font-medium uppercase tracking-wide">
                        {category}
                    </span>
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold text-skin-text mb-2 transition-colors duration-200 line-clamp-2">
                    {title}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-skin-muted mb-4 leading-relaxed line-clamp-3 flex-grow">
                    {description}
                </p>

                {/* Métricas de impacto */}
                {impact && impact.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {impact.map((metric, idx) => (
                            <span
                                key={idx}
                                className="text-xs px-2.5 py-1 bg-brand-primary/10 text-brand-primary rounded-md font-semibold"
                            >
                                {metric.label}: {metric.value}
                            </span>
                        ))}
                    </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs px-2.5 py-1 bg-skin-primary text-skin-muted rounded-md font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                    {tags.length > 3 && (
                        <span className="text-xs px-2.5 py-1 bg-skin-primary text-skin-muted rounded-md font-medium">
                            +{tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-skin-border/50">
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost gap-1.5 px-3 py-2 text-xs rounded-lg bg-skin-primary hover:bg-brand-primary/10 hover:text-brand-primary"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <GithubMarkIcon className="w-4 h-4" />
                            Código
                        </a>
                    )}
                    {dashboard && (
                        <a
                            href={dashboard}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost gap-1.5 px-3 py-2 text-xs rounded-lg bg-skin-primary hover:bg-brand-primary/10 hover:text-brand-primary"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DashboardIcon className="w-4 h-4" />
                            Dashboard
                        </a>
                    )}
                    <a
                        href={`/proyectos/${slug}`}
                        className="btn-primary gap-1.5 px-3 py-2 text-xs rounded-lg ml-auto"
                    >
                        Ver más
                        <ArrowRightIcon className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
