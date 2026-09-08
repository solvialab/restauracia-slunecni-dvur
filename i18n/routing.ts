import { defineRouting } from "next-intl/routing";
export const locales = ["cs", "de", "en", "sk"] as const;
export type Locale = (typeof locales)[number];
export const routing = defineRouting({
  locales,
  defaultLocale: "cs",
  localePrefix: "always",
});
export const localeLabels: Record<Locale, string> = {
  cs: "CZ",
  de: "DE",
  en: "EN",
  sk: "SK",
};
export const localeNames: Record<Locale, string> = {
  cs: "Čeština",
  de: "Deutsch",
  en: "English",
  sk: "Slovenčina",
};
