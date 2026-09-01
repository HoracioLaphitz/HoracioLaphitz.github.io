/**
 * Profile Data - CV Information
 * Source: CV - Horacio Nahuel Laphitz.pdf
 */

import {
  ProfileEntity,
  SkillCategory,
  SkillLevel,
} from "@domain/entities/profile.entity";
import { EXPERIENCE_ITEMS } from "./experience";

const PROFILE_EXPERIENCE = EXPERIENCE_ITEMS.map(({ period, role, company, location, description, sortDate }) => ({
  period, role, company, location, description, sortDate,
}));

export const PROFILE_DATA = new ProfileEntity(
  "Horacio Laphitz",
  "",
  [
    "Analista de Datos orientado al desarrollo agéntico de soluciones para problemas del mundo real",
  ],
  {
    email: "horaciolaphitz99@gmail.com",
    location: "Posadas, Misiones, Argentina",
    linkedin: "https://www.linkedin.com/in/horacio-laphitz/",
    github: "https://github.com/horaciolaphitz",
    credly: "https://www.credly.com/users/horacio-laphitz",
  },
  PROFILE_EXPERIENCE,
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
      name: "LangGraph",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "CrewAI",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Autogen/AG2",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Claude Agent SDK",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Google ADK",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "OpenAI Agents SDK",
      category: SkillCategory.Tools,
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
    {
      name: "Descomposición de tareas",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Enrutamiento supervisor",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Subagentes especializados",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Human-in-the-loop",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "MCP",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "A2A",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Evaluación de agentes",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Observabilidad de agentes",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Gobernanza de agentes",
      category: SkillCategory.Tools,
      level: SkillLevel.Intermediate,
    },
    {
      name: "ETL",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "EDA",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Análisis Multivariante",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Análisis Estadístico",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Limpieza y preparación de datos",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Advanced,
    },
    {
      name: "Estadística descriptiva",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Pruebas de hipótesis e inferencia",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Correlación",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Chi-cuadrado",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Series temporales",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Segmentación y RFM",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Reglas de asociación (Market Basket)",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Aprendizaje supervisado",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Aprendizaje no supervisado",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Regresión",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Clasificación",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Clustering",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Ingeniería de variables",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Selección de variables",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Reducción de dimensionalidad",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "PCA",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Validación y métricas",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Ajuste de hiperparámetros",
      category: SkillCategory.DataAnalysis,
      level: SkillLevel.Intermediate,
    },
    {
      name: "Transfer Learning",
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
  ],
);
