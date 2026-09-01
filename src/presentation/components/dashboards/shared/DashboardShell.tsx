import type { ReactNode } from "react";
import type { DashboardTheme } from "../themes";
import { ExternalLinkIcon } from "../../ui/Icons";

interface DashboardShellProps {
    title: string;
    subtitle: string;
    repoUrl: string;
    theme: DashboardTheme;
    children: ReactNode;
}

export function DashboardShell({
    title,
    subtitle,
    repoUrl,
    theme,
    children,
}: DashboardShellProps) {
    return (
        <section
            aria-label={title}
            data-responsive-region="dashboard"
            className="mt-2xl rounded-xl bg-skin-secondary p-4 sm:p-lg"
        >
            <header className="mb-lg flex flex-wrap items-end justify-between gap-sm min-w-0">
                <div className="min-w-0">
                    <h2 className="font-display text-xl font-bold text-skin-text break-words">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-skin-text-secondary">{subtitle}</p>
                </div>
                <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium hover:underline shrink-0"
                    style={{ color: theme.accent }}
                >
                    Datos en vivo desde GitHub
                    <ExternalLinkIcon className="h-4 w-4" />
                </a>
            </header>
            <div className="flex flex-col gap-lg min-w-0">{children}</div>
        </section>
    );
}
