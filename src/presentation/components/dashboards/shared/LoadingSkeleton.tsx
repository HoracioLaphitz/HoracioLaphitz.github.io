export function LoadingSkeleton() {
    return (
        <div className="animate-pulse" aria-hidden="true">
            <div className="grid grid-cols-2 gap-sm md:grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-24 rounded-xl bg-skin-tertiary" />
                ))}
            </div>
            <div className="mt-lg grid gap-lg md:grid-cols-2">
                <div className="h-72 rounded-xl bg-skin-tertiary" />
                <div className="h-72 rounded-xl bg-skin-tertiary" />
            </div>
        </div>
    );
}
