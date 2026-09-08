"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale, PageKey } from "@/content/types";
import { pageKeys } from "@/content/types";
import { href, site, telLink, waLink } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";

const navKeys: PageKey[] = pageKeys.filter((key) => key !== "home");

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Закрываем мобильное меню при переходе на другую страницу
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Блокируем прокрутку под открытым меню
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function isActive(page: PageKey): boolean {
    return pathname === href(locale, page);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Пропорции оригинального логотипа: вордмарк 0.411 от высоты знака,
              отступ 0.173. Размер задаётся font-size, дети считаются в em.
              Слоган в шапке не показываем: в оригинале он 0.14 от знака,
              то есть ~5px при знаке 36px — нечитаем. */}
          <Link
            prefetch={false}
            href={href(locale, "home")}
            className="flex shrink-0 items-center gap-[0.173em] text-[34px] sm:text-[38px] lg:text-[42px]"
          >
            <img
              src="/images/logo-mark.webp"
              alt=""
              width={120}
              height={116}
              className="h-[1em] w-auto"
            />
            <img
              src="/images/logo-wordmark.webp"
              alt={dict.common.brand}
              width={420}
              height={48}
              className="h-[0.411em] w-auto"
            />
          </Link>

          <nav aria-label={dict.common.menu} className="hidden xl:block">
            <ul className="flex items-center gap-5">
              {navKeys.map((page) => (
                <li key={page}>
                  <Link
                    prefetch={false}
                    href={href(locale, page)}
                    aria-current={isActive(page) ? "page" : undefined}
                    className={`text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive(page)
                        ? "text-brand-900 underline decoration-accent decoration-2 underline-offset-8"
                        : "text-muted hover:text-brand-900"
                    }`}
                  >
                    {dict.nav[page]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LocaleSwitcher current={locale} className="hidden sm:flex" />
            <a
              href={telLink}
              className="hidden text-sm font-semibold whitespace-nowrap text-brand-900 2xl:block"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={waLink(dict.common.waDefault)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-whatsapp px-4 py-2.5 text-sm font-semibold text-brand-900 transition-colors hover:bg-whatsapp-dark sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? dict.common.close : dict.common.menu}
              className="grid size-10 place-items-center rounded-lg border border-line text-brand-900 xl:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-5"
              >
                {isOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {isOpen ? (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface xl:hidden"
        >
          <Container className="py-5">
            <nav aria-label={dict.common.menu}>
              <ul className="space-y-1">
                {navKeys.map((page) => (
                  <li key={page}>
                    <Link
                      prefetch={false}
                      href={href(locale, page)}
                      aria-current={isActive(page) ? "page" : undefined}
                      className={`block rounded-lg px-3 py-3 text-base font-medium ${
                        isActive(page)
                          ? "bg-brand-50 text-brand-900"
                          : "text-ink hover:bg-brand-50"
                      }`}
                    >
                      {dict.nav[page]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
              <LocaleSwitcher current={locale} className="w-fit sm:hidden" />
              <a
                href={waLink(dict.common.waDefault)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-5 py-3 text-base font-semibold text-brand-900"
              >
                <WhatsAppIcon />
                {dict.common.writeWhatsApp}
              </a>
              <a
                href={telLink}
                className="inline-flex items-center justify-center rounded-lg border border-brand-100 px-5 py-3 text-base font-semibold text-brand-900"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
