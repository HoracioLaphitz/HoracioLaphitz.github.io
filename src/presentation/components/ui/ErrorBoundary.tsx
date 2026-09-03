/**
 * Error Boundary Component
 * Prevents React crashes from breaking the entire page.
 * Displays a user-friendly error without leaking technical details.
 */

import { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error): void {
        // Log to console in development only
        if (import.meta.env.DEV) {
            console.error("[ErrorBoundary]", error.message);
        }
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="rounded-xl bg-skin-secondary p-6 text-center">
                        <p className="text-skin-muted">
                            Algo salió mal. Por favor, recargá la página.
                        </p>
                    </div>
                )
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
