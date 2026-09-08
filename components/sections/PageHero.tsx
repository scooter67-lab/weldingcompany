import Link from "next/link";
import type { Dictionary, Locale, PageKey } from "@/content/types";
import { href } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

/** Шапка внутренней страницы: хлебные крошки, заголовок, лид. */
export function PageHero({
  locale,
  dict,
  page,
  title,
  lead,
}: {
  locale: Locale;
  dict: Dictionary;
  page: PageKey;
  title: string;
  lead: string;
}) {
  return (
    <section className="bg-brand-900 text-white">
      <script
        type="application/ld+json"
        // Собрано на билде из словаря, не пользовательский ввод
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(locale, page, dict)),
        }}
      />
      <Container className="py-14 lg:py-20">
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-100/70">
            <li>
              <Link prefetch={false} href={href(locale, "home")} className="hover:text-accent">
                {dict.nav.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-brand-100">{title}</li>
          </ol>
        </nav>

        <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-bold sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100">{lead}</p>
      </Container>
    </section>
  );
}
