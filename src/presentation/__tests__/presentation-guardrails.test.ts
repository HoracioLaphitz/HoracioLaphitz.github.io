import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("presentation accessibility and visual guardrails", () => {
  it("keeps navigation and contact controls discernible and keyboard reachable", () => {
    const navigation = read("src/presentation/components/layout/Navigation.tsx");
    const footer = read("src/presentation/components/layout/Footer.tsx");
    const contact = read("src/presentation/components/sections/Contact.tsx");
    expect(navigation).toContain('"Cerrar menú" : "Abrir menú"');
    expect(navigation).toContain('aria-expanded={isMenuOpen}');
    expect(navigation).toContain('aria-controls="navigation-menu"');
    expect(navigation).toContain('id="navigation-menu"');
    expect(navigation).toContain('PUBLIC_POSITIONING');
    expect(footer).toContain('PUBLIC_POSITIONING');
    expect(contact).toContain('PUBLIC_POSITIONING');
    expect(footer).toContain("CV_HoracioLaphitz.pdf");
    expect(contact).toContain("mailto:");
  });

  it("uses valid semantic color tokens on resources and notebooks", () => {
    const resources = read("src/presentation/components/proyectos/ResourceDownload.tsx");
    const notebook = read("src/pages/proyectos/[slug]/notebook/[notebook].astro");
    expect(resources).not.toMatch(/skin-surface|text-skin-primary/);
    expect(notebook).not.toMatch(/text-skin-primary/);
    expect(resources).toContain("text-skin-text");
    expect(notebook).toContain("text-skin-text");
  });

  it("uses absolute home anchors from the shared footer", () => {
    const footer = read("src/presentation/components/layout/Footer.tsx");
    expect(footer).not.toMatch(/href="#/);
    expect(footer).toContain('href="/#proyectos"');
    expect(footer).toContain('href="/#contacto"');
  });

  it("uses the icon system instead of unicode action glyphs", () => {
    const files = [
      read("src/presentation/components/sections/Hero.tsx"),
      read("src/presentation/components/sections/Contact.tsx"),
      read("src/presentation/components/layout/Footer.tsx"),
      read("src/presentation/components/dashboards/shared/DashboardShell.tsx"),
      read("src/presentation/components/dashboards/shared/ErrorState.tsx"),
      read("src/pages/proyectos/[slug]/notebook/[notebook].astro"),
    ].join("\n");
    expect(files).not.toMatch(/[›↓↗←]/);
  });

  it("keeps the active visual system sober and typographically consistent", () => {
    const global = read("src/presentation/styles/global.css");
    const tailwind = read("tailwind.config.mjs");
    const logo = read("src/presentation/components/ui/Logo.tsx");
    const themeToggle = read("src/presentation/components/ui/ThemeToggle.tsx");
    expect(global).not.toMatch(/repeating-linear-gradient|radial-gradient/);
    expect(logo).not.toMatch(/gradient/);
    expect(themeToggle).not.toMatch(/gradient/);
    expect(tailwind).toContain('"Space Grotesk"');
    expect(tailwind).toContain('"Inter"');
  });

  it("preserves reduced-motion support and rejects decorative effects", () => {
    const files = [
      read("src/presentation/components/sections/Hero.tsx"),
      read("src/presentation/components/layout/Navigation.tsx"),
      read("src/presentation/components/layout/Footer.tsx"),
      read("src/presentation/components/sections/Contact.tsx"),
    ].join("\n");
    expect(read("src/presentation/styles/global.css")).toMatch(/prefers-reduced-motion/);
    expect(files).not.toMatch(/gradient|glow|animate-(?!none)/i);
  });
});
