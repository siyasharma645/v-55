import type { ReactNode, SVGProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * Danika service icon family.
 *
 * One 24×24 grid, one 1.5 stroke, round caps and joins, no fills. Every icon is drawn in two voices:
 *  - primary strokes use `currentColor` (warm grey, set by the parent),
 *  - a single accent detail per icon uses the white (readable on the brick card).
 * Plumbing and electrical share exactly the same construction so they read as one commissioned set.
 */
export type ServiceIconName =
  | 'emergency-plumbing'
  | 'drain-cleaning'
  | 'water-heater'
  | 'sewer-repair'
  | 'emergency-electrician'
  | 'electrical-repair'
  | 'panel-upgrade'
  | 'ev-charger';

const ACCENT = 'rgb(var(--c-surface))';  // white

/** Each entry is the artwork only; the <svg> wrapper (grid, stroke, caps) is shared below. */
const ART: Record<ServiceIconName, ReactNode> = {
  // Pipe run with a repair clamp and a leaking droplet underneath.
  'emergency-plumbing': (
    <>
      <path d="M2 5h7M15 5h7M2 10h7M15 10h7" />
      <rect x="9" y="3.5" width="6" height="8" rx="1.25" />
      <path className="i-accent" stroke={ACCENT} d="M12 14.5c-1.8 2.3-2.8 3.6-2.8 5.1a2.8 2.8 0 0 0 5.6 0c0-1.5-1-2.8-2.8-5.1Z" />
    </>
  ),
  // Round drain cover with grate slots, water flowing away beneath.
  'drain-cleaning': (
    <>
      <circle cx="12" cy="8.5" r="7" />
      <path d="M8.5 6.5h7M8 8.5h8M8.5 10.5h7" />
      <path className="i-accent" stroke={ACCENT} d="M3 18.5c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0M3 21.5c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0" />
    </>
  ),
  // Storage tank with thermostat dial and rising heat waves.
  'water-heater': (
    <>
      <rect x="5.5" y="2" width="13" height="19" rx="3.5" />
      <path d="M8.5 21v1.5M15.5 21v1.5" />
      <circle cx="12" cy="5.75" r="1.1" />
      <path className="i-accent" stroke={ACCENT} d="M9 16.5c-1-1.2 1-2.3 0-3.5s1-2.3 0-3.5M12 16.5c-1-1.2 1-2.3 0-3.5s1-2.3 0-3.5M15 16.5c-1-1.2 1-2.3 0-3.5s1-2.3 0-3.5" />
    </>
  ),
  // Buried main line with a cleanout riser to the surface and a repair collar.
  'sewer-repair': (
    <>
      <path d="M2 7h8M14 7h8" />
      <path d="M9 3h6M10 3v11M14 3v11" />
      <path d="M2 14h8M14 14h2.5M20 14h2M2 19h14.5M20 19h2" />
      <rect x="16.5" y="12.5" width="3.5" height="8" rx="1" className="i-accent" stroke={ACCENT} />
    </>
  ),
  // Lightning bolt with an alert beacon.
  'emergency-electrician': (
    <>
      <path d="M12 2 4 13.5h6L9 22l8-11.5h-6Z" />
      <circle cx="19.25" cy="5" r="2.75" className="i-accent" stroke={ACCENT} />
      <circle cx="19.25" cy="5" r=".6" className="i-accent" stroke={ACCENT} fill={ACCENT} />
    </>
  ),
  // Duplex outlet face: two blade slots and the grounding socket.
  'electrical-repair': (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M9.5 7.5v3M14.5 7.5v3" />
      <path className="i-accent" stroke={ACCENT} d="M9.25 17v-.5a2.75 2.75 0 0 1 5.5 0v.5Z" />
    </>
  ),
  // Residential breaker box: two columns of breakers, main breaker below.
  'panel-upgrade': (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2.5" />
      <path d="M7.5 5.5h3.5v2.5H7.5ZM13 5.5h3.5v2.5H13ZM7.5 9.75h3.5v2.5H7.5ZM13 9.75h3.5v2.5H13Z" />
      <rect x="8.5" y="15.5" width="7" height="3" rx=".75" className="i-accent" stroke={ACCENT} />
    </>
  ),
  // Charging connector with prongs and cable, lightning in the head.
  'ev-charger': (
    <>
      <path d="M9.5 1.5v2M14.5 1.5v2" />
      <path d="M6.5 3.5h11V10a5.5 5.5 0 0 1-11 0Z" />
      <path d="M12 15.5v3a3 3 0 0 0 3 3h5" />
      <path className="i-accent" stroke={ACCENT} d="m12.8 6-2.8 4h2.6l-.9 3.6 2.9-4.2h-2.6Z" />
    </>
  ),
};

type Props = Omit<SVGProps<SVGSVGElement>, 'name' | 'children'> & {
  name: ServiceIconName;
  size?: number;
  /** Only pass a title when the icon stands alone; beside a text label leave it out and the icon is hidden from screen readers. */
  title?: string;
};

export function ServiceIcon({ name, size = 24, title, className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('svc-icon', className)}
      data-icon={name}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {ART[name]}
    </svg>
  );
}
