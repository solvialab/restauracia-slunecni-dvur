export type MediaCategory =
  | "food"
  | "restaurant"
  | "courtyard"
  | "kitchen"
  | "events"
  | "garden";
export type MediaItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  category: MediaCategory;
  position: string;
  mobilePosition?: string;
  fit?: "cover" | "contain";
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
const newMedia = {
  celebration: media(
    "celebration",
    "780672418_122106807476454936_6321443673107664659_n",
    2048,
    2048,
    "events",
    "50% 62%",
  ),
  birthday: media(
    "birthday",
    "760434504_122105214254454936_635202387545481311_n",
    2048,
    2048,
    "events",
  ),
  party: {
    ...media(
      "party",
      "762689014_122105379566454936_388769960741235324_n",
      1535,
      2048,
      "events",
    ),
    fit: "contain" as const,
  },
  buffet: media(
    "buffet",
    "762689021_122105379440454936_478671373189535137_n",
    1151,
    2048,
    "events",
    "50% 42%",
  ),
  partyFood: {
    ...media(
      "partyFood",
      "762829896_122105379314454936_2414932667000592375_n",
      1535,
      2048,
      "events",
    ),
    fit: "contain" as const,
  },
  tomatoes: media(
    "tomatoes",
    "736248544_27378851281723883_589820148711371307_n",
    2048,
    2048,
    "garden",
  ),
  greenhouse: media(
    "greenhouse",
    "639553317_25892944926981200_337326821780466279_n",
    2048,
    2048,
    "garden",
    "50% 20%",
  ),
  lettuce: media(
    "lettuce",
    "699310739_122100224066454936_3550704591779669366_n",
    2048,
    2048,
    "garden",
  ),
  cucumbers: media(
    "cucumbers",
    "696564279_122100223886454936_7428700782310415143_n",
    2048,
    2048,
    "garden",
  ),
  kohlrabi: media(
    "kohlrabi",
    "696734506_122100223796454936_7560969664742871816_n",
    2048,
    2048,
    "garden",
  ),
  harvest: media(
    "harvest",
    "736172629_27378851948390483_5052438660260040337_n",
    2048,
    2048,
    "garden",
  ),
};
export const restaurantMedia = {
  ...newMedia,
  drone: {
    src: "/media/drone-1080.mp4",
    mobileSrc: "/media/drone-720.mp4",
    poster: "/media/drone-courtyard.jpg",
    width: 1920,
    height: 1080,
    duration: "1:31",
  },
  careers: { src: "/media/hladame-kuchara.jpg", width: 1149, height: 1369 },
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
    ...Object.values(newMedia),
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
