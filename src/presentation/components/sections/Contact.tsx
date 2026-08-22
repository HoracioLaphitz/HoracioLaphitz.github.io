import { useScrollAnimation } from "@presentation/hooks/useScrollAnimation";
import {
  MailIcon,
  LinkedinIcon,
  GithubIcon,
} from "@presentation/components/ui/Icons";
import { AvailabilityBadge } from "@presentation/components/ui/AvailabilityBadge";
import { PROFILE_DATA } from "@data/profile-data";

const Contact = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      id="contacto"
      className="bg-skin-primary py-16 md:py-24 border-t border-skin-border/40"
    >
      <div className="mx-auto max-w-content px-6">
        <div
          className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="max-w-3xl">
            <div className="mb-6">
              <AvailabilityBadge variant="full" />
            </div>
            <h2
              className="text-display-sm font-bold text-skin-text tracking-tight mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Trabajemos juntos
            </h2>
            <p className="text-lg md:text-xl text-skin-muted leading-relaxed mb-3 tracking-tight font-normal">
              <span className="font-semibold text-skin-text">Desarrollo</span> |{" "}
              <span className="font-semibold text-skin-text">Dashboards</span> |{" "}
              <span className="font-semibold text-skin-text">
                Análisis de datos
              </span>
              .
            </p>
            <p className="text-base text-skin-muted leading-relaxed mb-8 font-normal">
              Proyecto, reporte o necesitas automatizar algún proceso?
              escribime.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:horaciolaphitz99@gmail.com"
              className="focus-ring inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-white bg-brand-primary hover:opacity-90 rounded-full transition-all duration-200 shadow-sm hover:shadow"
            >
              <MailIcon className="w-4 h-4" />
              Enviar correo ›
            </a>
            <a
              href="https://www.linkedin.com/in/horacio-laphitz/"
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
