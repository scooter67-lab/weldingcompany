import type { Dictionary, Locale } from "@/content/types";
import { href, site, telLink, waLink } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button, WhatsAppIcon } from "@/components/ui/Button";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      {/* Мягкое свечение за текстом, чтобы тёмный блок не был плоским */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-40 size-[36rem] rounded-full bg-brand-700/40 blur-3xl"
      />
      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-accent uppercase">
              {dict.hero.kicker}
            </p>

            <h1 className="mt-6 text-4xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">
              {dict.hero.subtitle}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {dict.hero.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-4 shrink-0 text-accent"
                  >
                    <path d="m20 6-11 11-5-5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={waLink(dict.hero.waMessage)}
                variant="whatsapp"
                size="lg"
                external
              >
                <WhatsAppIcon />
                {dict.hero.ctaPrimary}
              </Button>
              <Button href={href(locale, "products")} variant="ghost" size="lg">
                {dict.hero.ctaSecondary}
              </Button>
            </div>

            <a
              href={telLink}
              className="mt-6 inline-block text-sm text-brand-100 transition-colors hover:text-accent"
            >
              {dict.common.callUs}: <span className="font-semibold">{site.phoneDisplay}</span>
            </a>
          </div>

          <div className="relative">
            {/* Обычный img с srcset: при images.unoptimized next/image
                отдаёт один размер, а мобильным хватает варианта 800px. */}
            <img
              src="/images/plant-cip.webp"
              srcSet="/images/plant-cip-800.webp 800w, /images/plant-cip.webp 1200w"
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="CIP-станция и танки на молочном производстве"
              width={1200}
              height={1600}
              fetchPriority="high"
              decoding="async"
              className="rounded-card aspect-[4/5] w-full object-cover shadow-2xl shadow-black/40"
            />
            <div className="rounded-card absolute -bottom-5 -left-5 hidden bg-accent px-5 py-4 text-brand-900 shadow-lg sm:block">
              <p className="text-2xl font-bold">{dict.stats.items[3].value}</p>
              <p className="max-w-[9rem] text-xs leading-snug font-semibold">
                {dict.stats.items[3].label}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
