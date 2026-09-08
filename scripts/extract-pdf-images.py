"""Извлекает растровые изображения из презентации в docx/ в raw-каталог.
Одноразовый шаг: дальше scripts/optimize-images.mjs делает из них WebP.
Требует PyMuPDF: pip install pymupdf
"""
import glob
import hashlib
import os
import sys

import fitz

OUT = sys.argv[1] if len(sys.argv) > 1 else "scratch/raw"
os.makedirs(OUT, exist_ok=True)

pdf = glob.glob("docx/*.pdf")[0]
doc = fitz.open(pdf)

seen_hashes = {}
for page_index in range(doc.page_count):
    for img in doc[page_index].get_images(full=True):
        xref = img[0]
        info = doc.extract_image(xref)
        digest = hashlib.md5(info["image"]).hexdigest()[:8]
        if digest in seen_hashes:
            seen_hashes[digest].append(page_index + 1)
            continue
        seen_hashes[digest] = [page_index + 1]
        name = f"p{page_index + 1:02d}_x{xref}_{info['width']}x{info['height']}.{info['ext']}"
        with open(os.path.join(OUT, name), "wb") as fh:
            fh.write(info["image"])
        print(f"{name}  {len(info['image']) // 1024}KB")

dupes = {d: p for d, p in seen_hashes.items() if len(p) > 1}
print(f"\nуникальных: {len(seen_hashes)}, повторяющихся на нескольких страницах: {len(dupes)}")
for digest, pages in dupes.items():
    print(f"  {digest}: страницы {pages}")
