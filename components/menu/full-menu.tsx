import { assetPath } from "@/lib/paths";
import { DailyMenu } from "./daily-menu";
import { getLocale, getTranslations } from "next-intl/server";
import { menuCategories, menuItems, getDailyMenu } from "@/content/menu";
import { restaurantConfig } from "@/config/restaurant";
import type { Locale } from "@/i18n/routing";
import { MenuRow } from "./menu-row";
import { CategoryNav } from "./category-nav";
import { Sun, Arrow } from "@/components/ui/sun";

export async function FullMenu() {
  const t = await getTranslations("menu");
  const locale = (await getLocale()) as Locale;
  const daily = getDailyMenu();
  const categories = menuCategories.filter((c) =>
    menuItems.some((i) => i.available && i.category === c.id),
  );
  return (
    <div className="container full-menu-layout">
      <aside>
        <CategoryNav
          categories={categories.map((c) => ({
            id: c.id,
            name: c.name[locale],
          }))}
          label={t("pageTitle")}
        />
      </aside>
      <div className="menu-body">
        {daily && (
          <DailyMenu
            offer={daily}
            locale={locale}
            title={t("daily")}
            allergenLabel={t("allergens")}
          />
        )}
        {categories.map((category, index) => (
          <section
            id={`menu-${category.id}`}
            className="menu-category"
            key={category.id}
          >
            <header>
              <span className="category-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2>{category.name[locale]}</h2>
              {index === 0 && <Sun />}
            </header>
            {category.subcategories
              ? category.subcategories.map((sub) => (
                  <div key={sub.id}>
                    <h3 className="menu-subcategory">{sub.name[locale]}</h3>
                    {menuItems
                      .filter(
                        (i) =>
                          i.category === category.id &&
                          i.subcategory === sub.id,
                      )
                      .map((item) => (
                        <MenuRow
                          key={item.id}
                          item={item}
                          locale={locale}
                          allergenLabel={t("allergens")}
                        />
                      ))}
                  </div>
                ))
              : menuItems
                  .filter((i) => i.category === category.id)
                  .map((item) => (
                    <MenuRow
                      key={item.id}
                      item={item}
                      locale={locale}
                      allergenLabel={t("allergens")}
                    />
                  ))}
          </section>
        ))}
        <div className="allergen-section">
          <details>
            <summary>
              {t("allergens")}
              <span>+</span>
            </summary>
            <p>{t("allergenInfo")}</p>
            <ol>
              {(t.raw("allergenLegend") as string[]).map((label, i) => (
                <li key={i}>
                  <span>{i + 1}</span>
                  {label}
                </li>
              ))}
            </ol>
          </details>
          <p className="menu-price-note">{t("priceNote")}</p>
          <div className="menu-source">
            <p>{t("source")}</p>
            {restaurantConfig.menuSources.map((src, i) => (
              <a
                key={src}
                className="text-link"
                href={assetPath(src)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("sourcePage")} {i + 1}
                <Arrow direction="up-right" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
