import { getTranslations, setRequestLocale } from "next-intl/server";
import { Gallery } from "@/components/gallery/gallery";
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
  return pageMetadata(locale, "/galerie", t("galleryTitle"), t("description"));
}
export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  return (
    <main id="main">
      <PageIntro
        eyebrow="SLUNEČNÍ DVŮR · MILČEVES"
        title={t("pageTitle")}
        text={t("intro")}
      />
      <div className="container gallery-page">
        <Gallery />
      </div>
      <Reservation />
    </main>
  );
}
