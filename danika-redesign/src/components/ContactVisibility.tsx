'use client';

import { useEffect } from 'react';

/** Ids of contact sections currently on screen. Shared so two sections (quick form + full form) never cancel each other out. */
const visible = new Set<string>();

/** Flags <html data-contact-visible> while any contact section is on screen, so floating CTAs (.float-cta) step aside and never cover a form. */
export function ContactVisibility({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    const sync = () => { if (visible.size) root.setAttribute('data-contact-visible', ''); else root.removeAttribute('data-contact-visible'); };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) visible.add(targetId); else visible.delete(targetId);
      sync();
    });
    io.observe(el);
    return () => { io.disconnect(); visible.delete(targetId); sync(); };
  }, [targetId]);
  return null;
}
