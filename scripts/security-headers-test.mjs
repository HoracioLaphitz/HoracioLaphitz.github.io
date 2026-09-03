#!/usr/bin/env node

/**
 * Security headers smoke test
 * Validates that all deployed routes return expected security headers.
 */

import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:4321";
const TIMEOUT_MS = 30000;

const REQUIRED_HEADERS = {
    "x-frame-options": "DENY",
    "x-content-type-options": "nosniff",
    "x-xss-protection": "1; mode=block",
    "referrer-policy": "strict-origin-when-cross-origin",
    "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
    "content-security-policy": "default-src",
};

const PERMISSIONS_POLICY_REQUIRED = ["camera=()", "microphone=()", "geolocation=()"];

const ROUTES = ["/", "/projects", "/gracias"];

async function testHeaders() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    let failures = 0;

    for (const route of ROUTES) {
        const url = `${BASE_URL}${route}`;
        const response = await page.goto(url, { waitUntil: "networkidle", timeout: TIMEOUT_MS });

        if (!response) {
            console.error(`[FAIL] ${route} — no response`);
            failures++;
            continue;
        }

        const headers = response.headers();

        for (const [key, expectedValue] of Object.entries(REQUIRED_HEADERS)) {
            const actual = headers[key];
            if (!actual) {
                console.error(`[FAIL] ${route} — missing header: ${key}`);
                failures++;
            } else if (key === "content-security-policy") {
                if (!actual.includes(expectedValue)) {
                    console.error(`[FAIL] ${route} — CSP too weak: ${actual.slice(0, 80)}...`);
                    failures++;
                }
            } else if (actual !== expectedValue) {
                console.error(`[FAIL] ${route} — ${key}: expected "${expectedValue}", got "${actual}"`);
                failures++;
            }
        }

        const permsPolicy = headers["permissions-policy"];
        if (permsPolicy) {
            for (const required of PERMISSIONS_POLICY_REQUIRED) {
                if (!permsPolicy.includes(required)) {
                    console.error(`[FAIL] ${route} — Permissions-Policy missing ${required}`);
                    failures++;
                }
            }
        }

        if (failures === 0) {
            console.log(`[OK] ${route}`);
        }
    }

    await browser.close();

    if (failures > 0) {
        console.error(`\n${failures} security header check(s) failed`);
        process.exit(1);
    } else {
        console.log("\nAll security header checks passed");
    }
}

testHeaders().catch((err) => {
    console.error("Security headers test crashed:", err.message);
    process.exit(1);
});
