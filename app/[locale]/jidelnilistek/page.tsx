import { getTranslations, setRequestLocale } from "next-intl/server";
import { FullMenu } from "@/components/menu/full-menu";
import { PageIntro } from "@/components/sections/page-intro";
import { Reservation } from "@/components/contact/reservation";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata(
    locale,
    "/jidelnilistek",
    t("menuTitle"),
    t("description"),
  );
}
export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("menu");
  return (
    <main id="main">
      <PageIntro
        eyebrow="SLUNEČNÍ DVŮR · MILČEVES"
        title={t("pageTitle")}
        text={t("pageIntro")}
      />
      <FullMenu />
      <Reservation />
    </main>
  );
}
