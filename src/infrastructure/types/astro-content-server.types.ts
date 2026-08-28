/**
 * Astro Content Collection Server Types
 * Type definitions that depend on astro:content
 *
 * ⚠️ WARNING: ONLY import this file in server-side code:
 * - .astro files
 * - API routes
 * - Server-side repositories
 *
 * DO NOT import in client components (.tsx files with React hooks)
 */

import type { CollectionEntry } from "astro:content";

/**
 * Type for a single project entry from Astro content collection
 * This type can ONLY be used in server-side code
 */
export type ProyectoEntry = CollectionEntry<"proyectos">;

/**
 * Type guard to check if an entry is a valid ProyectoEntry
 */
export function isProyectoEntry(entry: unknown): entry is ProyectoEntry {
  if (!entry || typeof entry !== "object") return false;

  const e = entry as Record<string, unknown>;

  return (
    typeof e.id === "string" &&
    e.data !== null &&
    typeof e.data === "object" &&
    "title" in e.data &&
    "description" in e.data &&
    "category" in e.data
  );
}
