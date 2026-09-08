import Image from "next/image";
import type { Dictionary, Locale } from "@/content/types";
import { href } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/**
 * Главный дифференциатор компании: до инжиниринга она сама
 * работала молочным производством.
 */
export function OwnExperience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section tone="accent">
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Image
          src="/images/team.webp"
          alt="Команда в цехе молочного производства"
          width={480}
          height={360}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="rounded-card aspect-[4/3] w-full object-cover"
        />

        <div>
          <p className="text-sm font-semibold tracking-wide text-accent-text uppercase">
            {dict.ownExperience.lead}
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-bold text-brand-900 sm:text-4xl">
            {dict.ownExperience.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink">{dict.ownExperience.text}</p>
          <Button href={href(locale, "about")} variant="outline" size="lg" className="mt-8">
            {dict.ownExperience.cta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
