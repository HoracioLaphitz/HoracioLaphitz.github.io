import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { VIEWPORTS, SURFACES, discoverBuiltRoutes, evaluateBounds } from "./responsive-contract.mjs";

const temporaryRoots = [];
afterEach(() => temporaryRoots.splice(0).forEach((root) => rmSync(root, { recursive: true })));

describe("responsive contract", () => {
  it("covers all required viewports", () => {
    expect(Object.values(VIEWPORTS).map(({ width }) => width)).toEqual(
      expect.arrayContaining([320, 375, 768, 1024, 1440, 2560]),
    );
  });

  it("covers each public surface class", () => {
    expect(SURFACES.map(({ kind }) => kind)).toEqual(
      expect.arrayContaining([
        "home", "catalogue", "project", "dashboard", "resource",
        "certification-cv", "contact", "thank-you",
      ]),
    );
  });

  it("reports elements outside the viewport", () => {
    expect(evaluateBounds(320, [{ selector: "chart", left: 20, right: 340 }]))
      .toEqual([{ selector: "chart", left: 20, right: 340 }]);
  });

  it("maps every built route to both boundary widths", () => {
    const root = mkdtempSync(join(tmpdir(), "portfolio-routes-"));
    temporaryRoots.push(root);
    mkdirSync(join(root, "projects", "example"), { recursive: true });
    writeFileSync(join(root, "index.html"), "<h1>Home</h1>");
    writeFileSync(join(root, "projects", "example", "index.html"), "<h1>Example</h1>");
    const routes = discoverBuiltRoutes(root);
    expect(routes.map(({ path }) => path)).toEqual(["/", "/projects/example"]);
    expect(routes.every(({ widths }) => widths.includes(320) && widths.includes(2560)))
      .toBe(true);
  });
});
