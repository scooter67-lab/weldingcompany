import type { Dictionary } from "@/content/types";
import { Container } from "@/components/ui/Container";

export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <section aria-label={dict.stats.title} className="border-y border-line bg-surface">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4">
          {dict.stats.items.map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="block text-4xl font-bold text-brand-900 lg:text-5xl">
                  {item.value}
                </span>
                <span className="mt-2 block max-w-[13rem] text-sm leading-snug text-muted">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
