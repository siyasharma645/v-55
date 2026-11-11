'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { stagger } from '@/lib/motion';

/**
 * Scroll reveal (IntersectionObserver + CSS transition from the motion tokens in globals.css).
 * - Animates once: the observer disconnects after the first reveal.
 * - Opacity and transform only, so nothing shifts layout.
 * - Content is only hidden when the `js` class is on <html>, and reduced-motion users get it instantly.
 * Pass `index` for a gentle stagger among siblings (or `delay` in ms for a custom value).
 */
export function Reveal({
  children, className, delay, index, as: Tag = 'div',
}: { children: ReactNode; className?: string; delay?: number; index?: number; as?: 'div' | 'li' | 'article' | 'header' | 'span' }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ms = delay ?? (index !== undefined ? stagger(index) : 0);
  return (
    <Tag
      ref={ref as never}
      className={cn('reveal', visible && 'is-visible', className)}
      style={ms ? { transitionDelay: `${ms}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
