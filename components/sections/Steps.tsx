import type { Dictionary } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Пять этапов взаимодействия с заказчиком — вертикальная нумерованная лента. */
export function Steps({
  dict,
  showHeading = true,
}: {
  dict: Dictionary;
  showHeading?: boolean;
}) {
  return (
    <Section tone="surface">
      {showHeading ? (
        <SectionHeading title={dict.process.title} lead={dict.process.lead} />
      ) : null}

      <ol className={`${showHeading ? "mt-12" : ""} space-y-px`}>
        {dict.process.items.map((item, index) => (
          <li
            key={item.title}
            className="grid gap-2 border-t border-line py-6 sm:grid-cols-[4rem_1fr] sm:gap-8 lg:grid-cols-[5rem_18rem_1fr]"
          >
            <span className="text-2xl font-bold text-accent-text tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            {showHeading ? (
              <h3 className="text-lg font-bold text-brand-900">{item.title}</h3>
            ) : (
              <h2 className="text-lg font-bold text-brand-900">{item.title}</h2>
            )}
            <p className="leading-relaxed text-muted sm:col-start-2 lg:col-start-3">
              {item.text}
            </p>
          </li>
        ))}
      </ol>

      <p className="rounded-card mt-10 border-l-4 border-brand-700 bg-brand-50 px-6 py-5 leading-relaxed font-medium text-brand-900">
        {dict.process.footnote}
      </p>
    </Section>
  );
}
