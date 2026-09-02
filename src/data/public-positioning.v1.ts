import {
  ALLOWED_MATURITY_STATUSES,
  ENTERPRISE_AI_EVIDENCE,
  type MaturityStatus,
} from "./enterprise-ai-evidence.v1";

export const PUBLIC_POSITIONING = {
  version: "v1",
  identity: {
    name: "Horacio Laphitz",
    role: "Analista de Datos",
  },
  contact: {
    email: "horaciolaphitz99@gmail.com",
    linkedin: "https://www.linkedin.com/in/horacio-laphitz/",
    github: "https://github.com/horaciolaphitz",
  },
  siteUrl: "https://horaciolaphitz.vercel.app",
  positioning: {
    focus: "Análisis de datos y automatización con Python, SQL y Power BI; estudio de RAG y flujos con agentes en proyectos personales",
    qualification: "Currently deepening expertise in",
  },
  maturityStatuses: ALLOWED_MATURITY_STATUSES,
  capabilities: ENTERPRISE_AI_EVIDENCE.map(({ claimId, sources, status }) => ({
    claimId,
    sources,
    status,
  })),
} as const satisfies {
  version: string;
  identity: { name: string; role: string };
  contact: { email: string; linkedin: string; github: string };
  siteUrl: string;
  positioning: { focus: string; qualification: MaturityStatus };
  maturityStatuses: readonly MaturityStatus[];
  capabilities: readonly {
    claimId: string;
    sources: readonly string[];
    status?: MaturityStatus;
  }[];
};
