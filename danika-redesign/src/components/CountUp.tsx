'use client';

import { useEffect, useRef, useState } from 'react';

const format = (n: number, decimals: number) => n.toFixed(decimals);

/**
 * Number that counts up from 0 the first time it scrolls into view.
 *  - The final value is what the server renders, so it is correct without JavaScript and in the first paint.
 *  - An invisible copy of the final text reserves the width, so the layout never jiggles while digits change.
 *  - Screen readers get the final value once (the animated digits are aria-hidden).
 *  - Visitors who prefer reduced motion simply see the final value.
 */
export function CountUp({ value, decimals = 0, suffix = '', duration = 1400, className }: { value: number; decimals?: number; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = format(value, decimals);
  const [shown, setShown] = useState(final);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    setShown(format(0, decimals));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic: fast start, gentle landing
          setShown(format(value * eased, decimals));
          if (t < 1) raf = requestAnimationFrame(tick); else setShown(final);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, decimals, duration, final]);

  return (
    <span ref={ref} className={`relative inline-block tabular-nums ${className ?? ''}`}>
      <span className="invisible" aria-hidden>{final}{suffix}</span>
      <span className="absolute inset-0 text-center" aria-hidden>{shown}{suffix}</span>
      <span className="sr-only">{final}{suffix}</span>
    </span>
  );
}
