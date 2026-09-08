import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { restaurantConfig as r } from "@/config/restaurant";
import { Sun, Arrow } from "@/components/ui/sun";
import { LanguageSelector } from "./header";
export async function Footer() {
  const t = await getTranslations("footer");
  const n = await getTranslations("nav");
  const locale = await getLocale();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <Link href={`/${locale}/`} className="footer-brand">
            <Sun />
            <span>
              SLUNEČNÍ DVŮR<small>{t("tagline")}</small>
            </span>
          </Link>
          <nav aria-label={t("navigation")}>
            <Link href={`/${locale}/jidelnilistek/`}>{n("menu")}</Link>
            <Link href={`/${locale}/galerie/`}>{n("gallery")}</Link>
            <Link href={`/${locale}/#kontakt`}>{n("contact")}</Link>
          </nav>
          <div className="footer-social">
            <a href={r.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
              <Arrow direction="up-right" />
            </a>
            <a href={r.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
              <Arrow direction="up-right" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sluneční Dvůr</span>
          <a
            className="footer-credit"
            href={r.creator.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{t("createdBy")}</span> <strong>{r.creator.name}</strong>
            <Arrow direction="up-right" />
          </a>
          <div>
            <Link href={`/${locale}/soukromi/`}>{t("privacy")}</Link>
            <Link href={`/${locale}/cookies/`}>{t("cookies")}</Link>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
