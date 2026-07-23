// Electric Blueprint pre-rendering: generate complete GitHub Pages documents from the exact React route tree.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const outputDir = path.resolve(projectRoot, "dist/public");
const templatePath = path.join(outputDir, "index.html");
const ssrEntryPath = path.resolve(projectRoot, "dist/ssr/entry-server.js");
const template = await readFile(templatePath, "utf8");
const { render } = await import(pathToFileURL(ssrEntryPath).href);

const homeDescription =
  "AI Leverage Lab is a 12-week live accelerator that helps independent producers use AI to prospect more, follow up better, and automate busywork—no coding required.";

const routes = [
  {
    outputPath: "",
    renderPath: "/",
    name: "AI Leverage Lab",
    title: "AI Leverage Lab™ — Live AI Training for Business Growth",
    description: homeDescription,
    schema: "home",
  },
  {
    outputPath: "whileyousleep",
    renderPath: "/whileyousleep/",
    name: "While You Sleep",
    title: "While You Sleep | AI Leverage Lab",
    description:
      "Build a practical AI agent team for recruiting, follow-up, prospect research, and daily execution with AI Leverage Lab.",
    schema: "breadcrumb",
  },
  {
    outputPath: "topics/prospecting",
    renderPath: "/topics/prospecting/",
    name: "AI Prospecting",
    title: "AI Prospecting | AI Leverage Lab",
    description: "Use AI to identify, research, and prioritize better prospects in less time.",
    schema: "breadcrumb",
  },
  {
    outputPath: "topics/followup",
    renderPath: "/topics/followup/",
    name: "AI Follow-Up Systems",
    title: "AI Follow-Up Systems | AI Leverage Lab",
    description: "Build consistent AI-assisted follow-up systems that keep opportunities moving.",
    schema: "breadcrumb",
  },
  {
    outputPath: "topics/automation",
    renderPath: "/topics/automation/",
    name: "Task Automation",
    title: "Task Automation | AI Leverage Lab",
    description: "Automate repetitive business tasks while preserving the human relationships that matter.",
    schema: "breadcrumb",
  },
  {
    outputPath: "topics/content",
    renderPath: "/topics/content/",
    name: "AI Content Systems",
    title: "AI Content Systems | AI Leverage Lab",
    description: "Create practical, repeatable AI content workflows for business growth.",
    schema: "breadcrumb",
  },
  {
    outputPath: "topics/tools",
    renderPath: "/topics/tools/",
    name: "AI Tool Stack",
    title: "AI Tool Stack | AI Leverage Lab",
    description: "Build a focused AI tool stack for prospecting, communication, research, and execution.",
    schema: "breadcrumb",
  },
  {
    outputPath: "topics/b2b",
    renderPath: "/topics/b2b/",
    name: "B2B Opportunity",
    title: "B2B Opportunity | AI Leverage Lab",
    description: "Explore AI-enabled B2B growth and recurring-income opportunities.",
    schema: "breadcrumb",
  },
  {
    outputPath: "topics/curriculum",
    renderPath: "/topics/curriculum/",
    name: "12-Week AI Accelerator",
    title: "12-Week AI Accelerator | AI Leverage Lab",
    description: "Review the complete 12-week AI Leverage Lab training journey.",
    schema: "breadcrumb",
  },
  {
    outputPath: "topics/leadership",
    renderPath: "/topics/leadership/",
    name: "AI Leadership",
    title: "AI Leadership | AI Leverage Lab",
    description: "Lead stronger teams with practical AI systems, coaching, and execution rhythms.",
    schema: "breadcrumb",
  },
];

function canonicalFor(outputPath) {
  return outputPath
    ? `https://aileveragelab.pro/${outputPath}/`
    : "https://aileveragelab.pro/";
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function breadcrumbSchema(route, canonical) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aileveragelab.pro/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: route.name,
        item: canonical,
      },
    ],
  };
}

function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://aileveragelab.pro/#organization",
        name: "AI Leverage Lab",
        alternateName: "AI Leverage Lab by Dreams Business Resources",
        url: "https://aileveragelab.pro/",
        logo: {
          "@type": "ImageObject",
          url: "https://aileveragelab.pro/favicon.svg",
        },
        description: homeDescription,
        parentOrganization: {
          "@type": "Organization",
          name: "Dreams Business Resources",
          url: "https://dreams.ceo",
        },
      },
      {
        "@type": "Person",
        "@id": "https://aileveragelab.pro/#mike-hinsvark",
        name: "Mike Hinsvark",
        jobTitle: "Senior Agency Partner",
        worksFor: {
          "@type": "Organization",
          name: "Dreams Business Resources",
          url: "https://dreams.ceo",
        },
        email: "mailto:mikeceo@gmail.com",
        url: "https://aileveragelab.pro/",
      },
      {
        "@type": "Course",
        "@id": "https://aileveragelab.pro/#course",
        name: "AI Leverage Lab — 12-Week Live AI Accelerator",
        description:
          "A 12-week live online training program for independent producers, agents, advisors, and entrepreneurs on using practical AI tools for prospecting, follow-up, content, and automation. No coding required.",
        provider: {
          "@id": "https://aileveragelab.pro/#organization",
        },
        url: "https://aileveragelab.pro/",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT1H",
          instructor: {
            "@id": "https://aileveragelab.pro/#mike-hinsvark",
          },
        },
        offers: {
          "@type": "Offer",
          category: "Free",
          price: 0,
          priceCurrency: "USD",
          url: "https://aileveragelab.pro/savemyseat/",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };
}

