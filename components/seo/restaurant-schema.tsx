import { getTranslations, getLocale } from "next-intl/server";
import { restaurantConfig as r } from "@/config/restaurant";
import { restaurantMedia } from "@/config/media";
export async function RestaurantSchema() {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.name,
    description: t("description"),
    url: `${r.url}/${locale}/`,
    telephone: r.phone,
    image: `${r.url}${restaurantMedia.hero.src}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: r.address.street,
      addressLocality: r.address.city,
      postalCode: r.address.postalCode,
      addressCountry: r.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: r.openingHours.days.map((d) => `https://schema.org/${d}`),
        opens: r.openingHours.opens,
        closes: r.openingHours.closes,
      },
    ],
    servesCuisine: ["Czech", "Slovak"],
    hasMenu: `${r.url}/${locale}/jidelnilistek/`,
    sameAs: [r.facebook, r.instagram],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
