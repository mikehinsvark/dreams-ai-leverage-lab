// Quantum Bolt command-deck deployment support: every GitHub Pages route
// is generated from the exact current Vite bundle so direct loads never serve stale UI.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve(process.cwd(), "dist/public");
const templatePath = path.join(outputDir, "index.html");
const template = await readFile(templatePath, "utf8");

const routes = [
  {
    path: "whileyousleep",
    title: "While You Sleep | AI Leverage Lab",
    description:
      "Build a practical AI agent team for recruiting, follow-up, prospect research, and daily execution with AI Leverage Lab.",
  },
  {
    path: "topics/prospecting",
    title: "AI Prospecting | AI Leverage Lab",
    description: "Use AI to identify, research, and prioritize better prospects in less time.",
  },
  {
    path: "topics/followup",
    title: "AI Follow-Up Systems | AI Leverage Lab",
    description: "Build consistent AI-assisted follow-up systems that keep opportunities moving.",
  },
  {
    path: "topics/automation",
    title: "Task Automation | AI Leverage Lab",
    description: "Automate repetitive business tasks while preserving the human relationships that matter.",
  },
  {
    path: "topics/content",
    title: "AI Content Systems | AI Leverage Lab",
    description: "Create practical, repeatable AI content workflows for business growth.",
  },
  {
    path: "topics/tools",
    title: "AI Tool Stack | AI Leverage Lab",
    description: "Build a focused AI tool stack for prospecting, communication, research, and execution.",
  },
  {
    path: "topics/b2b",
    title: "B2B Opportunity | AI Leverage Lab",
    description: "Explore AI-enabled B2B growth and recurring-income opportunities.",
  },
  {
    path: "topics/curriculum",
    title: "12-Week AI Accelerator | AI Leverage Lab",
    description: "Review the complete 12-week AI Leverage Lab training journey.",
  },
  {
    path: "topics/leadership",
    title: "AI Leadership | AI Leverage Lab",
    description: "Lead stronger teams with practical AI systems, coaching, and execution rhythms.",
  },
];

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function routeHtml(route) {
  const canonical = `https://aileveragelab.pro/${route.path}`;
  const title = escapeAttribute(route.title);
  const description = escapeAttribute(route.description);
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${description}" />`,
    );

  const head = [
    `  <link rel="canonical" href="${canonical}" />`,
    `  <meta property="og:title" content="${title}" />`,
    `  <meta property="og:description" content="${description}" />`,
    `  <meta property="og:url" content="${canonical}" />`,
    "  <script>",
    "    if (window.location.pathname.length > 1 && window.location.pathname.endsWith('/')) {",
    "      window.history.replaceState(null, '', window.location.pathname.slice(0, -1) + window.location.search + window.location.hash);",
    "    }",
    "  </script>",
  ].join("\n");

  return html.replace("</head>", `${head}\n</head>`);
}

for (const route of routes) {
  const directory = path.join(outputDir, route.path);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), routeHtml(route), "utf8");
}

const notFound = template.replace(
  "</head>",
  '  <meta name="robots" content="noindex" />\n</head>',
);
await writeFile(path.join(outputDir, "404.html"), notFound, "utf8");

console.log(`static_route_entries=${routes.length}`);
console.log("static_spa_fallback=404.html");
