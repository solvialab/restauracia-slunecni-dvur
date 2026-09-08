import { openingHours } from "@/lib/opening-hours";
import type { Locale } from "@/i18n/routing";
import { getTranslations, getLocale } from "next-intl/server";
import { restaurantConfig as r } from "@/config/restaurant";
import { RestaurantMap } from "./map";
import { Arrow } from "@/components/ui/sun";
export async function Contact() {
  const t = await getTranslations("contact");
  const c = await getTranslations("common");
  const hours = openingHours((await getLocale()) as Locale);
  return (
    <section id="kontakt" className="container contact-section section-space">
      <div className="contact-heading">
        <p className="eyebrow section-kicker">
          <span>05</span>
          {t("eyebrow")}
        </p>
        <h2>{t("title")}</h2>
      </div>
      <div className="contact-details">
        <div>
          <h3>{t("address")}</h3>
          <address>
            {r.address.street}
            <br />
            {r.address.postalCode} {r.address.city}
            <br />
            {t("country")}
          </address>
          <a
            href={r.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {t("directions")}
            <Arrow direction="up-right" />
          </a>
        </div>
        <div>
          <h3>{t("hours")}</h3>
          <dl className="hours">
            <div>
              <dt>{hours.openDays}</dt>
              <dd>{hours.time}</dd>
            </div>
            {hours.closedDays && (
              <div>
                <dt>{hours.closedDays}</dt>
                <dd>{c("closed")}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="contact-call">
          <h3>{t("phone")}</h3>
          <a href={r.phoneHref}>{r.phone}</a>
          {r.email && <a href={`mailto:${r.email}`}>{r.email}</a>}
        </div>
      </div>
      <RestaurantMap />
    </section>
  );
}
