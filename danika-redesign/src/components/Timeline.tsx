'use client';

import { useEffect, useRef } from 'react';

type Step = { title: string; text: string };

/** Vertical process timeline. The red line draws as the list scrolls through view (static when motion is reduced). */
export function Timeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      el.style.setProperty('--p', String(p));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <ol ref={ref} className="relative space-y-9 lg:space-y-10" style={{ '--p': 1 } as React.CSSProperties}>
      <span className="absolute bottom-2 left-[1.15rem] top-2 w-0.5 bg-muted" aria-hidden />
      <span className="absolute bottom-2 left-[1.15rem] top-2 w-0.5 origin-top bg-primary" style={{ transform: 'scaleY(var(--p))' }} aria-hidden />
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5">
          <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-heading text-lg font-extrabold text-white" aria-hidden>{i + 1}</span>
          <div className="pt-1.5">
            <h4 className="font-heading text-[1.4rem] font-bold leading-tight !text-primary">{s.title}</h4>
            <p className="mt-1.5 max-w-lg text-base leading-relaxed text-fg-soft">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
