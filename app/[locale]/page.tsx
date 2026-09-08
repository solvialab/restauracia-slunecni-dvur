import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero/hero";
import { Story } from "@/components/sections/story";
import { MenuPreview } from "@/components/menu/menu-preview";
import { Atmosphere } from "@/components/sections/atmosphere";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Reservation } from "@/components/contact/reservation";
import { Contact } from "@/components/contact/contact";
import { RestaurantSchema } from "@/components/seo/restaurant-schema";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata(locale, "", t("title"), t("description"));
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main id="main">
      <RestaurantSchema />
      <Hero />
      <Story />
      <MenuPreview />
      <Atmosphere />
      <GalleryPreview />
      <Reservation />
      <Contact />
    </main>
  );
}
