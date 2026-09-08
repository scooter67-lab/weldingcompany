import Link from "next/link";
import { Manrope } from "next/font/google";
import { ru } from "@/content/ru";
import { kk } from "@/content/kk";
import { site, telLink } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

/**
 * Глобальная 404. Живёт вне сегмента [locale], поэтому объявляет
 * собственные html/body и показывает обе локали — язык посетителя неизвестен.
 * nginx отдаёт её на любой несуществующий путь.
 */
export const metadata = {
  title: `${ru.common.notFoundTitle} — ${ru.common.brand}`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="grid min-h-dvh place-items-center antialiased">
        <main className="mx-auto max-w-xl px-6 py-16 text-center">
          <p className="text-7xl font-bold text-accent-text">404</p>

          <h1 className="mt-6 text-3xl font-bold text-brand-900 sm:text-4xl">
            {ru.common.notFoundTitle}
          </h1>
          <p className="mt-4 leading-relaxed text-muted">{ru.common.notFoundText}</p>

          <p className="mt-8 text-xl font-bold text-brand-900">{kk.common.notFoundTitle}</p>
          <p className="mt-2 leading-relaxed text-muted">{kk.common.notFoundText}</p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              prefetch={false}
              href="/ru/"
              className="rounded-lg bg-brand-900 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-800"
            >
              {ru.common.goHome}
            </Link>
            <Link
              prefetch={false}
              href="/kk/"
              className="rounded-lg border border-brand-100 px-6 py-3.5 font-semibold text-brand-900 transition-colors hover:bg-brand-50"
            >
              {kk.common.goHome}
            </Link>
          </div>

          <a
            href={telLink}
            className="mt-8 inline-block font-semibold text-brand-700 hover:text-brand-900"
          >
            {site.phoneDisplay}
          </a>
        </main>
      </body>
    </html>
  );
}
