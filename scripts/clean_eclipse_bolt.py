from pathlib import Path
from PIL import Image, ImageFilter

source = Path("/home/ubuntu/webdev-static-assets/while-you-sleep-eclipse-bolt-final.png")
out = Path("client/src/assets/while-you-sleep/while-you-sleep-eclipse-bolt.png")

image = Image.open(source).convert("RGBA")
pixels = image.load()
for y in range(image.height):
    for x in range(image.width):
        r, g, b, _ = pixels[x, y]
        near_black = r < 9 and g < 9 and b < 12
        magenta_artifact = r > 75 and b > 75 and g < 130 and (r + b) > (2.15 * g + 90)
        if near_black or magenta_artifact:
            pixels[x, y] = (r, g, b, 0)

alpha = image.getchannel("A")
alpha = alpha.filter(ImageFilter.MedianFilter(3))
image.putalpha(alpha)

bbox = image.getbbox()
if not bbox:
    raise RuntimeError("Cleanup removed the entire generated mark")
image = image.crop(bbox)

canvas = Image.new("RGBA", (640, 640), (0, 0, 0, 0))
max_size = 540
scale = min(max_size / image.width, max_size / image.height)
resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
canvas.alpha_composite(resized, ((640 - resized.width) // 2, (640 - resized.height) // 2))
canvas.save(out, "PNG", optimize=True)
print(f"Saved {out}: {canvas.size}, {out.stat().st_size} bytes")
