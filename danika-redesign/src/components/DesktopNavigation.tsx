'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { electricalAll, electricalGroups, electricalNav, plumbingAll, plumbingGroups, plumbingNav, topLinks, type NavGroup, type NavLink } from '@/data/nav';
import { hasCurrent, isCurrentHref } from '@/lib/nav-state';
import { cn } from '@/lib/utils';
import { HomeLink } from '@/components/HomeLink';

/** Pointer intent: a short delay before opening stops accidental opens while sweeping across the bar; a longer one before closing forgives a wobbly path into the panel. */
const OPEN_DELAY = 60;
const CLOSE_DELAY = 180;
/** Minimum gap kept between a panel and the viewport edge. */
const EDGE = 16;

// One treatment for every top-level item: hover and "expanded" share a tint; the current page / parent category gets an underline bar (no weight change, so nothing shifts).
const item =
  'relative inline-flex h-12 items-center gap-1.5 rounded-btn px-3.5 text-[1.0781rem] font-medium leading-none text-white min-[1280px]:px-4 transition-colors duration-fast ease-out-soft hover:bg-white/10 aria-expanded:bg-white/10 ' +
  'after:pointer-events-none after:absolute after:inset-x-3.5 min-[1280px]:after:inset-x-4 after:bottom-1.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-white after:opacity-0 after:transition-[transform,opacity] after:duration-base after:ease-out-soft ' +
  'hover:after:scale-x-100 hover:after:opacity-50 aria-expanded:after:scale-x-100 aria-expanded:after:opacity-50 ' +
  'aria-[current=page]:after:scale-x-100 aria-[current=page]:after:opacity-100 data-[current]:after:scale-x-100 data-[current]:after:opacity-100';

const panelLink =
  'flex min-h-10 items-center rounded-btn px-2 text-[0.9375rem] font-medium text-fg transition-colors duration-fast ease-out-soft hover:bg-cream hover:text-primary aria-[current=page]:bg-cream aria-[current=page]:text-primary';

type DropdownProps = {
  id: string;
  label: string;
  groups: NavGroup[];
  all: NavLink;
  pathname: string | null;
  isOpen: boolean;
  isParentOfCurrent: boolean;
  registerTrigger: (id: string, el: HTMLButtonElement | null) => void;
  onPointerEnter: (e: React.PointerEvent) => void;
  onPointerLeave: (e: React.PointerEvent) => void;
  onToggle: () => void;
  onArrowDown: () => void;
  onFocusLeave: () => void;
  onNavigate: () => void;
};

