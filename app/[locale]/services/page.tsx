import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StagesRibbon } from "@/components/sections/StagesRibbon";
import { Advantages } from "@/components/sections/Advantages";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "services", getDictionary(locale));
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        locale={locale}
        dict={dict}
        title={dict.services.title}
        lead={dict.services.lead}
      />
      <ServicesGrid locale={locale} dict={dict} detailed showHeading={false} />
      <StagesRibbon dict={dict} />
      <Advantages dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
}
