import { Phone } from 'lucide-react';
import { SITE } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * The one phone action. The whole button is the `tel:` link.
 *  - header: warm cream on the brick bar. Phones show icon + "CALL NOW" only; from 768px the number sits beneath the label.
 *    Height matches the menu button in the same row (44px phones, 48px from 768px).
 *  - drawer: burgundy on the white menu panel, always with the number.
 */
export function CallNowButton({ variant = 'header', className, onClick }: { variant?: 'header' | 'drawer'; className?: string; onClick?: () => void }) {
  const drawer = variant === 'drawer';
  return (
    <a
      href={SITE.phoneHref}
      onClick={onClick}
      aria-label={`CALL NOW ${SITE.phone}`}
      className={cn(
        'group btn-motion inline-flex items-center justify-center rounded-btn font-bold',
        drawer
          ? 'min-h-12 w-full gap-2.5 bg-primary px-5 py-3 text-white hover:bg-primary-dark active:bg-primary-dark focus-visible:outline-primary-dark'
          : 'h-11 shrink-0 gap-2 bg-cream px-3 text-primary hover:bg-white active:bg-cream min-[360px]:px-3.5 md:h-12 md:gap-2.5 md:px-4 min-[1100px]:px-5',
        className,
      )}
    >
      <Phone className={cn('shrink-0', drawer ? 'h-5 w-5' : 'h-[18px] w-[18px] md:h-5 md:w-5')} strokeWidth={2} aria-hidden />
      <span className={cn('flex leading-none', drawer ? 'items-baseline gap-2.5' : 'flex-col gap-[3px]')}>
        <span className={cn('whitespace-nowrap tracking-wide', drawer ? 'text-base' : 'text-sm')}>CALL NOW</span>
        <span className={cn('whitespace-nowrap font-semibold tabular-nums', drawer ? 'text-base' : 'hidden text-sm text-primary-dark md:block')}>{SITE.phone}</span>
      </span>
    </a>
  );
}
