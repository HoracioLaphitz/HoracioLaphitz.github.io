import { PROFILE_DATA } from "@data/profile-data";
import type { Skill } from "@domain/entities/profile.entity";

/**
 * Group configuration — defines which skills appear in each display group.
 *
 * CONTRACT: every name in `names[]` MUST exist in PROFILE_DATA.skills.
 * Skills not found are silently skipped. Add new skills to profile-data.ts first,
 * then reference them here. The source of truth is profile-data.ts, not this list.
 */
export const SKILL_GROUPS: { label: string; names: string[] }[] = [
  {
    label: "GenAI e IA",
    names: [
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
    ],
  },
  {
    label: "Análisis de Datos",
    names: [
      "ETL",
      "EDA",
      "Limpieza y preparación de datos",
      "Estadística descriptiva",
      "Análisis estadístico",
      "Pruebas de hipótesis e inferencia",
      "Correlación",
      "Chi-cuadrado",
      "Análisis multivariante",
      "Series temporales",
      "Segmentación y RFM",
      "Reglas de asociación (Market Basket)",
    ],
  },
  {
    label: "Aprendizaje automático",
    names: [
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
    ],
  },
  {
    label: "Frameworks y herramientas",
    names: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Power BI",
      "Excel avanzado",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "CrewAI",
      "Autogen/AG2",
      "Claude Agent SDK",
      "Google ADK",
      "OpenAI Agents SDK",
      "OpenAI API",
      "Scikit-learn",
      "XGBoost",
      "TensorFlow",
      "Streamlit",
    ],
  },
  {
    label: "Programación",
    names: ["Python", "R", "SQL"],
  },
  {
    label: "Bases de datos y nube",
    names: ["PostgreSQL", "MySQL", "BigQuery", "Databricks"],
  },
  {
    label: "Desarrollo y herramientas",
    names: ["Git", "Docker", "Web Scraping", "Testing"],
  },
  {
    label: "Habilidades interpersonales",
    names: [
      "Resolución de problemas",
      "Pensamiento analítico",
      "Comunicación",
      "Trabajo en equipo",
    ],
  },
  {
    label: "Tango Gestión (ERP)",
    names: [
      "Parametrización contable",
      "Gestión de datos maestros",
      "Gestión de stock",
      "Procesos de ventas",
      "Tesorería",
      "Gestión de compras",
    ],
  },
];

export const getVisibleSkillGroups = (skills: readonly Skill[]) => {
  const skillMap = new Map(skills.map((skill) => [skill.name, skill]));

  return SKILL_GROUPS.map(({ label, names }) => ({
    label,
    skills: names
      .map((name) => skillMap.get(name))
      .filter((skill): skill is Skill => skill !== undefined),
  })).filter(({ skills: visibleSkills }) => visibleSkills.length > 0);
};

const Skills = () => {
  const visibleGroups = getVisibleSkillGroups(PROFILE_DATA.skills);

  return (
    <section id="skills" className="bg-skin-primary py-16 md:py-20">
      <div className="mx-auto max-w-content px-6">
        <div className="mb-12">
          <h2
            className="text-display-sm font-bold text-skin-text tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Competencias
          </h2>
        </div>

        <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map(({ label, skills }) => (
            <article
              key={label}
              className="self-start rounded-xl bg-skin-secondary p-6"
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-skin-muted">
                {label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(({ name }) => (
                  <span
                    key={name}
                    className="rounded-full border border-skin-border/40 bg-skin-primary/80 px-3.5 py-1.5 text-xs font-medium text-skin-text transition-colors duration-200 hover:border-skin-border-medium md:text-sm"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
