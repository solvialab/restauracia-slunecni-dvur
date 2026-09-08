export type MediaCategory = "food" | "restaurant" | "courtyard" | "kitchen";
export type MediaItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  category: MediaCategory;
  position: string;
  mobilePosition?: string;
};
const media = (
  id: string,
  filename: string,
  width: number,
  height: number,
  category: MediaCategory,
  position = "50% 50%",
): MediaItem => ({
  id,
  src: `/media/${filename}.jpg`,
  width,
  height,
  category,
  position,
});
export const restaurantMedia = {
  hero: {
    ...media(
      "courtyard",
      "678561965_26557385660537120_415514142092095821_n",
      2048,
      1536,
      "courtyard",
      "50% 52%",
    ),
    mobilePosition: "39% 50%",
  },
  story: media(
    "platedDish",
    "753668437_122104729328454936_8582602855741836979_n",
    1520,
    1240,
    "food",
    "50% 48%",
  ),
  detail: media(
    "salad",
    "773339188_122106252626454936_7664757541684157180_n",
    1536,
    2048,
    "food",
    "50% 52%",
  ),
  atmosphere: media(
    "interior",
    "679001296_26557387953870224_8015287232511464463_n",
    2048,
    1536,
    "restaurant",
    "50% 55%",
  ),
  gallery: [
    media(
      "terrace",
      "724442396_122102482766454936_2223323304712616161_n",
      1200,
      1600,
      "courtyard",
      "50% 58%",
    ),
    media(
      "platedDish",
      "753668437_122104729328454936_8582602855741836979_n",
      1520,
      1240,
      "food",
    ),
    media(
      "diningRoom",
      "682308402_122097540134454936_9109755783791518576_n",
      2048,
      1536,
      "restaurant",
    ),
    media(
      "desserts",
      "759809907_122105168282454936_3413486062324916369_n",
      1536,
      2048,
      "food",
    ),
    media(
      "salad",
      "773339188_122106252626454936_7664757541684157180_n",
      1536,
      2048,
      "food",
    ),
    media(
      "courtyard",
      "678561965_26557385660537120_415514142092095821_n",
      2048,
      1536,
      "courtyard",
    ),
    media(
      "baking",
      "741131308_122103899498454936_6935407895606377807_n",
      2048,
      2048,
      "kitchen",
    ),
    media(
      "burger",
      "736261170_122103382826454936_9126022551870587054_n",
      1537,
      2048,
      "food",
    ),
    media(
      "sign",
      "682365407_122097589220454936_2170724518138335281_n",
      1055,
      768,
      "courtyard",
    ),
    media(
      "interior",
      "679001296_26557387953870224_8015287232511464463_n",
      2048,
      1536,
      "restaurant",
    ),
    media(
      "plate",
      "777867408_122106665924454936_3494252918046173273_n",
      1499,
      1257,
      "food",
    ),
  ],
  video: {
    src: "/media/AQMs6VVIml9SvgafNOsVGa2zRHJBXTGYge7RposAKExyHqvtNy8YITSv6VlWGIreFalSJmbeIeSQmsjC17kjfDgMWGP_0A5CeD26c89KtksV1w.mp4",
    poster: "/media/terrace-evening.jpg",
    width: 720,
    height: 1280,
  },
};
