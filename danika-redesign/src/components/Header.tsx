'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { SITE } from '@/data/site';
import { LOGO } from '@/lib/brand';
import { cn } from '@/lib/utils';
import { useModalDrawer } from '@/lib/use-modal-drawer';
import { HomeLink } from '@/components/HomeLink';
import { CallNowButton } from '@/components/CallNowButton';
import { DesktopNavigation } from '@/components/DesktopNavigation';
import { MobileNavigation } from '@/components/MobileNavigation';

/**
 * Header, three layouts driven by available width:
 *  - ≥1100px  [logo | centred navigation | CALL NOW + number]   (grid: 1fr auto 1fr, so the nav is truly centred)
 *  - 768–1099 [logo ........ CALL NOW + number, menu button]; navigation lives in the drawer
 *  - <768     [logo ........ CALL NOW, menu button]; number lives in the drawer
 * The navigation bar is the very first thing on the page and stays sticky at the top. It has a fixed height (`--header-h`, globals.css),
 * so scrolling never changes its size, and the drawer, anchor offsets and dropdowns all derive from the same value.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  // Shadow once the bar is actually stuck. An observer on a 1px sentinel just above the bar replaces a scroll listener:
  // it fires only on the transition, and the shadow is the only thing that changes (no height, background or border change).
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const close = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) menuButton.current?.focus();
  }, []);
  useModalDrawer({ open: menuOpen, containerRef: headerRef, onClose: close, desktopQuery: '(min-width: 1100px)' });

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[70] focus:rounded-btn focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-primary">Skip to content</a>

      {/* Sticky sentinel: zero net height, sits at the very top of the page where the bar starts. */}
      <div ref={sentinel} aria-hidden className="pointer-events-none -mb-px h-px" />

      <header
        ref={headerRef}
        className={cn(
          'on-red sticky top-0 z-50 bg-primary text-white transition-shadow duration-200 ease-out',
          stuck ? 'shadow-header-stuck' : 'shadow-header-rest',
        )}
      >
        <div className="header-bar flex h-[var(--header-h)] items-center gap-3 min-[1100px]:grid min-[1100px]:grid-cols-[1fr_auto_1fr] min-[1100px]:gap-6 min-[1280px]:gap-10">
          {/* Logo: wordmark PNG at its native 760:327 ratio. The link has a 44px-tall target and a little breathing room (-m/p) that does not move the artwork. */}
          <HomeLink aria-label={`${SITE.name} home`} className="-m-1 flex min-h-11 shrink-0 items-center rounded-btn p-1 min-[1100px]:justify-self-start">
            <Image
              src={LOGO.wordmark.src}
              alt={LOGO.wordmark.alt}
              width={LOGO.wordmark.width}
              height={LOGO.wordmark.height}
              priority
              sizes="(min-width: 1100px) 149px, (min-width: 768px) 139px, (min-width: 360px) 128px, 102px"
              className="aspect-[760/327] h-11 w-auto min-[360px]:h-[55px] md:h-[60px] min-[1100px]:h-16"
            />
          </HomeLink>

          <DesktopNavigation />

          <div className="ml-auto flex items-center gap-2 md:gap-3 min-[1100px]:ml-0 min-[1100px]:justify-self-end">
            <CallNowButton />
            <button
              ref={menuButton}
              type="button"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-btn border border-white/35 text-white transition-colors duration-150 hover:bg-white/10 active:bg-white/15 aria-expanded:bg-white/10 md:h-12 md:w-12 min-[1100px]:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => (menuOpen ? close(false) : setMenuOpen(true))}
            >
              {menuOpen ? <X className="h-6 w-6" strokeWidth={2} aria-hidden /> : <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />}
            </button>
          </div>
        </div>

        <div className="min-[1100px]:hidden">
          <MobileNavigation open={menuOpen} onNavigate={() => close(false)} onDismiss={() => close(true)} />
        </div>
      </header>
    </>
  );
}
