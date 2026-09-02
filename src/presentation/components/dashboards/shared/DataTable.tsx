import type { ReactNode } from "react";

interface DataTableProps {
    children: ReactNode;
    description?: string;
    maxHeight?: string;
}

export function DataTable({ children, description, maxHeight = "30rem" }: DataTableProps) {
    return (
        <div className="rounded-sm border border-skin-border bg-skin-secondary p-md">
            {description && <p className="mb-sm text-xs text-skin-muted">{description}</p>}
            <div
                className="overflow-auto"
                style={{ maxHeight }}
            >
                <table className="w-full text-left text-sm [&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:bg-skin-secondary [&_thead_th]:z-10">
                    {children}
                </table>
            </div>
        </div>
    );
}