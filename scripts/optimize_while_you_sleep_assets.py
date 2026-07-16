from pathlib import Path
from PIL import Image

assets = Path("client/src/assets/while-you-sleep")
jobs = [
    ("while-you-sleep-hero.png", "while-you-sleep-hero.webp", 2048, 84),
    ("while-you-sleep-night-shift.png", "while-you-sleep-night-shift.webp", 1600, 84),
    ("while-you-sleep-duplicate.png", "while-you-sleep-duplicate.webp", 1440, 84),
]

for source_name, output_name, max_width, quality in jobs:
    source = assets / source_name
    output = assets / output_name
    with Image.open(source) as image:
        image = image.convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        image.save(output, "WEBP", quality=quality, method=6)
        print(f"{source_name} -> {output_name}: {image.width}x{image.height}, {output.stat().st_size} bytes")
