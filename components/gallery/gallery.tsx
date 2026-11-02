"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { restaurantMedia, type MediaItem } from "@/config/media";
import { Arrow } from "@/components/ui/sun";
const Lightbox = dynamic(() => import("./lightbox"), { ssr: false });
const categories = ["food", "events", "place", "garden"] as const;
type GalleryCategory = (typeof categories)[number];
const categoryFor = (item: MediaItem): GalleryCategory => {
  if (item.category === "restaurant" || item.category === "courtyard")
    return "place";
  return item.category === "kitchen" ? "food" : item.category;
};

export function Gallery({ preview = false }: { preview?: boolean }) {
  const t = useTranslations("gallery");
  const m = useTranslations("media");
  const caption = useTranslations("captions");
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [selected, setSelected] = useState<number | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (preview) return;
    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      setFilter(
        categories.includes(hash as GalleryCategory)
          ? (hash as GalleryCategory)
          : "all",
      );
      setSelected(null);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [preview]);
  const all: MediaItem[] = preview
    ? [
        restaurantMedia.celebration,
        restaurantMedia.slovakTrio,
        restaurantMedia.greenhouse,
      ]
    : categories.flatMap((category) =>
        restaurantMedia.gallery.filter(
          (item) => categoryFor(item) === category,
        ),
      );
  const items =
    filter === "all" ? all : all.filter((item) => categoryFor(item) === filter);
  const groups = preview
    ? []
    : categories.filter((category) => filter === "all" || filter === category);
  const selectFilter = (category: GalleryCategory | "all") => {
    setFilter(category);
    setSelected(null);
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}${category === "all" ? "" : `#${category}`}`,
    );
  };
  const tile = (item: MediaItem) => (
    <figure key={item.id} className="gallery-item">
      <button
        aria-label={`${t("open")}: ${caption(item.id)}`}
        onClick={() =>
          setSelected(items.findIndex((photo) => photo.id === item.id))
        }
      >
        <Image
          src={item.src}
          alt={m(item.id)}
          fill
          sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 31vw"
          style={{
            objectFit: item.fit || "cover",
            objectPosition: item.position,
          }}
        />
        <span className="gallery-enlarge">
          <Arrow direction="up-right" />
        </span>
      </button>
      <figcaption>
        <span>{caption(item.id)}</span>
        {preview && <small>{t(categoryFor(item))}</small>}
      </figcaption>
    </figure>
  );
  return (
    <>
      {!preview && (
        <div className="gallery-toolbar">
          <div
            className="gallery-filters"
            role="group"
            aria-label={t("pageTitle")}
          >
            {(["all", ...categories] as const).map((category) => (
              <button
                key={category}
                aria-pressed={filter === category}
                onClick={() => selectFilter(category)}
                className={filter === category ? "active" : ""}
              >
                {t(category)}
                <span>
                  {category === "all"
                    ? all.length
                    : all.filter((item) => categoryFor(item) === category)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <p className="gallery-result-count" role="status">
            {t("showing", { count: items.length })}
          </p>
        </div>
      )}
      <motion.div
        key={filter}
        initial={reduced ? false : { opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {preview ? (
          <div className="gallery-tiles gallery-preview-tiles">
            {items.map(tile)}
          </div>
        ) : (
          groups.map((category) => (
            <section
              className={`gallery-collection gallery-collection-${category}`}
              id={category}
              key={category}
              aria-labelledby={`gallery-heading-${category}`}
            >
              <div className="gallery-collection-heading">
                <h2 id={`gallery-heading-${category}`}>
                  {t(`groups.${category}.title`)}
                </h2>
                <p>{t(`groups.${category}.text`)}</p>
              </div>
              <div className="gallery-tiles">
                {items
                  .filter((item) => categoryFor(item) === category)
                  .map(tile)}
              </div>
            </section>
          ))
        )}
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
