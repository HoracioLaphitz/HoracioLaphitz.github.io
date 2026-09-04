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

  it("includes all required security headers in vercel.json", () => {
    const vercel = read("vercel.json");
    const requiredHeaders = [
      "X-Frame-Options",
      "X-Content-Type-Options",
      "X-XSS-Protection",
      "Referrer-Policy",
      "Permissions-Policy",
      "Strict-Transport-Security",
      "Content-Security-Policy",
    ];
    for (const header of requiredHeaders) {
      expect(vercel, `Missing header: ${header}`).toContain(header);
    }
  });

  it("allows only generated notebooks to be framed from the same origin", () => {
    const config = JSON.parse(read("vercel.json"));
    const general = config.headers.find(({ source }: { source: string }) => source === "/(.*)");
    const notebooks = config.headers.find(
      ({ source }: { source: string }) => source === "/notebooks-html/(.*)",
    );
    const value = (entry: { headers: { key: string; value: string }[] }, key: string) =>
      entry.headers.find((header) => header.key === key)?.value;

    expect(value(general, "X-Frame-Options")).toBe("DENY");
    expect(value(general, "Content-Security-Policy")).toContain("frame-ancestors 'none'");
    expect(value(notebooks, "X-Frame-Options")).toBe("SAMEORIGIN");
    expect(value(notebooks, "Content-Security-Policy")).toContain("frame-ancestors 'self'");
  });

  it("includes security policy files", () => {
    expect(() => read("SECURITY.md")).not.toThrow();
    expect(() => read("CONTRIBUTING.md")).not.toThrow();
  });

  it("has dependabot configured for dependency updates", () => {
    const dependabot = read(".github/dependabot.yml");
    expect(dependabot).toContain("package-ecosystem");
    expect(dependabot).toContain("npm");
  });

  it("does not expose secrets in error messages", () => {
    const errorState = read("src/presentation/components/dashboards/shared/ErrorState.tsx");
    expect(errorState).toContain("sanitizeErrorMessage");
    expect(errorState).not.toMatch(/message:\s*string.*\n.*return\s+message/);
  });
});
