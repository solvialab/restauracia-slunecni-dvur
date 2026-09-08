import type { MenuItem } from "@/content/menu";
import type { Locale } from "@/i18n/routing";
export function MenuRow({
  item,
  locale,
  allergenLabel,
  compact = false,
}: {
  item: MenuItem;
  locale: Locale;
  allergenLabel: string;
  compact?: boolean;
}) {
  if (!item.available) return null;
  return (
    <div className={`menu-row ${compact ? "menu-row-compact" : ""}`}>
      <div className="dish-content">
        <h3>{item.name[locale]}</h3>
        {item.description[locale] && <p>{item.description[locale]}</p>}
        {(item.weight || item.allergens) && (
          <div className="dish-meta">
            {item.weight && (
              <span>
                {item.weight.replace(
                  "ks",
                  locale === "de" ? "Stk." : locale === "en" ? "pc" : "ks",
                )}
              </span>
            )}
            {item.allergens && (
              <span>
                <span className="allergen-label">{allergenLabel} </span>
                {item.allergens.join(", ")}
              </span>
            )}
          </div>
        )}
      </div>
      <span className="dish-price">
        {new Intl.NumberFormat(locale).format(item.price)}
        <small>Kč</small>
      </span>
    </div>
  );
}
