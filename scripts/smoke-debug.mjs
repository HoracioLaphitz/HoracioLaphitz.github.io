import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:4321";

const results = [];
let browser;

try {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = `${BASE_URL}/projects`;
  const response = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  const status = response?.status() || 0;

  // Get the raw HTML content
  const bodyHTML = await page.innerHTML("body");

  // Check for specific content
  const hasFixture = bodyHTML.includes("Test Repo Sin README");
  const hasBadge = bodyHTML.includes("Nuevo - en proceso");

  console.log(`Status: ${status}`);
  console.log(`Has fixture title: ${hasFixture}`);
  console.log(`Has badge: ${hasBadge}`);

  // Also check what articles/cards exist
  const cards = await page.locator("article[data-motion='project-card']").all();
  console.log(`Total cards: ${cards.length}`);

  // Check all text content of the projects section
  const projectsText = await page.locator("section#proyectos, .max-w-content").innerText();
  const lines = projectsText.split("\n").filter(l => l.trim());
  console.log("\n--- Projects page text content ---");
  lines.slice(0, 50).forEach(l => console.log(l));

  // Check if any card contains "Test" or "Fixture"
  const testCard = await page.locator("article:has-text('Test')").count();
  console.log(`\nCards with 'Test': ${testCard}`);

  process.exit(0);
} catch (err) {
  console.error("Debug crashed:", err.message);
  process.exit(1);
} finally {
  if (browser) await browser.close();
}
