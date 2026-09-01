/**
 * Pure responsive contract helpers.
 * No browser, no network, no DOM. Serializable data only.
 */

export const VIEWPORTS = Object.freeze({
  mobile: { width: 320, height: 667 },
  mobileLarge: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1024, height: 768 },
  desktopLarge: { width: 1440, height: 900 },
  ultraWide: { width: 2560, height: 1440 },
  mobileLandscape: { width: 812, height: 375 },
});

export const SURFACES = Object.freeze([
  { kind: "home", paths: ["/"] },
  { kind: "catalogue", paths: ["/projects"] },
  { kind: "project", paths: ["/projects/"] },
  { kind: "dashboard", paths: ["/dashboards/"] },
  { kind: "resource", paths: ["/proyectos/"] },
  { kind: "certification-cv", paths: ["/certificaciones"] },
  { kind: "contact", paths: ["/contacto"] },
  { kind: "thank-you", paths: ["/gracias"] },
]);

const BOUNDARY_WIDTHS = Object.freeze([320, 2560]);
const FULL_MATRIX = Object.freeze([375, 768, 1024, 1440, 812]);

const { readdirSync, statSync } = await import("node:fs");
const { join, relative, sep } = await import("node:path");

export function evaluateBounds(viewportWidth, elements) {
  return elements.filter(({ right }) => right > viewportWidth);
}

export function discoverBuiltRoutes(distRoot) {
  const routes = [];
  walkDir(distRoot, distRoot, routes);
  return routes.map((route) => {
    const isComplex = route.path !== "/" && route.path !== "/projects";
    return {
      ...route,
      widths: isComplex
        ? [...BOUNDARY_WIDTHS, ...FULL_MATRIX]
        : [...BOUNDARY_WIDTHS],
    };
  });
}

function walkDir(root, current, routes) {
  const entries = readdirSync(current, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(current, entry.name);
    if (entry.isDirectory()) {
      walkDir(root, fullPath, routes);
    } else if (entry.name === "index.html") {
      const dir = relative(root, current);
      const path = dir === "" ? "/" : `/${dir.split(sep).join("/")}`;
      routes.push({ path });
    }
  }
}
