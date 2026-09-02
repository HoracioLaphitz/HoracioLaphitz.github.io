import {
  ChartBarIcon,
  CheckCircleIcon,
  RobotIcon,
} from "@presentation/components/ui/Icons";

const areas = [
  {
    status: "Aplicado",
    title: "Datos y automatización",
    description:
      "Experiencia práctica en validación, preparación y análisis de datos, con automatizaciones orientadas a reducir tareas repetitivas y mejorar la calidad de la información.",
    Icon: ChartBarIcon,
  },
  {
    status: "En estudio",
    title: "Flujos con agentes",
    description:
      "Estoy armando ejemplos propios donde un agente reparte tareas y una persona revisa el resultado. Todavía no los implementé en una empresa.",
    Icon: RobotIcon,
  },
  {
    status: "En estudio",
    title: "Evaluación de resultados",
    description:
      "Estoy aprendiendo a comparar respuestas y registrar errores en pruebas con agentes. Es una práctica personal que todavía no llevé a producción.",
    Icon: CheckCircleIcon,
  },
] as const;

const About = () => (
  <section
    id="about"
    aria-labelledby="about-title"
    className="scroll-mt-20 border-y border-skin-border/40 bg-skin-secondary/60 py-16 md:py-20"
  >
    <div className="mx-auto grid max-w-content gap-12 px-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">
          Sobre mí
        </p>
        <h2
          id="about-title"
          className="max-w-xl text-display-sm font-bold tracking-tight text-skin-text"
          style={{ letterSpacing: "-0.02em" }}
        >
          Trabajo con datos y automatización. La IA es una línea de estudio.
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-skin-muted md:text-base">
          <p>
            Soy analista de datos. Trabajo con Python y SQL para preparar
            información y automatizar validaciones. También construyo
            dashboards en Power BI.
          </p>
          <p>
            Ahora estoy explorando RAG y flujos con agentes en proyectos
            propios. Pruebo cómo evaluarlos y en qué puntos hace falta revisión
            humana.
          </p>
        </div>
      </div>

      <ol className="border-l border-brand-primary/40">
        {areas.map(({ status, title, description, Icon }) => (
          <li
            key={title}
            className="relative border-b border-skin-border/50 py-6 pl-7 last:border-b-0 md:pl-9"
          >
            <span
              aria-hidden="true"
              className="absolute -left-4 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary/40 bg-skin-primary text-brand-primary"
            >
              <Icon className="h-4 w-4" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary">
              {status}
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-skin-text">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-skin-muted">
              {description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default About;
