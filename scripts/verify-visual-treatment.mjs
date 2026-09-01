import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:4322";
const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

let browser;
let allPassed = true;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ ${message}`);
    allPassed = false;
  } else {
    console.log(`  ✅ ${message}`);
  }
}

try {
  browser = await chromium.launch({ headless: true });

  for (const [vpName, vpSize] of Object.entries(VIEWPORTS)) {
    console.log(`\n📱 Viewport: ${vpName} (${vpSize.width}x${vpSize.height})`);
    const context = await browser.newContext({ viewport: vpSize });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/projects`, { waitUntil: "networkidle" });

    const badge = page.locator("text=Nuevo - en proceso").first();
    const badgeCount = await page.locator("text=Nuevo - en proceso").count();
    assert(badgeCount > 0, `Badge visible on ${vpName} (count=${badgeCount})`);

    if (badgeCount > 0) {
      const badgeBox = await badge.boundingBox();
      assert(badgeBox.width > 0 && badgeBox.height > 0, `Badge has dimensions on ${vpName}`);

      const isVisible = await badge.isVisible();
      assert(isVisible, `Badge is visible on ${vpName}`);

      // Check parent card is accessible
      const card = badge.locator("xpath=ancestor::article");
      const cardBox = await card.boundingBox();
      assert(badgeBox.x >= cardBox.x && badgeBox.x + badgeBox.width <= cardBox.x + cardBox.width,
        `Badge stays within card bounds on ${vpName}`);

      // Check font size is readable (>= 12px)
      const fontSize = await badge.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      assert(fontSize >= 12, `Badge font size readable on ${vpName}: ${fontSize}px`);

      // Check contrast (text-brand-primary should be visible)
      const color = await badge.evaluate((el) => getComputedStyle(el).color);
      assert(color !== "rgba(0, 0, 0, 0)" && color !== "transparent", `Badge has visible color on ${vpName}: ${color}`);
    }

    await context.close();
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(allPassed ? "✅ 5.12 VISUAL TREATMENT: PASS" : "❌ 5.12 VISUAL TREATMENT: FAIL");
  console.log("=".repeat(50));

  process.exit(allPassed ? 0 : 1);
} catch (err) {
  console.error("Visual verification crashed:", err.message);
  process.exit(1);
} finally {
  if (browser) await browser.close();
}
