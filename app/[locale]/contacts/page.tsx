import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { mailLink, site, telLink, waLink } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Button, WhatsAppIcon } from "@/components/ui/Button";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contacts", getDictionary(locale));
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const details = [
    { label: dict.common.phoneLabel, value: site.phoneDisplay, href: telLink },
    { label: dict.common.emailLabel, value: site.email, href: mailLink },
    { label: dict.common.cityLabel, value: dict.common.address, href: null },
    { label: dict.contacts.hoursLabel, value: dict.contacts.hours, href: null },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        dict={dict}
        page="contacts"
        title={dict.contacts.title}
        lead={dict.contacts.lead}
      />

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <dl className="divide-y divide-line">
            {details.map((detail) => (
              <div key={detail.label} className="py-5 first:pt-0">
                <dt className="text-sm text-muted">{detail.label}</dt>
                <dd className="mt-1.5 text-xl font-bold text-brand-900">
                  {detail.href ? (
                    <a href={detail.href} className="break-all hover:text-brand-700">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="rounded-card bg-brand-900 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">{dict.contacts.ctaTitle}</h2>
            <p className="mt-4 leading-relaxed text-brand-100">{dict.contacts.ctaText}</p>

            <div className="mt-8 flex flex-col gap-3">
              <Button
                href={waLink(dict.contacts.waMessage)}
                variant="whatsapp"
                size="lg"
                external
              >
                <WhatsAppIcon />
                {dict.common.writeWhatsApp}
              </Button>
              <Button href={telLink} variant="ghost" size="lg">
                {site.phoneDisplay}
              </Button>
              <Button href={mailLink} variant="ghost" size="lg">
                {site.email}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
