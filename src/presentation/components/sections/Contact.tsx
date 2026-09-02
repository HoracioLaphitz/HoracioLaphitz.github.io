import {
  MailIcon,
  LinkedinIcon,
  GithubIcon,
  ArrowRightIcon,
} from "@presentation/components/ui/Icons";
import { AvailabilityBadge } from "@presentation/components/ui/AvailabilityBadge";
import { PROFILE_DATA } from "@data/profile-data";
import { PUBLIC_POSITIONING } from "@data/public-positioning.v1";

const Contact = () => {
  return (
    <section
      id="contacto"
      className="bg-skin-primary py-16 md:py-24 border-t border-skin-border/40"
    >
      <div
        className="mx-auto max-w-content px-6"
      >
        <div>
          <div className="max-w-3xl">
            <div className="mb-6">
              <AvailabilityBadge variant="full" />
            </div>
            <h2
              className="text-display-sm font-bold text-skin-text tracking-tight mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Hablemos de tu proyecto
            </h2>
            <p className="text-lg md:text-xl text-skin-muted leading-relaxed mb-3 tracking-tight font-normal">
              <span className="font-semibold text-skin-text">Automatización de procesos</span> |{" "}
              <span className="font-semibold text-skin-text">Dashboards</span> |{" "}
              <span className="font-semibold text-skin-text">
                Análisis de datos
              </span>
              .
            </p>
            <p className="text-base text-skin-muted leading-relaxed mb-8 font-normal">
              ¿Necesitás ordenar datos o automatizar una tarea repetitiva?
              Escribime.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${PUBLIC_POSITIONING.contact.email}`}
              className="focus-ring inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-white bg-brand-primary hover:opacity-90 rounded-full transition-all duration-200 shadow-sm hover:shadow"
            >
              <MailIcon className="w-4 h-4" />
              Enviar correo
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href={PUBLIC_POSITIONING.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-skin-text bg-skin-secondary/70 border border-skin-border/50 rounded-full hover:bg-skin-secondary hover:border-skin-border-medium transition-all duration-200"
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-skin-text bg-skin-secondary/70 border border-skin-border/50 rounded-full hover:bg-skin-secondary hover:border-skin-border-medium transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