/** Mega-menu: the panel is anchored to its own trigger and shifted back inside the viewport if it would overflow. */
function Dropdown({ id, label, groups, all, pathname, isOpen, isParentOfCurrent, registerTrigger, onPointerEnter, onPointerLeave, onToggle, onArrowDown, onFocusLeave, onNavigate }: DropdownProps) {
  const li = useRef<HTMLLIElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const place = () => {
      if (!li.current || !panel.current) return;
      const vw = document.documentElement.clientWidth;
      const left = li.current.getBoundingClientRect().left;
      const width = panel.current.offsetWidth;
      const target = Math.min(Math.max(left, EDGE), Math.max(EDGE, vw - EDGE - width));
      setShift(Math.round(target - left));
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [isOpen]);

  const moveFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>('a[href]'));
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (!links.length || i < 0) return;
    e.preventDefault();
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? links.length - 1 : (i + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
    links[next].focus();
  };

  return (
    <li
      ref={li}
      className="relative flex items-center self-stretch"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(e) => {
        // Only a real keyboard move out of this item closes it. A null relatedTarget (mouse press in Safari, window blur) must not,
        // or the panel would vanish between mousedown and click.
        const next = e.relatedTarget as Node | null;
        if (next && !e.currentTarget.contains(next)) onFocusLeave();
      }}
    >
      <button
        ref={(el) => registerTrigger(id, el)}
        type="button"
        className={item}
        data-current={isParentOfCurrent ? '' : undefined}
        aria-expanded={isOpen}
        aria-controls={`d-${id}`}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); onArrowDown(); } }}
      >
        {label}
        {isParentOfCurrent && <span className="sr-only">, current section</span>}
        <ChevronDown className={cn('h-[18px] w-[18px] transition-transform duration-base ease-out-soft', isOpen && 'rotate-180')} strokeWidth={2} aria-hidden />
      </button>

      {/* Always mounted so aria-controls is valid; inert + invisible while closed. */}
      <div
        id={`d-${id}`}
        ref={panel}
        inert={!isOpen}
        style={{ left: shift }}
        onKeyDown={moveFocus}
        className={cn(
          'on-light absolute top-full z-50 w-[35rem] max-w-[calc(100vw-2rem)] pt-1.5 transition-[opacity,transform,visibility] duration-base ease-out-soft',
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1.5 opacity-0',
        )}
      >
        <div className="rounded-card border border-line bg-white p-3 text-fg shadow-menu">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {groups.map((g) => {
              const headingId = `d-${id}-${g.heading}`.replace(/\W+/g, '-');
              return (
                <div key={g.heading}>
                  <p id={headingId} className="px-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">{g.heading}</p>
                  <ul className="mt-1" aria-labelledby={headingId}>
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} onClick={onNavigate} aria-current={isCurrentHref(l.href, pathname) ? 'page' : undefined} className={panelLink}>{l.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-3 border-t border-line pt-2">
            <a href={all.href} onClick={onNavigate} aria-current={isCurrentHref(all.href, pathname) ? 'page' : undefined} className={cn(panelLink, 'group gap-1.5 font-semibold text-primary')}>
              {all.label} <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={2} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Inline navigation, 1100px and up (below that the drawer is used).
 * Hover opens a menu after a short delay; click or Enter/Space pins it open; ArrowDown opens it and moves into it.
 * Escape, a click outside, or tabbing out closes it. Never hover-only.
 */
export function DesktopNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pinned = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const focusFirstOf = useRef<string | null>(null);

  const clearTimer = () => { window.clearTimeout(timer.current); timer.current = undefined; };
  const close = useCallback(() => { window.clearTimeout(timer.current); timer.current = undefined; pinned.current = false; setOpen(null); }, []);
  const registerTrigger = useCallback((id: string, el: HTMLButtonElement | null) => { triggers.current[id] = el; }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Outside press and Escape, active only while something is open.
  useEffect(() => {
    if (open === null) return;
    const onDown = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) close(); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const id = open;
      const hadFocusInside = navRef.current?.contains(document.activeElement);
      close();
      if (hadFocusInside) triggers.current[id]?.focus();
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open, close]);

  // ArrowDown on a trigger: once its panel is open, move focus to the first link.
  useEffect(() => {
    if (open && focusFirstOf.current === open) {
      focusFirstOf.current = null;
      // The panel becomes focusable once it is un-inerted and visible, which can lag the render by a frame or two: retry briefly.
      const panel = `#d-${open}`;
      const tryFocus = (left: number) => {
        const link = navRef.current?.querySelector<HTMLElement>(`${panel} a[href]`);
        link?.focus();
        if (left > 0 && !(link && document.activeElement === link)) window.setTimeout(() => tryFocus(left - 1), 40);
      };
      requestAnimationFrame(() => tryFocus(5));
    }
  }, [open]);

  const enter = (id: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return; // touch and pen use click only
    clearTimer();
    if (open === id) return;
    if (open !== null) { pinned.current = false; setOpen(id); return; } // already browsing: switch instantly
    timer.current = window.setTimeout(() => { pinned.current = false; setOpen(id); }, OPEN_DELAY);
  };
  const leave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    clearTimer();
    if (pinned.current) return; // a clicked-open menu stays until dismissed
    timer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY);
  };
  const toggle = (id: string) => () => {
    clearTimer();
    if (open !== id) { pinned.current = true; setOpen(id); }
    else if (pinned.current) close();
    else pinned.current = true; // hover had opened it; a click makes it stay
  };
  const arrowDown = (id: string) => () => {
    clearTimer();
    pinned.current = true;
    if (open === id) navRef.current?.querySelector<HTMLElement>(`#d-${id} a[href]`)?.focus();
    else { focusFirstOf.current = id; setOpen(id); }
  };

  const dropdown = (id: string, label: string, groups: NavGroup[], all: NavLink, links: NavLink[]) => (
    <Dropdown
      id={id}
      label={label}
      groups={groups}
      all={all}
      pathname={pathname}
      isOpen={open === id}
      isParentOfCurrent={hasCurrent([...links, all], pathname)}
      registerTrigger={registerTrigger}
      onPointerEnter={enter(id)}
      onPointerLeave={leave}
      onToggle={toggle(id)}
      onArrowDown={arrowDown(id)}
      onFocusLeave={() => { if (open === id) close(); }}
      onNavigate={close}
    />
  );

  const homeCurrent = isCurrentHref(topLinks.home.href, pathname);
  const aboutCurrent = isCurrentHref(topLinks.about.href, pathname);

  return (
    <nav ref={navRef} aria-label="Main" className="hidden h-full min-[1100px]:block">
      <ul className="flex h-full items-center gap-1 min-[1280px]:gap-2">
        <li className="flex items-center self-stretch"><HomeLink className={item} aria-current={homeCurrent ? 'page' : undefined}>{topLinks.home.label}</HomeLink></li>
        {dropdown('plumbing', 'Plumbing', plumbingGroups, plumbingAll, plumbingNav)}
        {dropdown('electrical', 'Electrical', electricalGroups, electricalAll, electricalNav)}
        <li className="flex items-center self-stretch"><a href={topLinks.about.href} className={item} aria-current={aboutCurrent ? 'page' : undefined}>{topLinks.about.label}</a></li>
        <li className="flex items-center self-stretch"><a href={topLinks.serviceAreas.href} className={item}>{topLinks.serviceAreas.label}</a></li>
      </ul>
    </nav>
  );
}
