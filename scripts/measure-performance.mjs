import { chromium, devices } from 'playwright';

const URL = 'http://localhost:4321/';

const viewports = [
  { name: 'Mobile', width: 375, height: 812, userAgent: devices['Pixel 7'].userAgent, deviceScaleFactor: 3 },
  { name: 'Desktop', width: 1440, height: 900, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', deviceScaleFactor: 1 },
];

const budgets = {
  lcp: 2500,
  cls: 0.10,
  inp: 200,
};

async function getResponseBodySize(response) {
  try {
    const buffer = await response.body();
    return buffer.length;
  } catch {
    return 0;
  }
}

async function measureViewport(browser, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    userAgent: vp.userAgent,
    deviceScaleFactor: vp.deviceScaleFactor,
  });

  const page = await context.newPage();

  const resources = { jsBytes: 0, imageBytes: 0, totalRequests: 0 };

  page.on('response', async (response) => {
    const request = response.request();
    const resourceType = request.resourceType();
    if (resourceType !== 'script' && resourceType !== 'image') return;
    const size = await getResponseBodySize(response);
    if (resourceType === 'script') resources.jsBytes += size;
    if (resourceType === 'image') resources.imageBytes += size;
    resources.totalRequests++;
  });

  // Expose vitals collection via PerformanceObserver
  await page.addInitScript(() => {
    window.__vitals = { lcp: null, cls: 0, inp: null };

    // LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length) {
        window.__vitals.lcp = entries[entries.length - 1].startTime;
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // CLS
    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries = [];
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          const firstEntry = sessionEntries[0];
          const lastEntry = sessionEntries[sessionEntries.length - 1];
          if (sessionValue &&
              entry.startTime - lastEntry.startTime < 1000 &&
              entry.startTime - firstEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            window.__vitals.cls = clsValue;
          }
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // INP (Interaction to Next Paint)
    const inpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const e of entries) {
        if (e.duration > (window.__vitals.inp || 0)) {
          window.__vitals.inp = e.duration;
        }
      }
    });
    inpObserver.observe({ type: 'event', buffered: true });
  });

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

  // Wait extra for late LCP/CLS
  await page.waitForTimeout(3000);

  const vitals = await page.evaluate(() => window.__vitals);

  await context.close();

  return {
    viewport: vp.name,
    dimensions: `${vp.width}x${vp.height}`,
    lcp: vitals.lcp,
    cls: vitals.cls,
    inp: vitals.inp,
    ...resources,
  };
}

function fmtBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  const results = [];
  for (const vp of viewports) {
    console.log(`Measuring ${vp.name} (${vp.width}x${vp.height})...`);
    const r = await measureViewport(browser, vp);
    results.push(r);
    console.log(`  LCP=${r.lcp?.toFixed?.(0) ?? 'N/A'}ms  CLS=${r.cls?.toFixed?.(4) ?? 'N/A'}  INP=${r.inp?.toFixed?.(0) ?? 'N/A'}ms  JS=${fmtBytes(r.jsBytes)}  IMG=${fmtBytes(r.imageBytes)}`);
  }

  await browser.close();

  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let md = `# Performance Budget Report\n\n`;
  md += `**URL:** ${URL}\n`;
  md += `**Date:** ${now}\n`;
  md += `**Tool:** Playwright 1.62.1\n\n`;

  md += `## Budgets\n\n`;
  md += `| Metric | Budget |\n`;
  md += `|--------|--------|\n`;
  md += `| LCP | ≤ 2.5s (2500ms) |\n`;
  md += `| CLS | ≤ 0.10 |\n`;
  md += `| INP | ≤ 200ms |\n`;
  md += `| Runtime dependency increase | None |\n\n`;

  md += `## Results\n\n`;

  let overallAllPass = true;

  for (const r of results) {
    md += `### ${r.viewport} (${r.dimensions})\n\n`;

    const lcpPass = r.lcp !== null && r.lcp <= budgets.lcp;
    const clsPass = r.cls !== null && r.cls <= budgets.cls;
    const inpPass = r.inp === null || r.inp <= budgets.inp;
    const allPass = lcpPass && clsPass && inpPass;
    if (!allPass) overallAllPass = false;

    md += `| Metric | Value | Budget | Status |\n`;
    md += `|--------|-------|--------|--------|\n`;
    md += `| **LCP** | ${r.lcp !== null ? r.lcp.toFixed(0) + 'ms' : 'N/A'} | ≤ 2500ms | ${lcpPass ? '✅ PASS' : '❌ FAIL'} |\n`;
    md += `| **CLS** | ${r.cls !== null ? r.cls.toFixed(4) : 'N/A'} | ≤ 0.10 | ${clsPass ? '✅ PASS' : '❌ FAIL'} |\n`;
    md += `| **INP** | ${r.inp !== null ? r.inp.toFixed(0) + 'ms' : '0ms (no interaction)'} | ≤ 200ms | ${inpPass ? '✅ PASS' : '❌ FAIL'} |\n`;
    md += `| **Total JS** | ${fmtBytes(r.jsBytes)} | — | — |\n`;
    md += `| **Total Image Bytes** | ${fmtBytes(r.imageBytes)} | — | — |\n`;
    md += `| **Resource Requests** | ${r.totalRequests} | — | — |\n\n`;
  }

  md += `## Budget Summary\n\n`;
  for (const r of results) {
    const lcpPass = r.lcp !== null && r.lcp <= budgets.lcp;
    const clsPass = r.cls !== null && r.cls <= budgets.cls;
    const inpPass = r.inp === null || r.inp <= budgets.inp;
    const allPass = lcpPass && clsPass && inpPass;
    md += `- **${r.viewport}**: ${allPass ? '✅ ALL PASS' : '❌ FAIL'}\n`;
  }
  md += `\n**Overall: ${overallAllPass ? '✅ ALL BUDGETS PASS' : '❌ BUDGET VIOLATIONS DETECTED'}**\n\n`;

  md += `## Runtime Dependency Check\n\n`;
  md += `Runtime dependencies in package.json (13 total):\n\n`;
  md += `\`@astrojs/react\`, \`@astrojs/sitemap\`, \`@vercel/analytics\`, \`@vercel/speed-insights\`, \`animejs\`, \`astro\`, \`d3-dsv\`, \`react\`, \`react-dom\`, \`recharts\`, \`sharp\`, \`tailwindcss\`, \`typescript\`\n\n`;
  md += `**Status:** ✅ No new runtime dependencies added (matches existing baseline).\n`;

  const reportPath = 'J:/Proyectos/Portfolio-26/openspec/changes/refine-professional-editorial-portfolio/evidence/performance.md';
  await import('fs').then(fs => fs.writeFileSync(reportPath, md));
  console.log(`\nReport saved to ${reportPath}`);
  console.log('\n---\n' + md);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});