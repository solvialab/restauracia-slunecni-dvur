import { assetPath } from "./paths";
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (!src.startsWith("/media/") || !/\.(jpg|jpeg|png)$/i.test(src))
    return src.startsWith("/") ? assetPath(src) : src;
  const name = src
    .split("/")
    .pop()!
    .replace(/\.[^.]+$/, "");
  const sizes = [320, 480, 768, 1080, 1440, 1920];
  const selected = sizes.find((size) => size >= width) ?? 1920;
  return assetPath(`/media/optimized/${name}-${selected}.webp`);
}
