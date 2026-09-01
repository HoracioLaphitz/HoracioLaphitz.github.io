import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

export const DEFAULT_OWNER = "HoracioLaphitz";
export const GENERATED_DIR = path.resolve("src/content/proyectos/github");
export const MANIFEST_FILE = path.join(GENERATED_DIR, ".github-sync-manifest.json");
export const MISSING_README_STATUS = "Nuevo - en proceso";
export const PERFORMANCE_LIMITS = Object.freeze({ maxRepositories: 500, maxPages: 100, maxRequestMs: 10_000, maxConcurrentRequests: 1 });

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RETRIES = 2;

const asSafeText = (value, fallback = "") => {
  if (typeof value !== "string") return fallback;
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 2_000);
};

export const slugify = (value) => {
  const slug = asSafeText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) throw new Error("Repository name cannot produce a valid slug");
  return slug.slice(0, 80);
};

const quote = (value) => JSON.stringify(value);

export function toProjectRecord(repo, { hasReadme = true } = {}) {
  if (!repo || typeof repo.name !== "string") throw new Error("Invalid GitHub repository: missing name");
  const name = asSafeText(repo.name);
  const url = typeof repo.html_url === "string" && /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(repo.html_url)
    ? repo.html_url
    : (() => { throw new Error(`Invalid GitHub URL for repository ${name}`); })();
  const description = asSafeText(repo.description, `Repository ${name}`) || `Repository ${name}`;
  const topics = Array.isArray(repo.topics) ? repo.topics.filter((topic) => typeof topic === "string").map((topic) => asSafeText(topic)).filter(Boolean).slice(0, 12) : [];
  const pubDate = new Date(repo.created_at || repo.updated_at || Date.now());
  if (Number.isNaN(pubDate.valueOf())) throw new Error(`Invalid date for repository ${name}`);
  return {
    slug: slugify(name), title: name, description, category: "Análisis de datos", tags: topics,
    pubDate: pubDate.toISOString(), github: url, maturity: hasReadme ? "Portfolio project" : "In development",
    status: hasReadme ? undefined : MISSING_README_STATUS,
  };
}

export function renderMarkdown(record) {
  const lines = ["---", `title: ${quote(record.title)}`, `description: ${quote(record.description)}`, `pubDate: ${quote(record.pubDate)}`, `author: ${quote("Horacio Laphitz")}`, `category: ${quote(record.category)}`, `tags: ${JSON.stringify(record.tags)}`, `github: ${quote(record.github)}`, `maturity: ${quote(record.maturity)}`];
  if (record.status) lines.push(`status: ${quote(record.status)}`);
  lines.push("---", "", `<!-- generated-by: github-auto-sync-platform; slug: ${record.slug} -->`, "");
  return `${lines.join("\n")}\n`;
}

