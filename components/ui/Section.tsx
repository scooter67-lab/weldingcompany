import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "canvas" | "surface" | "brand" | "accent";

const tones: Record<Tone, string> = {
  canvas: "bg-canvas text-ink",
  surface: "bg-surface text-ink",
  brand: "bg-brand-900 text-white",
  accent: "bg-accent-soft text-ink",
};

export function Section({
  children,
  tone = "canvas",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
