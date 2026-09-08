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
  { source: "x350", name: "team", widths: [480], alt: "Команда в цехе" },
  { source: "x41_", name: "products", widths: [724], alt: "Готовая молочная продукция" },
];

/** Отдельные снимки, присланные заказчиком напрямую (не из презентации). */
const standalone = [
  { file: "docx/Foto1.png", name: "case-yogurt", width: 1100 },
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
  const info = await sharp(asset.file)
    .resize({ width: asset.width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT_DIR, `${asset.name}.webp`));

  console.log(
    `${asset.name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB  <- ${asset.file}`,
  );
  done += 1;
}

console.log(`\nготово: ${done} из ${assets.length + standalone.length}`);
