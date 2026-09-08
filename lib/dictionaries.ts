import { ru } from "@/content/ru";
import { kk } from "@/content/kk";
import type { Dictionary, Locale } from "@/content/types";
import { locales } from "@/content/types";

const dictionaries: Record<Locale, Dictionary> = { ru, kk };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
