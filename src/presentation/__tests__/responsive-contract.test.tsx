import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(__dirname, "../../..");
const globalCss = readFileSync(resolve(root, "src/presentation/styles/global.css"), "utf8");
const layoutAstro = readFileSync(resolve(root, "src/presentation/layouts/Layout.astro"), "utf8");
const tailwindConfig = readFileSync(resolve(root, "tailwind.config.mjs"), "utf8");

describe("responsive foundation", () => {
  it("includes viewport-fit=cover in viewport meta", () => {
    expect(layoutAstro).toContain("viewport-fit=cover");
  });

  it("propagates min-width: 0 to grid/flex descendants", () => {
    expect(globalCss).toMatch(/min-width:\s*0/);
  });

  it("uses overflow-wrap for long tokens", () => {
    expect(globalCss).toMatch(/overflow-wrap:\s*anywhere/);
  });

  it("includes safe-area inset support", () => {
    expect(globalCss).toMatch(/env\(safe-area-inset/);
  });

  it("has coarse-pointer media query for touch targets", () => {
    expect(globalCss).toMatch(/@media\s*\(pointer:\s*coarse\)/);
  });

  it("has hover media query for hover-capable devices", () => {
    expect(globalCss).toMatch(/@media\s*\(hover:\s*hover\)/);
  });

  it("has prefers-contrast media query", () => {
    expect(globalCss).toMatch(/@media\s*\(prefers-contrast:\s*more\)/);
  });

  it("has reduced-motion media query", () => {
    expect(globalCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  });

  it("does not clip page-wide overflow on html/body", () => {
    expect(globalCss).not.toMatch(/html\s*,\s*body\s*\{[^}]*overflow-x:\s*hidden/);
    expect(globalCss).not.toMatch(/body\s*\{[^}]*overflow-x:\s*hidden/);
  });
});
