/**
 * Work experience data
 * Migrated verbatim from the legacy trajectory section (work items).
 * Ordered newest first via sortDate.
 */

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  sortDate: Date;
}

export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    period: "Dic 2025 – Mar 2026",
    role: "Data Entry Specialist",
    company: "Ucrop.it",
    location: "Remoto",
    description:
      "Validación de registros georreferenciados de Molinos SA, Heineken y COFCO con tasa de error menor al 5%; automaticé la validación para su carga en bases de datos SQL",
    sortDate: new Date(2025, 11, 1),
  },
  {
    period: "Ene 2021 – Nov 2025",
    role: "Help Desk",
    company: "PcService Posadas",
    location: "Posadas",
    description:
      "Mantenimiento de hardware y servidores, optimización de sistemas",
    sortDate: new Date(2025, 10, 1),
  },
  {
    period: "Abr 2024 – May 2024",
    role: "Data Entry",
    company: "Ucrop.it",
    location: "Remoto",
    description: "Entrada precisa y eficiente de datos georreferenciados",
    sortDate: new Date(2024, 4, 1),
  },
  {
    period: "Jul 2019 – Dic 2019",
    role: "Capacitador Help Desk",
    company: "Hospital Escuela Dr. Ramón Madariaga",
    location: "Posadas",
    description:
      "Coordinación de capacitación e implementación de sistema R.I.S.mi",
    sortDate: new Date(2019, 11, 1),
  },
  {
    period: "Mar 2019 – Jun 2019",
    role: "Asistente Administrativo Contable",
    company: "Ministerio de Salud Pública de Misiones",
    location: "",
    description: "Gestión de compras, licitaciones y ERP",
    sortDate: new Date(2019, 5, 1),
  },
] as const;
