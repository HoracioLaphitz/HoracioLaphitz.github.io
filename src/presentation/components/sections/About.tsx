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
    status: "Aplicado",
    title: "Flujos con agentes",
    description:
      "Diseño y orquestación de flujos con agentes para integrar automatización, validación y ejecución controlada de procesos.",
    Icon: RobotIcon,
  },
  {
    status: "Aplicado",
    title: "Evaluación de resultados",
    description:
      "Comparo respuestas y registro errores en pruebas con agentes. Esto me permite identificar limitaciones, mejorar la calidad de las respuestas y optimizar la interacción con los modelos.",
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
          Datos y agentes
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-skin-muted md:text-base">
          <p>
            Trabajo con Python y SQL para preparar información, validar datos,
            automatizar procesos y acompañar el trabajo diario, además de
            construir tableros en Power BI. Actualmente exploro modelos
            multimodales, RAG y agentes aplicados al desarrollo de código y a la
            automatización de flujos.
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
