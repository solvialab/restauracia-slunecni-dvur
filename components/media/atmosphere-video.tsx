"use client";
import { assetPath } from "@/lib/paths";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { restaurantMedia } from "@/config/media";
export function AtmosphereVideo() {
  const t = useTranslations("atmosphere");
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!playing) return;
    video.current?.focus();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.current?.pause();
      },
      { threshold: 0.15 },
    );
    if (wrap.current) observer.observe(wrap.current);
    return () => observer.disconnect();
  }, [playing]);
  return (
    <div className="video-block" ref={wrap}>
      <div className="video-frame">
        {playing ? (
          <video
            ref={video}
            tabIndex={0}
            src={assetPath(restaurantMedia.video.src)}
            poster={assetPath(restaurantMedia.video.poster)}
            controls
            playsInline
            muted
            autoPlay
            preload="none"
            width={720}
            height={1280}
            aria-label={t("videoLabel")}
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="video-trigger"
            aria-label={t("play")}
          >
            <Image
              src={restaurantMedia.video.poster}
              alt={t("videoLabel")}
              fill
              sizes="(max-width:760px) 45vw, 260px"
            />
            <span className="play-symbol">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                aria-hidden="true"
              >
                <path d="m3 2 13 8-13 8Z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className="video-copy">
        <span className="eyebrow">MILČEVES · 0:12</span>
        <p>{t("play")}</p>
        <small>{t("videoText")}</small>
      </div>
    </div>
  );
}
