import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-line bg-surface p-6 transition-shadow duration-200 hover:shadow-[0_2px_20px_rgba(14,42,61,0.08)] sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  as: Tag = "h3",
}: {
  children: ReactNode;
  as?: "h2" | "h3";
}) {
  return <Tag className="text-xl font-bold text-brand-900">{children}</Tag>;
}

export function CardText({ children }: { children: ReactNode }) {
  return <p className="mt-3 leading-relaxed text-muted">{children}</p>;
}

/** Маркированный список внутри карточки — используется на страницах услуг и продукции. */
export function CardBullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
          <span
            aria-hidden="true"
            className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
