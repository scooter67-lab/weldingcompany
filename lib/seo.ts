import type { Metadata } from "next";
import type { Dictionary, Locale, PageKey } from "@/content/types";
import { pagePaths } from "@/content/types";
import { site } from "./site";

function pageUrl(locale: Locale, page: PageKey): string {
  const path = pagePaths[page];
  return path ? `${site.url}/${locale}/${path}/` : `${site.url}/${locale}/`;
}

/** Картинка превью своя для каждого языка — текст на ней локализован. */
function ogImage(locale: Locale) {
  return {
    url: locale === "kk" ? "/og-kk.jpg" : "/og.jpg",
    width: 1200,
    height: 630,
    type: "image/jpeg",
  };
}

/**
 * Метаданные страницы: уникальные title/description из словаря,
 * двусторонний hreflang между ru и kk и картинка превью.
 *
 * Next сливает metadata неглубоко: заданный здесь openGraph полностью
 * замещает объект из layout, поэтому siteName и locale повторяются тут,
 * иначе они бы пропали со страниц.
 */
export function pageMetadata(
  locale: Locale,
  page: PageKey,
  dict: Dictionary,
): Metadata {
  const meta = dict.meta[page];
  const url = pageUrl(locale, page);
  const image = ogImage(locale);

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        ru: pageUrl("ru", page),
        kk: pageUrl("kk", page),
        "x-default": pageUrl("ru", page),
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.common.brand,
      locale: locale === "kk" ? "kk_KZ" : "ru_RU",
      title: meta.title,
      description: meta.description,
      url,
      images: [{ ...image, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [image.url],
    },
  };
}

/**
 * Хлебные крошки для поисковиков. Визуальные крошки на внутренних
 * страницах уже есть, разметка позволяет показать их в выдаче.
 */
export function breadcrumbLd(locale: Locale, page: PageKey, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.nav.home,
        item: pageUrl(locale, "home"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.nav[page],
        item: pageUrl(locale, page),
      },
    ],
  };
}
