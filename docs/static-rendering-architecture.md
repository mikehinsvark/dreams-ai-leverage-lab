# AI Leverage Lab Static Rendering Architecture

**Author:** Manus AI  
**Date:** July 22, 2026  
**Scope:** Crawler-visible initial HTML without a visual redesign

## Decision Summary

The site will retain its existing React components, CSS, assets, animations, and GitHub Pages release model. The rebuild will add a deterministic pre-render stage to the current Vite build rather than recreating the pages in a second framework. React will hydrate the markup already present in each page, so JavaScript becomes an enhancement layer for animation, scrolling, carousels, menus, copy controls, countdowns, and the registration iframe.

The current build already proves that the homepage, While You Sleep route, and all eight topic pages can be rendered safely in Node when Wouter receives an SSR path. The probe emitted complete markup for every route, including each H1, two to eight H2s, body copy, image elements, and existing anchors. The remaining work is to place that markup into each generated HTML document, replace navigation buttons with semantic links, and add route-specific metadata and factual schema.

## Route Ownership and Output Matrix

| Public route | Current ownership | Static-output method | Canonical target | Schema |
|---|---|---|---|---|
| `/` | React/Vite | React server render into the Vite shell | `https://aileveragelab.pro/` | `Organization`, `Person`, `Course` |
| `/whileyousleep/` | React/Vite | React server render with Wouter SSR path | `https://aileveragelab.pro/whileyousleep/` | `BreadcrumbList` |
| `/topics/prospecting/` | React/Vite data route | React server render with topic SSR path | Matching trailing-slash URL | `BreadcrumbList` |
| `/topics/followup/` | React/Vite data route | React server render with topic SSR path | Matching trailing-slash URL | `BreadcrumbList` |
| `/topics/automation/` | React/Vite data route | React server render with topic SSR path | Matching trailing-slash URL | `BreadcrumbList` |
| `/topics/content/` | React/Vite data route | React server render with topic SSR path | Matching trailing-slash URL | `BreadcrumbList` |
| `/topics/tools/` | React/Vite data route | React server render with topic SSR path | Matching trailing-slash URL | `BreadcrumbList` |
| `/topics/b2b/` | React/Vite data route | React server render with topic SSR path | Matching trailing-slash URL | `BreadcrumbList` |
| `/topics/curriculum/` | React/Vite data route | React server render with topic SSR path | Matching trailing-slash URL | `BreadcrumbList`, `Course` reference |
| `/topics/leadership/` | React/Vite data route | React server render with topic SSR path | Matching trailing-slash URL | `BreadcrumbList` |
| `/genies/` | Preserved standalone React bundle | Deterministic stored initial-DOM snapshot plus hydration of the existing bundle | `https://aileveragelab.pro/genies/` | `BreadcrumbList` |
| `/savemyseat/` | Standalone static HTML | Preserve body; normalize metadata, add schema and analytics | `https://aileveragelab.pro/savemyseat/` | `BreadcrumbList`, `Course` reference |
| `/curriculum/` | Preserved standalone static HTML | Generate `curriculum/index.html` from the existing static page and keep the legacy `.html` file | `https://aileveragelab.pro/curriculum/` | `BreadcrumbList`, `Course` |
| `/faq/` | Preserved standalone static HTML | Generate `faq/index.html` from the existing static page and keep the legacy `.html` file | `https://aileveragelab.pro/faq/` | `BreadcrumbList`, exact visible `FAQPage` data |
| `/tool-stack/` | Preserved standalone static HTML | Generate `tool-stack/index.html` from the existing static page and keep the legacy `.html` file | `https://aileveragelab.pro/tool-stack/` | `BreadcrumbList` |
| `/bundle/` | Preserved standalone static HTML | Preserve existing directory page; normalize metadata and analytics | `https://aileveragelab.pro/bundle/` | `BreadcrumbList` |
| `/404.html` | React/Vite fallback | Server-render the existing not-found component and mark `noindex` | Not applicable | None |

Directory URLs use trailing slashes because GitHub Pages serves each route from an `index.html` inside that directory. Internal navigation, canonicals, Open Graph URLs, and the sitemap will use the same URL form, eliminating the current client-side trailing-slash normalization and canonical disagreement.

## Build Pipeline

The client build remains the first stage. Vite emits the existing CSS, JavaScript, images, fonts, shared HTML shell, and copied standalone public files to `dist/public`.

A second Vite SSR build will compile `client/src/entry-server.tsx` to `dist/ssr/entry-server.js`. That entry wraps the unchanged application in Wouter’s `Router` with `ssrPath` and calls React 19 `renderToString`. React’s emitted image preload hints will remain in the hydrated root because they are part of the exact server/client render output.

The route generator will then import the SSR entry, render the homepage, While You Sleep, eight topic routes, and the not-found route, and inject each result into the existing `<div id="root"></div>` shell. The same pass will set the page title, description, canonical, Open Graph URL, and JSON-LD. It will never create a second copy of the visual content by hand.

