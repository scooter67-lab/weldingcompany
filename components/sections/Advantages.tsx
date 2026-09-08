import type { Dictionary } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Advantages({ dict }: { dict: Dictionary }) {
  return (
    <Section tone="canvas">
      <SectionHeading title={dict.advantages.title} lead={dict.advantages.lead} />

      <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
        {dict.advantages.items.map((item) => (
          <div key={item.title} className="border-t-2 border-accent pt-5">
            <h3 className="text-xl font-bold text-brand-900">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
