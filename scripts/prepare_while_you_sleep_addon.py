#!/usr/bin/env python3
"""Prepare an add-on-only GitHub Pages release for AI Leverage Lab.

This script starts from a checkout of the current live `main` branch. It never
rebuilds or replaces the existing homepage. It copies the new route bundles and
hashed assets, adds guarded navigation and CTA enhancements, and updates the
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
  .dbr-compact-seat-link {
    display: inline-flex !important;
    flex: 0 0 auto !important;
    width: auto !important;
    min-width: 0 !important;
    max-width: none !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 9px 15px !important;
    border-radius: 12px !important;
    font-size: 13px !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }
  @media (max-width: 1023px) {
    .dbr-compact-seat-link {
      flex: 1 1 0 !important;
      padding: 9px 13px !important;
    }
  }
  .dbr-genie-hero-link {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 0 0 auto !important;
    padding: 10px 14px !important;
    border-radius: 999px !important;
    background: oklch(0.62 0.18 280 / 0.10) !important;
    color: oklch(0.78 0.15 175) !important;
    border: 1px solid oklch(0.62 0.18 280 / 0.44) !important;
    box-shadow: 0 0 16px oklch(0.62 0.18 280 / 0.16) !important;
    font-size: clamp(0.72rem, 1.1vw, 0.82rem) !important;
    line-height: 1 !important;
    white-space: nowrap !important;
    text-decoration: none !important;
    transition: transform 160ms cubic-bezier(.23,1,.32,1), background 160ms cubic-bezier(.23,1,.32,1), box-shadow 160ms cubic-bezier(.23,1,.32,1) !important;
  }
  .dbr-genie-hero-link:hover {
    transform: scale(1.04) !important;
    background: oklch(0.62 0.18 280 / 0.18) !important;
    box-shadow: 0 0 22px oklch(0.62 0.18 280 / 0.28) !important;
  }
  .dbr-genie-hero-link:active { transform: scale(.97) !important; }
  @media (max-width: 639px) {
    .dbr-genie-action-row {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    }
    .dbr-genie-action-row > a:first-child { grid-column: 1 / -1 !important; }
    .dbr-genie-action-row > a:not(:first-child) {
      min-width: 0 !important;
      padding: 10px 7px !important;
      font-size: 0.68rem !important;
      justify-content: center !important;
      white-space: nowrap !important;
    }
  }
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

    const seats = [...header.querySelectorAll('a')].filter(
      (link) => (link.textContent || '').trim().startsWith('Save My Seat')
    );
    seats.forEach((seat) => {
      seat.href = '/savemyseat/';
      seat.classList.add('dbr-compact-seat-link');
      seat.setAttribute('aria-label', 'Open AI Leverage Lab registration');
    });

    const zoomLinks = [...document.querySelectorAll('a')].filter(
      (link) => (link.textContent || '').trim() === 'Zoom Link'
    );
    zoomLinks.forEach((zoom) => {
      const parent = zoom.parentElement;
      if (!parent || parent.querySelector(':scope > .dbr-genie-hero-link')) return;
      parent.classList.add('dbr-genie-action-row');
      const link = document.createElement('a');
      link.href = '/genies';
      link.textContent = 'AI Genie Team';
      link.className = `${zoom.className} dbr-genie-hero-link`;
      link.setAttribute('aria-label', 'Open AI Genie Team integrations');
      parent.insertBefore(link, zoom.nextSibling);
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
    start = text.find(NAV_START)
    end = text.find(NAV_END, start + len(NAV_START)) if start != -1 else -1
    if start == -1 and end == -1:
        return text
    if start == -1 or end == -1:
        raise RuntimeError("Homepage contains an incomplete managed navigation injection")
    end += len(NAV_END)
    while end < len(text) and text[end] in "\r\n ":
        end += 1
    return text[:start] + text[end:]


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


def prepare_signup_route(live_dir: Path, dist_dir: Path) -> None:
    signup_source = dist_dir / "savemyseat"
    if not (signup_source / "index.html").exists():
        raise RuntimeError("Build is missing savemyseat/index.html")
    shutil.copytree(signup_source, live_dir / "savemyseat", dirs_exist_ok=True)


def prepare_genies_route(live_dir: Path, dist_dir: Path) -> None:
    genies_source = dist_dir / "genies"
    if not (genies_source / "index.html").exists():
        raise RuntimeError("Build is missing genies/index.html")
    shutil.copytree(genies_source, live_dir / "genies", dirs_exist_ok=True)


def update_sitemap(sitemap_path: Path) -> None:
    text = sitemap_path.read_text(encoding="utf-8")
    if "</urlset>" not in text:
        raise RuntimeError("Live sitemap is missing </urlset>")
    routes = [
        ("https://aileveragelab.pro/whileyousleep", "0.9"),
        ("https://aileveragelab.pro/savemyseat", "1.0"),
        ("https://aileveragelab.pro/genies", "0.9"),
    ]
    entries = []
    for route, priority in routes:
        if f"<loc>{route}</loc>" in text:
            continue
        entries.append(
            f"  <url>\n    <loc>{route}</loc>\n    <lastmod>{date.today().isoformat()}</lastmod>\n"
            f"    <changefreq>monthly</changefreq>\n    <priority>{priority}</priority>\n  </url>\n"
        )
    if entries:
        text = text.replace("</urlset>", "".join(entries) + "</urlset>", 1)
        sitemap_path.write_text(text, encoding="utf-8")


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
    prepare_signup_route(args.live_dir, args.dist_dir)
    prepare_genies_route(args.live_dir, args.dist_dir)
    update_sitemap(args.live_dir / "sitemap.xml")

    print(f"homepage_without_injection_before={before}")
    print(f"homepage_without_injection_after={after}")
    print("homepage_preserved=yes")
    print(f"route_index={args.live_dir / 'whileyousleep' / 'index.html'}")
    print(f"signup_index={args.live_dir / 'savemyseat' / 'index.html'}")
    print(f"genies_index={args.live_dir / 'genies' / 'index.html'}")


if __name__ == "__main__":
    main()
