import type { Metadata } from "next";
import { restaurantConfig as config } from "@/config/restaurant";
import { locales, type Locale } from "@/i18n/routing";
import { assetPath } from "./paths";

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = `${config.url}/${locale}${path}/`;
  return {
    title,
    description,
    metadataBase: new URL(config.url),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${config.url}/${l}${path}/`]),
        ),
        "x-default": `${config.url}/cs${path}/`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: config.name,
      type: "website",
      locale: { cs: "cs_CZ", de: "de_DE", en: "en_GB", sk: "sk_SK" }[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map(
          (l) => ({ cs: "cs_CZ", de: "de_DE", en: "en_GB", sk: "sk_SK" })[l],
        ),
      images: [
        {
          url: `${config.url}/media/optimized/678561965_26557385660537120_415514142092095821_n-1440.webp`,
          width: 1440,
          height: 1080,
          alt: config.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `${config.url}/media/optimized/678561965_26557385660537120_415514142092095821_n-1440.webp`,
      ],
    },
    icons: {
      icon: assetPath("/favicon.svg"),
      apple: assetPath("/apple-icon.png"),
    },
  };
}
