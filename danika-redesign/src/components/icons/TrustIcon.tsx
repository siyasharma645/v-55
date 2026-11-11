import type { ReactNode, SVGProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * Credibility icons: same construction as the service icon family (24×24 grid, round caps/joins, no fills),
 * drawn for a light surface: deep-brick primary strokes (`currentColor`) with one brick-red accent per icon.
 */
export type TrustIconName = 'local' | 'honest' | 'one-company' | 'warranty';

const ACCENT = 'rgb(var(--c-primary))';

const ART: Record<TrustIconName, ReactNode> = {
  // House outline with a location pin set inside it.
  local: (
    <>
      <path d="m3 11.5 9-7.5 9 7.5M5 10v10.5h14V10" />
      <path className="i-accent" stroke={ACCENT} d="M12 18c-2-2-3-3.4-3-4.9a3 3 0 0 1 6 0c0 1.5-1 2.9-3 4.9Z" />
      <circle cx="12" cy="13.1" r=".9" className="i-accent" stroke={ACCENT} />
    </>
  ),
  // Written estimate with a confirming check.
  honest: (
    <>
      <path d="M6 2.5h8.5L19 7v14.5H6ZM14.5 2.5V7H19M9 10.5h7M9 13h4" />
      <path className="i-accent" stroke={ACCENT} d="m9 17.5 2.2 2.2 4.3-4.7" />
    </>
  ),
  // Water droplet beside a lightning bolt.
  'one-company': (
    <>
      <path d="M8 3C5.4 6.300 3.500 8.700 3.500 11.700a4.500 4.500 0 0 0 9 0C12.500 8.700 10.600 6.300 8 3Z" />
      <path className="i-accent" stroke={ACCENT} d="M17.500 9.500 12.500 16.500H16l-1 5 5-7h-3.500Z" />
    </>
  ),
  // Shield with a check.
  warranty: (
    <>
      <path d="m12 2.500-7.500 3v6c0 4.600 3.100 8.200 7.500 10 4.400-1.800 7.500-5.400 7.500-10v-6Z" />
      <path className="i-accent" stroke={ACCENT} d="m8.500 12 2.500 2.500 4.500-5" />
    </>
  ),
};

type Props = Omit<SVGProps<SVGSVGElement>, 'name' | 'children'> & { name: TrustIconName; size?: number };

/** Decorative: each point has a visible heading, so the icon is hidden from assistive tech. */
export function TrustIcon({ name, size = 32, className, ...rest }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false" className={cn('trust-icon', className)} data-icon={name} {...rest}>
      {ART[name]}
    </svg>
  );
}
