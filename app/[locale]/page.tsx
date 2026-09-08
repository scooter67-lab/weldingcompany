import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { OwnExperience } from "@/components/sections/OwnExperience";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { SchemeFlow } from "@/components/sections/SchemeFlow";
import { Stats } from "@/components/sections/Stats";
import { Advantages } from "@/components/sections/Advantages";
import { Steps } from "@/components/sections/Steps";
import { Cases } from "@/components/sections/Cases";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "home", getDictionary(locale));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Stats dict={dict} />
      <ServicesGrid locale={locale} dict={dict} />
      <OwnExperience locale={locale} dict={dict} />
      <ProductsGrid dict={dict} />
      <SchemeFlow dict={dict} />
      <Advantages dict={dict} />
      <Steps dict={dict} />
      <Cases locale={locale} dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
}
