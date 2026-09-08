import type { Dictionary } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Технологический поток. На узких экранах — вертикальный список,
 * от lg — горизонтальная лента со стрелками между узлами.
 */
export function SchemeFlow({ dict }: { dict: Dictionary }) {
  return (
    <Section tone="brand">
      <SectionHeading title={dict.scheme.title} lead={dict.scheme.lead} inverted />

      <ol className="mt-12 grid gap-4 lg:grid-cols-5 lg:gap-3">
        {dict.scheme.steps.map((step, index) => (
          <li key={step} className="relative flex items-start gap-4 lg:block">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-sm font-bold text-brand-900 lg:size-10">
              {index + 1}
            </span>
            <p className="pt-1.5 text-sm leading-snug font-semibold text-white lg:mt-4 lg:pt-0 lg:text-base">
              {step}
            </p>
            {index < dict.scheme.steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-9 left-[1.0625rem] h-[calc(100%-0.75rem)] w-px bg-white/20 lg:top-5 lg:left-auto lg:h-px lg:w-[calc(100%-3.5rem)] lg:translate-x-12"
              />
            ) : null}
          </li>
        ))}
      </ol>

      <p className="rounded-card mt-12 border border-white/15 bg-white/5 px-6 py-5 leading-relaxed text-brand-100">
        {dict.scheme.branchNote}
      </p>
    </Section>
  );
}
