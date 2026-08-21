#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { load as loadYaml } from "js-yaml";
import { getNotebookConversionJobs } from "../src/shared/notebook-jobs.ts";

const CONTENT_DIR = "src/content/proyectos";
const YAML_ENGINE = (content) => loadYaml(content);

function loadProyectos() {
  return readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = readFileSync(join(CONTENT_DIR, file), "utf-8");
      const { data } = matter(raw, { engines: { yaml: YAML_ENGINE } });
       // Content frontmatter stores web paths (/Proyectos/...); nbconvert
      // needs the on-disk location under public/.
      const resources = data.resources?.notebooks
        ? {
            ...data.resources,
            notebooks: data.resources.notebooks.map((nb) => ({
              ...nb,
              path: join("public", nb.path),
            })),
          }
        : data.resources;
      return { slug: file.replace(/\.md$/, ""), resources };
    });
}

function runConversion(job) {
  if (!existsSync(job.sourcePath)) {
    console.error(`[notebooks] SKIP ${job.sourcePath} (file not found)`);
    return false;
  }

  mkdirSync(job.outputDir, { recursive: true });

  try {
    execFileSync(
      "jupyter",
      [
        "nbconvert",
        "--to",
        "html",
        job.sourcePath,
        "--output-dir",
        job.outputDir,
        "--output",
        job.outputFile,
      ],
      { stdio: "inherit" }
    );
    return true;
  } catch (error) {
    console.error(`[notebooks] FAILED ${job.sourcePath}: ${error.message}`);
    return false;
  }
}

function main() {
  const proyectos = loadProyectos();
  const jobs = getNotebookConversionJobs(proyectos);

  if (jobs.length === 0) {
    console.log("[notebooks] No notebooks to convert.");
    return;
  }

  let succeeded = 0;
  for (const job of jobs) {
    if (runConversion(job)) succeeded += 1;
  }

  console.log(
    `[notebooks] ${succeeded}/${jobs.length} notebooks converted.`
  );
}

main();