function courseDocumentSchema(route, canonical) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema(route, canonical),
      {
        "@type": "Course",
        "@id": "https://aileveragelab.pro/#course",
        name: "AI Leverage Lab — 12-Week Live AI Accelerator",
        description:
          "A 12-week live online training program for independent producers, agents, advisors, and entrepreneurs on using practical AI tools for prospecting, follow-up, content, and automation. No coding required.",
        provider: {
          "@type": "Organization",
          "@id": "https://aileveragelab.pro/#organization",
          name: "AI Leverage Lab",
          url: "https://aileveragelab.pro/",
        },
        url: "https://aileveragelab.pro/",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT1H",
          instructor: {
            "@type": "Person",
            "@id": "https://aileveragelab.pro/#mike-hinsvark",
            name: "Mike Hinsvark",
            jobTitle: "Senior Agency Partner",
          },
        },
        offers: {
          "@type": "Offer",
          category: "Free",
          price: 0,
          priceCurrency: "USD",
          url: "https://aileveragelab.pro/savemyseat/",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };
}

function schemaFor(route, canonical) {
  if (route.schema === "home") return homeSchema();
  if (route.schema === "breadcrumb") return breadcrumbSchema(route, canonical);
  if (route.schema === "course") return courseDocumentSchema(route, canonical);
  return null;
}

