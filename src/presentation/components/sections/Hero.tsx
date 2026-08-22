import { useState, useEffect } from "react";
import { PROFILE_DATA } from "@data/profile-data";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="inicio"
      className="min-h-[85vh] flex items-center justify-center relative pt-16 pb-12"
    >
      <div
        className={`mx-auto max-w-content w-full px-6 py-16 text-center transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-xs md:text-sm font-medium text-brand-primary uppercase tracking-[0.2em] mb-4">
          Data Analytics · Hardware Expertise · Sotware Development
        </p>

        <h1
          className="text-display font-bold text-skin-text mb-6 tracking-tight"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
          }}
        >
          {PROFILE_DATA.name}
        </h1>

        <p className="text-lg md:text-xl text-skin-muted max-w-2xl mx-auto font-normal leading-relaxed mb-10 tracking-tight">
          Analista de Datos con experincia en hardware, orientado a soluciones
          analíticas basadas en datos.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#proyectos"
            className="focus-ring px-6 py-3 text-sm font-medium text-white bg-brand-primary rounded-full transition-all duration-200 hover:opacity-90 shadow-sm hover:shadow"
          >
            Ver proyectos ›
          </a>
          <a
            href={`mailto:${PROFILE_DATA.contact.email}`}
            className="focus-ring px-6 py-3 text-sm font-medium text-skin-text border border-skin-border rounded-full transition-colors duration-200 hover:bg-skin-secondary hover:border-skin-border-medium"
          >
            Contacto ›
          </a>
          <a
            href="/CV_HoracioLaphitz.pdf"
            download
            className="focus-ring px-5 py-3 text-sm font-medium text-skin-muted hover:text-skin-text transition-colors duration-200"
          >
            CV ↓
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
