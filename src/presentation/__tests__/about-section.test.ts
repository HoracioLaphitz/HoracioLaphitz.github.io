import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import About from "@presentation/components/sections/About";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("about section", () => {
  it("places the About section immediately after the Hero on the home page", () => {
    const page = read("src/pages/index.astro");
    const heroPosition = page.indexOf("<Hero");
    const featuredPosition = page.indexOf("<FeaturedProjects");
    const aboutPosition = page.indexOf("<About");

    expect(page).toContain('import About from "@presentation/components/sections/About.tsx"');
    expect(heroPosition).toBeGreaterThan(-1);
    expect(featuredPosition).toBeGreaterThan(heroPosition);
    expect(aboutPosition).toBeGreaterThan(featuredPosition);
  });

  it("communicates evidence boundaries and enterprise AI operating concerns", () => {
    const about = renderToStaticMarkup(createElement(About));

    expect(about).toContain('id="about"');
    expect(about).toContain("Aplicado");
    expect(about).toContain("Datos y automatización");
    expect(about).toMatch(/datos.*automatizaci[oó]n/is);
    expect(about).toMatch(/Python.*SQL/is);
    expect(about).not.toMatch(/desplegado.*producci[oó]n|casos? empresariales? en producci[oó]n/is);
  });

  it("links About from the primary and footer navigation", () => {
    const navigation = read("src/presentation/components/layout/Navigation.tsx");
    const footer = read("src/presentation/components/layout/Footer.tsx");

    expect(navigation).toContain('{ name: "Proyectos", path: "#proyectos" }');
    expect(footer).toContain('href="/#about"');
  });
});
