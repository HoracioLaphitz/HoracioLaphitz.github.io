import { EXPERIENCE_ITEMS } from "@data/experience";

const Experience = () => {
  const items = [...EXPERIENCE_ITEMS].sort(
    (a, b) => b.sortDate.getTime() - a.sortDate.getTime()
  );

  return (
    <section
      id="experience"
      className="bg-skin-secondary/50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-content px-6">
        <div className="mb-12">
          <h2
            className="text-display-sm font-bold text-skin-text tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Experiencia
          </h2>
        </div>

        <div className="border-t border-skin-border/40">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-3 border-b border-skin-border/40 py-8 md:grid-cols-[180px_1fr] md:gap-8"
              itemScope
              itemType="https://schema.org/OrganizationRole"
            >
              <span className="font-mono text-xs text-skin-muted tracking-tight md:pt-1">
                {item.period}
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-skin-text tracking-tight">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-skin-muted">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ""}
                  {item.kind === "unpaid-project" ? " · Experiencia no remunerada" : ""}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-skin-text font-normal">
                  {item.description}
                </p>
                {item.details.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm leading-relaxed text-skin-text-secondary list-disc pl-5">
                    {item.details.map((detail, i) => (
                      <li key={i}>{detail.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
