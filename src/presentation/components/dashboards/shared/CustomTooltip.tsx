interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        name: string;
        dataKey: string;
        color: string;
    }>;
    label?: string;
    context?: string;
    unit?: string;
}

export function CustomTooltip({ active, payload, label, context, unit }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;

    const entry = payload[0];

    return (
        <div className="rounded-xl bg-skin-primary border border-skin-border shadow-lg p-3 min-w-[120px]">
            <p className="text-sm font-semibold text-skin-text mb-1">{label}</p>
            <p className="text-lg font-bold" style={{ color: entry.color }}>
                {entry.value}{unit}
            </p>
            {context && (
                <p className="text-xs text-skin-muted mt-1">{context}</p>
            )}
        </div>
    );
}