import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import type { Locale } from "@/content/types";
import { locales } from "@/content/types";
import { getDictionary, isLocale } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { Analytics } from "@/components/Analytics";
import { verification } from "@/lib/analytics";
import "../globals.css";

// Manrope самохостится на билде: никаких обращений к Google со стороны посетителя.
// Кириллица включена ради казахских глифов ә ғ қ ң ө ұ ү һ і.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    // Шаблон с названием бренда намеренно не используется: он занимал бы
    // ~17 символов из 60, которые Google показывает в выдаче, а бренд новый
    // и по нему не ищут. Каждая страница задаёт заголовок целиком.
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    // Авторство: видно в «просмотре кода страницы» и в мета-данных.
    // Уведомление об авторе — часть произведения, см. LICENSE.
    authors: [{ name: "TB Group", url: "https://tbgroup.kz/" }],
    creator: "TB Group",
    publisher: "TB Group",
    other: { copyright: "© 2026 TB Group. Все права защищены." },
    openGraph: {
      type: "website",
      siteName: dict.common.brand,
      locale: locale === "ru" ? "ru_RU" : "kk_KZ",
    },
    // Подтверждение прав в Search Console и Яндекс.Вебмастере.
    // Пустые значения не выводятся — при подтверждении через DNS не нужны.
    verification: {
      ...(verification.google ? { google: verification.google } : {}),
      ...(verification.yandex ? { yandex: verification.yandex } : {}),
    },
  };
}

/**
 * Корневой layout приложения: все маршруты живут под /[locale],
 * поэтому html/body объявляются здесь и получают правильный lang.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dict.common.brand,
    description: dict.meta.home.description,
    url: `${site.url}/${typedLocale}/`,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.geo.locality,
      addressCountry: site.geo.country,
    },
    areaServed: dict.hero.kicker,
    knowsLanguage: ["ru", "kk"],
  };

  return (
    <html lang={typedLocale} className={manrope.variable}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only rounded-lg bg-brand-900 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
        >
          {dict.common.skipToContent}
        </a>
        <Header locale={typedLocale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={typedLocale} dict={dict} />
        <Analytics />
        <WhatsAppFab
          label={dict.common.writeWhatsApp}
          message={dict.common.waDefault}
        />
        <script
          type="application/ld+json"
          // Статичный объект, собранный на билде из словаря — не пользовательский ввод.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  );
}
