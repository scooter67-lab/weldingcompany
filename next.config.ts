import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт: сайт без бэкенда, nginx на VPS отдаёт готовый HTML.
  // Убрать эту строку, если понадобится серверная форма заявки.
  output: "export",
  // /ru/services/ -> out/ru/services/index.html, nginx отдаёт без rewrite-правил
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
