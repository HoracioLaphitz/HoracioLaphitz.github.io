import type { ReactNode } from "react";

interface ChartCardProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export function ChartCard({ title, children, className = "" }: ChartCardProps) {
    return (
        <div
            className={`min-w-0 rounded-xl bg-skin-primary p-md ${className}`}
        >
            <h3 className="mb-sm font-display text-base font-semibold text-skin-text">
                {title}
            </h3>
            <div className="h-72 w-full min-w-0">{children}</div>
        </div>
    );
}
