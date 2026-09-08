import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { MediaItem } from "@/config/media";
export async function Photo({
  asset,
  className = "",
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  asset: MediaItem;
  className?: string;
  sizes?: string;
}) {
  const t = await getTranslations("media");
  return (
    <div className={`photo ${className}`}>
      <Image
        src={asset.src}
        alt={t(asset.id)}
        fill
        sizes={sizes}
        style={{ objectPosition: asset.position }}
      />
    </div>
  );
}
