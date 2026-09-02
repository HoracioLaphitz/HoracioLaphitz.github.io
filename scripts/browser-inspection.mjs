import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:4321";
const EVIDENCE_DIR = "J:/Proyectos/Portfolio-26/openspec/changes/refine-professional-editorial-portfolio/evidence/browser";

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/projects", name: "projects" },
  { path: "/proyectos/sano-y-fresco-market-basket", name: "project-detail" },
  { path: "/certificaciones", name: "certifications" },
  { path: "/contacto", name: "contact" },
];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1440, height: 900 },
];

let browser;

function log(msg) {
  console.log(msg);
}

async function checkAccessibility(page) {
  return await page.evaluate(() => {
    const results = {
      imagesWithoutAlt: 0,
      totalImages: 0,
      missingLabels: 0,
      totalFormControls: 0,
      focusableWithoutName: 0,
      totalFocusable: 0,
      h1Count: 0,
      headingOrderIssues: 0,
    };

    // Images
    const images = document.querySelectorAll("img");
    results.totalImages = images.length;
    images.forEach((img) => {
      if (!img.hasAttribute("alt")) results.imagesWithoutAlt++;
    });

    // Form controls
    const formControls = document.querySelectorAll("input, select, textarea");
    results.totalFormControls = formControls.length;
    formControls.forEach((el) => {
      const hasLabel = el.labels?.length > 0 || el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby");
      if (!hasLabel && el.type !== "hidden") results.missingLabels++;
    });

    // Focusable elements
    const focusable = document.querySelectorAll("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])");
    results.totalFocusable = focusable.length;
    focusable.forEach((el) => {
      const text = el.textContent?.trim() || el.getAttribute("aria-label") || el.getAttribute("title") || "";
      if (!text && el.tagName !== "INPUT") results.focusableWithoutName++;
    });

    // Headings
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    results.h1Count = document.querySelectorAll("h1").length;
    let lastLevel = 0;
    headings.forEach((h) => {
      const level = parseInt(h.tagName[1]);
      if (level > lastLevel + 1) results.headingOrderIssues++;
      lastLevel = level;
    });

    return results;
  });
}

try {
  mkdirSync(EVIDENCE_DIR, { recursive: true });

  browser = await chromium.launch({
    executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
    headless: true,
  });

  log(`\nBrowser inspection: ${BASE_URL}`);
  log(`Evidence: ${EVIDENCE_DIR}\n`);

  const report = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      log(`[${vp.name}] ${route.name} (${route.path})`);

      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

        // Screenshot
        const shotPath = join(EVIDENCE_DIR, `${route.name}-${vp.name}.png`);
        await page.screenshot({ path: shotPath, fullPage: false });

        // Accessibility check
        const a11y = await checkAccessibility(page);

        // Contrast check (basic: check if text color matches background)
        const contrastIssues = await page.evaluate(() => {
          const elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a, button, li");
          let issues = 0;
          elements.forEach((el) => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const bg = style.backgroundColor;
            if (color === "rgba(0, 0, 0, 0)" || bg === "rgba(0, 0, 0, 0)") return;
            // Basic check: if text is very light on white or very dark on dark
            const textLightness = parseInt(color.match(/\d+/g)?.[0] || "0");
            if (textLightness > 200 && bg.includes("255")) issues++;
          });
          return issues;
        });

        report.push({
          route: route.name,
          path: route.path,
          viewport: vp.name,
          a11y,
          contrastIssues,
          screenshot: shotPath,
        });
      } catch (err) {
        log(`  ERROR: ${err.message.split("\n")[0]}`);
        report.push({
          route: route.name,
          path: route.path,
          viewport: vp.name,
          error: err.message.split("\n")[0],
        });
      }
    }

    await context.close();
  }

  // Summary
  log("\n" + "=".repeat(80));
  log("BROWSER INSPECTION REPORT");
  log("=".repeat(80));

  const totalA11y = {
    imagesWithoutAlt: 0,
    missingLabels: 0,
    focusableWithoutName: 0,
    h1Issues: 0,
    headingOrderIssues: 0,
  };

  report.forEach((r) => {
    if (r.error) {
      log(`\n❌ ${r.route} @ ${r.viewport}: ${r.error}`);
      return;
    }
    const a = r.a11y;
    totalA11y.imagesWithoutAlt += a.imagesWithoutAlt;
    totalA11y.missingLabels += a.missingLabels;
    totalA11y.focusableWithoutName += a.focusableWithoutName;
    totalA11y.headingOrderIssues += a.headingOrderIssues;
    if (a.h1Count !== 1) totalA11y.h1Issues++;

    const status =
      a.imagesWithoutAlt === 0 &&
      a.missingLabels === 0 &&
      a.focusableWithoutName === 0 &&
      a.h1Count === 1 &&
      a.headingOrderIssues === 0
      ? "✅"
      : "⚠️";

    log(`\n${status} ${r.route} @ ${r.viewport}`);
    log(`   H1: ${a.h1Count} | Images: ${a.totalImages} (missing alt: ${a.imagesWithoutAlt})`);
    log(`   Forms: ${a.totalFormControls} (missing labels: ${a.missingLabels})`);
    log(`   Focusable: ${a.totalFocusable} (unnamed: ${a.focusableWithoutName})`);
    log(`   Heading order issues: ${a.headingOrderIssues}`);
    log(`   Contrast warnings: ${r.contrastIssues}`);
  });

  log("\n" + "-".repeat(80));
  log("TOTAL A11Y ISSUES:");
  log(`   Images without alt: ${totalA11y.imagesWithoutAlt}`);
  log(`   Forms missing labels: ${totalA11y.missingLabels}`);
  log(`   Focusable without name: ${totalA11y.focusableWithoutName}`);
  log(`   H1 count issues: ${totalA11y.h1Issues}`);
  log(`   Heading order issues: ${totalA11y.headingOrderIssues}`);
  log("=".repeat(80));

} catch (err) {
  log("Inspection crashed: " + err.message);
  process.exit(1);
} finally {
  if (browser) await browser.close();
}
