import type { Locale, PageKey } from "@/content/types";
import { pagePaths } from "@/content/types";

/** Единственный источник контактов компании. */
export const site = {
  name: "WeldingCompany",
  phone: "+77758991003",
  phoneDisplay: "+7 775 899 10 03",
  email: "foodproject.company@mail.ru",
  url: "https://weldingcompany.kz",
  geo: { locality: "Астана", country: "KZ" },
} as const;

/** Ссылка в WhatsApp с предзаполненным текстом — заменяет форму заявки. */
export function waLink(message: string): string {
  return `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** Разработчик сайта — подпись в футере. */
export const developer = {
  name: "TB Group",
  url: "https://tbgroup.kz/",
} as const;

export const telLink = `tel:${site.phone}`;
export const mailLink = `mailto:${site.email}`;

/** Путь страницы с локалью и завершающим слэшем (trailingSlash: true). */
export function href(locale: Locale, page: PageKey): string {
  const path = pagePaths[page];
  return path ? `/${locale}/${path}/` : `/${locale}/`;
}
