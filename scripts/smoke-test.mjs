import { chromium } from "playwright";
import { discoverBuiltRoutes } from "./responsive-contract.mjs";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:4321";
const TIMEOUT_MS = parseInt(process.env.SMOKE_TIMEOUT || "45000");
const DIST_ROOT = "J:/Proyectos/Portfolio-26/dist";
const EVIDENCE_DIR = "J:/Proyectos/Portfolio-26/openspec/changes/improve-responsive-cv-portfolio/evidence/final";

const VIEWPORTS = [
  { name: "mobile-s", width: 320, height: 667 },
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop-s", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "desktop-xl", width: 2560, height: 1440 },
  { name: "landscape", width: 812, height: 375 },
];

const CONTENT_PARITY_SELECTORS = [
  "article[itemType]",
  "[data-responsive-region]",
  "h1",
  "h2",
  "footer a",
  "nav a, header a",
];

const results = [];
let browser;

async function checkViewport(page, route, vp, contextOptions = {}) {
  const context = browser ? await browser.newContext(contextOptions) : null;
  const p = context ? await context.newPage() : page;
  
  await p.setViewportSize({ width: vp.width, height: vp.height });
  await p.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle", timeout: TIMEOUT_MS });

  const report = await p.evaluate(() => {
    const doc = document.documentElement;
    const overflowX = doc.scrollWidth > doc.clientWidth + 1;

    const trackedBounds = Array.from(document.querySelectorAll("[data-responsive-region]")).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        region: el.getAttribute("data-responsive-region"),
        right: Math.round(rect.right),
        viewportWidth: window.innerWidth,
        overflows: rect.right > window.innerWidth + 1,
      };
    });

    const smallTargets = Array.from(document.querySelectorAll("button, a, input, select, textarea, [role='button']")).filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width < 44 || rect.height < 44;
    }).map((el) => ({
      tag: el.tagName,
      text: el.textContent?.trim()?.slice(0, 40),
      w: Math.round(el.getBoundingClientRect().width),
      h: Math.round(el.getBoundingClientRect().height),
    }));

    const h1Count = document.querySelectorAll("h1").length;
    const heroText = document.querySelector("h1")?.textContent?.trim()?.slice(0, 100);
    const navCount = document.querySelectorAll("nav a, header a").length;
    const footerCount = document.querySelectorAll("footer a").length;
    const experienceArticles = document.querySelectorAll("article[itemType]").length;
    const unpaidLabel = document.body.innerText.includes("no remunerada");

    return {
      overflowX,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      trackedRegions: trackedBounds,
      smallTargets: smallTargets.slice(0, 10),
      h1Count,
      heroText,
      navCount,
      footerCount,
      experienceArticles,
      unpaidLabel,
    };
  });

  // Screenshot
  const shotPath = join(EVIDENCE_DIR, `${route.replace(/\//g, "_") || "home"}-${vp.name}.png`);
  await p.screenshot({ path: shotPath, fullPage: false });

  if (context) await context.close();

  return {
    route,
    viewport: vp.name,
    width: vp.width,
    ...report,
    screenshot: shotPath,
  };
}