function replaceHeadMetadata(html, route, canonical, schema) {
  const title = escapeAttribute(route.title);
  const description = escapeAttribute(route.description);

  let result = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${description}" />`,
    )
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+property=["']og:(?:title|description|url|type)["'][^>]*>/gi, "")
    .replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");

  const headParts = [
    `  <link rel="canonical" href="${canonical}" />`,
    `  <meta property="og:title" content="${title}" />`,
    `  <meta property="og:description" content="${description}" />`,
    `  <meta property="og:url" content="${canonical}" />`,
    "  <meta property=\"og:type\" content=\"website\" />",
  ];

  if (schema) {
    headParts.push(
      `  <script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    );
  }

  return result.replace("</head>", `${headParts.join("\n")}\n</head>`);
}

const redirectRestorationScript = `    <script>
      (function () {
        var redirect = window.sessionStorage.getItem("aileveragelab:redirect");
        if (redirect) {
          window.sessionStorage.removeItem("aileveragelab:redirect");
          window.history.replaceState(null, "", redirect);
        }
      })();
    </script>`;

const analyticsScript = `    <script
      defer
      src="https://manus-analytics.com/umami"
      data-website-id="fc866902-2b74-419e-9a20-32b76c4c363f"></script>`;

function preserveCoreScripts(html) {
  let output = html;
  if (!output.includes("aileveragelab:redirect")) {
    output = output.replace(
      /<body([^>]*)>/i,
      (body) => `${body}\n${redirectRestorationScript}`,
    );
  }
  if (!output.includes("https://manus-analytics.com/umami")) {
    output = output.replace(/<\/body>/i, `${analyticsScript}\n  </body>`);
  }
  return output;
}

function normalizeInternalRouteLinks(html) {
  return html.replace(
    /href=(["'])\/(curriculum|faq|tool-stack|genies|savemyseat|whileyousleep|bundle)(?:\/)?(?=[?#]|\1)/gi,
    (_match, quote, route) => `href=${quote}/${route}/`,
  );
}

function injectRoot(html, markup) {
  const emptyRoot = '<div id="root"></div>';
  if (!html.includes(emptyRoot)) {
    throw new Error("Static-render template no longer contains the expected empty root.");
  }
  return html.replace(emptyRoot, `<div id="root">${markup}</div>`);
}

for (const route of routes) {
  const canonical = canonicalFor(route.outputPath);
  const schema = schemaFor(route, canonical);
  const markup = render(route.renderPath);
  const html = injectRoot(
    preserveCoreScripts(
      replaceHeadMetadata(template, route, canonical, schema),
    ),
    markup,
  );
  const directory = route.outputPath
    ? path.join(outputDir, route.outputPath)
    : outputDir;
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html, "utf8");
}

const geniesRoute = {
  outputPath: "genies",
  name: "AI Genie Team",
  title: "AI Genie Team | AI Leverage Lab",
  description:
    "Meet a practical AI Genie Team for recruiting, prospect research, follow-up, reporting, and daily business execution.",
  schema: "breadcrumb",
};
const geniesCanonical = canonicalFor(geniesRoute.outputPath);
const geniesFilePath = path.join(outputDir, "genies/index.html");
const geniesStaticRoot = await readFile(
  path.join(outputDir, "genies/static-root.html"),
  "utf8",
);
const geniesWrapper = await readFile(geniesFilePath, "utf8");
const geniesHtml = injectRoot(
  preserveCoreScripts(
    replaceHeadMetadata(
      geniesWrapper,
      geniesRoute,
      geniesCanonical,
      schemaFor(geniesRoute, geniesCanonical),
    ),
  ),
  geniesStaticRoot.trim(),
);
await writeFile(geniesFilePath, geniesHtml, "utf8");

const preservedStaticDocuments = [
  {
    files: ["curriculum/index.html", "curriculum.html"],
    outputPath: "curriculum",
    name: "12-Week Curriculum",
    title: "12-Week AI Accelerator Curriculum | AI Leverage Lab",
    description:
      "Explore the complete 12-week AI Leverage Lab curriculum for prospecting, follow-up, content, automation, client experience, and growth.",
    schema: "course",
  },
  {
    files: ["faq/index.html", "faq.html"],
    outputPath: "faq",
    name: "Frequently Asked Questions",
    title: "AI Leverage Lab FAQ",
    description:
      "Answers about the AI Leverage Lab 12-week live accelerator, schedule, tools, experience level, access, and registration.",
    schema: "breadcrumb",
  },
  {
    files: ["tool-stack/index.html", "tool-stack.html"],
    outputPath: "tool-stack",
    name: "AI Tool Stack",
    title: "AI Tool Stack | AI Leverage Lab",
    description:
      "Review the focused AI tools used throughout AI Leverage Lab for research, prospecting, follow-up, content, and automation.",
    schema: "breadcrumb",
  },
  {
    files: ["savemyseat/index.html"],
    outputPath: "savemyseat",
    name: "Save My Seat",
    title: "Save My Seat | AI Leverage Lab",
    description:
      "Reserve your seat for AI Leverage Lab, a free 12-week live online AI accelerator for independent producers and business builders.",
    schema: "course",
  },
  {
    files: ["bundle/index.html"],
    outputPath: "bundle",
    name: "Dreams Cloud Agency Bundle",
    title: "Dreams Cloud Agency Bundle | AI Leverage Lab",
    description:
      "Explore the Dreams Cloud Agency Bundle and the connected AI, CRM, recruiting, and growth systems available to business builders.",
    schema: "breadcrumb",
  },
];

for (const route of preservedStaticDocuments) {
  const canonical = canonicalFor(route.outputPath);
  const schema = schemaFor(route, canonical);
  for (const relativePath of route.files) {
    const filePath = path.join(outputDir, relativePath);
    const html = await readFile(filePath, "utf8");
    await writeFile(
      filePath,
      normalizeInternalRouteLinks(
        preserveCoreScripts(
          replaceHeadMetadata(html, route, canonical, schema),
        ),
      ),
      "utf8",
    );
  }
}

const notFoundRoute = {
  name: "Page Not Found",
  title: "Page Not Found | AI Leverage Lab",
  description: "The requested AI Leverage Lab page could not be found.",
};
const notFoundMarkup = render("/404");
const notFound = injectRoot(
  preserveCoreScripts(
    replaceHeadMetadata(template, notFoundRoute, "https://aileveragelab.pro/404", null)
      .replace("</head>", '  <meta name="robots" content="noindex" />\n</head>'),
  ),
  notFoundMarkup,
);
await writeFile(path.join(outputDir, "404.html"), notFound, "utf8");

const sitemapEntries = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "savemyseat", changefreq: "weekly", priority: "1.0" },
  { path: "whileyousleep", changefreq: "monthly", priority: "0.9" },
  { path: "genies", changefreq: "monthly", priority: "0.9" },
  { path: "curriculum", changefreq: "monthly", priority: "0.9" },
  { path: "faq", changefreq: "monthly", priority: "0.7" },
  { path: "tool-stack", changefreq: "monthly", priority: "0.7" },
  { path: "bundle", changefreq: "monthly", priority: "0.7" },
  ...routes
    .filter((route) => route.outputPath.startsWith("topics/"))
    .map((route) => ({
      path: route.outputPath,
      changefreq: "monthly",
      priority: "0.7",
    })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${canonicalFor(entry.path)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(outputDir, "sitemap.xml"), sitemap, "utf8");

console.log(`prerendered_route_entries=${routes.length}`);
console.log("prerendered_genies=genies/index.html");
console.log(`normalized_static_documents=${preservedStaticDocuments.length}`);
console.log(`sitemap_entries=${sitemapEntries.length}`);
console.log("prerendered_not_found=404.html");
