import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Schema para métricas de impacto de proyectos
 * Nueva Identidad: Data & Strategy - Enfoque en resultados medibles
 */
const impactSchema = z
  .object({
    efficiencyGain: z.number().optional(),
    costSavings: z.string().optional(),
    timeReduction: z.string().optional(),
    revenueIncrease: z.string().optional(),
    customMetrics: z
      .record(z.string(), z.union([z.string(), z.number()]))
      .optional(),
  })
  .optional();

const maturityStatuses = [
  "Delivered work",
  "Portfolio project",
  "Functional prototype",
  "Reference architecture",
  "In development",
  "Currently deepening expertise in",
] as const;

const proyectosCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/proyectos",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("Horacio Laphitz"),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    github: z.string().optional(),
    dashboard: z.string().optional(),
    featured: z.boolean().default(false),
    claimId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    maturity: z.enum(maturityStatuses).optional(),
    evidenceId: z
      .string()
      .regex(/^(project|experience|skill):[a-z0-9-]+$/)
      .optional(),
    boundaries: z.array(z.string()).default([]),
    impact: impactSchema,
    resources: z
      .object({
        notebooks: z
          .array(
            z.object({
              name: z.string(),
              path: z.string(),
              description: z.string().optional(),
            })
          )
          .optional(),
        pdfs: z
          .array(
            z.object({
              name: z.string(),
              path: z.string(),
              description: z.string().optional(),
            })
          )
          .optional(),
        datasets: z
          .array(
            z.object({
              name: z.string(),
              path: z.string(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
  }),
});

export const collections = {
  proyectos: proyectosCollection,
};
