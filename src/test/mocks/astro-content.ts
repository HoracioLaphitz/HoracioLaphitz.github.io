const projects = [
  {
    id: "ai-sales-assistant",
    data: {
      title: "AI Sales Assistant",
      description: "AI-assisted sales workflow.",
      maturity: "Functional prototype",
      github: "https://github.com/example/ai-sales-assistant",
    },
  },
  {
    id: "nb-capitalizacion-bancos-etl",
    data: {
      title: "Bank Capitalization ETL",
      description: "ETL pipeline for bank capitalization data.",
      maturity: "Portfolio project",
      github: "https://github.com/example/bank-capitalization-etl",
    },
  },
  {
    id: "dashboards-ventas-marketing-powerbi",
    data: {
      title: "Sales and Marketing Dashboards",
      description: "Power BI dashboards for sales and marketing analysis.",
      maturity: "Delivered work",
      dashboard: "https://example.com/sales-marketing-dashboard",
    },
  },
  {
    id: "sano-y-fresco-market-basket",
    data: {
      title: "Sano y Fresco Market Basket",
      description: "Market basket analysis for retail transactions.",
      maturity: "Reference architecture",
      github: "https://github.com/example/market-basket",
    },
  },
] as const;

export async function getCollection(collection: string) {
  return collection === "proyectos" ? projects : [];
}
