import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { featuredItems } from "@/content/menu";
import { MenuRow } from "./menu-row";
import { Sun, Arrow } from "@/components/ui/sun";
import type { Locale } from "@/i18n/routing";
export async function MenuPreview() {
  const t = await getTranslations("menu");
  const c = await getTranslations("common");
  const locale = (await getLocale()) as Locale;
  return (
    <section className="menu-preview section-space">
      <div className="container menu-preview-layout">
        <div className="menu-preview-intro">
          <p className="eyebrow section-kicker">
            <Sun className="kicker-sun" />
            {t("eyebrow")}
          </p>
          <h2>{t("title")}</h2>
          <p>{t("intro")}</p>
          <Link href={`/${locale}/jidelnilistek/`} className="text-link">
            {c("fullMenu")}
            <Arrow />
          </Link>
          <Sun className="menu-sun" />
        </div>
        <div className="menu-preview-paper">
          <div className="menu-paper-top">
            <span>SLUNEČNÍ DVŮR</span>
            <span>{t("pageTitle")}</span>
          </div>
          {featuredItems.map((item) => (
            <MenuRow
              key={item.id}
              item={item}
              locale={locale}
              allergenLabel={t("allergens")}
              compact
            />
          ))}
          <p className="menu-price-note">{t("priceNote")}</p>
        </div>
      </div>
    </section>
  );
}
