import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-brand-900 hover:bg-accent-dark",
  outline:
    "border border-brand-100 bg-transparent text-brand-900 hover:border-brand-700 hover:bg-brand-50",
  ghost: "border border-white/30 text-white hover:border-white hover:bg-white/10",
  whatsapp: "bg-whatsapp text-brand-900 hover:bg-whatsapp-dark",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

/** Иконка WhatsApp — inline SVG, чтобы не тянуть библиотеку иконок. */
export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.6 2 2.17 6.43 2.16 11.87c0 1.74.46 3.44 1.32 4.94L2 22.5l5.85-1.53a9.86 9.86 0 0 0 4.19.94h.01c5.44 0 9.87-4.43 9.87-9.87a9.8 9.8 0 0 0-2.89-6.98A9.8 9.8 0 0 0 12.04 2zm0 17.96h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.17 8.17 0 0 1-1.26-4.37c0-4.52 3.69-8.2 8.22-8.2a8.17 8.17 0 0 1 8.2 8.21c0 4.53-3.68 8.2-8.21 8.2z" />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  // tel: и mailto: не должны проходить через next/link
  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link prefetch={false} href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
