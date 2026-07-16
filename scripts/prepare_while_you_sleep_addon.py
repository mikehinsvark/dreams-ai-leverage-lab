#!/usr/bin/env python3
"""Prepare an add-on-only GitHub Pages release for AI Leverage Lab.

This script starts from a checkout of the current live `main` branch. It never
rebuilds or replaces the existing homepage. It copies the new route bundle and
its hashed assets, adds a guarded navigation link injection, and updates the
sitemap.
"""

from __future__ import annotations

import argparse
import hashlib
import shutil
from datetime import date
from pathlib import Path

NAV_START = "<!-- WHILE-YOU-SLEEP-NAV:START -->"
NAV_END = "<!-- WHILE-YOU-SLEEP-NAV:END -->"

NAV_INJECTION = r'''<!-- WHILE-YOU-SLEEP-NAV:START -->
<style id="while-you-sleep-nav-style">
  .while-you-sleep-nav-link {
    color: #e2b35d !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    transition: color 160ms cubic-bezier(.23,1,.32,1), text-shadow 160ms cubic-bezier(.23,1,.32,1), transform 160ms cubic-bezier(.23,1,.32,1) !important;
  }
  .while-you-sleep-nav-link:hover {
    color: #f3c86f !important;
    text-shadow: 0 0 14px rgba(226,179,93,.38) !important;
  }
  .while-you-sleep-nav-link:active { transform: scale(.97) !important; }
</style>
<script id="while-you-sleep-nav-script">
(() => {
  const addLinks = () => {
    const header = document.querySelector('header');
    if (!header) return;
    const starters = [...header.querySelectorAll('a')].filter(
      (link) => (link.textContent || '').trim() === 'Starter Guide'
    );
    starters.forEach((starter) => {
      const parent = starter.parentElement;
      if (!parent || parent.querySelector(':scope > .while-you-sleep-nav-link')) return;
      const link = document.createElement('a');
      link.href = '/whileyousleep';
      link.textContent = 'While You Sleep';
      link.className = `${starter.className} while-you-sleep-nav-link`;
      link.setAttribute('aria-label', 'Open While You Sleep AI Agent Training');
      parent.insertBefore(link, starter);
    });
  };
  addLinks();
  new MutationObserver(addLinks).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
</script>
<!-- WHILE-YOU-SLEEP-NAV:END -->'''

ROUTE_HEAD_INJECTION = r'''  <link rel="canonical" href="https://aileveragelab.pro/whileyousleep" />
  <meta name="description" content="Build a practical AI agent team for recruiting, follow-up, prospect research, and daily execution with AI Leverage Lab." />
  <meta property="og:title" content="While You Sleep | AI Leverage Lab" />
  <meta property="og:description" content="Build the team that clocks in when you clock out." />
  <meta property="og:url" content="https://aileveragelab.pro/whileyousleep" />
  <script>
    if (window.location.pathname === '/whileyousleep/') {
      window.history.replaceState(null, '', '/whileyousleep' + window.location.search + window.location.hash);
    }
  </script>
'''


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def strip_nav_injection(text: str) -> str:
    exact_block = NAV_INJECTION + "\n  "
    if exact_block in text:
        return text.replace(exact_block, "", 1)
    return text


def inject_navigation(index_path: Path) -> tuple[str, str]:
    original = index_path.read_text(encoding="utf-8")
    clean = strip_nav_injection(original)
    if "</body>" not in clean:
        raise RuntimeError("Live homepage is missing </body>; refusing to modify it")
    updated = clean.replace("</body>", f"{NAV_INJECTION}\n  </body>", 1)
    index_path.write_text(updated, encoding="utf-8")
    if sha256_text(strip_nav_injection(updated)) != sha256_text(clean):
        raise RuntimeError("Homepage preservation check failed")
    return sha256_text(clean), sha256_text(strip_nav_injection(updated))


def prepare_route(live_dir: Path, dist_dir: Path) -> None:
    route_dir = live_dir / "whileyousleep"
    route_dir.mkdir(parents=True, exist_ok=True)
    route_html = (dist_dir / "index.html").read_text(encoding="utf-8")
    if "</head>" not in route_html:
        raise RuntimeError("Route build is missing </head>")
    route_html = route_html.replace("</head>", f"{ROUTE_HEAD_INJECTION}</head>", 1)
    (route_dir / "index.html").write_text(route_html, encoding="utf-8")

    shutil.copytree(dist_dir / "assets", live_dir / "assets", dirs_exist_ok=True)
    icon = dist_dir / "while-you-sleep-icon.png"
    if icon.exists():
        shutil.copy2(icon, live_dir / icon.name)


def update_sitemap(sitemap_path: Path) -> None:
    text = sitemap_path.read_text(encoding="utf-8")
    if "https://aileveragelab.pro/whileyousleep" in text:
        return
    entry = f'''  <url>\n    <loc>https://aileveragelab.pro/whileyousleep</loc>\n    <lastmod>{date.today().isoformat()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n'''
    if "</urlset>" not in text:
        raise RuntimeError("Live sitemap is missing </urlset>")
    sitemap_path.write_text(text.replace("</urlset>", entry + "</urlset>", 1), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--live-dir", type=Path, required=True)
    parser.add_argument("--dist-dir", type=Path, required=True)
    args = parser.parse_args()

    if not (args.live_dir / "index.html").exists():
        raise SystemExit("Live checkout does not contain index.html")
    if not (args.dist_dir / "index.html").exists():
        raise SystemExit("Route build does not contain index.html")

    before, after = inject_navigation(args.live_dir / "index.html")
    prepare_route(args.live_dir, args.dist_dir)
    update_sitemap(args.live_dir / "sitemap.xml")

    print(f"homepage_without_injection_before={before}")
    print(f"homepage_without_injection_after={after}")
    print("homepage_preserved=yes")
    print(f"route_index={args.live_dir / 'whileyousleep' / 'index.html'}")


if __name__ == "__main__":
    main()
