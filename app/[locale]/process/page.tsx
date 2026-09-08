import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { StagesRibbon } from "@/components/sections/StagesRibbon";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "process", getDictionary(locale));
}

export default async function ProcessPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        locale={locale}
        dict={dict}
        page="process"
        title={dict.process.title}
        lead={dict.process.lead}
      />
      <Steps dict={dict} showHeading={false} />
      <StagesRibbon dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
}
