import { describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { PUBLIC_POSITIONING } from "../public-positioning.v1";

describe("public surface generator", () => {
  it("runs with the repository's TypeScript-aware Node command", () => {
    const outputDirectory = mkdtempSync(resolve(tmpdir(), "portfolio-public-surfaces-"));
    try {
      const result = spawnSync(
        process.execPath,
        ["--import", "tsx", "scripts/generate-public-surfaces.mjs", outputDirectory],
        { cwd: process.cwd(), encoding: "utf8" },
      );

      expect(result.status, result.stderr).toBe(0);
      const manifest = JSON.parse(
        readFileSync(resolve(outputDirectory, "manifest.json"), "utf8"),
      );
      const llms = readFileSync(resolve(outputDirectory, "llms.txt"), "utf8");
      expect(manifest.description).toBe(PUBLIC_POSITIONING.positioning.focus);
      expect(llms).toContain(PUBLIC_POSITIONING.siteUrl);
    } finally {
      rmSync(outputDirectory, { recursive: true, force: true });
    }
  });
});
