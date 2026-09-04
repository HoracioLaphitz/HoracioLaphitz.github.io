/**
 * Certifications data
 * Migrated verbatim from the legacy trajectory section (certification items),
 * with an added `issuer` field for grouping in the UI.
 * Credly IDs and Tango badge paths copied verbatim — do not edit by hand.
 */

export interface Certification {
  period: string;
  title: string;
  company: string;
  issuer: string;
  sortDate: Date;
  certificateUrl?: string;
  description?: string;
  /** Flagship credential surfaced in the "Destacadas" tier for recruiters and visitors. */
  highlight?: boolean;
}

export interface CredlyBadge {
  id: string;
  label: string;
  url: string;
}

export interface TangoBadge {
  image: string;
  label: string;
}

export const CERTIFICATIONS: readonly Certification[] = [
  {
    period: "feb. 2026",
    title: "SQL con Databricks",
    company: "Lovelytics Latam",
    issuer: "Databricks",
    sortDate: new Date(2026, 1, 1),
    highlight: true,
    description: "Limpieza y validacion de datos con SQL en Databricks",
  },
  {
    period: "mar. 2025",
    title: "Business & Operations Management Excellence",
    company: "MTF Institute - Udemy",
    issuer: "Udemy",
    sortDate: new Date(2025, 2, 1),
    certificateUrl:
      "/Certificaciones/CertificateinBusiness&OperationsManagementExcellence.pdf",
  },
  {
    period: "mar. 2025",
    title: "Sales & Service Data Analysis & Analytics Expert",
    company: "MTF Institute - Udemy",
    issuer: "Udemy",
    sortDate: new Date(2025, 2, 1),
    certificateUrl:
      "/Certificaciones/Sales & Service Data Analysis & Analytics Expert.pdf",
  },
  {
    period: "mar. 2025",
    title: "Microsoft Office Mastery",
    company: "Sayman Creative Institute - Udemy",
    issuer: "Udemy",
    sortDate: new Date(2025, 2, 1),
    certificateUrl:
      "/Certificaciones/Microsoft Office Mastery Learn Word Excel and PowerPoint.pdf",
  },
  {
    period: "mar. 2025",
    title: "Professional Diploma in Corporate Management",
    company: "MTF Institute - Udemy",
    issuer: "Udemy",
    sortDate: new Date(2025, 2, 1),
    certificateUrl:
      "/Certificaciones/Prefesional diploma in corporate managemet.pdf",
  },
  {
    period: "may. 2024",
    title: "Supervised Machine Learning",
    company: "Stanford University - Coursera",
    issuer: "Stanford",
    sortDate: new Date(2024, 4, 1),
    highlight: true,
    certificateUrl:
      "/Certificaciones/Supervised Machine Learning_ Regression and Classification.pdf",
  },
  {
    period: "abr. 2024",
    title: "Python for Data Engineering",
    company: "IBM - Coursera",
    issuer: "IBM",
    sortDate: new Date(2024, 3, 1),
    highlight: true,
    certificateUrl: "/Certificaciones/IBM-python-data-engineering.pdf",
  },
  {
    period: "mar. 2024",
    title: "Certificado Profesional de Análisis de Datos",
    company: "Google Careers - Coursera",
    issuer: "Google",
    sortDate: new Date(2024, 2, 1),
    highlight: true,
    certificateUrl: "/Certificaciones/GOOGLE-PYTHON-CERTIFICATE.pdf",
  },
  {
    period: "mar. 2024",
    title: "Fundamentos de Ciencia de Datos",
    company: "Google Careers - Coursera",
    issuer: "Google",
    sortDate: new Date(2024, 2, 1),
    certificateUrl: "/Certificaciones/Fundamentos de ciencia de datos.pdf",
  },
  {
    period: "feb. 2024",
    title: "Python for Data Science, AI & Development",
    company: "IBM - Coursera",
    issuer: "IBM",
    sortDate: new Date(2024, 1, 1),
    highlight: true,
    certificateUrl: "/Certificaciones/IBM-DATA SCIENCE - AI - DEVELOPMENT.pdf",
  },
  {
    period: "feb. 2024",
    title: "Análisis computacional de Datos en R",
    company: "Google Careers - Coursera",
    issuer: "Google",
    sortDate: new Date(2024, 1, 1),
    certificateUrl:
      "/Certificaciones/GOOGLE-Analisis-computacional-de-datos-R.pdf",
  },
  {
    period: "feb. 2024",
    title: "Curso Final de Análisis Computacional de Datos",
    company: "Google Careers - Coursera",
    issuer: "Google",
    sortDate: new Date(2024, 1, 1),
    certificateUrl:
      "/Certificaciones/Curso final de análisis computacional de datos completa un caso practico.pdf",
  },
  {
    period: "ene. 2024",
    title: "Go Beyond the Numbers: Translate Data into Insights",
    company: "Google Careers - Coursera",
    issuer: "Google",
    sortDate: new Date(2024, 0, 1),
    certificateUrl: "/Certificaciones/GoBeyondtheNumbersTranslateData.pdf",
  },
  {
    period: "ene. 2024",
    title: "Get Started with Python",
    company: "Google Careers - Coursera",
    issuer: "Google",
    sortDate: new Date(2024, 0, 1),
    certificateUrl: "/Certificaciones/GOOGLE-PYTHON-CERTIFICATE.pdf",
  },
  {
    period: "ene. 2024",
    title: "Tu Primera Experiencia como Analista de Datos",
    company: "Google Careers - Coursera",
    issuer: "Google",
    sortDate: new Date(2024, 0, 1),
    certificateUrl:
      "/Certificaciones/certificate-of-completion-for-tu-primera-experiencia-como-analista-de-datos.pdf",
  },
  {
    period: "dic. 2023",
    title: "Python Expertise",
    company: "Nicolas Schurmann - Udemy",
    issuer: "Udemy",
    sortDate: new Date(2023, 11, 1),
    certificateUrl: "/Certificaciones/Python-Developer-Udemy.pdf",
  },
  {
    period: "nov. 2023",
    title: "Introducción a Machine Learning",
    company: "Domestika",
    issuer: "Domestika",
    sortDate: new Date(2023, 10, 1),
  },
  {
    period: "jul. 2023",
    title: "Bases de Datos desde Cero",
    company: "Silicon Misiones",
    issuer: "Silicon Misiones",
    sortDate: new Date(2023, 6, 1),
    certificateUrl:
      "/Certificaciones/SILICON MISIONES- Certificado Digital Bases de Datos.pdf",
  },
  {
    period: "mar. 2023",
    title: "Data Analytics Nivel Growth",
    company: "Silicon Misiones",
    issuer: "Silicon Misiones",
    sortDate: new Date(2023, 2, 1),
    certificateUrl:
      "/Certificaciones/SILICON MISIONES-Certificado de Data & Analytics.pdf",
  },
  {
    period: "dic. 2022",
    title: "Introducción a la Programación",
    company: "Silicon Misiones",
    issuer: "Silicon Misiones",
    sortDate: new Date(2022, 11, 1),
    certificateUrl:
      "/Certificaciones/SILICON MISIONES- Certificado Laphitz Horacio Intro a la programacion.pdf",
  },
] as const;

export const CREDLY_BADGES: readonly CredlyBadge[] = [
  {
    id: "78a917fc-2fee-416b-a3c4-d14f3cd09541",
    label: "Python Project for Data Engineering",
    url: "https://www.credly.com/badges/78a917fc-2fee-416b-a3c4-d14f3cd09541",
  },
  {
    id: "57d36636-8b10-4218-a641-7cd6fcf9d8fe",
    label: "Python for Data Science and AI",
    url: "https://www.credly.com/badges/57d36636-8b10-4218-a641-7cd6fcf9d8fe",
  },
] as const;

export const TANGO_BADGES: readonly TangoBadge[] = [
  { image: "/Certificaciones/Tango_Trainee.png", label: "Tango Trainee" },
  { image: "/Certificaciones/Tango_Starter.png", label: "Tango Starter" },
] as const;
