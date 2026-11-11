import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Zap } from 'lucide-react';
import stock from '@/data/stock.json';
import { cn } from '@/lib/utils';

type Slot = keyof typeof stock;

/**
 * Slot for licensed stock photography used where Danika has no genuine company photo.
 * - If the optimised file exists in /public/images/stock it is shown with an honest
 *   label (see "label" in stock.json, e.g. "Stock photo" or "Illustrative image") (and the credit from src/data/stock.json), so it is never presented as a Danika project.
 * - If it does not exist yet, a branded placeholder is rendered instead: no broken images, no fake photos.
 */
export function StockImage({ slot, sizes, className, position = 'center', compact = false, zoom = false }: { slot: Slot; sizes: string; className?: string; position?: string; compact?: boolean; zoom?: boolean }) {
  const s = stock[slot];
  const exists = fs.existsSync(path.join(process.cwd(), 'public', 'images', 'stock', s.file));

  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-primary-dark', className)}>
      {exists ? (
        <>
          <Image src={`/images/stock/${s.file}`} alt={s.alt} fill sizes={sizes} loading="lazy" className={cn('object-cover', zoom && 'img-zoom')} style={{ objectPosition: position }} />
          {!compact && <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" aria-hidden />}
          <p className={cn('absolute z-[2] font-semibold tracking-wide text-white', compact ? 'bottom-2 left-2.5 rounded bg-primary-dark/85 px-2 py-0.5 text-[0.625rem]' : 'bottom-3 left-3 rounded-btn bg-primary-dark/80 px-3 py-1 text-[0.7rem] backdrop-blur-sm')}>
            {s.label}{s.credit ? ` · ${s.credit}` : ''} · not a Danika project
          </p>
        </>
      ) : (
        <div className="blueprint absolute inset-0 grid place-items-center bg-primary-dark" aria-hidden>
          <Zap className="h-24 w-24 text-white/80" strokeWidth={1.25} />
        </div>
      )}
    </div>
  );
}
