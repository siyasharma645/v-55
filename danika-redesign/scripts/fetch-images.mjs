// Downloads the original-site photos into /public/images so they can be self-hosted and optimised by Next.js.
// Usage: npm run images:fetch   (then set NEXT_PUBLIC_LOCAL_IMAGES=1)
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const manifest = JSON.parse(await readFile(new URL('../src/data/images.json', import.meta.url), 'utf8'));
const outDir = new URL('../public/images/', import.meta.url).pathname;
await mkdir(outDir, { recursive: true });

let failed = 0;
for (const [key, img] of Object.entries(manifest)) {
  try {
    const res = await fetch(img.remote);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(join(outDir, img.local), Buffer.from(await res.arrayBuffer()));
    console.log(`✔ ${key} → public/images/${img.local}`);
  } catch (err) {
    failed++;
    console.error(`✘ ${key}: ${err.message} (${img.remote})`);
  }
}
if (failed) { console.error(`\n${failed} image(s) failed. Re-run, or download them manually into public/images/.`); process.exit(1); }
console.log('\nDone. Set NEXT_PUBLIC_LOCAL_IMAGES=1 in .env.local / Vercel to use them.');
