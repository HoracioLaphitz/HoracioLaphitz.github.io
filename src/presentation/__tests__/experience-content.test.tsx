import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Experience from "../components/sections/Experience";

describe("Experience", () => {
  it("renders all preserved and CV-supported evidence", () => {
    const html = renderToStaticMarkup(<Experience />);
    expect((html.match(/<article/g) ?? [])).toHaveLength(6);
    expect(html).toContain("Experiencia no remunerada");
    expect(html).toContain("Ferretería Centenario Posadas");
    expect(html).toContain("tasa de error menor al 5%");
  });

  it("renders both Ucrop.it periods", () => {
    const html = renderToStaticMarkup(<Experience />);
    expect(html).toContain("Dic 2025 – Mar 2026");
    expect(html).toContain("Abr 2024 – May 2024");
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
      "Mantenimiento de hardware y servidores, optimización de sistemas",
      "Entrada precisa y eficiente de datos georreferenciados",
      "Coordinación de capacitación e implementación de sistema R.I.S.mi",
      "Gestión de compras, licitaciones y ERP",
      "Validación de registros georreferenciados de Molinos SA, Heineken y COFCO",
    ];
    for (const claim of claims) {
      expect(html).toContain(claim);
    }
  });
});
