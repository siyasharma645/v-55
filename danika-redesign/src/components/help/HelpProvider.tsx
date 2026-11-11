'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Phone, X } from 'lucide-react';
import { SITE } from '@/data/site';
import type { LeadType } from '@/lib/validation';
import { QuoteForm } from '@/components/QuoteForm';
import { HelpWidget } from '@/components/help/HelpWidget';

const COPY: Record<LeadType, { title: string; blurb: string }> = {
  help: { title: 'Get Help Now', blurb: 'Tell us what is going on and someone from our Everett office will get back to you.' },
  quote: { title: 'Start Your Quote Online', blurb: 'Describe the job and we will reply with a written price before any work starts.' },
  schedule: { title: 'Schedule Service', blurb: 'Pick a day and a time of day that suits you. We will confirm the visit with you.' },
  callback: { title: 'Request a Call', blurb: 'Leave your number and we will call you back.' },
  message: { title: 'Send Us a Message', blurb: 'Ask a question or tell us about your project.' },
};

type Ctx = { open: (type?: LeadType) => void };
const HelpContext = createContext<Ctx>({ open: () => {} });
export const useHelp = () => useContext(HelpContext);

/** Owns the single popup form. Any button on the page can open it with a request type; the floating widget does too. */
export function HelpProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [type, setType] = useState<LeadType | null>(null);
  const [formKey, setFormKey] = useState(0);

  const open = useCallback((t: LeadType = 'help') => { setType(t); setFormKey((k) => k + 1); }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (type && d && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
  }, [type, formKey]);

  const onClose = () => {
    document.documentElement.style.overflow = '';
    setType(null);
  };

  const copy = type ? COPY[type] : null;

  return (
    <HelpContext.Provider value={{ open }}>
      {children}
      <HelpWidget />
      <dialog
        ref={dialogRef}
        aria-labelledby="help-title"
        onClose={onClose}
        onClick={(e) => { if (e.target === e.currentTarget) dialogRef.current?.close(); }}
        className="m-auto w-[calc(100%-1.5rem)] max-w-xl overflow-y-auto rounded-card bg-white p-0 text-fg shadow-lift backdrop:bg-primary-dark/70 max-h-[92dvh]"
      >
        {type && copy && (
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 id="help-title" className="h3-compact">{copy.title}</h2>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close form"
                className="-mr-2 -mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-btn text-fg hover:bg-cream"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <p className="mb-5 mt-3 text-fg-soft">{copy.blurb}</p>
            <QuoteForm key={formKey} type={type} />
            <p className="mt-5 border-t border-line pt-4 text-sm text-fg-soft">
              Rather talk to someone?{' '}
              <a href={SITE.phoneHref} className="inline-flex min-h-[44px] items-center gap-1.5 font-bold text-primary underline underline-offset-4">
                <Phone className="h-4 w-4" aria-hidden />{SITE.phone}
              </a>
            </p>
          </div>
        )}
      </dialog>
    </HelpContext.Provider>
  );
}

/** A link that opens the popup form. Without JavaScript it falls back to the quote form lower on the page. */
export function HelpTrigger({ type = 'help', className, children, onClick }: { type?: LeadType; className?: string; children: ReactNode; onClick?: () => void }) {
  const { open } = useHelp();
  return (
    <a
      href="#quote"
      aria-haspopup="dialog"
      className={className}
      onClick={(e) => { e.preventDefault(); onClick?.(); open(type); }}
    >
      {children}
    </a>
  );
}
