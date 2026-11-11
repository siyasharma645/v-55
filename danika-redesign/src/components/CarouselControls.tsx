'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Previous/next buttons and a position count for a horizontally scrolling, snap-aligned list. */
export function CarouselControls({ targetId, label, className = '' }: { targetId: string; label: string; className?: string }) {
  const [pos, setPos] = useState({ i: 1, n: 1, start: true, end: false });

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () => {
      const items = Array.from(el.children) as HTMLElement[];
      const base = items[0]?.offsetLeft ?? 0;
      let i = 0;
      items.forEach((it, k) => { if (it.offsetLeft - base <= el.scrollLeft + 8) i = k; });
      setPos({ i: i + 1, n: items.length, start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [targetId]);

  const go = (dir: 1 | -1) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' });
  };
  const btn = 'grid h-11 w-11 place-items-center rounded-full border-2 border-primary bg-white text-primary btn-motion hover:bg-primary hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-primary';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button type="button" onClick={() => go(-1)} disabled={pos.start} aria-label={`Previous ${label}`} className={btn}><ChevronLeft className="h-5 w-5" aria-hidden /></button>
      <span className="min-w-[3.5rem] text-center text-sm font-semibold tabular-nums text-fg-soft" aria-hidden>{pos.i} / {pos.n}</span>
      <button type="button" onClick={() => go(1)} disabled={pos.end} aria-label={`Next ${label}`} className={btn}><ChevronRight className="h-5 w-5" aria-hidden /></button>
    </div>
  );
}
