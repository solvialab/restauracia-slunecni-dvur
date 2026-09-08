import { getTranslations } from "next-intl/server";
import { restaurantConfig } from "@/config/restaurant";
import { Sun, Arrow } from "@/components/ui/sun";
export async function Reservation() {
  const t = await getTranslations("reservation");
  return (
    <section className="reservation-section">
      <div className="container reservation-layout">
        <Sun />
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2>{t("title")}</h2>
          <p className="reservation-subtitle">{t("subtitle")}</p>
        </div>
        <div className="reservation-actions">
          <a href={restaurantConfig.phoneHref} className="button button-cream">
            {t("call")}
            <Arrow direction="up-right" />
          </a>
          <a
            href={restaurantConfig.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link light"
          >
            {t("facebook")}
            <Arrow direction="up-right" />
          </a>
        </div>
      </div>
    </section>
  );
}
