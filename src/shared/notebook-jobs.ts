import { slugify } from "./slugify";

export interface NotebookResource {
  name: string;
  slug?: string;
  path: string;
  description?: string;
}

export interface ProyectoFrontmatter {
  slug: string;
  resources?: {
    notebooks?: NotebookResource[];
  };
}

export interface ConversionJob {
  projectSlug: string;
  notebookSlug: string;
  sourcePath: string;
  outputDir: string;
  outputFile: string;
}

export function getNotebookConversionJobs(
  proyectos: ProyectoFrontmatter[]
): ConversionJob[] {
  const jobs: ConversionJob[] = [];

  for (const proyecto of proyectos) {
    const notebooks = proyecto.resources?.notebooks ?? [];

    for (const notebook of notebooks) {
      const notebookSlug = notebook.slug ?? slugify(notebook.name);
      jobs.push({
        projectSlug: proyecto.slug,
        notebookSlug,
        sourcePath: notebook.path,
        outputDir: `public/notebooks-html/${proyecto.slug}`,
        outputFile: `${notebookSlug}.html`,
      });
    }
  }

  return jobs;
}
