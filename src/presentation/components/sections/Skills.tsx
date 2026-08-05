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
    label: "Desarrollo Web",
    names: ["Astro", "React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Vite", "Node.js", "GitHub Actions", "CI/CD"],
  },
  {
    label: "Dev & Herramientas",
    names: ["Git", "Docker", "Streamlit", "Web Scraping", "Testing"],
  },
  {
    label: "Seguridad de la Información",
    names: ["ISO 27001", "Gobernanza de Datos", "Privacidad de Datos"],
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
      className="bg-skin-primary py-10 md:py-14"
    >
      <div className="mx-auto max-w-content px-6">
        <div
          className={`mb-8 transition-all duration-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <h2
            className="text-display-sm font-bold text-skin-text tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {SKILL_GROUPS.map((group, gi) => {
            const visible = group.names.filter((name) => skillMap.has(name));

            return (
              <div
                key={group.label}
                className={`transition-all duration-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                style={{ transitionDelay: `${gi * 60}ms` }}
              >
                <h3 className="text-xs font-semibold text-skin-muted uppercase tracking-widest mb-2.5">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {visible.map((name) => (
                    <span
                      key={name}
                      className="px-2.5 py-1 text-xs font-medium text-skin-text bg-skin-secondary border border-skin-border rounded-lg hover:border-skin-border-medium transition-colors duration-200"
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
