import { useRef } from "react";
import { ENTERPRISE_AI_EVIDENCE } from "@data/enterprise-ai-evidence.v1";
import { PUBLIC_POSITIONING } from "@data/public-positioning.v1";
import { useScopedMotion } from "@presentation/hooks/useScopedMotion";
import {
  ArrowRightIcon,
  ChartBarIcon,
  DatabaseIcon,
  DownloadIcon,
  RobotIcon,
} from "@presentation/components/ui/Icons";

const HERO_MOTION_TARGETS = [
  '[data-motion="hero-eyebrow"]',
  '[data-motion="hero-heading"]',
  '[data-motion="hero-summary"]',
  '[data-motion="hero-actions"]',
] as const;

const capabilities = [
  {
    title: "Análisis de datos",
    description:
      "Python, SQL, modelado y visualización para convertir datos en decisiones.",
    Icon: ChartBarIcon,
  },
  {
    title: "Automatización e integración",
    description:
      "Validaciones, pipelines y procesos que reducen trabajo manual.",
    Icon: DatabaseIcon,
  },
  {
    title: "Exploración de agentes y subagentes en infraestructura privada",
    description:
      "Estoy profundizando en despliegues privados orientados a mantener los datos bajo control del usuario.",
    Icon: RobotIcon,
  },
] as const;

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  useScopedMotion({ root, targetSelectors: HERO_MOTION_TARGETS });

  return (
    <section
      ref={root}
      id="inicio"
      className="border-b border-skin-border bg-skin-primary"
    >
      <div className="mx-auto max-w-content px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:pt-24">
        <div className="max-w-4xl">
          <p
            data-motion="hero-eyebrow"
            className="mb-5 max-w-2xl text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary sm:text-sm"
          >
            Datos · Automatización de procesos · Machine Learning
          </p>

          <h1
            data-motion="hero-heading"
            className="max-w-3xl font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-skin-text"
          >
            {PUBLIC_POSITIONING.identity.name}
          </h1>

          <p className="mt-6 max-w-3xl font-display text-xl font-medium leading-snug tracking-[-0.02em] text-skin-text-secondary sm:text-2xl">
            Analista de datos orientado a la automatización de procesos.
          </p>

          <div className="mt-8 grid gap-8 border-t border-skin-border pt-7 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <p
              data-motion="hero-summary"
              className="max-w-[68ch] text-base leading-relaxed text-skin-text-secondary sm:text-lg"
            >
              Convierto datos en decisiones. Integro fuentes, automatizo
              validaciones y desarrollo soluciones que ayudan a decidir con
              menos trabajo manual.
            </p>

            <div
              data-motion="hero-actions"
              className="grid content-start gap-2"
            >
              <a
                href="#proyectos"
                className="focus-ring inline-flex min-h-11 items-center justify-between rounded-xl bg-brand-primary px-5 text-sm font-semibold text-white hover:bg-brand-hover"
              >
                Ver proyectos
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${PUBLIC_POSITIONING.contact.email}`}
                className="focus-ring inline-flex min-h-11 items-center justify-between rounded-xl border border-skin-border-medium px-5 text-sm font-semibold text-skin-text hover:bg-skin-secondary"
              >
                Contacto
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="/CV_HoracioLaphitz.pdf"
                download
                className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-brand-primary hover:bg-skin-secondary"
              >
                Descargar CV
                <DownloadIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid border-y border-skin-border sm:grid-cols-3">
          {capabilities.map(({ title, description, Icon }, index) => (
            <article
              key={title}
              className={`grid grid-cols-[2.25rem_1fr] gap-3 py-5 sm:px-5 ${index > 0 ? "border-t border-skin-border sm:border-l sm:border-t-0" : ""}`}
            >
              <Icon className="h-6 w-6 text-brand-primary" />
              <div>
                <h2 className="text-sm font-semibold text-skin-text">
                  {title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-skin-muted">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <details className="mt-6 rounded-xl bg-skin-secondary p-4 text-sm">
          <summary className="focus-ring cursor-pointer rounded-lg font-semibold text-skin-text">
            Capacidades de Enterprise AI
          </summary>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ENTERPRISE_AI_EVIDENCE.map((capability) => (
              <article
                key={capability.claimId}
                data-claim-id={capability.claimId}
                className="rounded-xl bg-skin-primary p-4"
              >
                <h2 className="text-sm font-semibold text-skin-text">
                  {capability.scope}
                </h2>
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
};

export default Hero;
