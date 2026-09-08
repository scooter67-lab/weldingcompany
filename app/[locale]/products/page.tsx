import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { SchemeFlow } from "@/components/sections/SchemeFlow";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "products", getDictionary(locale));
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        locale={locale}
        dict={dict}
        title={dict.products.title}
        lead={dict.products.lead}
      />
      <ProductsGrid dict={dict} withPhoto showHeading={false} />
      <SchemeFlow dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
}
