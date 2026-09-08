import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/sections/page-intro";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return pageMetadata(
    locale,
    "/soukromi",
    `${t("privacyTitle")} | Sluneční Dvůr`,
    t("privacyText"),
  );
}
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const c = await getTranslations("common");
  return (
    <main id="main">
      <PageIntro eyebrow="SLUNEČNÍ DVŮR" title={t("privacyTitle")} text="" />
      <div className="container legal-content">
        <p>{t("privacyText")}</p>
        <p>{t("externalText")}</p>
        <Link className="text-link" href={`/${locale}/`}>
          {c("back")}
        </Link>
      </div>
    </main>
  );
}
