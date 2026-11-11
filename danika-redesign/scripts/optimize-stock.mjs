// Optimises licensed stock photos for the slots defined in src/data/stock.json.
// 1) Put the downloaded original in assets/stock-originals/ named like the slot file, e.g.
//    assets/stock-originals/electrician-breaker-panel.jpg   (any of jpg/jpeg/png/webp)
// 2) npm run images:stock   ->  public/images/stock/<slot>.webp (cropped to the slot size, WebP q78)
// 3) Fill in "credit" for the slot in src/data/stock.json (photographer / source / licence).
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const slots = JSON.parse(await readFile(new URL('../src/data/stock.json', import.meta.url), 'utf8'));
const inDir = new URL('../assets/stock-originals/', import.meta.url).pathname;
const outDir = new URL('../public/images/stock/', import.meta.url).pathname;
await mkdir(outDir, { recursive: true });
const files = await readdir(inDir);

let done = 0;
for (const [slot, s] of Object.entries(slots)) {
  const base = parse(s.file).name;
  const src = files.find((f) => parse(f).name === base && /\.(jpe?g|png|webp)$/i.test(f));
  if (!src) { console.log(`– ${slot}: no original found (expected assets/stock-originals/${base}.jpg)`); continue; }
  // Export at 2x the layout size for retina; next/image then serves the right size per device.
  await sharp(join(inDir, src)).rotate().resize(s.width, s.height, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78, effort: 5 }).toFile(join(outDir, s.file));
  console.log(`✔ ${slot}: ${src} → public/images/stock/${s.file} (${s.width}×${s.height})`);
  done++;
}
console.log(done ? '\nRemember to add the photographer/source/licence to "credit" in src/data/stock.json.' : '\nNothing processed.');
