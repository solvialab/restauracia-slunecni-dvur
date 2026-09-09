import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Photo } from "@/components/media/photo";
import { restaurantMedia } from "@/config/media";
import { Sun, Arrow } from "@/components/ui/sun";
export async function Story() {
  const t = await getTranslations("story");
  const garden = await getTranslations("garden");
  const locale = await getLocale();
  return (
    <section id="o-nas" className="story-section container section-space">
      <div className="story-heading">
        <p className="eyebrow section-kicker">
          <Sun className="kicker-sun" />
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
      <div className="story-aside garden-story" id="zahrada">
        <Photo
          asset={restaurantMedia.tomatoes}
          sizes="(max-width: 760px) 92vw, 30vw"
        />
        <div className="garden-story-copy">
          <p className="eyebrow">{garden("eyebrow")}</p>
          <h3>{garden("title")}</h3>
          <p>{garden("text")}</p>
          <Link href={`/${locale}/galerie/#garden`} className="text-link">
            {garden("more")}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
