'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Layers, Wrench, Zap, type LucideIcon } from 'lucide-react';
import {
  CATEGORY_LABEL, ELECTRICAL_OPTIONS, OTHER_OPTION, PLUMBING_OPTIONS, SERVICE_CATEGORIES, type ServiceCategory,
} from '@/data/quote-options';
import { cn } from '@/lib/utils';

const ICON: Record<ServiceCategory, LucideIcon> = { plumbing: Wrench, electrical: Zap, both: Layers };

type Props = {
  category: ServiceCategory | '';
  services: string[];
  onCategory: (c: ServiceCategory) => void;
  onServices: (s: string[]) => void;
};

/** Which service lists a category shows. "Both" shows plumbing and electrical as two labelled groups. */
function groupsFor(c: ServiceCategory): { label?: string; items: readonly string[] }[] {
  if (c === 'plumbing') return [{ items: PLUMBING_OPTIONS }];
  if (c === 'electrical') return [{ items: ELECTRICAL_OPTIONS }];
  return [{ label: 'Plumbing', items: PLUMBING_OPTIONS }, { label: 'Electrical', items: ELECTRICAL_OPTIONS }];
}

/**
 * Step 2 of the quote form. Three equal category cards (native radios, so arrow keys and focus work),
 * then one compact multi-select that expands in place (no floating layer, so it can never be clipped by the popup).
 */
export function ServicePicker({ category, services, onCategory, onServices }: Props) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = `${uid}-panel`;

  // Close the list when the category changes so the form stays short.
  useEffect(() => { setOpen(false); }, [category]);

  const toggle = (name: string) =>
    onServices(services.includes(name) ? services.filter((s) => s !== name) : [...services, name]);

  const summary = services.length === 0
    ? 'Select services (optional)'
    : services.length <= 2 ? services.join(', ') : `${services.slice(0, 2).join(', ')} +${services.length - 2} more`;

  return (
    <fieldset>
      <legend className="text-base font-bold text-primary">What type of service do you need?</legend>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {SERVICE_CATEGORIES.map((c) => {
          const Icon = ICON[c];
          const on = category === c;
          return (
            <label
              key={c}
              className={cn(
                'relative flex min-h-[88px] cursor-pointer flex-col items-center justify-center gap-2 rounded-ui border-2 px-2 py-3 text-center text-[0.95rem] font-bold leading-tight transition duration-200',
                'has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary',
                on ? 'border-primary bg-primary text-white' : 'border-line bg-white text-primary hover:border-primary hover:bg-cream',
              )}
            >
              <input type="radio" name="serviceCategory" value={c} checked={on} onChange={() => onCategory(c)} className="sr-only" />
              <Icon className="h-6 w-6" aria-hidden />
              {CATEGORY_LABEL[c]}
            </label>
          );
        })}
      </div>

      {category && (
        <div className="mt-3">
          <button
            ref={trigger}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              'flex min-h-[52px] w-full items-center justify-between gap-3 rounded-ui border border-line bg-white px-4 text-left text-base transition hover:border-primary',
              services.length ? 'font-semibold text-fg' : 'text-fg-soft',
            )}
          >
            <span className="truncate">{summary}</span>
            <ChevronDown className={cn('h-5 w-5 shrink-0 text-primary transition-transform', open && 'rotate-180')} aria-hidden />
          </button>

          {open && (
            <div
              id={panelId}
              role="group"
              aria-label="Services"
              onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); trigger.current?.focus(); } }}
              className="mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-ui border border-line bg-white p-2"
            >
              {groupsFor(category).map((g, gi) => (
                <div key={g.label ?? gi} className={cn(gi > 0 && 'mt-2 border-t border-line pt-2')}>
                  {g.label && <p className="px-2 pb-1 pt-1 text-xs font-bold uppercase tracking-wide text-fg-soft">{g.label}</p>}
                  <ul className="grid sm:grid-cols-2">
                    {g.items.map((name) => <Option key={name} name={name} checked={services.includes(name)} onToggle={toggle} />)}
                  </ul>
                </div>
              ))}
              <ul className="mt-2 border-t border-line pt-2">
                <Option name={OTHER_OPTION} checked={services.includes(OTHER_OPTION)} onToggle={toggle} />
              </ul>
            </div>
          )}
        </div>
      )}
    </fieldset>
  );
}

function Option({ name, checked, onToggle }: { name: string; checked: boolean; onToggle: (n: string) => void }) {
  return (
    <li>
      <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-ui px-2 py-2 text-[0.95rem] text-fg hover:bg-cream has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-primary">
        <input type="checkbox" checked={checked} onChange={() => onToggle(name)} className="peer sr-only" />
        <span
          aria-hidden
          className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-[calc(var(--ui-radius)*0.4)] border-2 transition', checked ? 'border-primary bg-primary text-white' : 'border-primary-dark/30 bg-white')}
        >
          {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
        <span className={cn(checked && 'font-semibold')}>{name}</span>
      </label>
    </li>
  );
}
