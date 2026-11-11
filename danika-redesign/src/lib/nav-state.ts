import { ORIGIN } from '@/data/site';
import type { NavLink } from '@/data/nav';

const SITE_HOST = new URL(ORIGIN).host;
const trim = (p: string) => p.replace(/\/+$/, '') || '/';

/**
 * True when `href` points at the page currently being shown.
 * Absolute links to the business's own domain count as internal, so the state is correct once this build
 * is served from that domain; same-page anchors (#service-areas) and other hosts are never "current".
 */
export function isCurrentHref(href: string, pathname: string | null): boolean {
  if (!pathname || href.startsWith('#')) return false;
  let path = href;
  if (!href.startsWith('/')) {
    try {
      const url = new URL(href);
      if (url.host !== SITE_HOST) return false;
      path = url.pathname;
    } catch {
      return false;
    }
  }
  return trim(path.split(/[?#]/)[0]) === trim(pathname);
}

/** True when any link in the list is the current page (used to mark the parent category). */
export const hasCurrent = (links: NavLink[], pathname: string | null) => links.some((l) => isCurrentHref(l.href, pathname));
