'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Footer link group.
 *  - Phones (< sm): collapsible accordion, collapsed by default.
 *  - sm and up: plain always-open heading + list, identical to the original footer (no accordion).
 * The phone button and the desktop heading are separate elements, so only one is ever visible/focusable.
 */
export function FooterGroup({
  title, as: Tag = 'div', label, className, desktopHeadingClass, children,
}: {
  title: string;
  as?: 'div' | 'nav';
  label?: string;
  className?: string;
  desktopHeadingClass: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <Tag aria-label={Tag === 'nav' ? label : undefined} className={cn('max-sm:border-t max-sm:border-white/20 max-sm:last:border-b', className)}>
      {/* Phone: accordion header */}
      <h2 className="sm:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-[48px] w-full items-center justify-between gap-3 text-left font-heading text-base font-bold text-white"
        >
          {title}
          <ChevronDown className={cn('h-5 w-5 shrink-0 text-cream transition-transform duration-300 motion-reduce:transition-none', open && 'rotate-180')} aria-hidden />
        </button>
      </h2>
      {/* sm+: the original heading */}
      <h2 className={cn('hidden sm:block', desktopHeadingClass)}>{title}</h2>

      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none sm:block',
          open ? 'visible grid-rows-[1fr]' : 'grid-rows-[0fr] max-sm:invisible',
        )}
      >
        <div className="min-h-0 overflow-hidden max-sm:pb-1 sm:overflow-visible">{children}</div>
      </div>
    </Tag>
  );
}
