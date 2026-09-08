"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { restaurantMedia, type MediaCategory } from "@/config/media";
import { Arrow } from "@/components/ui/sun";
const Lightbox = dynamic(() => import("./lightbox"), { ssr: false });

export function Gallery({ preview = false }: { preview?: boolean }) {
  const t = useTranslations("gallery");
  const m = useTranslations("media");
  const [filter, setFilter] = useState<MediaCategory | "all">("all");
  const [selected, setSelected] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const all = preview
    ? [
        restaurantMedia.gallery[0],
        restaurantMedia.gallery[2],
        restaurantMedia.gallery[3],
      ]
    : restaurantMedia.gallery;
  const items =
    filter === "all" ? all : all.filter((item) => item.category === filter);
  const categories = ["all", ...new Set(all.map((i) => i.category))] as const;
  return (
    <>
      {!preview && (
        <div className="gallery-filters" aria-label={t("pageTitle")}>
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={filter === c ? "active" : ""}
            >
              {t(c)}
              <span>
                {c === "all"
                  ? all.length
                  : all.filter((i) => i.category === c).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <motion.div
        key={filter}
        initial={reduced ? false : { opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`gallery-composition ${preview ? "gallery-preview" : "gallery-full"} ${filter !== "all" ? "gallery-filtered" : ""}`}
      >
        {items.map((item, i) => (
          <figure
            key={item.id}
            className={`gallery-item gallery-item-${i % 5}`}
          >
            <button
              aria-label={`${t("open")}: ${m(item.id)}`}
              onClick={() => setSelected(i)}
            >
              <Image
                src={item.src}
                alt={m(item.id)}
                fill
                sizes={
                  preview
                    ? "(max-width:760px) 92vw, 55vw"
                    : "(max-width:760px) 92vw, (max-width:1100px) 50vw, 60vw"
                }
                style={{ objectFit: "cover", objectPosition: item.position }}
              />
              <span className="gallery-enlarge">
                <Arrow direction="up-right" />
              </span>
            </button>
            <figcaption>
              <span>{t(item.category)}</span>
              <span>{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </motion.div>
      {selected !== null && (
        <Lightbox
          items={items}
          initialIndex={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
