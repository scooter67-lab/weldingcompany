import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Button";

/** Плавающая кнопка WhatsApp — основной канал заявок на мобильных. */
export function WhatsAppFab({ label, message }: { label: string; message: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-brand-900 shadow-lg shadow-black/20 transition-colors hover:bg-whatsapp-dark sm:right-6 sm:bottom-6 xl:hidden"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
