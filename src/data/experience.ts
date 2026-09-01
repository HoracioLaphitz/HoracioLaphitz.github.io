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
    period: "Dic 2025 – Mar 2026",
    role: "Data Entry Specialist",
    company: "Ucrop.it",
    location: "Remoto",
    description: "Procesamiento y validación de datos georreferenciados",
    details: [
      { text: "Validación de registros georreferenciados de Molinos SA, Heineken y COFCO con tasa de error menor al 5%; automaticé la validación para su carga en bases de datos SQL", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Procesamiento y validación con Python", sources: ["cv-2026-08-27"], scope: "company-shared" },
      { text: "Detección de inconsistencias usando algoritmos de machine learning", sources: ["cv-2026-08-27"], scope: "company-shared" },
      { text: "Desarrollo de agentes de IA y automatización de tareas", sources: ["cv-2026-08-27"], scope: "company-shared" },
    ],
    sortDate: new Date(2025, 11, 1),
  },
  {
    id: "pcservice-2021-help-desk",
    kind: "professional",
    period: "Ene 2021 – Nov 2025",
    role: "Help Desk",
    company: "PcService Posadas",
    location: "Posadas",
    description: "Mantenimiento de hardware y servidores, optimización de sistemas",
    details: [
      { text: "Mantenimiento de hardware de PC y servidores", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Instalación de sistemas operativos y diagnóstico de fallas", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Configuración y optimización de sistemas", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Soporte directo a clientes", sources: ["cv-2026-08-27"], scope: "engagement" },
    ],
    sortDate: new Date(2025, 10, 1),
  },
  {
    id: "ucropit-2024-data-entry",
    kind: "professional",
    period: "Abr 2024 – May 2024",
    role: "Data Entry",
    company: "Ucrop.it",
    location: "Remoto",
    description: "Entrada precisa y eficiente de datos georreferenciados",
    details: [
      { text: "Procesamiento y validación con Python", sources: ["cv-2026-08-27"], scope: "company-shared" },
      { text: "Detección de inconsistencias usando algoritmos de machine learning", sources: ["cv-2026-08-27"], scope: "company-shared" },
      { text: "Desarrollo de agentes de IA y automatización de tareas", sources: ["cv-2026-08-27"], scope: "company-shared" },
    ],
    sortDate: new Date(2024, 4, 1),
  },
  {
    id: "ferreteria-centenario-2020",
    kind: "unpaid-project",
    period: "Ene 2020 – Dic 2020",
    role: "Proyecto de datos y automatización",
    company: "Ferretería Centenario Posadas",
    location: "Posadas, Misiones",
    description: "Desarrollo de base de datos MySQL, automatización de procesos con n8n y pipelines de datos en Python",
    details: [
      { text: "Desarrollo de base de datos MySQL", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Automatización de procesos con n8n", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Pipelines de datos en Python", sources: ["cv-2026-08-27"], scope: "engagement" },
    ],
    sortDate: new Date(2020, 11, 1),
  },
  {
    id: "hospital-madariaga-2019-trainer",
    kind: "professional",
    period: "Jul 2019 – Dic 2019",
    role: "Capacitador Help Desk",
    company: "Hospital Escuela Dr. Ramón Madariaga",
    location: "Posadas",
    description: "Coordinación de capacitación e implementación de sistema R.I.S.mi",
    details: [
      { text: "Coordinación de equipo de capacitación e implementación de sistema R.I.S.mi", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Relevamiento de requerimientos técnicos", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Seguimiento de personal y elaboración de reportes", sources: ["cv-2026-08-27"], scope: "engagement" },
    ],
    sortDate: new Date(2019, 11, 1),
  },
  {
    id: "ministerio-salud-2019-admin",
    kind: "professional",
    period: "Mar 2019 – Jun 2019",
    role: "Asistente Administrativo Contable",
    company: "Ministerio de Salud Pública de Misiones",
    location: "Posadas",
    description: "Gestión de compras, licitaciones y ERP",
    details: [
      { text: "Gestión de compras y licitaciones", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Gestión de proveedores", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Uso de Tango Gestión y ERP interno", sources: ["cv-2026-08-27"], scope: "engagement" },
      { text: "Soporte a usuarios", sources: ["cv-2026-08-27"], scope: "engagement" },
    ],
    sortDate: new Date(2019, 5, 1),
  },
] as const;
