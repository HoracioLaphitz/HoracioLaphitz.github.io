import type { ReactNode } from "react";
import {
    Brush,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { PricePoint } from "@domain/dashboards/types";
import { accionesKpis } from "@domain/dashboards/aggregations";
import { fetchGithubRaw } from "@infrastructure/github/github-raw";
import { parsePrecios } from "@infrastructure/github/parsers";
import { useGithubData } from "./useGithubData";
import { accionesTheme as theme, TERMINAL_SURFACE } from "./themes";
import { DashboardShell } from "./shared/DashboardShell";
import { KpiCard } from "./shared/KpiCard";
import { ChartCard } from "./shared/ChartCard";
import { LoadingSkeleton } from "./shared/LoadingSkeleton";
import { ErrorState } from "./shared/ErrorState";
import { formatDecimal } from "./shared/format";

const REPO_URL = "https://github.com/HoracioLaphitz/PredicePrecioAcciones";

async function loadPrices(): Promise<PricePoint[]> {
    const text = await fetchGithubRaw(
        "HoracioLaphitz/PredicePrecioAcciones",
        "main",
        "dashboard-data/precios_pred.csv"
    );
    return parsePrecios(text);
}

function Shell({ children }: { children: ReactNode }) {
    return (
        <DashboardShell
            title="Financiero — Predicción de Acciones"
            subtitle="Precio real vs predicción del modelo sobre el set de test."
            repoUrl={REPO_URL}
            theme={theme}
        >
            {children}
        </DashboardShell>
    );
}

export default function AccionesFinancieroDashboard() {
    const { status, data, error, retry } = useGithubData(
        "dash:acciones",
        loadPrices
    );

    if (status === "loading") {
        return (
            <Shell>
                <LoadingSkeleton />
            </Shell>
        );
    }
    if (status === "error" || !data) {
        return (
            <Shell>
                <ErrorState
                    message={error ?? "Error desconocido"}
                    repoUrl={REPO_URL}
                    onRetry={retry}
                />
            </Shell>
        );
    }

    const kpis = accionesKpis(data);
    const delta = kpis.lastPredicted - kpis.lastActual;
    const deltaColor = delta >= 0 ? theme.positive : theme.negative;

    return (
        <Shell>
            <div className="grid grid-cols-1 gap-sm xs:grid-cols-3">
                <KpiCard
                    label="RMSE del modelo"
                    value={formatDecimal(kpis.rmse)}
                    hint="Error cuadrático medio sobre test"
                    theme={theme}
                />
                <KpiCard
                    label="Último precio real"
                    value={`$ ${formatDecimal(kpis.lastActual)}`}
                    theme={theme}
                />
                <KpiCard
                    label="Última predicción"
                    value={`$ ${formatDecimal(kpis.lastPredicted)}`}
                    hint={`Desvío: ${delta >= 0 ? "+" : ""}${formatDecimal(delta)}`}
                    theme={theme}
                />
            </div>

            <ChartCard
                title="Real vs Predicción"
                className="!border-slate-800 !bg-[#0b1220] [&_h3]:!text-slate-100"
            >
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ left: 8, right: 8 }}>
                        <CartesianGrid stroke={theme.grid} vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: theme.axis, fontSize: 11 }}
                            stroke={theme.axis}
                            minTickGap={24}
                        />
                        <YAxis
                            domain={["auto", "auto"]}
                            tickFormatter={(v: number) => formatDecimal(v)}
                            tick={{ fill: theme.axis, fontSize: 11 }}
                            stroke={theme.axis}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: TERMINAL_SURFACE,
                                border: "1px solid #1e293b",
                                borderRadius: 12,
                                color: "#e2e8f0",
                            }}
                        />
                        <Legend wrapperStyle={{ color: theme.axis, fontSize: 12 }} />
                        <Line
                            type="monotone"
                            dataKey="actual"
                            name="Real"
                            stroke={theme.positive}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="predicted"
                            name="Predicción"
                            stroke={theme.negative}
                            strokeWidth={2}
                            strokeDasharray="6 4"
                            dot={false}
                        />
                        <Brush
                            dataKey="date"
                            height={24}
                            stroke={theme.accent}
                            fill={TERMINAL_SURFACE}
                            travellerWidth={8}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

            <p className="text-xs text-skin-muted" style={{ color: deltaColor }}>
                {delta >= 0
                    ? "El modelo predice por encima del último precio real."
                    : "El modelo predice por debajo del último precio real."}
            </p>
        </Shell>
    );
}
