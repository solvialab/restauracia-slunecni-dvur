import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { restaurantConfig } from "@/config/restaurant";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/jidelnilistek", "/galerie", "/soukromi", "/cookies"].flatMap(
    (path) =>
      locales.map((locale) => ({
        url: `${restaurantConfig.url}/${locale}${path}/`,
        alternates: {
          languages: Object.fromEntries([
            ...locales.map((l) => [l, `${restaurantConfig.url}/${l}${path}/`]),
            ["x-default", `${restaurantConfig.url}/cs${path}/`],
          ]),
        },
      })),
  );
}
