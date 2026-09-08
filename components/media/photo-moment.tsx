"use client";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MediaItem } from "@/config/media";
export function PhotoMoment({
  asset,
  alt,
  caption,
}: {
  asset: MediaItem;
  alt: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 6% 0 6%)", "inset(0 0% 0 0%)"],
  );
  return (
    <div className="photo-moment" ref={ref}>
      <motion.div
        className="photo-moment-image"
        style={{ clipPath: reduced ? "none" : clip }}
      >
        <Image
          src={asset.src}
          alt={alt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: asset.position }}
        />
        <div className="photo-moment-shade" />
        <span>{caption}</span>
      </motion.div>
    </div>
  );
}
