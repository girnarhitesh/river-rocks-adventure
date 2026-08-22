/**
 * Post-build SSG prerender — injects route HTML into dist/index.html and subpages.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const serverDir = join(distDir, "server");
const templatePath = join(distDir, "index.html");

const { SITEMAP_ROUTES, PAGE_SEO, SITE_URL, DEFAULT_OG_IMAGE, getOrganizationSchema, getWebSiteSchema } =
  await import(pathToFileURL(join(root, "src/config/site.js")).href);

const ROUTES = SITEMAP_ROUTES.map(({ path }) => path);

const SEO_BY_PATH = {
  "/": PAGE_SEO.home,
  "/privacy-policy": PAGE_SEO.privacy,
  "/terms-and-conditions": PAGE_SEO.terms,
  "/river-rafting-rishikesh": PAGE_SEO.rafting,
  "/bungee-jumping-rishikesh": PAGE_SEO.bungee,
  "/river-side-camps-rishikesh": PAGE_SEO.camping,
};

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function applyHead(html, routePath) {
  const seo = SEO_BY_PATH[routePath] || PAGE_SEO.home;
  const canonicalUrl = absoluteUrl(seo.path || routePath);
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE);
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const keywords = seo.keywords ? escapeHtml(seo.keywords) : "";

  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description}" />`,
  );

  if (keywords) {
    out = out.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${keywords}" />`,
    );
  }

  if (routePath === "/") {
    const orgJson = JSON.stringify(getOrganizationSchema()).replace(/</g, "\\u003c");
    const siteJson = JSON.stringify(getWebSiteSchema()).replace(/</g, "\\u003c");
    const jsonLd = `
    <script type="application/ld+json" data-seo-jsonld="organization">${orgJson}</script>
    <script type="application/ld+json" data-seo-jsonld="website">${siteJson}</script>`;
    if (!out.includes('data-seo-jsonld="organization"')) {
      out = out.replace("</head>", `${jsonLd}\n  </head>`);
    }
  }

  return out;
}

function injectAppHtml(template, appHtml) {
  if (template.includes("<!--app-html-->")) {
    return template.replace("<!--app-html-->", appHtml);
  }
  return template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function routeOutputPath(routePath) {
  if (routePath === "/") return templatePath;
  const segments = routePath.replace(/^\//, "").split("/");
  return join(distDir, ...segments, "index.html");
}

console.log("Building SSR bundle…");
execSync("npx vite build --ssr src/entry-server.jsx --outDir dist/server", {
  cwd: root,
  stdio: "inherit",
});

const { render } = await import(pathToFileURL(join(serverDir, "entry-server.js")).href);
const template = readFileSync(templatePath, "utf8");

if (!template.includes("<!--app-html-->") && !template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html missing <!--app-html--> placeholder");
}

for (const routePath of ROUTES) {
  console.log(`Prerendering ${routePath}…`);
  const appHtml = render(routePath);
  let pageHtml = injectAppHtml(template, appHtml);
  pageHtml = applyHead(pageHtml, routePath);

  const outPath = routeOutputPath(routePath);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, pageHtml, "utf8");
  console.log(`  → ${outPath.replace(root, ".")} (${(pageHtml.length / 1024).toFixed(1)} KB)`);
}

if (existsSync(serverDir)) {
  rmSync(serverDir, { recursive: true, force: true });
  console.log("Removed dist/server");
}

console.log(`Prerendered ${ROUTES.length} routes.`);
