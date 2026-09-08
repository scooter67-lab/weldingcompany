import type { MetadataRoute } from "next";
import { locales, pageKeys, pagePaths } from "@/content/types";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pageKeys.map((page) => {
      const path = pagePaths[page];
      const suffix = path ? `${path}/` : "";
      return {
        url: `${site.url}/${locale}/${suffix}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: page === "home" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alt) => [alt, `${site.url}/${alt}/${suffix}`]),
          ),
        },
      };
    }),
  );
}
