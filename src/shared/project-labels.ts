const CATEGORY_LABELS: Readonly<Record<string, string>> = {
  "Machine Learning": "Aprendizaje automático",
  "Business Intelligence": "Inteligencia de negocios",
  "Data Visualization": "Visualización de datos",
  "Notebooks Analytics": "Cuadernos de análisis",
  "Data Science": "Ciencia de datos",
};

const MATURITY_LABELS: Readonly<Record<string, string>> = {
  "Delivered work": "Trabajo entregado",
  "Portfolio project": "Proyecto de portfolio",
  "Functional prototype": "Prototipo funcional",
  "Reference architecture": "Arquitectura de referencia",
  "In development": "En desarrollo",
  "Currently deepening expertise in": "Profundización en curso",
};

export const getProjectCategoryLabel = (category: string): string =>
  CATEGORY_LABELS[category] ?? category;

export const getProjectMaturityLabel = (maturity?: string): string | undefined =>
  maturity ? (MATURITY_LABELS[maturity] ?? maturity) : undefined;
