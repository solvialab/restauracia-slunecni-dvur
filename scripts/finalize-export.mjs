import { rmSync } from "node:fs";
import path from "node:path";

// Next copies public/ wholesale. Keep the local camera master out of deploys.
// Only this generated copy is removed; the supplied original stays untouched.
const exportedMaster = path.resolve("out", "media", "upravene.mp4");
rmSync(exportedMaster, { force: true });
