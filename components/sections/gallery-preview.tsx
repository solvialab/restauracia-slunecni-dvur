import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Gallery } from "@/components/gallery/gallery";
import { Arrow, Sun } from "@/components/ui/sun";
export async function GalleryPreview() {
  const t = await getTranslations("gallery");
  const locale = await getLocale();
  return (
    <section className="gallery-section container section-space">
      <div className="gallery-heading">
        <div>
          <p className="eyebrow section-kicker">
            <Sun className="kicker-sun" />
            {t("eyebrow")}
          </p>
          <h2>{t("title")}</h2>
        </div>
        <p>{t("intro")}</p>
      </div>
      <Gallery preview />
      <div className="gallery-more">
        <Link href={`/${locale}/galerie/`} className="text-link">
          {t("more")}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
