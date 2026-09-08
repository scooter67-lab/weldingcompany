import type { Metadata } from "next";
import type { Dictionary, Locale, PageKey } from "@/content/types";
import { pagePaths } from "@/content/types";
import { site } from "./site";

function pageUrl(locale: Locale, page: PageKey): string {
  const path = pagePaths[page];
  return path ? `${site.url}/${locale}/${path}/` : `${site.url}/${locale}/`;
}

/**
 * Метаданные страницы: уникальные title/description из словаря
 * плюс двусторонний hreflang между ru и kk.
 */
export function pageMetadata(
  locale: Locale,
  page: PageKey,
  dict: Dictionary,
): Metadata {
  const meta = dict.meta[page];

  return {
    title: page === "home" ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical: pageUrl(locale, page),
      languages: {
        ru: pageUrl("ru", page),
        kk: pageUrl("kk", page),
        "x-default": pageUrl("ru", page),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl(locale, page),
    },
  };
}
