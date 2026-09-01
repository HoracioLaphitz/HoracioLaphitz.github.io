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

const BASELINE_CLAIMS = [
  { source: "experience", period: "Dic 2025 – Mar 2026", role: "Data Entry Specialist", company: "Ucrop.it", location: "Remoto", description: "Procesamiento y validación de datos georreferenciados" },
  { source: "experience", period: "Ene 2021 – Nov 2025", role: "Help Desk", company: "PcService Posadas", location: "Posadas", description: "Mantenimiento de hardware y servidores, optimización de sistemas" },
  { source: "experience", period: "Abr 2024 – May 2024", role: "Data Entry", company: "Ucrop.it", location: "Remoto", description: "Entrada precisa y eficiente de datos georreferenciados" },
  { source: "experience", period: "Jul 2019 – Dic 2019", role: "Capacitador Help Desk", company: "Hospital Escuela Dr. Ramón Madariaga", location: "Posadas", description: "Coordinación de capacitación e implementación de sistema R.I.S.mi" },
  { source: "experience", period: "Mar 2019 – Jun 2019", role: "Asistente Administrativo Contable", company: "Ministerio de Salud Pública de Misiones", location: "Posadas", description: "Gestión de compras, licitaciones y ERP" },
  { source: "profile", period: "Dic 2025 – Mar 2026", role: "Data Entry Specialist", company: "Ucrop.it", location: "Remoto", description: "Validación de registros georreferenciados de Molinos SA, Heineken y COFCO con tasa de error menor al 5%; automaticé la validación para su carga en bases de datos SQL" },
  { source: "profile", period: "Ene 2021 – Nov 2025", role: "Help Desk", company: "PcService Posadas", location: "Posadas", description: "Mantenimiento de hardware y servidores, optimización de sistemas" },
  { source: "profile", period: "Abr 2024 – May 2024", role: "Data Entry", company: "Ucrop.it", location: "Remoto", description: "Entrada precisa y eficiente de datos georreferenciados" },
  { source: "profile", period: "Jul 2019 – Dic 2019", role: "Capacitador Help Desk", company: "Hospital Escuela Dr. Ramón Madariaga", location: "Posadas", description: "Coordinación de capacitación e implementación de sistema R.I.S.mi" },
  { source: "profile", period: "Mar 2019 – Jun 2019", role: "Asistente Administrativo Contable", company: "Ministerio de Salud Pública de Misiones", location: "Posadas", description: "Gestión de compras, licitaciones y ERP" },
] as const;

describe("preserved evidence", () => {
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
