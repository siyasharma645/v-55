'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { electricalFaqs, faqs, type FaqCategory } from '@/data/faqs';
import { SITE } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';

const tabs: { id: FaqCategory; label: string }[] = [
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'electrical', label: 'Electrical' },
];

export function FAQ() {
  const base = useId();
  const [category, setCategory] = useState<FaqCategory>('plumbing');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const listRef = useRef<HTMLDivElement>(null);
  // Remembers the pointer type of the most recent press, so a click can tell mouse from keyboard/touch.
  const pointerRef = useRef<string | null>(null);
  const list = category === 'plumbing' ? faqs : electricalFaqs;
  // Two columns on wide screens: first half left, second half right, in reading order. Each column is its own stack,
  // so opening an answer never stretches or shifts the neighbouring column.
  const mid = Math.ceil(list.length / 2);
  const columns = [list.slice(0, mid).map((f, i) => ({ f, i })), list.slice(mid).map((f, i) => ({ f, i: i + mid }))];

  // WAI-ARIA accordion keyboard pattern: arrows move between questions, Home/End jump to the first/last.
  // Enter and Space come for free from the native button and toggle the answer.
  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const triggers = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('button[data-faq-trigger]') ?? []);
    const current = triggers.indexOf(e.target as HTMLButtonElement);
    if (current === -1) return;
    e.preventDefault();
    const last = triggers.length - 1;
    const next =
      e.key === 'ArrowDown' ? (current + 1) % triggers.length
      : e.key === 'ArrowUp' ? (current - 1 + triggers.length) % triggers.length
      : e.key === 'Home' ? 0
      : last;
    triggers[next]?.focus();
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-white">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-10 lg:gap-y-10">
        <Reveal>
          <p className="eyebrow">Asked on the phone every week</p>
          <h2 id="faq-title" className="h2 max-w-4xl max-sm:text-[clamp(1.75rem,7.6vw,2rem)] max-sm:leading-[1.08] lg:text-[clamp(2.25rem,4vw,3.75rem)]">Plumbing and Electrical Questions from Everett Homeowners</h2>
          <p className="lead mt-4 max-sm:text-base max-sm:leading-relaxed sm:mt-5">Straight answers about emergencies, pricing, water heaters, older pipes and electrical work.</p>
        </Reveal>

        <div className="lg:col-span-2 lg:row-start-2">
          <div role="group" aria-label="Question category" className="mb-5 flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={category === t.id}
                onClick={() => { setCategory(t.id); setOpenIndex(0); }}
                className={cn('min-h-[44px] flex-1 rounded-btn border-2 px-5 font-heading text-lg font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex-none sm:min-w-[9rem]', category === t.id ? 'border-primary bg-primary text-white' : 'border-primary bg-white text-primary hover:bg-cream')}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div ref={listRef} onKeyDown={handleKeyDown} className="grid gap-3 lg:grid-cols-2 lg:items-start lg:gap-x-5">
            {columns.map((col, c) => (
              <div key={c} className="space-y-3">
                {col.map(({ f, i }) => {
                  const open = openIndex === i;
                  const btnId = `${base}-${category}-q${i}`;
                  const panelId = `${base}-${category}-a${i}`;
                  return (
                    <div key={f.q} className={cn('overflow-hidden rounded-card border bg-white transition-colors duration-200 motion-reduce:transition-none', open ? 'border-primary shadow-card' : 'border-line hover:border-primary')}>
                      <h3>
                        <button
                          id={btnId} type="button" aria-expanded={open} aria-controls={panelId} data-faq-trigger
                          onPointerDown={(e) => { pointerRef.current = e.pointerType; }}
                          // Desktop hover: only real mouse movement opens a question. Pointer-move (rather than
                          // pointer-enter) means layout shifts from a neighbour closing can't re-trigger hover.
                          onPointerMove={(e) => { if (e.pointerType === 'mouse') setOpenIndex(i); }}
                          onClick={(e) => {
                            // Mouse click keeps the question open (it was likely opened by hover just before).
                            // Keyboard (detail 0) and touch toggle as normal.
                            const mouseClick = e.detail > 0 && pointerRef.current === 'mouse';
                            pointerRef.current = null;
                            if (mouseClick) setOpenIndex(i);
                            else setOpenIndex(open ? null : i);
                          }}
                          className="flex min-h-[64px] w-full items-center justify-between gap-4 rounded-card px-5 py-4 text-left font-heading text-lg font-bold leading-snug text-fg transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                        >
                          <span className="[text-wrap:pretty]">{f.q}</span>
                          <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-200 motion-reduce:transition-none', open ? 'bg-primary text-white' : 'bg-cream text-primary')}>
                            <ChevronDown className={cn('h-4 w-4 transition-transform duration-300 motion-reduce:transition-none', open && 'rotate-180')} aria-hidden />
                          </span>
                        </button>
                      </h3>
                      <div id={panelId} role="region" aria-labelledby={btnId} className={cn('grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                        <div className="overflow-hidden">
                          <p className="px-5 pb-6 pr-14 text-[0.98rem] leading-relaxed text-fg-soft sm:pr-16" inert={!open}>{f.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="on-red self-end rounded-card bg-primary p-6 text-white shadow-lift lg:col-start-2 lg:row-start-1">
          <p className="font-heading text-lg font-bold">Still have a question?</p>
          <p className="mt-1 text-sm text-white/90">A person at our Everett office answers, day or night.</p>
          <ButtonLink href={SITE.phoneHref} variant="light" className="mt-5 w-full sm:w-auto"><Phone className="h-4 w-4" aria-hidden /> {SITE.phone}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
