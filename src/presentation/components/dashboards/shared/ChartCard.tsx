import type { ReactNode } from "react";

interface ChartCardProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export function ChartCard({ title, children, className = "" }: ChartCardProps) {
    return (
        <div
            data-responsive-region="chart-card"
            className={`min-w-0 rounded-xl bg-skin-primary p-md ${className}`}
        >
            <h3 className="mb-sm font-display text-base font-semibold text-skin-text break-words">
                {title}
            </h3>
            <div className="w-full min-w-0" style={{ height: "clamp(12rem, 20vw, 18rem)" }}>{children}</div>
        </div>
    );
}
