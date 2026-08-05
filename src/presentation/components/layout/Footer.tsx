import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon } from "../ui/Icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-skin-secondary border-t border-skin-border">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Nombre */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-skin-text mb-1">
              Horacio Laphitz
            </h3>
            <a
              href="/CV_HoracioLaphitz.pdf"
              download
              className="focus-ring inline-flex items-center gap-1.5 text-sm text-brand-primary hover:text-brand-primary/80 transition-colors duration-200"
            >
              <DownloadIcon className="w-4 h-4" />
              Descargar CV
            </a>
          </div>

          {/* Redes Sociales */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/horacio-laphitz/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-skin-muted hover:text-skin-accent transition-all duration-200 hover-scale"
              aria-label="LinkedIn"
            >
              <LinkedinIcon width="24" height="24" />
            </a>
            <a
              href="https://github.com/horaciolaphitz"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-skin-muted hover:text-skin-accent transition-all duration-200 hover-scale"
              aria-label="GitHub"
            >
              <GithubIcon width="24" height="24" />
            </a>
            <a
              href="mailto:horaciolaphitz99@gmail.com"
              className="focus-ring text-skin-muted hover:text-skin-accent transition-all duration-200 hover-scale"
              aria-label="Email"
            >
              <MailIcon width="24" height="24" />
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-skin-border/50 w-full">
            <p className="text-sm text-skin-muted text-center">
              © {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
