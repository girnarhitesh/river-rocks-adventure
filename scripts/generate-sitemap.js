/**
 * Regenerates public/sitemap.xml from src/config/site.js route definitions.
 * Run: npm run generate:sitemap
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_URL, SITEMAP_ROUTES } from "../src/config/site.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const lastmod = new Date().toISOString().slice(0, 10);

const urls = SITEMAP_ROUTES.map(
  ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path === "/" ? "/" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(join(__dirname, "../public/sitemap.xml"), sitemap, "utf8");
console.log(`Sitemap written to public/sitemap.xml (${SITEMAP_ROUTES.length} URLs)`);
