export const restaurantConfig = {
  name: "Restaurace Sluneční Dvůr",
  shortName: "Sluneční Dvůr",
  phone: "+420 733 467 922",
  phoneHref: "tel:+420733467922",
  email: "",
  facebook: "https://www.facebook.com/profile.php?id=61563648104051",
  instagram: "https://www.instagram.com/usedlost_slunecni_dvur/",
  address: {
    street: "Milčeves 55",
    city: "Žatec",
    postalCode: "438 01",
    country: "CZ",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Usedlost+Slune%C4%8Dn%C3%AD+dv%C5%AFr+Mil%C4%8Deves+55+%C5%BDatec",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Usedlost%20Slune%C4%8Dn%C3%AD%20dv%C5%AFr%20Mil%C4%8Deves%2055&t=&z=14&ie=UTF8&iwloc=&output=embed",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://slunecni-dvur.devstoresk.chatgpt.site",
  openingHours: {
    days: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "12:00",
    closes: "21:00",
  },
  menuSources: ["/media/jedalny-listok-1.jpg", "/media/jedalny-listok-2.jpg"],
  creator: { name: "Solvia Lab s.r.o.", url: "https://solvialab.tech" },
} as const;
