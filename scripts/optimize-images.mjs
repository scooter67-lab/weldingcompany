/**
 * Превращает отобранные изображения из презентации в WebP для public/images.
 *
 * Запуск:
 *   python scripts/extract-pdf-images.py <raw-dir>
 *   node scripts/optimize-images.mjs <raw-dir>
 *
 * Отобраны только реальные фотографии. Не переносим: градиентные фоны слайдов
 * (1538x866, 1397x866, 1539x974), пустые рамки разметки (3791x2153),
 * иконки категорий (вместо них inline SVG), мелкую рисованную иллюстрацию
 * и кадр 384x256 — он дублирует plant-hall, но заметно мылит при растяжении.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const RAW_DIR = process.argv[2] ?? "scratch/raw";
const OUT_DIR = "public/images";

/**
 * source — фрагмент имени raw-файла, widths — целевые ширины в px.
 * Первая ширина даёт <name>.webp, остальные — <name>-<width>.webp для srcset.
 */
const assets = [
  { source: "x385", name: "plant-cip", widths: [1200, 800], alt: "CIP-станция и танки" },
  { source: "x356", name: "plant-cip-detail", widths: [605], alt: "Узел пастеризации" },
  { source: "x61_", name: "plant-hall", widths: [768], alt: "Цех, ряд танков" },
];

/**
 * Отдельные снимки, присланные заказчиком напрямую (не из презентации).
 * crop — область исходника до ресайза, если кадр нужно подрезать.
 */
const standalone = [
  // Верх срезан: в правом верхнем углу исходника водяной знак SILK WAY.
  {
    file: "docx/IMG_5809.PNG",
    name: "case-dairy",
    width: 1100,
    crop: { left: 0, top: 168, width: 1659, height: 780 },
  },
  // Кадрирование до 16:9 — карточка кейса обрезает квадрат по object-cover.
  {
    file: "docx/WhatsApp Image 2026-09-19 at 13.28.59.jpeg",
    name: "case-yogurt",
    width: 1100,
    crop: { left: 0, top: 120, width: 1297, height: 730 },
  },
  { file: "docx/foto moya ferma/WhatsApp Image 2026-09-14 at 13.08.15.jpeg", name: "products-assortment", width: 800 },
  { file: "docx/foto moya ferma/WhatsApp Image 2026-09-14 at 13.09.10.jpeg", name: "products-milk", width: 800 },
  { file: "docx/foto moya ferma/WhatsApp Image 2026-09-14 at 13.09.11.jpeg", name: "products-curd", width: 800 },
  { file: "docx/foto moya ferma/WhatsApp Image 2026-09-15 at 16.12.27.jpeg", name: "team", width: 960 },
];

const files = await readdir(RAW_DIR);
await mkdir(OUT_DIR, { recursive: true });

let done = 0;
for (const asset of assets) {
  const file = files.find((name) => name.includes(asset.source));
  if (!file) {
    console.warn(`! не найден исходник для ${asset.name} (${asset.source})`);
    continue;
  }

  for (const [index, width] of asset.widths.entries()) {
    const name = index === 0 ? asset.name : `${asset.name}-${width}`;
    const info = await sharp(path.join(RAW_DIR, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT_DIR, `${name}.webp`));

    console.log(
      `${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB  <- ${file}`,
    );
  }
  done += 1;
}

for (const asset of standalone) {
  const pipeline = sharp(asset.file);
  if (asset.crop) pipeline.extract(asset.crop);
  const info = await pipeline
    .resize({ width: asset.width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT_DIR, `${asset.name}.webp`));

  console.log(
    `${asset.name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB  <- ${asset.file}`,
  );
  done += 1;
}

console.log(`\nготово: ${done} из ${assets.length + standalone.length}`);
