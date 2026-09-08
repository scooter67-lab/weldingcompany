import Image from "next/image";
import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardText, CardTitle } from "@/components/ui/Card";
import { Stats } from "@/components/sections/Stats";
import { Advantages } from "@/components/sections/Advantages";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about", getDictionary(locale));
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        locale={locale}
        dict={dict}
        page="about"
        title={dict.about.title}
        lead={dict.about.lead}
      />

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SectionHeading title={dict.about.story.title} />
            <div className="mt-6 space-y-5">
              {dict.about.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <Image
              src="/images/plant-cip-detail.webp"
              alt="Узел пастеризации на молочном производстве"
              width={605}
              height={807}
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="rounded-card aspect-[3/4] w-full object-cover"
            />
            <Image
              src="/images/team.webp"
              alt="Команда в цехе молочного производства"
              width={480}
              height={360}
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="rounded-card aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="canvas">
        <div className="grid gap-5 lg:grid-cols-3">
          {dict.about.blocks.map((block) => (
            <Card key={block.title}>
              <CardTitle>{block.title}</CardTitle>
              <CardText>{block.text}</CardText>
            </Card>
          ))}
        </div>
      </Section>

      <Stats dict={dict} />
      <Advantages dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
}
