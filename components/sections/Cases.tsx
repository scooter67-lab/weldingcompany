import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/content/types";
import { href } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Фото объектов — по порядку кейсов в словаре. */
const caseImages = [
  { src: "/images/plant-hall.webp", width: 768, height: 512 },
  { src: "/images/case-yogurt.webp", width: 1100, height: 619 },
];

export function Cases({
  locale,
  dict,
  showLink = true,
  showHeading = true,
}: {
  locale: Locale;
  dict: Dictionary;
  showLink?: boolean;
  showHeading?: boolean;
}) {
  return (
    <Section tone="canvas">
      <div className="flex flex-wrap items-end justify-between gap-6 empty:hidden">
        {showHeading ? (
          <SectionHeading title={dict.cases.title} lead={dict.cases.lead} />
        ) : null}
        {showLink ? (
          <Link
            prefetch={false}
            href={href(locale, "projects")}
            className="text-sm font-semibold text-brand-700 underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-900"
          >
            {dict.common.allProjects}
          </Link>
        ) : null}
      </div>

      <div className={`${showHeading ? "mt-12" : ""} grid gap-6 lg:grid-cols-2`}>
        {dict.cases.items.map((item, index) => {
          const image = caseImages[index];
          return (
            <article
              key={item.title}
              className="rounded-card overflow-hidden border border-line bg-surface"
            >
              <Image
                src={image.src}
                alt={item.title}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[16/9] w-full object-cover"
              />

              <div className="p-6 sm:p-7">
                <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-text">
                  {item.meta}
                </span>
                {showHeading ? (
                  <h3 className="mt-4 text-xl font-bold text-brand-900">{item.title}</h3>
                ) : (
                  <h2 className="mt-4 text-xl font-bold text-brand-900">{item.title}</h2>
                )}
                <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-muted">{dict.cases.note}</p>
    </Section>
  );
}
