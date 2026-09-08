import type { Dictionary } from "@/content/types";
import { site, telLink, waLink } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button, WhatsAppIcon } from "@/components/ui/Button";

export function CtaBand({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-brand-900 text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl leading-tight font-bold sm:text-4xl">
              {dict.ctaBand.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-100">
              {dict.ctaBand.text}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              href={waLink(dict.ctaBand.waMessage)}
              variant="whatsapp"
              size="lg"
              external
            >
              <WhatsAppIcon />
              {dict.ctaBand.button}
            </Button>
            <Button href={telLink} variant="ghost" size="lg">
              {site.phoneDisplay}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
