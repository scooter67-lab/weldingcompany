"""Готовит ассеты логотипа из docx/logoWC.png.

Исходник — RGB на белом фоне: знак + вордмарк + двухстрочный слоган.

Слоган не переносим. В оригинале его высота — 0.14 от высоты знака, то есть
при знаке 40px в шапке он был бы ~8px и нечитаем: полный локап рассчитан на
крупный формат. В шапке используется компактная форма «знак + вордмарк»,
а слоган остаётся переводимым текстом в футере.

Границы элементов определяются автоматически по профилям заливки и режутся
вплотную к краске — иначе поля внутри картинки ломают пропорции в вёрстке.

Запуск: python scripts/prepare-logo.py
Требует Pillow.
"""

import os

from PIL import Image, ImageDraw

SRC = "docx/logoWC.png"
OUT = "public/images"

# Самый тёмный тон логотипа — по нему нормируется маска вордмарка
INK_MIN_L = 35

os.makedirs(OUT, exist_ok=True)
src = Image.open(SRC).convert("RGB")
w, h = src.size
mask = src.convert("L").point(lambda v: 255 if v < 240 else 0)


def profile(img, axis):
    """Средняя заливка по столбцам (axis='x') или строкам (axis='y')."""
    if axis == "x":
        line = img.resize((img.width, 1), Image.BOX).load()
        return [line[i, 0] for i in range(img.width)]
    line = img.resize((1, img.height), Image.BOX).load()
    return [line[0, i] for i in range(img.height)]


def split(values, lo, hi, min_gap):
    """Границы пустых промежутков шире min_gap внутри [lo, hi]."""
    out, run = [], None
    for i in range(lo, hi):
        if values[i] < 3:
            run = i if run is None else run
        else:
            if run is not None and i - run > min_gap:
                out.append((run, i))
            run = None
    return out


x0, y0, x1, y1 = mask.getbbox()
mark_end, text_start = split(profile(mask, "x"), x0, x1, 25)[0]

# Плотная обрезка каждого элемента по его собственной краске
mark_box = mask.crop((x0, y0, mark_end, y1)).getbbox()
mark_box = (x0 + mark_box[0], y0 + mark_box[1], x0 + mark_box[2], y0 + mark_box[3])

# Сначала обрезаем текстовый блок по краске, иначе верхний отступ
# сам читается как разрыв между вордмарком и слоганом
text_full = mask.crop((text_start, y0, x1, y1))
tb = text_full.getbbox()
text = text_full.crop(tb)
tx, ty = text_start + tb[0], y0 + tb[1]

word_end, _ = split(profile(text, "y"), 0, text.height, 12)[0]
wb = text.crop((0, 0, text.width, word_end)).getbbox()
word_box = (tx + wb[0], ty + wb[1], tx + wb[2], ty + wb[3])

mark_h = mark_box[3] - mark_box[1]
word_h = word_box[3] - word_box[1]
print("пропорции оригинала:")
print(f"  знак           {mark_box[2] - mark_box[0]}x{mark_h}")
print(f"  вордмарк       {word_box[2] - word_box[0]}x{word_h}  = {word_h / mark_h:.3f} от высоты знака")
print(f"  отступ         {text_start - mark_end}  = {(text_start - mark_end) / mark_h:.3f} от высоты знака")


def save(img, name, width):
    height = round(img.height * width / img.width)
    out = img.resize((width, height), Image.LANCZOS)
    path = os.path.join(OUT, name)
    out.save(path, quality=90, method=6)
    print(f"  {name:26} {out.width}x{out.height}  {os.path.getsize(path) // 1024}KB")


print("ассеты:")

# Знак: прозрачным делаем только внешний фон, внутренность рамки остаётся белой.
# Так один файл работает на обоих фонах: на светлом видна синяя рамка, на тёмном
# она сливается с фоном и остаётся белый квадрат с янтарной W.
mark = Image.new("RGBA", (mark_box[2] - mark_box[0], mark_box[3] - mark_box[1]), (255, 255, 255, 255))
mark.paste(src.crop(mark_box).convert("RGBA"), (0, 0))
for corner in [(0, 0), (mark.width - 1, 0), (0, mark.height - 1), (mark.width - 1, mark.height - 1)]:
    ImageDraw.floodfill(mark, corner, (0, 0, 0, 0), thresh=30)
save(mark, "logo-mark.webp", 120)

# Вордмарк монохромный: одна альфа-маска даёт тёмный и белый варианты
word = src.crop(word_box)
alpha = word.convert("L").point(
    lambda v: 0 if v >= 250 else min(255, round((255 - v) * 255 / (255 - INK_MIN_L)))
)
for name, rgb in [("logo-wordmark.webp", (8, 43, 64)), ("logo-wordmark-light.webp", (255, 255, 255))]:
    layer = Image.new("RGBA", word.size, rgb + (0,))
    layer.putalpha(alpha)
    save(layer, name, 420)
