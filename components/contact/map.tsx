"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { restaurantConfig } from "@/config/restaurant";
import { restaurantMedia } from "@/config/media";
import { Arrow } from "@/components/ui/sun";
export function RestaurantMap() {
  const [loaded, setLoaded] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (loaded) frame.current?.focus();
  }, [loaded]);
  const t = useTranslations("contact");
  const m = useTranslations("media");
  const photo = restaurantMedia.gallery.find((i) => i.id === "sign")!;
  return (
    <div className="map-area">
      {loaded ? (
        <iframe
          ref={frame}
          tabIndex={0}
          src={restaurantConfig.mapEmbedUrl}
          title={`${t("directions")} — Sluneční Dvůr, Milčeves 55`}
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={photo.src}
            alt={m(photo.id)}
            fill
            sizes="(max-width:760px) 92vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "50% 50%" }}
          />
          <div className="map-prompt">
            <button
              className="button button-cream"
              onClick={() => setLoaded(true)}
            >
              {t("map")}
              <Arrow direction="up-right" />
            </button>
            <p>{t("mapPrivacy")}</p>
          </div>
        </>
      )}
    </div>
  );
}
