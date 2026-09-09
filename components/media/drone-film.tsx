"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { restaurantMedia } from "@/config/media";
import { assetPath } from "@/lib/paths";
import { PlayIcon } from "@/components/ui/sun";

export function DroneFilm() {
  const t = useTranslations("drone");
  const film = restaurantMedia.drone;
  const [source, setSource] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (failed) trigger.current?.focus({ preventScroll: true });
  }, [failed]);
  useEffect(() => {
    const video = player.current;
    if (!source || !video) return;
    video.focus({ preventScroll: true });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.1 },
    );
    if (frame.current) observer.observe(frame.current);
    const pauseWhenHidden = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [source]);
  const start = () => {
    setFailed(false);
    setSource(
      window.matchMedia("(max-width: 900px)").matches
        ? film.mobileSrc
        : film.src,
    );
  };
  return (
    <div className="drone-film">
      <figure className="container" aria-labelledby="drone-title">
        <div className="drone-stage" ref={frame}>
          {source ? (
            <video
              ref={player}
              tabIndex={0}
              src={assetPath(source)}
              poster={assetPath(film.poster)}
              width={film.width}
              height={film.height}
              aria-label={t("videoLabel")}
              aria-describedby="drone-description"
              controls
              playsInline
              muted
              autoPlay
              preload="none"
              onError={() => {
                setSource(null);
                setFailed(true);
              }}
            >
              <a href={assetPath(film.mobileSrc)}>{t("open")}</a>
            </video>
          ) : (
            <button
              ref={trigger}
              className="drone-start"
              onClick={start}
              aria-label={failed ? t("retry") : t("play")}
            >
              <Image
                src={film.poster}
                alt={t("posterAlt")}
                fill
                sizes="(max-width: 760px) 100vw, 90vw"
              />
              <span className="drone-shade" />
              <span className="drone-play-badge">
                <span className="drone-play-circle">
                  <PlayIcon />
                </span>
                <span>{failed ? t("retry") : t("play")}</span>
              </span>
              <span className="drone-location" aria-hidden="true">
                MILČEVES · ŽATEC
              </span>
            </button>
          )}
        </div>
        <figcaption className="drone-caption">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 id="drone-title">{t("title")}</h2>
          </div>
          <div className="drone-caption-copy">
            <p id="drone-description">{t("description")}</p>
            <span className="drone-duration">
              {film.duration}
              <span aria-hidden="true"> · </span>
              {t("silent")}
            </span>
          </div>
          {failed && (
            <p className="drone-error" role="alert">
              {t("error")}{" "}
              <a
                href={assetPath(film.mobileSrc)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("open")}
              </a>
            </p>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
