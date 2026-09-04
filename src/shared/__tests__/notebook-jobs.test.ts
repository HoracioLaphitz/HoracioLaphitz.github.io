import { describe, it, expect } from "vitest";
import { getNotebookConversionJobs } from "../notebook-jobs";

describe("getNotebookConversionJobs", () => {
  it("builds one job per notebook", () => {
    const jobs = getNotebookConversionJobs([
      {
        slug: "nb-pandas-profiling-eda",
        resources: {
          notebooks: [
            {
              name: "Pandas Profiling",
              path: "public/Proyectos/Notebooks/Pandas_Profiling/Pandas_Profiling.ipynb",
            },
          ],
        },
      },
    ]);

    expect(jobs).toEqual([
      {
        projectSlug: "nb-pandas-profiling-eda",
        notebookSlug: "pandas-profiling",
        sourcePath:
          "public/Proyectos/Notebooks/Pandas_Profiling/Pandas_Profiling.ipynb",
        outputDir: "public/notebooks-html/nb-pandas-profiling-eda",
        outputFile: "pandas-profiling.html",
      },
    ]);
  });

  it("builds multiple jobs for a project with several notebooks", () => {
    const jobs = getNotebookConversionJobs([
      {
        slug: "nb-red-neuronal-convolucional",
        resources: {
          notebooks: [
            { name: "CNN Principal", path: "a.ipynb" },
            { name: "Exploratory Analysis", path: "b.ipynb" },
          ],
        },
      },
    ]);

    expect(jobs).toHaveLength(2);
    expect(jobs[0].notebookSlug).toBe("cnn-principal");
    expect(jobs[1].notebookSlug).toBe("exploratory-analysis");
  });

  it("skips projects without resources.notebooks", () => {
    const jobs = getNotebookConversionJobs([
      { slug: "no-notebooks", resources: undefined },
      { slug: "empty-notebooks", resources: { notebooks: [] } },
    ]);

    expect(jobs).toHaveLength(0);
  });

  it("uses the explicit shared slug for route and artifact parity", () => {
    const jobs = getNotebookConversionJobs([
      {
        slug: "nb-prediccion-precios-casas",
        resources: {
          notebooks: [
            {
              name: "Predicción de precios",
              slug: "prediccion-de-precios-de-casas",
              path: "public/Proyectos/Notebooks/Predice-Precios-Casas/Predice-Precios-Casas.ipynb",
            },
          ],
        },
      },
    ]);

    expect(jobs[0].notebookSlug).toBe("prediccion-de-precios-de-casas");
    expect(jobs[0].outputFile).toBe("prediccion-de-precios-de-casas.html");
  });
});
