import type { Dictionary } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Этапы работ по объекту — компактная лента на странице услуг. */
export function StagesRibbon({ dict }: { dict: Dictionary }) {
  return (
    <Section tone="accent">
      <SectionHeading title={dict.stages.title} lead={dict.stages.lead} />

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {dict.stages.items.map((item, index) => (
          <li key={item.title} className="rounded-card bg-surface p-5">
            <span className="text-sm font-bold text-accent-text">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-base font-bold text-brand-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-lg font-medium text-brand-900">{dict.stages.footnote}</p>
    </Section>
  );
}
