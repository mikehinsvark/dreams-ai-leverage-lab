from __future__ import annotations

import os
import subprocess
from pathlib import Path

from bs4 import BeautifulSoup

TARGET_URL = os.environ.get(
    "GENIES_SNAPSHOT_URL",
    "https://aileveragelab.pro/genies/?static-snapshot=20260722",
)
PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = PROJECT_ROOT / "client/public/genies/static-root.html"

command = [
    "chromium",
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--virtual-time-budget=15000",
    "--dump-dom",
    TARGET_URL,
]
result = subprocess.run(
    command,
    check=True,
    capture_output=True,
    text=True,
    timeout=120,
)
soup = BeautifulSoup(result.stdout, "html.parser")
root = soup.select_one("#root")
if root is None:
    raise RuntimeError("The deployed Genie page did not contain #root.")
markup = root.decode_contents().strip()
if "AI Genie" not in markup or "Four specialist" not in markup:
    raise RuntimeError("The deployed Genie root did not contain the expected hero copy.")
OUTPUT_PATH.write_text(f"{markup}\n", encoding="utf-8")
print(f"captured_genies_static_root={OUTPUT_PATH}")
print(f"captured_genies_static_root_bytes={len(markup.encode('utf-8'))}")
