export const ALLOWED_MATURITY_STATUSES = [
  "Delivered work",
  "Portfolio project",
  "Functional prototype",
  "Reference architecture",
  "In development",
  "Currently deepening expertise in",
] as const;

export type MaturityStatus = (typeof ALLOWED_MATURITY_STATUSES)[number];

export interface EnterpriseAiEvidence {
  readonly claimId: string;
  readonly status: MaturityStatus;
  readonly scope: string;
  readonly boundaries: readonly string[];
  readonly sources: readonly string[];
}

export const ENTERPRISE_AI_EVIDENCE: readonly EnterpriseAiEvidence[] = [
  {
    claimId: "platform-architecture-and-implementation",
    status: "Currently deepening expertise in",
    scope: "Enterprise AI platform architecture and implementation",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "connected-agents-and-subagents",
    status: "Currently deepening expertise in",
    scope: "Connected agents and subagents",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "agent-interoperability-protocols",
    status: "Currently deepening expertise in",
    scope: "Agent interoperability protocols — MCP & A2A",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "private-document-rag",
    status: "Currently deepening expertise in",
    scope: "Private-document retrieval-augmented generation",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "erp-database-and-api-integration",
    status: "Currently deepening expertise in",
    scope: "ERP, database, and API integration",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts", "src/data/experience.ts"],
  },
  {
    claimId: "private-and-hybrid-model-deployment",
    status: "In development",
    scope: "Private or hybrid model deployment",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "llmops",
    status: "In development",
    scope: "LLMOps",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "multi-agent-framework-selection-and-evaluation",
    status: "Currently deepening expertise in",
    scope: "Multi-agent framework selection and evaluation",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "observability",
    status: "In development",
    scope: "Observability for AI systems",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "security",
    status: "In development",
    scope: "Security for AI systems",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "production-operations",
    status: "In development",
    scope: "Production operations for AI systems",
    boundaries: ["portfolio positioning"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "analytics-data-foundation",
    status: "Portfolio project",
    scope: "ETL, SQL data mart, analytics application, and churn model",
    boundaries: ["analytics", "data integration", "machine learning"],
    sources: ["src/content/proyectos/ai-sales-assistant.md"],
  },
] as const;

export type ClaimReference = Pick<EnterpriseAiEvidence, "claimId"> & {
  readonly status?: MaturityStatus;
};

export function resolveClaim(reference: ClaimReference): EnterpriseAiEvidence {
  if (!reference.claimId) throw new Error("A claim requires a claim ID");

  const item = ENTERPRISE_AI_EVIDENCE.find(
    ({ claimId }) => claimId === reference.claimId,
  );
  if (!item) throw new Error(`Unknown claim: ${reference.claimId}`);
  if (
    reference.status &&
    !ALLOWED_MATURITY_STATUSES.includes(reference.status)
  ) {
    throw new Error(`Unsupported maturity status: ${reference.status}`);
  }
  return item;
}
