import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("public security regression", () => {
  it("preserves the baseline CSP and deployment security headers", () => {
    const vercel = read("vercel.json");
    expect(vercel).toContain("Content-Security-Policy");
    expect(vercel).toContain("Strict-Transport-Security");
    expect(vercel).toContain("Permissions-Policy");
    expect(vercel).not.toMatch(/unsafe-eval|unsafe-inline[^']*script-src/i);
  });

  it("keeps public positioning static and free of new runtime data sources", () => {
    const surfaces = [
      read("src/presentation/layouts/Layout.astro"),
      read("src/presentation/components/sections/Hero.tsx"),
      read("src/presentation/components/layout/Footer.tsx"),
      read("src/presentation/components/sections/Contact.tsx"),
    ].join("\n");
    expect(surfaces).not.toMatch(/fetch\s*\(|EventSource|WebSocket/);
    expect(read("src/presentation/layouts/Layout.astro")).toContain("PUBLIC_POSITIONING");
  });
});
