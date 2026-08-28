import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PROFILE_DATA } from "@data/profile-data";
import Skills, {
  SKILL_GROUPS,
  getVisibleSkillGroups,
} from "@presentation/components/sections/Skills";

const dataAnalysisTechniques = [
  "ETL",
  "EDA",
  "Limpieza y preparación de datos",
  "Estadística descriptiva",
  "Análisis Estadístico",
  "Pruebas de hipótesis e inferencia",
  "Correlación",
  "Chi-cuadrado",
  "Análisis Multivariante",
  "Series temporales",
  "Segmentación y RFM",
  "Reglas de asociación (Market Basket)",
];

const genAiTechniques = [
  "RAG",
  "Descomposición de tareas",
  "Enrutamiento supervisor",
  "Subagentes especializados",
  "Human-in-the-loop",
  "MCP",
  "A2A",
  "Evaluación de agentes",
  "Observabilidad de agentes",
  "Gobernanza de agentes",
];

const machineLearningTechniques = [
  "Aprendizaje supervisado",
  "Aprendizaje no supervisado",
  "Regresión",
  "Clasificación",
  "Clustering",
  "Ingeniería de variables",
  "Selección de variables",
  "Reducción de dimensionalidad",
  "PCA",
  "Validación y métricas",
  "Ajuste de hiperparámetros",
  "Deep Learning",
  "Computer Vision",
  "Transfer Learning",
];

describe("skills presentation", () => {
  it("keeps the display configuration backed by profile data and free of duplicates", () => {
    const configuredNames = SKILL_GROUPS.flatMap(({ names }) => names);
    const profileNames = new Set(PROFILE_DATA.skills.map(({ name }) => name));

    expect(configuredNames.filter((name) => !profileNames.has(name))).toEqual([]);
    expect(configuredNames).toHaveLength(new Set(configuredNames).size);
  });

  it("exposes the approved data-analysis and machine-learning techniques", () => {
    const groups = getVisibleSkillGroups(PROFILE_DATA.skills);
    const dataAnalysis = groups.find(
      ({ label }) => label === "Análisis de Datos",
    );
    const genAi = groups.find(({ label }) => label === "GenAI & IA");
    const machineLearning = groups.find(
      ({ label }) => label === "Machine Learning",
    );

    expect(dataAnalysis?.skills.map(({ name }) => name)).toEqual(
      dataAnalysisTechniques,
    );
    expect(genAi?.skills.map(({ name }) => name)).toEqual(genAiTechniques);
    expect(machineLearning?.skills.map(({ name }) => name)).toEqual(
      machineLearningTechniques,
    );
    expect(machineLearning?.skills.map(({ name }) => name)).not.toContain(
      "Aprendizaje por refuerzo",
    );
  });

  it("renders only non-empty groups in an intrinsically aligned grid", () => {
    const groups = getVisibleSkillGroups(PROFILE_DATA.skills);
    const html = renderToStaticMarkup(<Skills />);

    expect(groups.every(({ skills }) => skills.length > 0)).toBe(true);
    expect(html).toContain("items-start");
    expect(html).not.toContain("Aprendizaje por refuerzo");
  });
});
