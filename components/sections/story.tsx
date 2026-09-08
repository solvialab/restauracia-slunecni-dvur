import { getTranslations } from "next-intl/server";
import { Photo } from "@/components/media/photo";
import { restaurantMedia } from "@/config/media";
import { Sun } from "@/components/ui/sun";
export async function Story() {
  const t = await getTranslations("story");
  return (
    <section id="o-nas" className="story-section container section-space">
      <div className="story-heading">
        <p className="eyebrow section-kicker">
          <span>01</span>
          {t("eyebrow")}
        </p>
        <h2>{t("title")}</h2>
      </div>
      <div className="story-copy">
        <p>{t("text")}</p>
        <p>{t("text2")}</p>
      </div>
      <figure className="story-main-photo">
        <Photo
          asset={restaurantMedia.story}
          sizes="(max-width: 760px) 92vw, 55vw"
        />
        <figcaption>
          <span>{t("caption")}</span>
          <span>SLUNEČNÍ DVŮR</span>
        </figcaption>
      </figure>
      <div className="story-aside">
        <Photo
          asset={restaurantMedia.detail}
          sizes="(max-width: 760px) 42vw, 24vw"
        />
        <div className="story-signature">
          <Sun />
          <p>{t("signature")}</p>
        </div>
      </div>
    </section>
  );
}
