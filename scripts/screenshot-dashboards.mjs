import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("openspec/changes/expand-charts-fullscreen/evidence");
mkdirSync(OUT, { recursive: true });

const BASE = process.env.BASE_URL ?? "http://localhost:4322";

async function screenshot(page, name) {
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: false });
  console.log(`Saved: ${name}.png`);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Market Basket - Recharts section
  await page.goto(`${BASE}/proyectos/sano-y-fresco-market-basket`, { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  
  // Scroll past Power BI images to Recharts
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(1000);
  await screenshot(page, "recharts-mb-1");
  
  await page.evaluate(() => window.scrollTo(0, 2600));
  await page.waitForTimeout(1000);
  await screenshot(page, "recharts-mb-2");

  // Ecommerce - Recharts section
  await page.goto(`${BASE}/proyectos/ai-sales-assistant`, { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  await screenshot(page, "recharts-ecommerce-1");
  
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(1000);
  await screenshot(page, "recharts-ecommerce-2");

  // Bancos - has a dashboard
  await page.goto(`${BASE}/proyectos/nb-capitalizacion-bancos-etl`, { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  await screenshot(page, "recharts-bancos-1");

  await browser.close();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
