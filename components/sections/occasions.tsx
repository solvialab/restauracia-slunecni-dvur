import { getTranslations } from "next-intl/server";
import { Photo } from "@/components/media/photo";
import { restaurantMedia } from "@/config/media";
import { restaurantConfig } from "@/config/restaurant";
import { Arrow, Sun } from "@/components/ui/sun";

export async function Occasions() {
  const t = await getTranslations("occasions");
  return (
    <section id="oslavy-a-pobyt" className="occasions-section section-space">
      <div className="container">
        <div className="occasions-heading">
          <p className="eyebrow section-kicker">
            <Sun className="kicker-sun" />
            {t("eyebrow")}
          </p>
          <h2>{t("title")}</h2>
          <p>{t("intro")}</p>
        </div>
        <div className="occasions-layout">
          <figure className="occasions-photo">
            <Photo
              asset={restaurantMedia.celebration}
              sizes="(max-width: 900px) 92vw, 50vw"
            />
            <figcaption>
              <span>{t("photoCaption")}</span>
              <Sun />
            </figcaption>
          </figure>
          <div className="occasions-copy">
            <div className="occasion-list">
              {(["celebrations", "birthdays", "events"] as const).map((key) => (
                <div className="occasion-row" key={key}>
                  <span className="occasion-mark" aria-hidden="true">
                    ✳
                  </span>
                  <div>
                    <h3>{t(`${key}.title`)}</h3>
                    <p>{t(`${key}.text`)}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="occasion-note">{t("note")}</p>
            <a href={restaurantConfig.phoneHref} className="button">
              {t("call")}
              <Arrow direction="up-right" />
            </a>
          </div>
        </div>
        <div className="stay-strip" id="ubytovani">
          <Photo
            asset={restaurantMedia.hero}
            sizes="(max-width: 600px) 92vw, 22vw"
          />
          <div className="stay-copy">
            <p className="eyebrow">{t("stay.eyebrow")}</p>
            <h3>{t("stay.title")}</h3>
            <p>{t("stay.text")}</p>
          </div>
          <a
            href={restaurantConfig.accommodation.url}
            className="text-link light"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              {t("stay.link")}
              <small>{restaurantConfig.accommodation.name}</small>
            </span>
            <Arrow direction="up-right" />
          </a>
        </div>
      </div>
    </section>
  );
}
