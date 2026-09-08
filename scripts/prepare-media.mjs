import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("public/media");
const output = path.join(dir, "optimized");
await mkdir(output, { recursive: true });
let count = 0;
for (const file of await readdir(dir)) {
  if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;
  const source = path.join(dir, file);
  for (const width of [320, 480, 768, 1080, 1440, 1920]) {
    const target = path.join(output, `${path.parse(file).name}-${width}.webp`);
    const fresh = await stat(target)
      .then(async (s) => s.mtimeMs >= (await stat(source)).mtimeMs)
      .catch(() => false);
    if (fresh) continue;
    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 83, effort: 5 })
      .toFile(target);
    count++;
  }
}
console.log(`Prepared ${count} responsive images; original media preserved.`);
