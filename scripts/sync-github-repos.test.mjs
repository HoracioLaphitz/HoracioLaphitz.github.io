import { describe, expect, it } from "vitest";
import { execFile } from "node:child_process";
import * as fs from "node:fs/promises";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  applyEditorialOverride,
  renderMarkdown,
  toProjectRecord,
  fetchRepositories,
  syncRepositories,
  MISSING_README_STATUS,
  PERFORMANCE_LIMITS,
} from "./sync-github-repos.mjs";

const execFileAsync = promisify(execFile);
const { mkdtemp, readFile, writeFile, readdir } = fs;

const repo = (name, page = 1) => ({ name, description: "A safe project", html_url: `https://github.com/HoracioLaphitz/${name.toLowerCase().replaceAll(" ", "-")}`, topics: ["data", "sql"], created_at: "2026-01-02T00:00:00Z", fork: false, page });

describe("github sync contract", () => {
  it("runs when invoked through the Windows-compatible CLI entrypoint", async () => {
    const scriptPath = path.resolve("scripts/sync-github-repos.mjs");
    const { stdout } = await execFileAsync(process.execPath, [scriptPath], {
      env: { ...process.env, GITHUB_SYNC_OFFLINE: "1" },
    });

    expect(stdout.trim()).toBe("GitHub sync skipped (offline mode)");
  });

  it("maps missing README to a canonical in-progress status and stable markdown", () => {
    const record = toProjectRecord(repo("Data Tool"), { hasReadme: false });
    expect(record.status).toBe(MISSING_README_STATUS);
    expect(renderMarkdown(record)).toContain('status: "Nuevo - en proceso"');
    expect(renderMarkdown(record)).toBe(renderMarkdown(record));
  });

  it("applies checked-in Spanish editorial copy after sanitizing GitHub data", () => {
    const record = toProjectRecord(repo("Autoencoder"));
    const edited = applyEditorialOverride(record, "Autoencoder");

    expect(edited.title).toBe("Autoencoder — Restauración de imágenes");
    expect(edited.description).toBe(
      "Red neuronal que reconstruye dígitos a partir de imágenes borrosas.",
    );
    expect(edited.github).toBe(record.github);
    expect(edited.tags).toEqual(record.tags);
  });

  it("rejects editorial override keys absent from the synchronized repository set", async () => {
    const outputDir = await mkdtemp(path.join(tmpdir(), "github-sync-"));
    const fetchImpl = async (url) => ({
      ok: true,
      json: async () => (url.includes("/readme") ? {} : [repo("Fresh")]),
    });

    await expect(
      syncRepositories({
        owner: "HoracioLaphitz",
        token: "fixture",
        fetchImpl,
        outputDir,
        editorialOverrides: {
          Unknown: { title: "Desconocido", description: "No corresponde." },
        },
      }),
    ).rejects.toThrow("Unknown editorial override key: Unknown");
  });

  it("retrieves paginated repositories without live network calls", async () => {
    const calls = [];
    const fetchImpl = async (url) => {
      calls.push(url);
      const page = new URL(url).searchParams.get("page");
      return { ok: true, json: async () => page === "1" ? Array.from({ length: 100 }, (_, i) => repo(`repo-${i}`, 1)) : [repo("repo-final", 2)] };
    };
    const repositories = await fetchRepositories({ fetchImpl });
    expect(repositories).toHaveLength(101);
    expect(calls).toHaveLength(2);
    expect(calls[1]).toContain("page=2");
  });

  it("removes stale generated entries while preserving curated entries", async () => {
    const outputDir = await mkdtemp(path.join(tmpdir(), "github-sync-"));
    await writeFile(path.join(outputDir, "curated.md"), "curated", "utf8");
    await writeFile(path.join(outputDir, "stale.md"), "stale", "utf8");
    await writeFile(path.join(outputDir, ".github-sync-manifest.json"), JSON.stringify({ slugs: ["stale"] }), "utf8");
    const fetchImpl = async (url) => ({ ok: true, json: async () => url.includes("/readme") ? {} : [repo("Fresh")] });
    await syncRepositories({ owner: "HoracioLaphitz", token: "fixture", fetchImpl, outputDir, editorialOverrides: {} });
    const files = await readdir(outputDir);
    expect(files).toEqual(expect.arrayContaining(["curated.md", "github-fresh.md", ".github-sync-manifest.json"]));
    expect(files).not.toContain("stale.md");
    expect(await readFile(path.join(outputDir, "curated.md"), "utf8")).toBe("curated");
  });

  it("retries rate limits and classifies a missing README without live calls", async () => {
    let attempts = 0;
    const fetchImpl = async (url) => {
      attempts += 1;
      if (url.includes("/readme")) return { ok: false, status: 404, json: async () => ({}) };
      if (attempts === 1) return { ok: false, status: 429, json: async () => ({ token: "secret" }) };
      return { ok: true, json: async () => [repo("Retry repo")] };
    };
    const outputDir = await mkdtemp(path.join(tmpdir(), "github-sync-"));
    const result = await syncRepositories({ owner: "HoracioLaphitz", token: "fixture", fetchImpl, outputDir, editorialOverrides: {} });
    expect(result.generated[0].status).toBe(MISSING_README_STATUS);
    expect(attempts).toBe(5);
  });

  it("retains the last valid snapshot when new synchronization fails", async () => {
    const outputDir = await mkdtemp(path.join(tmpdir(), "github-sync-"));
    await writeFile(path.join(outputDir, "last-valid.md"), "last valid", "utf8");
    const fetchImpl = async () => ({ ok: true, json: async () => [{ name: "Broken", html_url: "javascript:alert(1)" }] });
    await expect(syncRepositories({ owner: "HoracioLaphitz", token: "fixture", fetchImpl, outputDir, editorialOverrides: {} })).rejects.toThrow("Invalid GitHub URL");
    expect(await readFile(path.join(outputDir, "last-valid.md"), "utf8")).toBe("last valid");
  });

  it("does not delete the valid snapshot when the backup rename fails", async () => {
    const outputDir = await mkdtemp(path.join(tmpdir(), "github-sync-"));
    await writeFile(path.join(outputDir, "last-valid.md"), "last valid", "utf8");
    const fetchImpl = async (url) => ({ ok: true, json: async () => url.includes("/readme") ? {} : [repo("Fresh")] });
    const fileSystem = {
      ...fs,
      rename: async (from, to) => {
        if (from === outputDir) throw new Error("simulated backup failure");
        return fs.rename(from, to);
      },
    };

    await expect(syncRepositories({ owner: "HoracioLaphitz", token: "fixture", fetchImpl, outputDir, fileSystem, editorialOverrides: {} })).rejects.toThrow("simulated backup failure");
    expect(await readFile(path.join(outputDir, "last-valid.md"), "utf8")).toBe("last valid");
  });

  it("exposes bounded deterministic synchronization limits", () => {
    expect(PERFORMANCE_LIMITS.maxRepositories).toBe(500);
    expect(PERFORMANCE_LIMITS.maxPages).toBe(100);
    expect(PERFORMANCE_LIMITS.maxConcurrentRequests).toBe(1);
    expect(PERFORMANCE_LIMITS.maxRequestMs).toBeGreaterThan(0);
  });
});
