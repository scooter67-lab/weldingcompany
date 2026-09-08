import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Cases } from "@/components/sections/Cases";
import { Stats } from "@/components/sections/Stats";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "projects", getDictionary(locale));
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        locale={locale}
        dict={dict}
        page="projects"
        title={dict.cases.title}
        lead={dict.cases.lead}
      />
      <Cases locale={locale} dict={dict} showLink={false} showHeading={false} />
      <Stats dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
}
