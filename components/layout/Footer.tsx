import Link from "next/link";
import type { Dictionary, Locale, PageKey } from "@/content/types";
import { pageKeys } from "@/content/types";
import { developer, href, mailLink, site, telLink, waLink } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/Button";

const navKeys: PageKey[] = pageKeys.filter((key) => key !== "home");

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [before, after] = dict.common.developedBy.split("{name}");

  return (
    <footer className="bg-brand-900 text-brand-100">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-12">
          <div>
            <Link
              prefetch={false}
              href={href(locale, "home")}
              className="flex w-fit items-center gap-[0.173em] text-[42px]"
            >
              <img
                src="/images/logo-mark.webp"
                alt=""
                width={120}
                height={116}
                loading="lazy"
                className="h-[1em] w-auto"
              />
              <img
                src="/images/logo-wordmark-light.webp"
                alt={dict.common.brand}
                width={420}
                height={48}
                loading="lazy"
                className="h-[0.411em] w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {dict.common.brandTagline}. {dict.hero.highlights[0]}.
            </p>
            <a
              href={waLink(dict.common.waDefault)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-whatsapp px-5 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="size-4" />
              {dict.common.writeWhatsApp}
            </a>
          </div>

          <nav aria-label={dict.common.menu}>
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              {dict.common.menu}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navKeys.map((page) => (
                <li key={page}>
                  <Link
                    prefetch={false}
                    href={href(locale, page)}
                    className="text-sm transition-colors hover:text-accent"
                  >
                    {dict.nav[page]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              {dict.nav.contacts}
            </h2>
            <dl className="mt-4 space-y-3.5 text-sm">
              <div>
                <dt className="text-brand-100/70">{dict.common.phoneLabel}</dt>
                <dd>
                  <a
                    href={telLink}
                    className="font-semibold text-white transition-colors hover:text-accent"
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-brand-100/70">{dict.common.emailLabel}</dt>
                <dd>
                  <a
                    href={mailLink}
                    className="font-semibold break-all text-white transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-brand-100/70">{dict.common.cityLabel}</dt>
                <dd className="font-semibold text-white">{dict.common.city}</dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-brand-100/60">
          © {new Date().getFullYear()} {before}
          <a
            href={developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-accent"
          >
            {developer.name}
          </a>
          {after}
        </p>
      </Container>
    </footer>
  );
}
