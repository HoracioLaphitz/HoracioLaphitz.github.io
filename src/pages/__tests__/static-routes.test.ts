import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

let buildChecked = false;

const ensureStaticBuild = () => {
  if (buildChecked) return;
  buildChecked = true;

  const distRoot = resolve(process.cwd(), "dist");
  const requiredRoutes = ["index.html", "projects/index.html"];
  if (!requiredRoutes.every((route) => existsSync(resolve(distRoot, route)))) {
    const result = spawnSync(
      process.execPath,
      ["node_modules/astro/astro.js", "build", "--force"],
      {
        cwd: process.cwd(),
        env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
        encoding: "utf8",
      },
    );
    expect(result.status, result.stderr).toBe(0);
  }

  expect(requiredRoutes.every((route) => existsSync(resolve(distRoot, route)))).toBe(true);
};

const readBuiltRoute = (route: string) => {
  ensureStaticBuild();
  return readFileSync(resolve(process.cwd(), "dist", route, "index.html"), "utf8");
};

const assertRouteSemantics = (html: string) => {
  expect(html).toMatch(/<title>[^<]+<\/title>/i);
  expect(html).toMatch(/<meta name="description" content="[^"]+"/i);
  expect(html).toMatch(/<link rel="canonical" href="https:\/\/[^"]+"/i);
  expect((html.match(/<h1\b[^>]*>/gi) ?? []).length).toBe(1);
};

describe("initial HTML route semantics", () => {
  it("publishes complete semantics on the home route", () => {
    assertRouteSemantics(readBuiltRoute(""));
  });

  it("publishes complete semantics on the projects route", () => {
    assertRouteSemantics(readBuiltRoute("projects"));
  });

  it("does not rely on an ineffective X-Frame-Options meta tag", () => {
    const layout = readFileSync(
      resolve(process.cwd(), "src/presentation/layouts/Layout.astro"),
      "utf8",
    );
    expect(layout).not.toMatch(/http-equiv="X-Frame-Options"/i);
  });
});
