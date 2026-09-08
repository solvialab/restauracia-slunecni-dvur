"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Arrow } from "@/components/ui/sun";
import type { MediaItem } from "@/config/media";
import imageLoader from "@/lib/image-loader";
import { trapDialogTab } from "@/components/ui/dialog-focus";

export default function Lightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: MediaItem[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const t = useTranslations("common");
  const m = useTranslations("media");
  const caption = useTranslations("captions");
  const next = useCallback(
    (step: number) => setIndex((i) => (i + step + items.length) % items.length),
    [items.length],
  );
  useEffect(() => {
    const el = dialog.current!;
    const focused = document.activeElement as HTMLElement | null;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el.showModal();
    return () => {
      el.close();
      document.body.style.overflow = old;
      focused?.focus();
    };
  }, []);
  useEffect(() => {
    for (const delta of [-1, 1]) {
      const asset = items[(index + delta + items.length) % items.length];
      const img = new window.Image();
      img.src = imageLoader({ src: asset.src, width: 1440 });
    }
  }, [index, items]);
  const item = items[index];
  return (
    <dialog
      className="lightbox"
      ref={dialog}
      aria-label={caption(item.id)}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
      onKeyDown={(e) => {
        trapDialogTab(e);
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          next(-1);
        }
      }}
    >
      <div className="lightbox-top">
        <span>SLUNEČNÍ DVŮR</span>
        <button
          className="close-button"
          onClick={onClose}
          aria-label={t("close")}
        >
          ×
        </button>
      </div>
      <button
        className="lightbox-arrow prev"
        onClick={() => next(-1)}
        aria-label={t("previous")}
      >
        <Arrow direction="left" />
      </button>
      <div
        className="lightbox-image"
        onTouchStart={(e) => {
          touch.current = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
          };
        }}
        onTouchEnd={(e) => {
          if (!touch.current) return;
          const dx = e.changedTouches[0].clientX - touch.current.x;
          const dy = e.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3)
            next(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <Image
          key={item.id}
          src={item.src}
          alt={m(item.id)}
          fill
          sizes="(max-width:760px) 100vw, 88vw"
          style={{ objectFit: "contain" }}
          className="lightbox-photo"
        />
      </div>
      <button
        className="lightbox-arrow next"
        onClick={() => next(1)}
        aria-label={t("next")}
      >
        <Arrow />
      </button>
      <div className="lightbox-caption" aria-live="polite" aria-atomic="true">
        <p>{caption(item.id)}</p>
        <span>
          {String(index + 1).padStart(2, "0")}
          <i>/</i>
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
    </dialog>
  );
}
