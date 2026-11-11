'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { CalendarCheck, CircleDollarSign, MessageCircle, MessageSquareText, Phone, PhoneCall, X } from 'lucide-react';
import { SITE } from '@/data/site';
import type { LeadType } from '@/lib/validation';
import { useHelp } from '@/components/help/HelpProvider';

const row = 'flex min-h-[48px] w-full items-center gap-3 rounded-btn border-2 border-primary bg-primary px-4 py-3 text-left text-[0.95rem] font-bold text-white transition-colors hover:bg-primary-dark';

/** Floating "Need help?" button. Opens a small menu of ways to reach Danika; each one leads to a form on this site, or dials. */
export function HelpWidget() {
  const { open } = useHelp();
  const [shown, setShown] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShown(false); };
    const onDown = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setShown(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [shown]);

  const choose = (t: LeadType) => { setShown(false); open(t); };

  const options: { type: LeadType; label: string; Icon: typeof Phone }[] = [
    { type: 'quote', label: 'Start Quote Online', Icon: CircleDollarSign },
    { type: 'schedule', label: 'Schedule Service', Icon: CalendarCheck },
    { type: 'callback', label: 'Request a Call', Icon: PhoneCall },
  ];

  return (
    <div ref={wrap} className="float-cta fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] z-40 md:bottom-6 md:right-6">
      {shown && (
        <div id={panelId} role="group" aria-label="Ways to reach us" className="absolute bottom-full right-0 mb-3 w-[min(20rem,calc(100vw-2rem))] rounded-card border border-line bg-white p-4 shadow-lift">
          <p className="font-heading text-lg font-bold leading-tight">Hello! How can we help you?</p>
          <ul className="mt-3 space-y-2">
            {options.map(({ type, label, Icon }) => (
              <li key={type}>
                <button type="button" onClick={() => choose(type)} className={row}><Icon className="h-5 w-5 shrink-0 text-white" aria-hidden />{label}</button>
              </li>
            ))}
            <li>
              <a href={SITE.phoneHref} className={row}><Phone className="h-5 w-5 shrink-0 text-white" aria-hidden />Call Contractor</a>
            </li>
            <li>
              <button type="button" onClick={() => choose('message')} className={row}><MessageSquareText className="h-5 w-5 shrink-0 text-white" aria-hidden />Message Us</button>
            </li>
          </ul>
        </div>
      )}
      <button
        type="button"
        aria-expanded={shown}
        aria-controls={shown ? panelId : undefined}
        onClick={() => setShown((s) => !s)}
        aria-label={shown ? 'Close help menu' : 'Need help?'}
        className="ml-auto flex h-12 w-12 items-center justify-center gap-2 rounded-full border-2 border-white bg-primary text-[0.95rem] font-bold text-white shadow-lift btn-motion hover:bg-primary-dark md:h-auto md:min-h-[52px] md:w-auto md:rounded-btn md:px-5"
      >
        {shown ? <X className="h-5 w-5" aria-hidden /> : <MessageCircle className="h-5 w-5" aria-hidden />}
        <span className="sr-only md:not-sr-only">{shown ? 'Close' : 'Need help?'}</span>
      </button>
    </div>
  );
}
