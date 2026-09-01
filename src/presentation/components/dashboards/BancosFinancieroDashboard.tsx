import { useState, type ReactNode } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { BankMarketCap, Currency } from "@domain/dashboards/types";
import { bancosKpis, bankRanking } from "@domain/dashboards/aggregations";
import { fetchGithubRaw } from "@infrastructure/github/github-raw";
import { parseBancos } from "@infrastructure/github/parsers";
import { useGithubData } from "./useGithubData";
import { bancosTheme as theme } from "./themes";
import { DashboardShell } from "./shared/DashboardShell";
import { KpiCard } from "./shared/KpiCard";
import { ChartCard } from "./shared/ChartCard";
import { LoadingSkeleton } from "./shared/LoadingSkeleton";
import { ErrorState } from "./shared/ErrorState";
import { formatCompact, formatDecimal } from "./shared/format";

const REPO_URL =
    "https://github.com/HoracioLaphitz/Capitalizacion-del-Mercado-de-los-Bancos-mas-Grandes";

const GOLD = "#d97706";

const CURRENCIES: { id: Currency; label: string }[] = [
    { id: "usd", label: "USD" },
    { id: "gbp", label: "GBP" },
    { id: "eur", label: "EUR" },
    { id: "inr", label: "INR" },
];

async function loadBanks(): Promise<BankMarketCap[]> {
    const text = await fetchGithubRaw(
        "HoracioLaphitz/Capitalizacion-del-Mercado-de-los-Bancos-mas-Grandes",
        "main",
        "dashboard-data/bancos_market_cap.csv"
    );
    return parseBancos(text);
}

function Shell({ children }: { children: ReactNode }) {
    return (
        <DashboardShell
            title="Financiero — Capitalización Bancaria"
            subtitle="Ranking de los bancos más grandes por capitalización de mercado."
            repoUrl={REPO_URL}
            theme={theme}
        >
            {children}
        </DashboardShell>
    );
}

export default function BancosFinancieroDashboard() {
    const { status, data, error, retry } = useGithubData("dash:bancos", loadBanks);
    const [currency, setCurrency] = useState<Currency>("usd");

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

    const ranked = bankRanking(data, currency, 10);
    const kpis = bancosKpis(data, currency);
    const unit = currency.toUpperCase();

    return (
        <Shell>
            <div
                role="group"
                aria-label="Seleccionar moneda"
                className="flex flex-wrap gap-xs"
            >
                {CURRENCIES.map((c) => {
                    const active = c.id === currency;
                    return (
                        <button
                            key={c.id}
                            type="button"
                            onClick={() => setCurrency(c.id)}
                            aria-pressed={active}
                            className={`rounded-full border px-md py-xs text-sm font-medium transition-colors ${
                                active
                                    ? "text-white"
                                    : "border-skin-border-medium text-skin-text-secondary hover:bg-skin-tertiary"
                            }`}
                            style={
                                active
                                    ? { backgroundColor: theme.accent, borderColor: theme.accent }
                                    : undefined
                            }
                        >
                            {c.label}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-sm xs:grid-cols-3">
                <KpiCard
                    label="Líder del ranking"
                    value={kpis.leaderName}
                    hint={`${formatDecimal(kpis.leaderValue)} mil millones ${unit}`}
                    theme={theme}
                />
                <KpiCard
                    label={`Total top 10 (${unit})`}
                    value={`${formatCompact(kpis.topTotal)} B`}
                    theme={theme}
                />
                <KpiCard
                    label="Bancos listados"
                    value={String(data.length)}
                    theme={theme}
                />
            </div>

            <ChartCard title={`Top 10 por capitalización de mercado — ${unit}`}>
                <ResponsiveContainer>
                    <BarChart data={ranked} layout="vertical" margin={{ left: 8, right: 8 }}>
                        <CartesianGrid stroke={theme.grid} horizontal={false} />
                        <XAxis
                            type="number"
                            tickFormatter={(v: number) => formatCompact(v)}
                            tick={{ fill: theme.axis, fontSize: 11 }}
                            stroke={theme.axis}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={120}
                            tick={{ fill: theme.axis, fontSize: 10 }}
                            stroke={theme.axis}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--border-light)",
                                borderRadius: 12,
                                color: "var(--text-primary)",
                            }}
                        />
                        <Bar dataKey={currency} name={unit} radius={[0, 6, 6, 0]}>
                            {ranked.map((bank, index) => (
                                <Cell
                                    key={bank.name}
                                    fill={index === 0 ? GOLD : theme.accent}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </Shell>
    );
}
