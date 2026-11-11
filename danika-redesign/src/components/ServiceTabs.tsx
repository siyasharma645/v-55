'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Wrench, Zap, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Id = 'plumbing' | 'electrical';
const ICON: Record<Id, LucideIcon> = { plumbing: Wrench, electrical: Zap };

/**
 * Category switch for the service section (tabs pattern: one category is always selected, arrow keys move between them).
 * Both panels arrive pre-rendered from the server; this only decides which one is visible, so switching never reloads or refetches.
 */
export function ServiceTabs({ categories, panels, className }: {
  categories: { id: Id; label: string; description: string }[];
  panels: Record<Id, ReactNode>;
  className?: string;
}) {
  const uid = useId();
  const [active, setActiveRaw] = useState<Id>(categories[0].id);
  const [switched, setSwitched] = useState(false);   // panel fade only after the visitor switches; first view uses the scroll reveal
  const setActive = (id: Id) => { setActiveRaw(id); setSwitched(true); };
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = categories.findIndex((c) => c.id === active);
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? categories.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const target = categories[(next + categories.length) % categories.length].id;
    setActive(target);
    refs.current[target]?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label="Service category" onKeyDown={onKeyDown} className="grid grid-cols-2 gap-3 sm:gap-4">
        {categories.map((c) => {
          const on = active === c.id;
          const Icon = ICON[c.id];
          return (
            <button
              key={c.id}
              ref={(el) => { refs.current[c.id] = el; }}
              id={`${uid}-tab-${c.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-panel-${c.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(c.id)}
              className={cn(
                'flex min-h-[64px] items-center justify-center gap-3 rounded-card border-2 px-3 py-3 text-left transition duration-base ease-out-soft sm:justify-start sm:px-5',
                on ? 'border-white bg-white text-primary-dark shadow-lift' : 'border-white/30 bg-white/[0.06] text-white hover:border-white/60 hover:bg-white/[0.14]',
              )}
            >
              <Icon className={cn('h-6 w-6 shrink-0 sm:h-7 sm:w-7', on ? 'text-primary' : 'text-white/90')} strokeWidth={1.75} aria-hidden />
              <span className="min-w-0">
                <span className="block font-heading text-lg font-bold leading-tight sm:text-xl">{c.label}</span>
                <span className={cn('mt-0.5 hidden text-sm leading-snug sm:block', on ? 'text-fg-soft' : 'text-white/80')}>{c.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      {categories.map((c) => (
        <div
          key={c.id}
          id={`${uid}-panel-${c.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${c.id}`}
          hidden={active !== c.id}
          className={cn('mt-4 sm:mt-5', switched && active === c.id && 'motion-safe:animate-fade-down')}
        >
          {panels[c.id]}
        </div>
      ))}
    </div>
  );
}