try {
  mkdirSync(EVIDENCE_DIR, { recursive: true });
  browser = await chromium.launch({ headless: true });

  const builtRoutes = discoverBuiltRoutes(DIST_ROOT).map((r) => r.path);
  const uniqueRoutes = [...new Set(builtRoutes)].sort();

  console.log(`Routes: ${uniqueRoutes.length} | Viewports: ${VIEWPORTS.length}`);
  console.log(`Evidence: ${EVIDENCE_DIR}`);

  // Phase 1: Standard overflow + bounds
  const defaultContext = await browser.newContext();
  const page = await defaultContext.newPage();

  for (const route of uniqueRoutes) {
    for (const vp of VIEWPORTS) {
      try {
        const result = await checkViewport(page, route, vp);
        results.push(result);
        const status = result.overflowX ? "OVERFLOW" : (result.trackedRegions.some(r => r.overflows) ? "CLIP" : "OK");
        if (status !== "OK") {
          console.log(`[${status}] ${route} @ ${vp.name} (${vp.width}px)`);
        }
      } catch (err) {
        results.push({ route, viewport: vp.name, width: vp.width, error: err.message });
        console.log(`[ERROR] ${route} @ ${vp.name} — ${err.message.split("\n")[0]}`);
      }
    }
  }
  await defaultContext.close();

  // Phase 2: Media query contexts (coarse pointer, reduced motion, high contrast, forced colors)
  const mediaContexts = [
    { name: "coarse-pointer", options: { hasTouch: true, isMobile: true } },
    { name: "reduced-motion", options: { reducedMotion: "reduce" } },
    { name: "high-contrast", options: { forcedColors: "active" } },
  ];

  const representativeRoutes = ["/", "/projects", "/Proyectos/sano-y-fresco-market-basket", "/certificaciones", "/contacto"];
  const targetRoutes = representativeRoutes.filter(r => uniqueRoutes.includes(r) || uniqueRoutes.includes(r.replace("/Proyectos/", "/proyectos/")));

  for (const route of targetRoutes) {
    for (const mc of mediaContexts) {
      for (const vp of [VIEWPORTS[0], VIEWPORTS[2], VIEWPORTS[4]]) {
        try {
          const result = await checkViewport(null, route, vp, mc.options);
          result.context = mc.name;
          results.push(result);
          const status = result.overflowX ? "OVERFLOW" : (result.trackedRegions.some(r => r.overflows) ? "CLIP" : "OK");
          if (status !== "OK") {
            console.log(`[${status}] ${route} @ ${vp.name} + ${mc.name}`);
          }
        } catch (err) {
          results.push({ route, viewport: vp.name, width: vp.width, context: mc.name, error: err.message });
        }
      }
    }
  }

  // Phase 3: Content parity (mobile vs desktop on home)
  const homeMobile = results.find(r => r.route === "/" && r.viewport === "mobile-s");
  const homeDesktop = results.find(r => r.route === "/" && r.viewport === "desktop");
  const parityIssues = [];
  if (homeMobile && homeDesktop) {
    if (homeMobile.experienceArticles !== homeDesktop.experienceArticles) {
      parityIssues.push(`Experience articles: mobile=${homeMobile.experienceArticles} desktop=${homeDesktop.experienceArticles}`);
    }
    if (homeMobile.unpaidLabel !== homeDesktop.unpaidLabel) {
      parityIssues.push(`Unpaid label: mobile=${homeMobile.unpaidLabel} desktop=${homeDesktop.unpaidLabel}`);
    }
    if (homeMobile.h1Count !== homeDesktop.h1Count) {
      parityIssues.push(`H1 count: mobile=${homeMobile.h1Count} desktop=${homeDesktop.h1Count}`);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log(`RESPONSIVE SMOKE: ${BASE_URL}`);
  console.log("=".repeat(80));

  const overflows = results.filter(r => r.overflowX);
  const clips = results.filter(r => !r.overflowX && r.trackedRegions?.some(reg => reg.overflows));
  const errors = results.filter(r => r.error);

  if (overflows.length > 0) {
    console.log("\n--- PAGE OVERFLOW ---");
    overflows.forEach(r => console.log(`  ${r.route} @ ${r.viewport}${r.context ? " + " + r.context : ""} — scroll:${r.scrollWidth} client:${r.clientWidth}`));
  }

  if (clips.length > 0) {
    console.log("\n--- TRACKED REGION CLIP ---");
    clips.forEach(r => {
      r.trackedRegions.filter(reg => reg.overflows).forEach(reg => {
        console.log(`  ${r.route} @ ${r.viewport}${r.context ? " + " + r.context : ""} — ${reg.region} right:${reg.right} viewport:${reg.viewportWidth}`);
      });
    });
  }

  if (parityIssues.length > 0) {
    console.log("\n--- CONTENT PARITY ---");
    parityIssues.forEach(i => console.log(`  ${i}`));
  }

  if (errors.length > 0) {
    console.log("\n--- LOAD ERRORS ---");
    errors.forEach(r => console.log(`  ${r.route} @ ${r.viewport}${r.context ? " + " + r.context : ""} — ${r.error.split("\n")[0]}`));
  }

  const totalIssues = overflows.length + clips.length + errors.length + parityIssues.length;
  console.log(`\nTOTAL: ${results.length} | OK: ${results.length - overflows.length - clips.length - errors.length} | OVERFLOW: ${overflows.length} | CLIP: ${clips.length} | PARITY: ${parityIssues.length} | ERROR: ${errors.length}`);

  process.exit(totalIssues > 0 ? 1 : 0);

} catch (err) {
  console.error("Smoke test crashed:", err.message);
  process.exit(1);
} finally {
  if (browser) await browser.close();
}
