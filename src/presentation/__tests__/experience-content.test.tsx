import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Experience from "../components/sections/Experience";

describe("Experience", () => {
  it("renders all preserved and CV-supported evidence", () => {
    const html = renderToStaticMarkup(<Experience />);
    expect((html.match(/<article/g) ?? [])).toHaveLength(6);
    expect(html).toContain("Experiencia no remunerada");
    expect(html).toContain("Clientes locales");
  });

  it("renders both Ucrop.it periods", () => {
    const html = renderToStaticMarkup(<Experience />);
    expect(html).toContain("dic. 2025 – mar. 2026");
    expect(html).toContain("abr. 2024 – may. 2024");
  });

  it("renders Ferreteria's three details", () => {
    const html = renderToStaticMarkup(<Experience />);
    expect(html).toContain("base de datos MySQL");
    expect(html).toContain("n8n");
    expect(html).toContain("pipelines de datos en Python");
  });

  it("renders every baseline claim", () => {
    const html = renderToStaticMarkup(<Experience />);
    const claims = [
      "Procesamiento y validación de datos georreferenciados",
      "Soporte técnico corporativo para servidores y sistemas",
      "Carga y revisión de datos georreferenciados",
      "Capacitación e implementación del sistema R.I.S.mi",
      "Compras y licitaciones con Tango Gestión y el ERP interno",
    ];
    for (const claim of claims) {
      expect(html).toContain(claim);
    }
  });
});
