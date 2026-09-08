import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { restaurantMedia } from "@/config/media";
import { restaurantConfig } from "@/config/restaurant";
import { Arrow } from "@/components/ui/sun";
import type { CSSProperties } from "react";
import { openingHours } from "@/lib/opening-hours";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const t = await getTranslations("hero");
  const m = await getTranslations("media");
  const locale = (await getLocale()) as Locale;
  const asset = restaurantMedia.hero;
  const hours = openingHours(locale);
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div
          className="hero-image"
          style={
            {
              "--image-position": asset.position,
              "--mobile-position": asset.mobilePosition,
            } as CSSProperties
          }
        >
          <Image
            src={asset.src}
            alt={m(asset.id)}
            fill
            sizes="100vw"
            preload
            className="hero-photo"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-content container">
          <p className="eyebrow hero-eyebrow">
            <span />
            {t("eyebrow")}
          </p>
          <h1 id="hero-title">
            <span>{t("line1")}</span>
            <em>{t("line2")}</em>
          </h1>
          <p className="hero-description">{t("text")}</p>
          <div className="hero-buttons">
            <Link
              href={`/${locale}/jidelnilistek/`}
              className="button button-cream"
            >
              {t("menu")}
              <Arrow />
            </Link>
            <a href={restaurantConfig.phoneHref} className="text-link light">
              {t("reserve")}
              <Arrow direction="up-right" />
            </a>
          </div>
        </div>
        <div className="hero-bottom container">
          <a href="#o-nas" className="hero-scroll">
            <span className="scroll-stroke" />
            {t("scroll")}
          </a>
          <p>{t("location")}</p>
          <span className="hero-number">MILČEVES · ŽATEC</span>
        </div>
      </section>
      <div className="welcome-strip">
        <div className="container">
          <span>
            {restaurantConfig.address.street}, {restaurantConfig.address.city}
          </span>
          <span className="welcome-hours">
            <span className="small-sun" aria-hidden="true">
              ✳
            </span>
            {hours.openDays}
            <b>{hours.time}</b>
          </span>
          <a href={restaurantConfig.phoneHref}>
            {restaurantConfig.phone}
            <Arrow direction="up-right" />
          </a>
        </div>
      </div>
    </>
  );
}
