import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon } from "../ui/Icons";
import { AvailabilityBadge } from "../ui/AvailabilityBadge";
import { PUBLIC_POSITIONING } from "@data/public-positioning.v1";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-skin-secondary/80 border-t border-skin-border/40 text-xs">
      <div className="container mx-auto max-w-content px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-skin-text tracking-tight">
              {PUBLIC_POSITIONING.identity.name}
            </h3>
            <p className="text-xs font-medium text-skin-muted">
              {PUBLIC_POSITIONING.positioning.focus}
            </p>

            <a
              href="/CV_HoracioLaphitz.pdf"
              download
              className="focus-ring inline-flex items-center gap-1.5 text-xs font-medium text-brand-primary hover:opacity-80 transition-opacity"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              Descargar CV
            </a>
            <div className="pt-1">
              <AvailabilityBadge variant="compact" />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={PUBLIC_POSITIONING.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center h-8 w-8 rounded-full text-skin-muted hover:text-skin-text hover:bg-skin-primary/80 border border-skin-border/30 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon width="16" height="16" />
              </a>
              <a
                href={PUBLIC_POSITIONING.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center h-8 w-8 rounded-full text-skin-muted hover:text-skin-text hover:bg-skin-primary/80 border border-skin-border/30 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon width="16" height="16" />
              </a>
              <a
                href={`mailto:${PUBLIC_POSITIONING.contact.email}`}
                className="focus-ring inline-flex items-center justify-center h-8 w-8 rounded-full text-skin-muted hover:text-skin-text hover:bg-skin-primary/80 border border-skin-border/30 transition-all"
                aria-label="Email"
              >
                <MailIcon width="16" height="16" />
              </a>
            </div>
          </div>

          {/* Explorar */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-skin-text">
              Explorar
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                href="/#inicio"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                Inicio
              </a>
              <a
                href="/#about"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                Sobre mí
              </a>
              <a
                href="/#proyectos"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                Proyectos
              </a>
              <a
                href="/#skills"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                Stack
              </a>
              <a
                href="/#experience"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                Experiencia
              </a>
              <a
                href="/#certifications"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                Certificaciones
              </a>
              <a
                href="/#contacto"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                Contacto
              </a>
            </nav>
          </div>

          {/* Contacto */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-skin-text">
              Contacto
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:horaciolaphitz99@gmail.com"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                horaciolaphitz99@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/horacio-laphitz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/horaciolaphitz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-skin-muted hover:text-skin-text transition-colors"
              >
                GitHub
              </a>
              <p className="text-xs text-skin-muted pt-1">
                Posadas, Misiones | Remoto
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-skin-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-skin-muted">
          <p className="text-center sm:text-left">
            {`© ${currentYear} Horacio Laphitz`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
