import { useState, type ReactNode } from "react";
import { ArrowsPointingOutIcon } from "../../ui/Icons";
import { ChartModal } from "./ChartModal";

interface ChartCardProps {
    title: string;
    children: ReactNode;
    className?: string;
    expandable?: boolean;
    dataPoints?: number;
    description?: string;
}

export function ChartCard({ title, children, className = "", expandable = true, dataPoints, description }: ChartCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const dynamicHeight = dataPoints !== undefined
        ? `clamp(12rem, ${dataPoints * 2.5 + 4}rem, 30rem)`
        : "clamp(12rem, 20vw, 18rem)";

    return (
        <>
            <div
                data-responsive-region="chart-card"
                className={`group relative min-w-0 rounded-xl bg-skin-primary p-md ${className}`}
            >
                <div className="mb-sm flex items-start justify-between gap-2">
                    <div>
                        <h3 className="font-display text-base font-semibold text-skin-text break-words">
                            {title}
                        </h3>
                        {description && (
                            <p className="mt-1 text-xs text-skin-muted leading-relaxed">{description}</p>
                        )}
                    </div>
                    {expandable && (
                        <button
                            type="button"
                            onClick={() => setIsExpanded(true)}
                            aria-label={`Ampliar ${title}`}
                            className="focus-ring shrink-0 rounded-lg p-1.5 text-skin-text-secondary transition-all hover:bg-skin-secondary hover:text-skin-text sm:opacity-0 sm:group-hover:opacity-100"
                        >
                            <ArrowsPointingOutIcon className="h-4 w-4" />
                            <span className="sr-only">Ampliar</span>
                        </button>
                    )}
                </div>
                <div className="w-full min-w-0" style={{ height: dynamicHeight }}>
                    {isExpanded ? (
                        <div className="flex h-full items-center justify-center text-sm text-skin-muted">
                            Vista expandida
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>

            <ChartModal
                isOpen={isExpanded}
                onClose={() => setIsExpanded(false)}
                title={title}
            >
                {children}
            </ChartModal>
        </>
    );
}