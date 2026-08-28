import { useState } from "react";
import { AwardIcon } from "@presentation/components/ui/Icons";
import {
  CERTIFICATIONS,
  CREDLY_BADGES,
  TANGO_BADGES,
  type Certification,
} from "@data/certifications";
import CertificateModal from "./CertificateModal";

const byDateDesc = (a: Certification, b: Certification) =>
  b.sortDate.getTime() - a.sortDate.getTime();

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [showAll, setShowAll] = useState(false);

  const highlighted = CERTIFICATIONS.filter((c) => c.highlight).sort(byDateDesc);
  const rest = CERTIFICATIONS.filter((c) => !c.highlight).sort(byDateDesc);

  const renderCert = (cert: Certification) => {
    const inner = (
      <>
        <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
          {cert.company}
        </span>
        <span className="block text-sm font-medium text-skin-text tracking-tight">
          {cert.title}
        </span>
        <span className="mt-1 block font-mono text-xs text-skin-muted">
          {cert.period}
        </span>
      </>
    );
    const base =
      "focus-ring min-h-11 rounded-xl bg-skin-secondary p-5 text-left transition-colors duration-200 hover:bg-skin-tertiary";
    const key = `${cert.title}-${cert.period}`;

    return cert.certificateUrl ? (
      <button
        key={key}
        onClick={() => setSelectedCert(cert)}
        className={`${base} hover:shadow-xs`}
      >
        {inner}
      </button>
    ) : (
      <div key={key} className={base}>
        {inner}
      </div>
    );
  };

  return (
    <section
      id="certifications"
      className="bg-skin-primary py-16 md:py-24"
    >
      <div
        className="mx-auto max-w-content px-6"
      >
        <div className="mb-12">
          <h2
            className="text-display-sm font-bold text-skin-text tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Certificaciones
          </h2>
        </div>

        {/* Insignias verificables — arriba */}
        <div className="mb-12">
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-skin-muted">
            Insignias verificables
          </h3>
          <div className="flex flex-wrap items-start gap-3">
            {CREDLY_BADGES.map((badge) => (
              <a
                key={badge.id}
                href={badge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-skin-border/50 bg-skin-secondary/70 px-4 py-2 text-xs md:text-sm font-medium text-skin-text transition-all duration-200 hover:border-skin-border-medium hover:bg-skin-secondary"
              >
                <AwardIcon className="h-4 w-4 text-skin-muted" />
                {badge.label}
              </a>
            ))}

            {TANGO_BADGES.map((badge) => (
              <div key={badge.image} className="flex flex-col items-center gap-2">
                <img
                  src={badge.image}
                  alt={badge.label}
                  loading="lazy"
                  className="h-20 w-auto object-contain"
                />
                <span className="text-xs text-skin-muted">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Destacadas — flagship para reclutadores */}
        <div>
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-skin-muted">
            Destacadas
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlighted.map(renderCert)}
          </div>
        </div>

        {/* Resto — formación complementaria, colapsable */}
        {rest.length > 0 && (
          <div className="mt-10">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="text-sm font-semibold text-brand-primary transition-colors duration-200 hover:opacity-80"
            >
              {showAll
                ? "Ocultar formación complementaria"
                : `Ver formación complementaria (${rest.length})`}
            </button>

            {showAll && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map(renderCert)}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedCert?.certificateUrl && (
        <CertificateModal
          title={selectedCert.title}
          url={selectedCert.certificateUrl}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
};

export default Certifications;
