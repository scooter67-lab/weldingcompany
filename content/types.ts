export const locales = ["ru", "kk"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

/** Ключи страниц — используются для метаданных, навигации и sitemap. */
export const pageKeys = [
  "home",
  "services",
  "products",
  "projects",
  "process",
  "about",
  "contacts",
] as const;

export type PageKey = (typeof pageKeys)[number];

/** Пути страниц относительно /[locale]. Главная — пустой сегмент. */
export const pagePaths: Record<PageKey, string> = {
  home: "",
  services: "services",
  products: "products",
  projects: "projects",
  process: "process",
  about: "about",
  contacts: "contacts",
};

type Meta = { title: string; description: string };

type Item = { title: string; text: string };

export type Dictionary = {
  /** Название языка в переключателе */
  localeName: string;

  meta: Record<PageKey, Meta>;

  nav: Record<PageKey, string>;

  common: {
    /** Подпись бренда в шапке и футере */
    brand: string;
    brandTagline: string;
    callUs: string;
    writeWhatsApp: string;
    /** Дефолтный текст сообщения в WhatsApp */
    waDefault: string;
    readMore: string;
    allServices: string;
    allProjects: string;
    city: string;
    address: string;
    phoneLabel: string;
    emailLabel: string;
    cityLabel: string;
    menu: string;
    close: string;
    skipToContent: string;
    /** Содержит {name} — на это место подставляется ссылка на разработчика */
    developedBy: string;
    notFoundTitle: string;
    notFoundText: string;
    goHome: string;
  };

  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    waMessage: string;
    highlights: string[];
  };

  services: {
    title: string;
    lead: string;
    /** Пять направлений полного цикла */
    items: (Item & { bullets: string[] })[];
    waMessage: string;
  };

  /** Этапы работ по объекту — компактная лента на странице услуг */
  stages: {
    title: string;
    lead: string;
    items: Item[];
    footnote: string;
  };

  ownExperience: {
    title: string;
    lead: string;
    text: string;
    cta: string;
  };

  products: {
    title: string;
    lead: string;
    items: (Item & { bullets: string[] })[];
    capacityNote: string;
    waMessage: string;
  };

  scheme: {
    title: string;
    lead: string;
    steps: string[];
    branchNote: string;
  };

  stats: {
    title: string;
    items: { value: string; label: string }[];
  };

  advantages: {
    title: string;
    lead: string;
    items: Item[];
  };

  process: {
    title: string;
    lead: string;
    items: Item[];
    footnote: string;
  };

  cases: {
    title: string;
    lead: string;
    items: (Item & { meta: string })[];
    note: string;
  };

  about: {
    title: string;
    lead: string;
    story: { title: string; paragraphs: string[] };
    blocks: Item[];
  };

  contacts: {
    title: string;
    lead: string;
    ctaTitle: string;
    ctaText: string;
    waMessage: string;
    hours: string;
    hoursLabel: string;
  };

  ctaBand: {
    title: string;
    text: string;
    button: string;
    waMessage: string;
  };
};
