import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Use an available Sharp installation, optionally passing its absolute module path.
const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] || "sharp");
const mascot = await readFile(new URL("../src/assets/nutrime-mascot.png", import.meta.url));
const source = await readFile(new URL("../src/assets/social-card.svg", import.meta.url), "utf8");
const svg = source.replace(
  "nutrime-mascot.png",
  `data:image/png;base64,${mascot.toString("base64")}`,
);
await sharp(Buffer.from(svg))
  .png()
  .toFile(fileURLToPath(new URL("../public/social-card.png", import.meta.url)));

const favicon = await readFile(new URL("../public/favicon.svg", import.meta.url));
for (const [filename, size] of [
  ["favicon-32.png", 32],
  ["apple-touch-icon.png", 180],
  ["icon-512.png", 512],
]) {
  await sharp(favicon)
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(new URL(`../public/${filename}`, import.meta.url)));
}
