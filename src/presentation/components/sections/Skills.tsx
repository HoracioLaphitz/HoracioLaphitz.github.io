import { useScrollAnimation } from "@presentation/hooks/useScrollAnimation";
import { PROFILE_DATA } from "@data/profile-data";
import type { Skill } from "@domain/entities/profile.entity";

/**
 * Group configuration — defines which skills appear in each display group.
 *
 * CONTRACT: every name in `names[]` MUST exist in PROFILE_DATA.skills.
 * Skills not found are silently skipped. Add new skills to profile-data.ts first,
 * then reference them here. The source of truth is profile-data.ts, not this list.
 */
const SKILL_GROUPS: { label: string; names: string[] }[] = [
  {
    label: "GenAI & IA",
    names: ["LangChain", "LlamaIndex", "RAG", "Vector Databases", "OpenAI API", "Prompt Engineering"],
  },
  {
    label: "Análisis de Datos",
    names: ["Pandas", "NumPy", "Scikit-learn", "XGBoost", "Deep Learning", "Computer Vision", "Market Basket Analysis", "Matplotlib", "Power BI", "Excel Avanzado"],
  },
  {
    label: "Programación",
    names: ["Python", "R", "TensorFlow"],
  },
  {
    label: "Bases de Datos & Cloud",
    names: ["SQL", "PostgreSQL", "MySQL", "BigQuery", "Databricks"],
  },
  {
    label: "Dev & Herramientas",
    names: ["Git", "Docker", "Streamlit", "Web Scraping", "Testing"],
  },
  {
    label: "Soft Skills",
    names: ["Resolución de Problemas", "Pensamiento Analítico", "Comunicación", "Trabajo en Equipo"],
  },
  {
    label: "Tango Gestión (ERP)",
    names: ["Parametrización Contable", "Gestión de Datos Maestros", "Gestión de Stock", "Procesos de Ventas", "Tesorería", "Gestión de Compras"],
  },
];

const Skills = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const skillMap = new Map<string, Skill>(
    PROFILE_DATA.skills.map((s) => [s.name, s])
  );

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      id="skills"
      className="bg-skin-primary py-16 md:py-20"
    >
      <div className="mx-auto max-w-content px-6">
        <div
          className={`mb-12 transition-all duration-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <h2
            className="text-display-sm font-bold text-skin-text tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, gi) => {
            const visible = group.names.filter((name) => skillMap.has(name));

            return (
              <div
                key={group.label}
                className={`bg-skin-secondary/70 border border-skin-border/50 rounded-2xl md:rounded-3xl p-6 transition-all duration-300 hover:border-skin-border-medium hover:shadow-xs ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${gi * 60}ms` }}
              >
                <h3 className="text-xs font-semibold text-skin-muted uppercase tracking-[0.15em] mb-4">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {visible.map((name) => (
                    <span
                      key={name}
                      className="px-3.5 py-1.5 text-xs md:text-sm font-medium text-skin-text bg-skin-primary/80 border border-skin-border/40 rounded-full hover:border-skin-border-medium transition-all duration-200"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
