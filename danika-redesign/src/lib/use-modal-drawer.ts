import { useEffect, type RefObject } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const isTabbable = (el: HTMLElement) =>
  !el.closest('[inert]') && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';

/**
 * Modal behaviour for a drawer that lives inside `containerRef` (the header, so the menu button stays reachable):
 *  - locks page scroll (the scrollbar gutter is reserved in CSS, so nothing shifts)
 *  - makes everything outside the container inert, so neither keyboard focus nor assistive tech can reach the page behind
 *  - cycles Tab / Shift+Tab inside the container
 *  - Escape dismisses; growing into the desktop layout closes without moving focus
 * Everything is undone on close.
 */
export function useModalDrawer({
  open,
  containerRef,
  onClose,
  desktopQuery,
}: {
  open: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onClose: (restoreFocus: boolean) => void;
  desktopQuery: string;
}) {
  useEffect(() => {
    const container = containerRef.current;
    if (!open || !container) return;

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const inerted: Element[] = [];
    for (let node: Element | null = container; node && node !== document.body; node = node.parentElement) {
      for (const sibling of Array.from(node.parentElement?.children ?? [])) {
        if (sibling !== node && !sibling.hasAttribute('inert')) {
          sibling.setAttribute('inert', '');
          inerted.push(sibling);
        }
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose(true);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(isTabbable);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!container.contains(active)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);

    const mq = window.matchMedia(desktopQuery);
    const onChange = () => { if (mq.matches) onClose(false); };
    mq.addEventListener('change', onChange);

    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
      html.style.overflow = prevOverflow;
      inerted.forEach((el) => el.removeAttribute('inert'));
    };
  }, [open, containerRef, onClose, desktopQuery]);
}
