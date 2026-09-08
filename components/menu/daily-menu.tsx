"use client";
import { useEffect, useState } from "react";
import type { MenuItem, Localized } from "@/content/menu";
import type { Locale } from "@/i18n/routing";
import { MenuRow } from "./menu-row";
type Offer = {
  enabled: boolean;
  validFrom: string | null;
  validUntil: string | null;
  title: Localized | null;
  items: MenuItem[];
};
export function DailyMenu({
  offer,
  locale,
  title,
  allergenLabel,
}: {
  offer: Offer;
  locale: Locale;
  title: string;
  allergenLabel: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const check = () => {
      const today = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Europe/Prague",
      }).format(new Date());
      setVisible(
        offer.enabled &&
          offer.items.length > 0 &&
          (!offer.validFrom || today >= offer.validFrom) &&
          (!offer.validUntil || today <= offer.validUntil),
      );
    };
    check();
    const timer = window.setInterval(check, 60_000);
    return () => window.clearInterval(timer);
  }, [offer]);
  if (!visible) return null;
  return (
    <section className="daily-menu">
      <p className="eyebrow">{offer.title?.[locale] || title}</p>
      {offer.items.map((item) => (
        <MenuRow
          key={item.id}
          item={item}
          locale={locale}
          allergenLabel={allergenLabel}
        />
      ))}
    </section>
  );
}
