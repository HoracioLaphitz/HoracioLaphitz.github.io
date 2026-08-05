/**
 * Profile Data - CV Information
 * Source: CV - Horacio Nahuel Laphitz.pdf
 */

import {
  ProfileEntity,
  SkillCategory,
  SkillLevel,
} from "@domain/entities/profile.entity";

export const PROFILE_DATA = new ProfileEntity(
  "Horacio Laphitz",
  "",
  [
    "Analista de Datos orientado al desarrollo agéntico de soluciones para problemas del mundo real, aplicando estándares de seguridad de la información (ISO 27001)",
  ],
  {
    email: "horaciolaphitz99@gmail.com",
    location: "Posadas, Misiones, Argentina",
    linkedin: "https://www.linkedin.com/in/horacio-laphitz/",
    github: "https://github.com/horaciolaphitz",
    credly: "https://www.credly.com/users/horacio-laphitz",
  },
  [
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
      location: "Posadas",
      description: "Gestión de compras, licitaciones y ERP",
      sortDate: new Date(2019, 5, 1),
    },
  ],
  [
    {
      period: "Febrero 2026",
      title: "SQL con Databricks",
      issuer: "Lovelytics Latam",
      sortDate: new Date(2026, 1, 1),
    },
    {
      period: "May 2024",
      title: "Supervised Machine Learning",
      issuer: "Stanford University - Coursera",
      certificateUrl:
        "/Certificaciones/Supervised Machine Learning_ Regression and Classification.pdf",
      sortDate: new Date(2024, 4, 1),
    },
    {
      period: "Abr 2024",
      title: "Python for Data Engineering",
      issuer: "IBM - Coursera",
      certificateUrl: "/Certificaciones/IBM-python-data-engineering.pdf",
      credlyBadgeId: "78a917fc-2fee-416b-a3c4-d14f3cd09541",
      sortDate: new Date(2024, 3, 1),
    },
    {
      period: "Mar 2024",
      title: "Certificado Profesional de Análisis de Datos",
      issuer: "Google Careers - Coursera",
      certificateUrl: "/Certificaciones/GOOGLE-PYTHON-CERTIFICATE.pdf",
      sortDate: new Date(2024, 2, 1),
    },
    {
      period: "Mar 2024",
      title: "Fundamentos de Ciencia de Datos",
      issuer: "Google Careers - Coursera",
      certificateUrl: "/Certificaciones/Fundamentos de ciencia de datos.pdf",
      sortDate: new Date(2024, 2, 1),
    },
    {
      period: "Feb 2024",
      title: "Python for Data Science, AI & Development",
      issuer: "IBM - Coursera",
      certificateUrl:
        "/Certificaciones/IBM-DATA SCIENCE - AI - DEVELOPMENT.pdf",
      credlyBadgeId: "57d36636-8b10-4218-a641-7cd6fcf9d8fe",
      sortDate: new Date(2024, 1, 1),
    },
    {
      period: "Feb 2024",
      title: "Análisis computacional de Datos en R",
      issuer: "Google Careers - Coursera",
      certificateUrl:
        "/Certificaciones/GOOGLE-Analisis-computacional-de-datos-R.pdf",
      sortDate: new Date(2024, 1, 1),
    },
  ],
  [
    {
      period: "2018 – 2020",
      degree: "Técnico Superior en Análisis de Sistemas",
      institution: "Instituto Superior Antonio Ruiz de Montoya",
      location: "Posadas, Misiones",
      sortDate: new Date(2020, 11, 1),
    },
  ],
  [
    // GenAI & LLMs
    {
      name: "Python",
      category: SkillCategory.Programming,
      level: SkillLevel.Advanced,
    },
    {
      name: "LangChain",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "RAG",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "LlamaIndex",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Vector Databases",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "OpenAI API",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Prompt Engineering",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    // Data Analysis
    {
      name: "SQL",
      category: SkillCategory.Database,
      level: SkillLevel.Advanced,
    },
    {
      name: "Pandas",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Advanced,
    },
    {
      name: "NumPy",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Advanced,
    },
    {
      name: "Scikit-learn",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "XGBoost",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Deep Learning",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Computer Vision",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Market Basket Analysis",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Power BI",
      category: SkillCategory.Visualization,
      level: SkillLevel.Advanced,
    },
    {
      name: "Matplotlib",
      category: SkillCategory.Visualization,
      level: SkillLevel.Intermediate,
    },
    {
      name: "R",
      category: SkillCategory.Programming,
      level: SkillLevel.Intermediate,
    },
    {
      name: "TensorFlow",
      category: SkillCategory.Programming,
      level: SkillLevel.Intermediate,
    },
    // Databases
    {
      name: "PostgreSQL",
      category: SkillCategory.Database,
      level: SkillLevel.Advanced,
    },
    {
      name: "MySQL",
      category: SkillCategory.Database,
      level: SkillLevel.Advanced,
    },
    {
      name: "BigQuery",
      category: SkillCategory.Database,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Databricks",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    // Dev Tools
    { name: "Git", category: SkillCategory.Tools, level: SkillLevel.Advanced },
    {
      name: "Docker",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Streamlit",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Web Scraping",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Testing",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Excel Avanzado",
      category: SkillCategory.Tools,
      level: SkillLevel.Advanced,
    },
    // Desarrollo Web
    {
      name: "Astro",
      category: SkillCategory.Programming,
      level: SkillLevel.Advanced,
    },
    {
      name: "React",
      category: SkillCategory.Programming,
      level: SkillLevel.Advanced,
    },
    {
      name: "TypeScript",
      category: SkillCategory.Programming,
      level: SkillLevel.Advanced,
    },
    {
      name: "JavaScript",
      category: SkillCategory.Programming,
      level: SkillLevel.Advanced,
    },
    {
      name: "HTML",
      category: SkillCategory.Programming,
      level: SkillLevel.Advanced,
    },
    {
      name: "CSS",
      category: SkillCategory.Programming,
      level: SkillLevel.Advanced,
    },
    {
      name: "Tailwind CSS",
      category: SkillCategory.Programming,
      level: SkillLevel.Advanced,
    },
    {
      name: "Vite",
      category: SkillCategory.Programming,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Node.js",
      category: SkillCategory.Programming,
      level: SkillLevel.Intermediate,
    },
    {
      name: "GitHub Actions",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "CI/CD",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    // Soft Skills
    {
      name: "Resolución de Problemas",
      category: SkillCategory.Soft,
      level: SkillLevel.Advanced,
    },
    {
      name: "Pensamiento Analítico",
      category: SkillCategory.Soft,
      level: SkillLevel.Advanced,
    },
    {
      name: "Comunicación",
      category: SkillCategory.Soft,
      level: SkillLevel.Advanced,
    },
    {
      name: "Trabajo en Equipo",
      category: SkillCategory.Soft,
      level: SkillLevel.Advanced,
    },
    // Tango Gestión (ERP)
    {
      name: "Parametrización Contable",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Gestión de Datos Maestros",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Gestión de Stock",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Procesos de Ventas",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Tesorería",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Gestión de Compras",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    // Seguridad de la Información
    {
      name: "ISO 27001",
      category: SkillCategory.Security,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Gobernanza de Datos",
      category: SkillCategory.Security,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Privacidad de Datos",
      category: SkillCategory.Security,
      level: SkillLevel.Intermediate,
    },
  ],
);
