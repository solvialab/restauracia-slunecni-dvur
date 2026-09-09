import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { restaurantConfig } from "@/config/restaurant";
import { restaurantMedia } from "@/config/media";
import { assetPath } from "@/lib/paths";
import { Arrow, Sun } from "@/components/ui/sun";

export async function Careers() {
  if (!restaurantConfig.careers.enabled) return null;
  const t = await getTranslations("careers");
  const job = restaurantConfig.careers;
  const poster = restaurantMedia.careers;
  return (
    <section id="prace" className="careers-section">
      <div className="container careers-layout">
        <a
          className="careers-poster"
          href={assetPath(poster.src)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("posterLink")}
        >
          <Image
            src={poster.src}
            width={poster.width}
            height={poster.height}
            sizes="(max-width: 760px) 70vw, 30vw"
            alt={t("posterAlt")}
          />
          <span>
            {t("posterLink")}
            <Arrow direction="up-right" />
          </span>
        </a>
        <div className="careers-copy">
          <p className="eyebrow section-kicker">
            <Sun className="kicker-sun" />
            {t("eyebrow")}
          </p>
          <h2>{t("title")}</h2>
          <p className="careers-intro">{t("intro")}</p>
          <dl className="career-facts">
            <div>
              <dt>{t("salaryLabel")}</dt>
              <dd>
                {job.salary}
                <small>{t("salaryNote")}</small>
              </dd>
            </div>
            <div>
              <dt>{t("stayLabel")}</dt>
              <dd>{t("stayValue")}</dd>
            </div>
          </dl>
          <details className="career-details">
            <summary>
              {t("details")}
              <Arrow direction="down" />
            </summary>
            <div className="career-details-grid">
              <div>
                <h3>{t("offersTitle")}</h3>
                <ul>
                  {(t.raw("offers") as string[]).map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t("requiresTitle")}</h3>
                <ul>
                  {(t.raw("requires") as string[]).map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
          <div className="careers-contact">
            <a href={job.phoneHref} className="button">
              {t("call")}
              <Arrow direction="up-right" />
            </a>
            <a href={job.phoneHref} className="career-phone">
              {job.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
