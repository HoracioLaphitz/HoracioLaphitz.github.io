import { describe, expect, it } from "vitest";
import { EXPERIENCE_ITEMS } from "../experience";
import { PROFILE_DATA } from "../profile-data";

describe("employment evidence", () => {
  it("preserves five entries and adds one unpaid project", () => {
    expect(EXPERIENCE_ITEMS).toHaveLength(6);
    expect(EXPERIENCE_ITEMS.filter(({ company }) => company === "Ucrop.it"))
      .toHaveLength(2);
    expect(EXPERIENCE_ITEMS.find(({ id }) => id === "ferreteria-centenario-2020"))
      .toMatchObject({ kind: "unpaid-project", period: "ene. 2020 – dic. 2020" });
  });

  it("keeps the profile projection synchronized", () => {
    expect(PROFILE_DATA.experience.map(({ company, period }) => ({ company, period })))
      .toEqual(EXPERIENCE_ITEMS.map(({ company, period }) => ({ company, period })));
  });

  it("orders engagements newest first", () => {
    const times = EXPERIENCE_ITEMS.map(({ sortDate }) => sortDate.getTime());
    expect(times).toEqual([...times].sort((a, b) => b - a));
  });
});

describe("preserved evidence", () => {
  const BASELINE_CLAIMS = [
    { source: "experience", period: "dic. 2025 – mar. 2026", role: "Data Entry Specialist", company: "Ucrop.it", location: "Remoto", description: "Procesamiento y validación de datos georreferenciados" },
    { source: "experience", period: "ene. 2021 – nov. 2025", role: "Help Desk", company: "PcService Posadas", location: "Posadas", description: "Soporte técnico corporativo para servidores y sistemas" },
    { source: "experience", period: "abr. 2024 – may. 2024", role: "Data Entry", company: "Ucrop.it", location: "Remoto", description: "Carga y revisión de datos georreferenciados" },
    { source: "experience", period: "ene. 2020 – dic. 2020", role: "Profesional de soporte informático ad honorem", company: "Clientes locales", location: "Posadas, Misiones", description: "Base de datos MySQL, flujos en n8n y pipelines de datos en Python" },
    { source: "experience", period: "jul. 2019 – dic. 2019", role: "Tech Lead", company: "Hospital Escuela Dr. Ramón Madariaga", location: "Posadas", description: "Capacitación e implementación del sistema R.I.S.mi" },
    { source: "experience", period: "mar. 2019 – jun. 2019", role: "Administrative Assistant", company: "Ministerio de Salud Pública de Misiones", location: "Posadas", description: "Compras y licitaciones con Tango Gestión y el ERP interno" },
  ] as const;

  for (const claim of BASELINE_CLAIMS) {
    it(`preserves ${claim.company} (${claim.period}) from ${claim.source}`, () => {
      const item = EXPERIENCE_ITEMS.find(
        ({ company, period }) => company === claim.company && period === claim.period,
      );
      expect(item).toBeDefined();
      const preservedText = JSON.stringify(item);
      for (const field of ["period", "role", "company", "location", "description"] as const) {
        expect(preservedText).toContain(claim[field]);
      }
    });
  }
});
