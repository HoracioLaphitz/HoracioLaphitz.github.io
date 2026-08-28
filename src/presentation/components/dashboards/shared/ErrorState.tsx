import { ExternalLinkIcon } from "../../ui/Icons";

interface ErrorStateProps {
    message: string;
    repoUrl: string;
    onRetry: () => void;
}

export function ErrorState({ message, repoUrl, onRetry }: ErrorStateProps) {
    return (
        <div
            role="alert"
            className="rounded-xl bg-skin-secondary p-lg text-center"
        >
            <p className="font-medium text-status-error">
                No se pudieron cargar los datos del dashboard.
            </p>
            <p className="mt-1 text-sm text-skin-muted">{message}</p>
            <div className="mt-md flex flex-wrap justify-center gap-sm">
                <button
                    type="button"
                    onClick={onRetry}
                    className="focus-ring min-h-11 rounded-xl border border-skin-border-medium px-md py-xs text-sm font-medium text-skin-text transition-colors hover:bg-skin-tertiary"
                >
                    Reintentar
                </button>
                <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl px-md py-xs text-sm font-medium text-brand-primary hover:underline"
                >
                    Ver repositorio
                    <ExternalLinkIcon className="h-4 w-4" />
                </a>
            </div>
        </div>
    );
}
