export const ALLOWED_MATURITY_STATUSES = [
  "Trabajo entregado",
  "Proyecto de portfolio",
  "Prototipo funcional",
  "Arquitectura de referencia",
  "En desarrollo",
  "Actualmente profundizando conocimientos en",
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
    status: "Actualmente profundizando conocimientos en",
    scope: "Estudio de arquitecturas para aplicaciones con IA",
    boundaries: ["aprendizaje declarado en el portfolio"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "connected-agents-and-subagents",
    status: "Actualmente profundizando conocimientos en",
    scope: "Estudio de flujos donde agentes reparten tareas",
    boundaries: ["aprendizaje declarado en el portfolio"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "agent-interoperability-protocols",
    status: "Actualmente profundizando conocimientos en",
    scope: "Estudio de MCP y A2A",
    boundaries: ["aprendizaje declarado en el portfolio"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "private-document-rag",
    status: "Actualmente profundizando conocimientos en",
    scope: "Estudio de RAG con documentos",
    boundaries: ["aprendizaje declarado en el portfolio"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "erp-database-and-api-integration",
    status: "Actualmente profundizando conocimientos en",
    scope: "Integración de ERP, bases de datos y APIs",
    boundaries: ["experiencia con ERP y bases de datos; estudio de APIs"],
    sources: ["src/data/profile-data.ts", "src/data/experience.ts"],
  },
  {
    claimId: "private-and-hybrid-model-deployment",
    status: "En desarrollo",
    scope: "Estudio de modelos locales e híbridos",
    boundaries: ["aprendizaje declarado en el portfolio; sin despliegue en producción"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "llmops",
    status: "En desarrollo",
    scope: "Registro y evaluación de aplicaciones con modelos de lenguaje",
    boundaries: ["aprendizaje declarado en el portfolio"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "multi-agent-framework-selection-and-evaluation",
    status: "Actualmente profundizando conocimientos en",
    scope: "Comparación de frameworks para flujos con agentes",
    boundaries: ["aprendizaje declarado en el portfolio"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "observability",
    status: "En desarrollo",
    scope: "Registro de ejecuciones en pruebas con IA",
    boundaries: ["aprendizaje declarado en el portfolio"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "security",
    status: "En desarrollo",
    scope: "Estudio de permisos y aislamiento en aplicaciones con IA",
    boundaries: ["aprendizaje declarado en el portfolio"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "production-operations",
    status: "En desarrollo",
    scope: "Estudio del despliegue y mantenimiento de aplicaciones con IA",
    boundaries: ["aprendizaje declarado en el portfolio; sin despliegue en producción"],
    sources: ["src/data/profile-data.ts"],
  },
  {
    claimId: "analytics-data-foundation",
    status: "Proyecto de portfolio",
    scope: "ETL, data mart en SQL, aplicación de análisis y modelo de abandono",
    boundaries: ["análisis de datos", "integración de datos", "machine learning"],
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
