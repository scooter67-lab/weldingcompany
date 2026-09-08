import Link from "next/link";
import type { Dictionary, Locale } from "@/content/types";
import { href } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardBullets, CardText, CardTitle } from "@/components/ui/Card";

/**
 * На главной — краткие карточки со ссылкой на страницу услуг.
 * На /services — те же услуги, но с раскрытым составом работ.
 */
export function ServicesGrid({
  locale,
  dict,
  detailed = false,
  showHeading = true,
}: {
  locale: Locale;
  dict: Dictionary;
  detailed?: boolean;
  showHeading?: boolean;
}) {
  return (
    <Section tone="surface">
      {showHeading ? (
        <SectionHeading title={dict.services.title} lead={dict.services.lead} />
      ) : null}

      <div className={`${showHeading ? "mt-12" : ""} grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
        {dict.services.items.map((item, index) => (
          <Card key={item.title} className="flex flex-col">
            <span className="mb-4 grid size-10 place-items-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <CardTitle as={showHeading ? "h3" : "h2"}>{item.title}</CardTitle>
            <CardText>{item.text}</CardText>
            {detailed ? <CardBullets items={item.bullets} /> : null}
          </Card>
        ))}

        {detailed ? null : (
          <Link
            prefetch={false}
            href={href(locale, "services")}
            className="rounded-card group flex flex-col justify-between border border-brand-900 bg-brand-900 p-6 text-white transition-colors hover:bg-brand-800 sm:p-7"
          >
            <span className="text-xl font-bold">{dict.common.allServices}</span>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              {dict.common.readMore}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        )}
      </div>
    </Section>
  );
}
