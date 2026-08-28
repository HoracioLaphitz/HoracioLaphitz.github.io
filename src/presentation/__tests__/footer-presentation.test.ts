import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const footerSource = readFileSync(
  resolve(process.cwd(), "src/presentation/components/layout/Footer.tsx"),
  "utf8",
);

describe("Footer presentation", () => {
  it("uses three desktop tracks within the shared content container", () => {
    expect(footerSource).toContain("max-w-content");
    expect(footerSource).toContain("grid-cols-1 sm:grid-cols-2 lg:grid-cols-3");
    expect(footerSource).not.toContain("lg:grid-cols-4");
  });
});
