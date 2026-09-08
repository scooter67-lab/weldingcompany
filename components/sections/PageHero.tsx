import Link from "next/link";
import type { Dictionary, Locale } from "@/content/types";
import { href } from "@/lib/site";
import { Container } from "@/components/ui/Container";

/** Шапка внутренней страницы: хлебные крошки, заголовок, лид. */
export function PageHero({
  locale,
  dict,
  title,
  lead,
}: {
  locale: Locale;
  dict: Dictionary;
  title: string;
  lead: string;
}) {
  return (
    <section className="bg-brand-900 text-white">
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
