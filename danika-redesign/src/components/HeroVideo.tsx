'use client';

import { useEffect, useRef } from 'react';

const ID = 'hero-video';

/** Silent, looping background video (no on-screen controls). People who prefer reduced motion get the still poster instead. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // React does not reliably set the muted attribute; autoplay needs it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return; }
    const start = () => { if (v.paused) v.play().catch(() => { /* still blocked: the poster stays visible */ }); };
    start();
    // If the browser blocked autoplay (e.g. low-power mode), start on the first interaction or when the tab becomes visible again.
    const onVisible = () => { if (document.visibilityState === 'visible') start(); };
    const once = { once: true, passive: true } as const;
    window.addEventListener('touchstart', start, once);
    window.addEventListener('pointerdown', start, once);
    window.addEventListener('scroll', start, once);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('touchstart', start);
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('scroll', start);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return (
    <video
      ref={ref}
      id={ID}
      className="absolute inset-0 h-full w-full object-cover object-center"
      autoPlay muted loop playsInline preload="auto" aria-hidden tabIndex={-1}
      poster="/videos/home-hero-poster.jpg"
    >
      <source src="/videos/home-hero.mp4" type="video/mp4" />
    </video>
  );
}
