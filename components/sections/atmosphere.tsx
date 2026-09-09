import { Sun } from "@/components/ui/sun";
import { getTranslations } from "next-intl/server";
import { DroneFilm } from "@/components/media/drone-film";
import { AtmosphereVideo } from "@/components/media/atmosphere-video";
export async function Atmosphere() {
  const t = await getTranslations("atmosphere");
  return (
    <section className="atmosphere-section">
      <DroneFilm />
      <div className="container atmosphere-content section-space">
        <div className="atmosphere-heading">
          <p className="eyebrow section-kicker">
            <Sun className="kicker-sun" />
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
