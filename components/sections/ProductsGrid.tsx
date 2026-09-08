import Image from "next/image";
import type { Dictionary } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardBullets, CardText, CardTitle } from "@/components/ui/Card";

/** Иконки трёх продуктовых категорий — inline SVG вместо растровых из презентации. */
const icons = [
  // Бутылка молока
  <path
    key="bottle"
    d="M10 2h4v3l2.2 3.3c.5.8.8 1.7.8 2.6V20a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9.1c0-.9.3-1.8.8-2.6L10 5V2Zm-3 11h10"
  />,
  // Стакан йогурта с ложкой
  <path key="cup" d="M5 7h14l-1.4 13.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 7Zm2.5 0 2-4.5m9 1.5-4 5" />,
  // Кусок сыра
  <path
    key="cheese"
    d="M3 16V11L14 5l7 4v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm0-5h18M8 14h.01M13 15h.01M17 13h.01"
  />,
];

export function ProductsGrid({
  dict,
  withPhoto = false,
  showHeading = true,
}: {
  dict: Dictionary;
  withPhoto?: boolean;
  showHeading?: boolean;
}) {
  return (
    <Section tone="canvas">
      {showHeading ? (
        <SectionHeading title={dict.products.title} lead={dict.products.lead} />
      ) : null}

      <div
        className={`${showHeading ? "mt-12" : ""} grid gap-5 ${
          withPhoto ? "lg:grid-cols-[1fr_1fr_1fr]" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {dict.products.items.map((item, index) => (
          <Card key={item.title} className="flex flex-col">
            <span className="mb-4 grid size-11 place-items-center rounded-lg bg-accent-soft text-accent-dark">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-6"
              >
                {icons[index]}
              </svg>
            </span>
            <CardTitle as={showHeading ? "h3" : "h2"}>{item.title}</CardTitle>
            <CardText>{item.text}</CardText>
            <CardBullets items={item.bullets} />
          </Card>
        ))}
      </div>

      <div
        className={`mt-10 grid items-center gap-8 ${
          withPhoto ? "lg:grid-cols-[1.4fr_1fr]" : ""
        }`}
      >
        <p className="rounded-card border-l-4 border-accent bg-surface px-6 py-5 text-lg leading-relaxed font-medium text-brand-900">
          {dict.products.capacityNote}
        </p>
        {withPhoto ? (
          <Image
            src="/images/products.webp"
            alt="Готовая молочная продукция: молоко, творог, сыр и масло"
            width={724}
            height={899}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="rounded-card aspect-[4/3] w-full object-cover"
          />
        ) : null}
      </div>
    </Section>
  );
}
