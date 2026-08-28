import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PUBLIC_POSITIONING } from "../public-positioning.v1";

const root = (path: string) => resolve(process.cwd(), path);
const read = (path: string) => readFileSync(root(path), "utf8");

describe("shared public surfaces", () => {
  it("derives visible and metadata surfaces from the positioning model", () => {
    for (const path of [
      "src/presentation/components/sections/Hero.tsx",
      "src/presentation/layouts/Layout.astro",
      "src/presentation/components/layout/Footer.tsx",
      "src/presentation/components/sections/Contact.tsx",
    ]) {
      expect(read(path)).toContain("PUBLIC_POSITIONING");
    }
    expect(read("astro.config.mjs")).toContain("public-positioning");
  });

  it("keeps manifest, llms, robots, and sitemap ownership synchronized", () => {
    const manifest = JSON.parse(read("public/manifest.json"));
    const llms = read("public/llms.txt");
    const robots = read("public/robots.txt");
    const sitemapIndex = read("dist/sitemap-index.xml");
    expect(manifest.name).toContain(PUBLIC_POSITIONING.identity.name);
    expect(manifest.description).toContain(PUBLIC_POSITIONING.positioning.focus);
    expect(llms).toContain(PUBLIC_POSITIONING.identity.name);
    expect(llms).toContain(PUBLIC_POSITIONING.siteUrl);
    expect(llms).toContain(PUBLIC_POSITIONING.contact.email);
    expect(robots).toContain("sitemap-index.xml");
    expect(existsSync(root("public/sitemap.xml"))).toBe(false);
    expect(sitemapIndex).toContain("sitemap-0.xml");
    const sitemap = read("dist/sitemap-0.xml");
    expect(sitemap).toContain(`${PUBLIC_POSITIONING.siteUrl}/`);
    expect(sitemap).toContain(`${PUBLIC_POSITIONING.siteUrl}/projects`);
    expect(sitemap).toContain(`${PUBLIC_POSITIONING.siteUrl}/proyectos/ai-sales-assistant`);
  });
});
