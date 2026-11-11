import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Button system (all variants share height, padding, 2px border and radius):
 *  - primary / brand : solid brick, white text      -> use on white or cream surfaces
 *  - light           : solid white, red text        -> use on brick or photo surfaces
 *  - secondary       : white, red border, red text  -> second action on light surfaces
 *  - outline-white   : dark translucent, white border and text -> second action on red / photo surfaces
 */
type Variant = 'primary' | 'secondary' | 'light' | 'outline-white' | 'brand' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'btn-motion inline-flex items-center justify-center gap-2 rounded-btn border-2 font-bold leading-none whitespace-nowrap select-none';
const variants: Record<Variant, string> = {
  primary: 'btn-shadow border-primary bg-primary text-white hover:border-primary-dark hover:bg-primary-dark',
  brand: 'btn-shadow border-primary bg-primary text-white hover:border-primary-dark hover:bg-primary-dark',
  light: 'btn-shadow border-white bg-white text-primary hover:border-line hover:bg-cream',
  secondary: 'border-primary bg-white text-primary hover:bg-cream',
  'outline-white': 'border-white/80 bg-primary-dark/40 text-white hover:border-white hover:bg-white hover:text-primary',
  ghost: 'border-transparent text-primary hover:bg-cream',
};
const sizes: Record<Size, string> = {
  md: 'min-h-[48px] px-6 py-3 text-[0.95rem]',
  lg: 'min-h-[56px] px-8 py-4 text-base',
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/** Anchor styled as a button. All CTAs on this page are real links (tel:, #anchor or original-site URLs). */
export function ButtonLink({ variant = 'primary', size = 'md', className, children, ...rest }: Props) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  );
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
