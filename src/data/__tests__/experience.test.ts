import { describe, expect, it } from "vitest";
import { EXPERIENCE_ITEMS } from "../experience";
import { PROFILE_DATA } from "../profile-data";

describe("employment evidence", () => {
  it("preserves five entries and adds one unpaid project", () => {
    expect(EXPERIENCE_ITEMS).toHaveLength(6);
    expect(EXPERIENCE_ITEMS.filter(({ company }) => company === "Ucrop.it"))
      .toHaveLength(2);
    expect(EXPERIENCE_ITEMS.find(({ id }) => id === "ferreteria-centenario-2020"))
      .toMatchObject({ kind: "unpaid-project", period: "Ene 2020 – Dic 2020" });
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
    { source: "experience", period: "Dic 2025 – Mar 2026", role: "Data Entry Specialist", company: "Ucrop.it", location: "Remoto", description: "Procesamiento y validación de datos georreferenciados" },
    { source: "experience", period: "Ene 2021 – Nov 2025", role: "Help Desk", company: "PcService Posadas", location: "Posadas", description: "Soporte técnico corporativo para servidores y sistemas" },
    { source: "experience", period: "Abr 2024 – May 2024", role: "Data Entry", company: "Ucrop.it", location: "Remoto", description: "Carga y revisión de datos georreferenciados" },
    { source: "experience", period: "Ene 2020 – Dic 2020", role: "Support Profesional Informatics Ad Honorem", company: "Multiple Local Clients", location: "Posadas, Misiones", description: "Base de datos MySQL, flujos en n8n y pipelines de datos en Python" },
    { source: "experience", period: "Jul 2019 – Dic 2019", role: "Tech Lead", company: "Hospital Escuela Dr. Ramón Madariaga", location: "Posadas", description: "Capacitación e implementación del sistema R.I.S.mi" },
    { source: "experience", period: "Mar 2019 – Jun 2019", role: "Administrative Assistant", company: "Ministerio de Salud Pública de Misiones", location: "Posadas", description: "Compras y licitaciones con Tango Gestión y el ERP interno" },
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
