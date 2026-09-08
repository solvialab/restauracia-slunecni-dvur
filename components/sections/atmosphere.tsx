import { getTranslations } from "next-intl/server";
import { PhotoMoment } from "@/components/media/photo-moment";
import { AtmosphereVideo } from "@/components/media/atmosphere-video";
import { restaurantMedia } from "@/config/media";
export async function Atmosphere() {
  const t = await getTranslations("atmosphere");
  const m = await getTranslations("media");
  return (
    <section className="atmosphere-section">
      <PhotoMoment
        asset={restaurantMedia.atmosphere}
        alt={m("interior")}
        caption={t("caption")}
      />
      <div className="container atmosphere-content section-space">
        <div className="atmosphere-heading">
          <p className="eyebrow section-kicker">
            <span>03</span>
            {t("eyebrow")}
          </p>
          <h2>{t("title")}</h2>
          <p>{t("text")}</p>
        </div>
        <AtmosphereVideo />
      </div>
    </section>
  );
}
