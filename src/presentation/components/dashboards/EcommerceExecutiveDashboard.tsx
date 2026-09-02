import type { ReactNode } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import type {
    CategoryRevenue,
    FeatureImportanceEntry,
    MonthlyKpi,
} from "@domain/dashboards/types";
import { ecommerceKpis, topFeatures } from "@domain/dashboards/aggregations";
import { fetchGithubRaw } from "@infrastructure/github/github-raw";
import {
    parseJsonRecord,
    parseKpisMensuales,
    parseTopCategorias,
} from "@infrastructure/github/parsers";
import { useGithubData } from "./useGithubData";
import { ecommerceTheme as theme } from "./themes";
import { DashboardShell } from "./shared/DashboardShell";
import { KpiCard } from "./shared/KpiCard";
import { ChartCard } from "./shared/ChartCard";
import { CustomTooltip } from "./shared/CustomTooltip";
import { LoadingSkeleton } from "./shared/LoadingSkeleton";
import { ErrorState } from "./shared/ErrorState";
import { formatCompact, formatDecimal, formatPercent } from "./shared/format";

const REPO = "HoracioLaphitz/Data-Analysis-Ecommerce";
const BRANCH = "analytics-v2";
const REPO_URL = "https://github.com/HoracioLaphitz/Data-Analysis-Ecommerce";

interface MetricsJson {
    churn_rate: number;
    n_sellers: number;
    xgboost: { auc_roc: number; precision: number; recall: number };
}

interface EcommerceData {
    months: MonthlyKpi[];
    categories: CategoryRevenue[];
    churnRate: number;
    aucRoc: number;
    features: FeatureImportanceEntry[];
    featuresMonitored: number;
}

async function loadEcommerce(): Promise<EcommerceData> {
    const [kpisCsv, catsCsv, metricsRaw, featuresRaw, driftRaw] =
        await Promise.all([
            fetchGithubRaw(REPO, BRANCH, "dashboard-data/kpis_mensuales.csv"),
            fetchGithubRaw(REPO, BRANCH, "dashboard-data/top_categorias.csv"),
            fetchGithubRaw(REPO, BRANCH, "models/metrics.json"),
            fetchGithubRaw(REPO, BRANCH, "models/feature_importance.json"),
            fetchGithubRaw(REPO, BRANCH, "models/drift_reference.json"),
        ]);
    const metrics = parseJsonRecord<MetricsJson>(metricsRaw, [
        "churn_rate",
        "xgboost",
    ]);
    const importance = parseJsonRecord<Record<string, number>>(featuresRaw, []);
    const drift = parseJsonRecord<{ edges: Record<string, unknown> }>(driftRaw, [
        "edges",
    ]);
    return {
        months: parseKpisMensuales(kpisCsv),
        categories: parseTopCategorias(catsCsv),
        churnRate: metrics.churn_rate,
        aucRoc: metrics.xgboost.auc_roc,
        features: topFeatures(importance, 8),
        featuresMonitored: Object.keys(drift.edges).length,
    };
}

function Shell({ children }: { children: ReactNode }) {
    return (
        <DashboardShell
            title="Ecommerce Olist"
            subtitle="KPIs mensuales del mart de Olist y modelo de churn de sellers."
            repoUrl={REPO_URL}
            theme={theme}
        >
            {children}
        </DashboardShell>
    );
}

export default function EcommerceExecutiveDashboard() {
    const { status, data, error, retry } = useGithubData(
        "dash:ecommerce",
        loadEcommerce
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

    const kpis = ecommerceKpis(data.months);

    return (
        <Shell>
            <div className="grid grid-cols-2 gap-sm md:grid-cols-4">
                <KpiCard
                    label="Ingresos totales"
                    value={`R$ ${formatCompact(kpis.totalRevenue)}`}
                    theme={theme}
                />
                <KpiCard
                    label="Pedidos"
                    value={formatCompact(kpis.totalOrders)}
                    theme={theme}
                />
                <KpiCard
                    label="AOV promedio"
                    value={`R$ ${formatDecimal(kpis.avgAov)}`}
                    theme={theme}
                />
                <KpiCard
                    label="Churn de sellers"
                    value={formatPercent(data.churnRate * 100)}
                    hint={`Modelo XGBoost · AUC ${formatDecimal(data.aucRoc)}`}
                    theme={theme}
                />
            </div>

            <div className="grid gap-lg lg:grid-cols-2">
                <ChartCard
                    title="Ingresos mensuales"
                    description="Evolución de ingresos mes a mes durante el período analizado."
                >
                    <ResponsiveContainer>
                        <LineChart data={data.months} margin={{ left: 8, right: 8 }}>
                            <CartesianGrid stroke={theme.grid} vertical={false} />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: theme.axis, fontSize: 11 }}
                                stroke={theme.axis}
                            />
                            <YAxis
                                tickFormatter={(v: number) => formatCompact(v)}
                                tick={{ fill: theme.axis, fontSize: 11 }}
                                stroke={theme.axis}
                            />
                            <CustomTooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                name="Ingresos"
                                stroke={theme.accent}
                                strokeWidth={2.5}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    title="Top categorías por ingresos"
                    description="Categorías de productos con mayor ingreso total."
                    dataPoints={data.categories.length}
                >
                    <ResponsiveContainer>
                        <BarChart
                            data={data.categories}
                            layout="vertical"
                            margin={{ left: 8, right: 8 }}
                        >
                            <CartesianGrid stroke={theme.grid} horizontal={false} />
                            <XAxis
                                type="number"
                                tickFormatter={(v: number) => formatCompact(v)}
                                tick={{ fill: theme.axis, fontSize: 11 }}
                                stroke={theme.axis}
                            />
                            <YAxis
                                type="category"
                                dataKey="category"
                                width={110}
                                tick={{ fill: theme.axis, fontSize: 10 }}
                                stroke={theme.axis}
                            />
                            <CustomTooltip />
                            <Bar
                                dataKey="revenue"
                                name="Ingresos"
                                fill={theme.series[2]}
                                radius={[0, 6, 6, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <ChartCard
                title="Importancia de variables — churn de sellers"
                description="Variables con mayor peso en la predicción de churn de vendedores según el modelo XGBoost."
                dataPoints={data.features.length}
            >
                <ResponsiveContainer>
                    <BarChart data={data.features} layout="vertical" margin={{ left: 8, right: 8 }}>
                        <CartesianGrid stroke={theme.grid} horizontal={false} />
                        <XAxis
                            type="number"
                            tick={{ fill: theme.axis, fontSize: 11 }}
                            stroke={theme.axis}
                        />
                        <YAxis
                            type="category"
                            dataKey="feature"
                            width={120}
                            tick={{ fill: theme.axis, fontSize: 10 }}
                            stroke={theme.axis}
                        />
                        <CustomTooltip />
                        <Bar
                            dataKey="importance"
                            name="Importancia"
                            fill={theme.series[1]}
                            radius={[0, 6, 6, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>

            <p className="text-xs text-skin-muted">
                Monitoreo de drift activo sobre {data.featuresMonitored} variables del
                modelo.
            </p>
        </Shell>
    );
}