async function requestJson(url, { token, fetchImpl = fetch, timeoutMs = REQUEST_TIMEOUT_MS } = {}) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, { headers: { Accept: "application/vnd.github+json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, signal: controller.signal });
      if (response.ok) return response.json();
      const retryable = response.status === 429 || response.status === 403 || response.status >= 500;
      if (!retryable || attempt === MAX_RETRIES) throw new Error(`GitHub request failed (${response.status})`);
      await new Promise((resolve) => setTimeout(resolve, 100 * 2 ** attempt));
    } catch (error) {
      if (/GitHub request failed \(4\d\d\)/.test(error?.message ?? "") && !/\(403\)|\(429\)/.test(error.message)) throw error;
      if (attempt === MAX_RETRIES) throw new Error(error?.name === "AbortError" ? "GitHub request timed out" : `GitHub request failed: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 100 * 2 ** attempt));
    } finally { clearTimeout(timer); }
  }
  throw new Error("GitHub request failed");
}

export async function fetchRepositories({ owner = DEFAULT_OWNER, token, fetchImpl = fetch } = {}) {
  const repositories = [];
  for (let page = 1; page <= PERFORMANCE_LIMITS.maxPages; page += 1) {
    const batch = await requestJson(`https://api.github.com/users/${encodeURIComponent(owner)}/repos?type=public&per_page=100&page=${page}`, { token, fetchImpl });
    if (!Array.isArray(batch)) throw new Error("GitHub returned an invalid repository list");
    repositories.push(...batch.filter((repo) => repo && repo.fork !== true));
    if (repositories.length > PERFORMANCE_LIMITS.maxRepositories) throw new Error(`GitHub repository limit exceeded (${PERFORMANCE_LIMITS.maxRepositories})`);
    if (batch.length < 100) break;
  }
  return repositories.sort((a, b) => String(a.name).localeCompare(String(b.name), "en", { sensitivity: "base" }));
}

export async function syncRepositories({ owner = process.env.GITHUB_OWNER || DEFAULT_OWNER, token = process.env.GITHUB_TOKEN, fetchImpl = fetch, outputDir = GENERATED_DIR, fileSystem = fs } = {}) {
  if (process.env.GITHUB_SYNC_OFFLINE === "1" || (!token && process.env.GITHUB_SYNC_ALLOW_UNAUTH !== "1")) return { generated: [], offline: true };
  const repositories = await fetchRepositories({ owner, token, fetchImpl });
  const records = [];
  for (const repo of repositories) {
    let hasReadme = true;
    try { await requestJson(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo.name)}/readme`, { token, fetchImpl }); }
    catch (error) { if (!String(error.message).includes("(404)")) throw error; hasReadme = false; }
    records.push(toProjectRecord(repo, { hasReadme }));
  }
  await fileSystem.mkdir(outputDir, { recursive: true });
  const existing = await fileSystem.readdir(outputDir, { withFileTypes: true }).catch(() => []);
  const priorManifest = await fileSystem.readFile(path.join(outputDir, ".github-sync-manifest.json"), "utf8").then(JSON.parse).catch(() => ({ slugs: [] }));
  const priorGenerated = new Set(Array.isArray(priorManifest.slugs) ? priorManifest.slugs : []);
  const curated = new Set();
  for (const entry of existing) if (entry.isFile() && entry.name.endsWith(".md") && !entry.name.startsWith("_") && !priorGenerated.has(entry.name.slice(0, -3))) curated.add(entry.name.slice(0, -3));
  const selected = records.filter((record) => !curated.has(record.slug));
  const tempDir = `${outputDir}.tmp-${process.pid}`;
  await fileSystem.rm(tempDir, { recursive: true, force: true });
  await fileSystem.mkdir(tempDir, { recursive: true });
  await Promise.all([...curated].map((slug) => fileSystem.copyFile(path.join(outputDir, `${slug}.md`), path.join(tempDir, `${slug}.md`))));
  await Promise.all(selected.map((record) => fileSystem.writeFile(path.join(tempDir, `${record.slug}.md`), renderMarkdown(record), "utf8")));
  await fileSystem.writeFile(path.join(tempDir, ".github-sync-manifest.json"), `${JSON.stringify({ generatedBy: "github-auto-sync-platform", slugs: selected.map(({ slug }) => slug), curatedPrecedence: true }, null, 2)}\n`, "utf8");
  const backupDir = `${outputDir}.backup-${process.pid}`;
  await fileSystem.rm(backupDir, { recursive: true, force: true });
  let swapStarted = false;
  try {
    await fileSystem.rename(outputDir, backupDir);
    swapStarted = true;
    await fileSystem.rename(tempDir, outputDir);
    await fileSystem.rm(backupDir, { recursive: true, force: true });
  } catch (error) {
    if (swapStarted) {
      await fileSystem.rm(outputDir, { recursive: true, force: true });
      await fileSystem.rename(backupDir, outputDir).catch(() => {});
    }
    await fileSystem.rm(tempDir, { recursive: true, force: true });
    throw new Error(`GitHub snapshot replacement failed: ${error.message}`);
  }
  return { generated: selected, offline: false };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  syncRepositories().then(({ generated, offline }) => console.log(offline ? "GitHub sync skipped (offline mode)" : `GitHub sync generated ${generated.length} repositories`)).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
