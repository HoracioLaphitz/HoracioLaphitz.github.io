import { describe, expect, it } from "vitest";
import { getProjectCategoryLabel, getProjectMaturityLabel } from "../project-labels";

describe("project labels", () => {
  it("renders internal project classifications in Spanish", () => {
    expect(getProjectCategoryLabel("Notebooks Analytics")).toBe("Cuadernos de análisis");
    expect(getProjectCategoryLabel("Data Science")).toBe("Ciencia de datos");
    expect(getProjectMaturityLabel("Portfolio project")).toBe("Proyecto de portfolio");
    expect(getProjectMaturityLabel("In development")).toBe("En desarrollo");
  });

  it("preserves labels without a translation", () => {
    expect(getProjectCategoryLabel("GenAI")).toBe("GenAI");
    expect(getProjectMaturityLabel(undefined)).toBeUndefined();
  });
});