The Genie route is the only exception because its editable React source is not present in the site repository or the connected GitHub account; only the compiled standalone bundle is available. Its current rendered root will therefore be captured once from the local build, normalized to the component’s initial state, saved as a versioned source snapshot, and injected into `/genies/index.html`. The bundle mount will hydrate that root when present and retain its current create-root fallback when the root is empty.

The existing release assembler will continue merging the source build with the preserved production artifact. After the merge, it will create canonical directory entry points for `curriculum`, `faq`, and `tool-stack`, normalize schema and analytics on preserved standalone pages, retain the GoHighLevel iframe unchanged, and write a sitemap whose URLs match the new self-referencing canonicals.

## Client Hydration Contract

`client/src/main.tsx` will call `hydrateRoot` whenever `#root` already has children and will retain `createRoot` only as a development or recovery fallback. The pre-rendered markup and the client’s first render will use the same route and component tree.

Browser APIs remain inside effects and event handlers. Intersection observers, scroll progress, mobile menus, carousels, copy buttons, countdown behavior, animated counters, and reduced-motion handling will initialize only after hydration. No effect will be required to reveal the core H1, H2s, body copy, navigation, or image alt text to a crawler.

## Semantic Navigation Contract

Route destinations and in-page section destinations will be emitted as anchors. Buttons remain buttons only when they change component state or invoke an action that has no navigable URL.

| Control class | Element after rebuild | Examples |
|---|---|---|
| Page or route navigation | `<a href>` or router link rendering an anchor | Brand home link, While You Sleep, topic cards, related topics, Save My Seat |
| In-page destination | `<a href="#section">` | Homepage About/Curriculum links, While You Sleep session rail, scroll cues, restart, back to top |
| State change | `<button>` | Mobile-menu toggle, Topics-menu toggle, carousel arrows/dots, calendar popover |
| Clipboard or retry action | `<button>` | Copy prompt, reload after an error |
| External resource | `<a href>` with appropriate `target` and `rel` | Claude Desktop, PDFs, Google Drive, email |

The styling classes, hover effects, focus rings, dimensions, and mobile breakpoints will be carried from the current elements to their semantic equivalents so the page remains visually unchanged.

## Structured Data Contract

The supplied schema package is treated as a draft, not pasted verbatim. All bracketed placeholders, unsupported social-profile claims, invented dates, and unverified Event fields are excluded.

The homepage will use one JSON-LD graph containing an `Organization`, a conservative `Person`, and a `Course`. The organization will identify AI Leverage Lab, its canonical URL, logo, description, and Dreams Business Resources relationship. The person will include Mike Hinsvark’s visible name, `Senior Agency Partner` title, Dreams Business Resources affiliation, site URL, and published contact email; it will not claim unsupported social profiles. The course will describe the visible 12-week online program, its audiences, its provider, a 60-minute class workload, the free `$0` offer, and the Save My Seat URL.

Inner pages will receive a factual `BreadcrumbList` whose final item exactly matches the self-referencing canonical. The curriculum route may repeat or reference the Course entity because it visibly describes the full program. The FAQ route may include an `FAQPage` graph generated from the exact visible questions and answers even though it is not being treated as a search-result guarantee.

No `Event` object will ship in this release. The visible pages describe a recurring weekly program but do not publish a fixed cohort start date, end date, registration-open date, or single event timestamp sufficient for a truthful Event object. Event schema can be added in a later dated-cohort release without changing the static-render architecture.

## Integration Preservation

The existing analytics loader and its production website identifier will remain exactly once on every page. The `aileveragelab:redirect` session-storage restoration script remains before the hydrated root in the shared shell. The Save My Seat page retains the Dreams Cloud/GoHighLevel iframe URL, form ID, data attributes, 440-pixel presentation, title, and surrounding static trust copy.

The homepage carousel, download links, While You Sleep Claude referral destination, Genies bundle, registration anchors, and standalone page styles will be validated from the assembled release artifact rather than from the source build alone.

## Acceptance Criteria

| Area | Required result |
|---|---|
| Raw source | Every public route’s response contains its visible H1, visible H2s, body copy, semantic internal links, image alt attributes, canonical, and valid JSON-LD where assigned. |
| Hydration | No React hydration mismatch, duplicate root, or client exception appears on the homepage, While You Sleep, a representative topic page, or Genies. |
| Visual parity | Desktop and 390×844 first folds preserve the baseline composition, typography, colors, imagery, spacing, and controls. |
| Navigation | All page destinations are discoverable from `href` values before JavaScript. In-page links retain smooth scrolling after hydration. |
| Integrations | Analytics fires once, session redirect restoration remains functional, PDFs and external referrals resolve, and the Save My Seat form loads and submits through the unchanged embedded provider. |
| Indexing signals | Canonical URLs, Open Graph URLs, internal links, sitemap entries, and directory output paths agree on the trailing-slash canonical form. |
| Release safety | The assembled GitHub Pages artifact preserves unrelated standalone files, `CNAME`, `robots.txt`, favicon assets, the homepage carousel, and the current custom-domain route behavior. |
