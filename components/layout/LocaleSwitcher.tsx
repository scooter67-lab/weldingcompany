"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/types";
import { locales } from "@/content/types";

const localeNames: Record<Locale, string> = { ru: "Рус", kk: "Қаз" };

/**
 * Переключает язык, сохраняя текущую страницу:
 * /ru/projects/ -> /kk/projects/
 */
export function LocaleSwitcher({
  current,
  className = "",
}: {
  current: Locale;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${current}/`;

  function localizedPath(target: Locale): string {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = target;
    return `/${segments.join("/")}/`;
  }

  return (
    <div
      className={`flex items-center gap-1 rounded-lg border border-brand-100 p-0.5 ${className}`}
    >
      {locales.map((locale) => {
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            prefetch={false}
            href={localizedPath(locale)}
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
              isActive
                ? "bg-brand-900 text-white"
                : "text-muted hover:bg-brand-50 hover:text-brand-900"
            }`}
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
