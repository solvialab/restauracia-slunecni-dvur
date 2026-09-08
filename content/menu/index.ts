import raw from "./data.json";
import type { Locale } from "@/i18n/routing";
export type Localized = Record<Locale, string>;
export type MenuItem = {
  id: string;
  category: string;
  subcategory?: string;
  name: Localized;
  description: Localized;
  weight: string | null;
  price: number;
  currency: string;
  allergens: number[] | null;
  featured: boolean;
  image: string | null;
  available: boolean;
};
export type MenuCategory = {
  id: string;
  name: Localized;
  subcategories?: { id: string; name: Localized }[];
};
const order = [
  "soups",
  "schnitzels",
  "mains",
  "specialties",
  "salads",
  "kids",
  "beer-snacks",
  "desserts",
  "sides",
  "sauces",
];
export const menuCategories = (raw.categories as MenuCategory[]).toSorted(
  (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
);
export const menuItems: MenuItem[] = raw.items.map((item) => ({
  ...item,
  image: null,
}));
export const featuredItems = [
  "poultry-broth",
  "beef-cheeks",
  "stuffed-potato-dumplings",
  "hot-raspberries",
].map((id) => menuItems.find((item) => item.id === id)!);
// Enable only when the restaurant supplies a dated offer. Dates use Europe/Prague.
export const dailyMenu: {
  enabled: boolean;
  validFrom: string | null;
  validUntil: string | null;
  title: Localized | null;
  items: MenuItem[];
} = {
  enabled: false,
  validFrom: null,
  validUntil: null,
  title: null,
  items: [],
};
export function getDailyMenu() {
  if (!dailyMenu.enabled || !dailyMenu.items.length) return null;
  return dailyMenu;
}
