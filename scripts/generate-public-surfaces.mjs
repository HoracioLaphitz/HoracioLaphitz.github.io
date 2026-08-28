import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PUBLIC_POSITIONING } from "../src/data/public-positioning.v1.ts";

const outputDirectory = resolve(process.argv[2] ?? "public");

const manifest = {
  name: `${PUBLIC_POSITIONING.identity.name} - ${PUBLIC_POSITIONING.identity.role}`,
  short_name: "HL Portfolio",
  description: PUBLIC_POSITIONING.positioning.focus,
  start_url: "/",
  display: "standalone",
  background_color: "#0F172A",
  theme_color: "#1890FF",
  orientation: "portrait-primary",
  icons: [
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='192' height='192'%3E%3Ccircle cx='50' cy='50' r='50' fill='%231a202c'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='Arial, sans-serif' font-size='50' font-weight='bold' fill='white'%3EHL%3C/text%3E%3C/svg%3E",
      sizes: "192x192",
      type: "image/svg+xml",
    },
  ],
  categories: ["portfolio", "professional", "data-analysis"],
  lang: "es",
};

const llms = `# ${PUBLIC_POSITIONING.identity.name} — ${PUBLIC_POSITIONING.identity.role}

> ${PUBLIC_POSITIONING.positioning.focus}. Estado: ${PUBLIC_POSITIONING.positioning.qualification}.

## About

- **Name:** ${PUBLIC_POSITIONING.identity.name}
- **Role:** ${PUBLIC_POSITIONING.identity.role}
- **Focus:** ${PUBLIC_POSITIONING.positioning.focus}
- **Email:** ${PUBLIC_POSITIONING.contact.email}

## Links

- Portfolio: ${PUBLIC_POSITIONING.siteUrl}
- GitHub: ${PUBLIC_POSITIONING.contact.github}
- LinkedIn: ${PUBLIC_POSITIONING.contact.linkedin}

## Evidence status

Enterprise-AI capability areas without qualifying delivery evidence are marked as In development or Currently deepening expertise in. Existing analytics and data projects remain Portfolio project evidence.

## Sitemap

- ${PUBLIC_POSITIONING.siteUrl}/sitemap-index.xml
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(resolve(outputDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(resolve(outputDirectory, "llms.txt"), llms);
