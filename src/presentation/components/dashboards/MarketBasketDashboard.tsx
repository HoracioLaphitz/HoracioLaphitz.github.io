import { useMemo, useState, type ReactNode } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    XAxis,
    YAxis,
    ZAxis,
} from "recharts";
import type { AssociationRule } from "@domain/dashboards/types";
import { ruleKpis, topRulesByLift } from "@domain/dashboards/aggregations";
import { fetchGithubRaw } from "@infrastructure/github/github-raw";
import { parseReglas } from "@infrastructure/github/parsers";
import { useGithubData } from "./useGithubData";
import { marketBasketTheme as theme } from "./themes";
import { DashboardShell } from "./shared/DashboardShell";
import { KpiCard } from "./shared/KpiCard";
import { ChartCard } from "./shared/ChartCard";
import { LoadingSkeleton } from "./shared/LoadingSkeleton";
import { ErrorState } from "./shared/ErrorState";
import { CustomTooltip } from "./shared/CustomTooltip";
import { DataTable } from "./shared/DataTable";
import { formatDecimal, formatPercent } from "./shared/format";

const REPO_URL = "https://github.com/HoracioLaphitz/MarketBasketAnalytics";

async function loadRules(): Promise<AssociationRule[]> {
    const text = await fetchGithubRaw(
        "HoracioLaphitz/MarketBasketAnalytics",
        "main",
        "reglas.csv"
    );
    return parseReglas(text);
}

function Shell({ children }: { children: ReactNode }) {
    return (
        <DashboardShell
            title="Ventas & Marketing — Market Basket"
            subtitle="Reglas de asociación de SanoYFresco: qué productos se compran juntos."
            repoUrl={REPO_URL}
            theme={theme}
        >
            {children}
        </DashboardShell>
    );
}

export default function MarketBasketDashboard() {
    const { status, data, error, retry } = useGithubData(
        "dash:market-basket",
        loadRules
    );
    const [filter, setFilter] = useState("");

    const filtered = useMemo(() => {
        if (!data) return [];
        const query = filter.trim().toLowerCase();
        const matches = query
            ? data.filter(
                  (r) =>
                      r.antecedent.toLowerCase().includes(query) ||
                      r.consequent.toLowerCase().includes(query)
              )
            : data;
        return topRulesByLift(matches, 25);
    }, [data, filter]);

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

    const kpis = ruleKpis(data);
    const top = topRulesByLift(data, 10).map((r) => ({
        ...r,
        label: `${r.antecedent} → ${r.consequent}`,
    }));
    const scatter = data.map((r) => ({
        x: r.support,
        y: r.confidence,
        z: r.lift,
        label: `${r.antecedent} → ${r.consequent}`,
    }));

    return (
        <Shell>
            <div className="grid grid-cols-1 gap-sm xs:grid-cols-3">
                <KpiCard
                    label="Reglas detectadas"
                    value={String(kpis.ruleCount)}
                    theme={theme}
                />
                <KpiCard
                    label="Lift máximo"
                    value={formatDecimal(kpis.maxLift)}
                    hint="Fuerza de la asociación más potente"
                    theme={theme}
                />
                <KpiCard
                    label="Confianza promedio"
                    value={formatPercent(kpis.avgConfidence)}
                    theme={theme}
                />
            </div>

            <div className="grid gap-lg lg:grid-cols-2">
                <ChartCard
                    title="Top 10 reglas por lift"
                    dataPoints={top.length}
                    description="Las 10 reglas de asociación más fuertes, ordenadas por lift. El lift indica cuánto más probable es comprar el consecuente dado el antecedente."
                >
                    <ResponsiveContainer>
                        <BarChart data={top} layout="vertical" margin={{ left: 8, right: 8 }}>
                            <CartesianGrid stroke={theme.grid} horizontal={false} />
                            <XAxis
                                type="number"
                                tick={{ fill: theme.axis, fontSize: 11 }}
                                stroke={theme.axis}
                            />
                            <YAxis
                                type="category"
                                dataKey="label"
                                width={120}
                                tick={{ fill: theme.axis, fontSize: 10 }}
                                stroke={theme.axis}
                            />
                            <CustomTooltip />
                            <Bar
                                dataKey="lift"
                                name="Lift"
                                fill={theme.accent}
                                radius={[0, 6, 6, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    title="Soporte × Confianza (tamaño = lift)"
                    description="Cada punto es una regla de asociación. Posición horizontal = soporte, vertical = confianza, tamaño del círculo = lift."
                >
                    <ResponsiveContainer>
                        <ScatterChart margin={{ left: 8, right: 8 }}>
                            <CartesianGrid stroke={theme.grid} />
                            <XAxis
                                type="number"
                                dataKey="x"
                                name="Soporte (%)"
                                tick={{ fill: theme.axis, fontSize: 11 }}
                                stroke={theme.axis}
                                label={{
                                    value: "Soporte (%)",
                                    position: "insideBottom",
                                    offset: -4,
                                    fill: theme.axis,
                                    fontSize: 11,
                                }}
                            />
                            <YAxis
                                type="number"
                                dataKey="y"
                                name="Confianza (%)"
                                tick={{ fill: theme.axis, fontSize: 11 }}
                                stroke={theme.axis}
                            />
                            <ZAxis type="number" dataKey="z" range={[40, 400]} name="Lift" />
                            <CustomTooltip />
                            <Scatter
                                data={scatter}
                                fill={theme.accent}
                                fillOpacity={0.65}
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <DataTable description="Reglas de asociación filtradas. El lift mide la fuerza de la relación entre productos.">
                <thead>
                    <tr className="border-b border-skin-border text-skin-muted">
                        <th className="py-xs pr-md font-medium">Antecedente</th>
                        <th className="py-xs pr-md font-medium">Consecuente</th>
                        <th className="py-xs pr-md font-medium">Soporte</th>
                        <th className="py-xs pr-md font-medium">Confianza</th>
                        <th className="py-xs font-medium">Lift</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((r, index) => (
                        <tr
                            key={`${r.antecedent}-${r.consequent}`}
                            className={`border-b border-skin-border text-skin-text-secondary ${index % 2 === 0 ? "bg-skin-secondary" : "bg-skin-primary"}`}
                        >
                            <td className="py-xs pr-md">{r.antecedent}</td>
                            <td className="py-xs pr-md">{r.consequent}</td>
                            <td className="py-xs pr-md">{formatPercent(r.support)}</td>
                            <td className="py-xs pr-md">
                                {formatPercent(r.confidence)}
                            </td>
                            <td
                                className="py-xs font-semibold"
                                style={{ color: theme.accent }}
                            >
                                {formatDecimal(r.lift)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </DataTable>
        </Shell>
    );
}