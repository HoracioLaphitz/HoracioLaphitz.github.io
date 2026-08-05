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
      className="min-h-screen flex items-center justify-center relative pt-14"
    >
      <div
        className={`mx-auto max-w-prose-narrow w-full px-6 py-20 text-center transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-sm font-semibold text-brand-primary uppercase tracking-widest mb-6">
          Data Analytics · Business Intelligence · Machine Learning · GenAI
        </p>

        <h1
          className="text-display font-bold text-skin-text mb-6 tracking-tight"
          style={{
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          {PROFILE_DATA.name}
        </h1>

        <p className="text-lg text-skin-muted max-w-xl mx-auto leading-relaxed mb-10">
          Analista de Datos · ISO 27001
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="#proyectos"
            className="focus-ring px-6 py-3 text-sm font-semibold text-white bg-brand-primary rounded-lg transition-all duration-200 hover:opacity-90"
          >
            Ver proyectos
          </a>
          <a
            href={`mailto:${PROFILE_DATA.contact.email}`}
            className="focus-ring px-6 py-3 text-sm font-semibold text-skin-text border border-skin-border rounded-lg transition-colors duration-200 hover:border-brand-primary hover:text-brand-primary"
          >
            Contacto
          </a>
          <a
            href="/CV_HoracioLaphitz.pdf"
            download
            className="focus-ring text-sm font-semibold text-skin-text hover:text-brand-primary transition-colors duration-200"
          >
            Descargar CV ↓
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
