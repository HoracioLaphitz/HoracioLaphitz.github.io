export type ExperienceKind = "professional" | "unpaid-project";
export type ExperienceSource = "portfolio" | "cv-2026-08-27";

export interface ExperienceDetail {
  readonly text: string;
  readonly sources: readonly ExperienceSource[];
  readonly scope: "engagement" | "company-shared";
}

export interface ExperienceItem {
  readonly id: string;
  readonly kind: ExperienceKind;
  readonly period: string;
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly description: string;
  readonly details: readonly ExperienceDetail[];
  readonly sortDate: Date;
}

export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    id: "ucropit-2025-data-entry-specialist",
    kind: "professional",
    period: "dic. 2025 – mar. 2026",
    role: "Data Entry Specialist",
    company: "Ucrop.it",
    location: "Remoto",
    description: "Procesamiento y validación de datos georreferenciados",
    details: [
      {
        text: "Procesamiento y validación de datos georreferenciados",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Exploración espacial y detección de inconsistencias",
        sources: ["cv-2026-08-27"],
        scope: "company-shared",
      },
      {
        text: "Administración de datos con Excel y Google Sheets",
        sources: ["cv-2026-08-27"],
        scope: "company-shared",
      },
      {
        text: "Trabajo en equipo",
        sources: ["cv-2026-08-27"],
        scope: "company-shared",
      },
    ],
    sortDate: new Date(2025, 11, 1),
  },
  {
    id: "pcservice-2021-help-desk",
    kind: "professional",
    period: "ene. 2021 – nov. 2025",
    role: "Help Desk",
    company: "PcService Posadas",
    location: "Posadas",
    description: "Soporte técnico corporativo para servidores y sistemas",
    details: [
      {
        text: "Detección de fallas y mantenimiento de hardware y servidores",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Instalación de sistemas y diagnósticos críticos de software",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Configuración y optimización de sistemas",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Soporte a clientes corporativos y usuarios finales",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
    ],
    sortDate: new Date(2025, 10, 1),
  },
  {
    id: "ucropit-2024-data-entry",
    kind: "professional",
    period: "abr. 2024 – may. 2024",
    role: "Data Entry",
    company: "Ucrop.it",
    location: "Remoto",
    description: "Carga y revisión de datos georreferenciados",
    details: [
      {
        text: "Procesamiento y validación de datos",
        sources: ["cv-2026-08-27"],
        scope: "company-shared",
      },
      {
        text: "Exploración de datos y detección de inconsistencias frente a observaciones de campo",
        sources: ["cv-2026-08-27"],
        scope: "company-shared",
      },
      {
        text: "Excel y Google Sheets para carga de datos",
        sources: ["cv-2026-08-27"],
        scope: "company-shared",
      },
    ],
    sortDate: new Date(2024, 4, 1),
  },
  {
    id: "ferreteria-centenario-2020",
    kind: "unpaid-project",
    period: "ene. 2020 – dic. 2020",
    role: "Profesional de soporte informático ad honorem",
    company: "Clientes locales",
    location: "Posadas, Misiones",
    description:
      "Base de datos MySQL, flujos en n8n y pipelines de datos en Python",
    details: [
      {
        text: "Desarrollo de base de datos MySQL",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Automatización de tareas con n8n",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Pipelines de datos en Python",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
    ],
    sortDate: new Date(2020, 11, 1),
  },
  {
    id: "hospital-madariaga-2019-trainer",
    kind: "professional",
    period: "jul. 2019 – dic. 2019",
    role: "Tech Lead",
    company: "Hospital Escuela Dr. Ramón Madariaga",
    location: "Posadas",
    description: "Capacitación e implementación del sistema R.I.S.mi",
    details: [
      {
        text: "Coordinación de equipo de capacitación e implementación de sistema R.I.S.mi",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Relevamiento de requerimientos técnicos",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Seguimiento del personal y elaboración de informes sobre ese trabajo",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
    ],
    sortDate: new Date(2019, 11, 1),
  },
  {
    id: "ministerio-salud-2019-admin",
    kind: "professional",
    period: "mar. 2019 – jun. 2019",
    role: "Administrative Assistant",
    company: "Ministerio de Salud Pública de Misiones",
    location: "Posadas",
    description: "Compras y licitaciones con Tango Gestión y el ERP interno",
    details: [
      {
        text: "Gestión de compras y licitaciones",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Gestión de proveedores",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Manejo de Tango Gestión y ERP interno",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
      {
        text: "Soporte a usuarios internos",
        sources: ["cv-2026-08-27"],
        scope: "engagement",
      },
    ],
    sortDate: new Date(2019, 5, 1),
  },
] as const;
