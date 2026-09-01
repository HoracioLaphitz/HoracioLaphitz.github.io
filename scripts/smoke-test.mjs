import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:4321";
const TIMEOUT_MS = parseInt(process.env.SMOKE_TIMEOUT || "30000");

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 375, height: 812 },
};

const CHECKS = [
  { path: "/", name: "home", checks: { hero: true, footer: true } },
  { path: "/projects", name: "projects", checks: { cards: true, footer: true } },
  { path: "/proyectos/ai-sales-assistant", name: "project-detail", checks: { footer: true } },
  { path: "/gracias", name: "gracias", checks: { footer: true } },
];

const results = [];
let browser;

function log(msg) {
  if (process.env.DEBUG) console.log(msg);
}

try {
  browser = await chromium.launch({ headless: true });

  for (const [vpName, vpSize] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({ viewport: vpSize });
    const page = await context.newPage();

    for (const check of CHECKS) {
      const url = `${BASE_URL}${check.path}`;
      const consoleErrors = [];
      const failedRequests = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("requestfailed", (req) => {
        failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
      });

      let status = 0;
      let title = "";
      let loadError = null;
      let elementChecks = {};

      try {
        const response = await page.goto(url, { waitUntil: "networkidle", timeout: TIMEOUT_MS });
        status = response?.status() || 0;
        title = await page.title();

        // Element checks
        if (check.checks.hero) {
          elementChecks.hero = await page.locator("h1").count() > 0;
        }
        if (check.checks.cards) {
          elementChecks.cardCount = await page.locator("article[data-motion='project-card']").count();
        }
        if (check.checks.footer) {
          elementChecks.footer = await page.locator("footer").count() > 0;
        }

        // Check for badge (only on projects page)
        if (check.name === "projects") {
          elementChecks.badgeCount = await page.locator("text=Nuevo - en proceso").count();
        }

      } catch (err) {
        loadError = err.message;
      }

      // Screenshot
      const shotPath = `tests/screenshots/${check.name}-${vpName}.png`;
      await page.screenshot({ path: shotPath, fullPage: false });

      const passed = status === 200 && consoleErrors.length === 0 && !loadError;

      results.push({
        viewport: vpName,
        page: check.name,
        url,
        status,
        title,
        passed,
        consoleErrors,
        failedRequests,
        elementChecks,
        loadError,
        screenshot: shotPath,
      });
    }

    await context.close();
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log(`SMOKE TEST: ${BASE_URL}`);
  console.log("=".repeat(80));

  let failed = 0;
  for (const r of results) {
    if (!r.passed) failed++;
    const icon = r.passed ? "✅" : "❌";
    console.log(`\n${icon} ${r.page} @ ${r.viewport} → ${r.status}`);
    if (r.title) console.log(`   Title: ${r.title}`);
    if (r.elementChecks.cardCount !== undefined) console.log(`   Cards: ${r.elementChecks.cardCount}`);
    if (r.elementChecks.badgeCount !== undefined) console.log(`   Badge "Nuevo - en proceso": ${r.elementChecks.badgeCount}`);
    if (r.consoleErrors.length > 0) {
      console.log(`   Console errors (${r.consoleErrors.length}):`);
      r.consoleErrors.slice(0, 3).forEach((e) => console.log(`     - ${e}`));
    }
    if (r.failedRequests.length > 0) {
      console.log(`   Failed requests (${r.failedRequests.length}):`);
      r.failedRequests.slice(0, 3).forEach((e) => console.log(`     - ${e}`));
    }
    if (r.loadError) console.log(`   Load error: ${r.loadError}`);
  }

  console.log("\n" + "-".repeat(80));
  console.log(`TOTAL: ${results.length} | PASSED: ${results.length - failed} | FAILED: ${failed}`);
  console.log("=".repeat(80));

  process.exit(failed > 0 ? 1 : 0);
} catch (err) {
  console.error("Smoke test crashed:", err.message);
  process.exit(1);
} finally {
  if (browser) await browser.close();
}
