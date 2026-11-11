import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

export function SectionHeading({
  eyebrow, title, children, align = 'left', light = false, className,
}: {
  eyebrow?: string; title: ReactNode; children?: ReactNode; align?: 'left' | 'center'; light?: boolean; className?: string;
}) {
  return (
    <Reveal className={cn('max-w-4xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow', light && '!text-cream before:!bg-white', align === 'center' && 'justify-center')}>{eyebrow}</p>
      )}
      <h2 className={cn('h2', light && '!text-white')}>{title}</h2>
      {children && <p className={cn('lead mt-5', light && '!text-cream')}>{children}</p>}
    </Reveal>
  );
}
