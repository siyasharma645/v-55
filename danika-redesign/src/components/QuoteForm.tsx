'use client';

import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Loader2, Mail, Phone } from 'lucide-react';
import { REQUIRED, validateLead, type LeadErrors, type LeadInput, type LeadType } from '@/lib/validation';
import { SITE, orig } from '@/data/site';
import { cn } from '@/lib/utils';
import { buttonClasses } from '@/components/ui/Button';
import { ServicePicker } from '@/components/ServicePicker';
import { CONTACT_PREFERENCES, ELECTRICAL_OPTIONS, OTHER_OPTION, PLUMBING_OPTIONS, type ServiceCategory } from '@/data/quote-options';

type Status = 'idle' | 'submitting' | 'success' | 'not_configured' | 'error';

export const field =
  'mt-1.5 block w-full rounded-ui border bg-white px-4 text-base text-fg placeholder:text-fg-soft transition hover:border-primary/60 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/15';
export const input = `${field} h-[52px]`;
const MAX_MESSAGE = 2000;

const SUBMIT_LABEL: Record<LeadType, string> = {
  help: 'Get Help Now', quote: 'Request My Quote', schedule: 'Schedule Service', callback: 'Request a Call', message: 'Send Message',
};
const MESSAGE_LABEL: Record<LeadType, string> = {
  help: 'How can we help?', quote: 'Tell us a little more about the issue', schedule: 'Anything we should know? (optional)',
  callback: 'What is it about? (optional)', message: 'Your message',
};

export function Field({ id, label, required = true, optionalHint, error, children }: { id: string; label: string; required?: boolean; optionalHint?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-fg">
        {label}
        {optionalHint && <span className="font-normal text-fg-soft"> (optional)</span>}
        {required && <><span className="text-primary" aria-hidden> *</span><span className="sr-only">(required)</span></>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-error">{error}</p>}
    </div>
  );
}

/** One form for every kind of request. `type` decides which fields are required and what the button says. */
export function QuoteForm({ type = 'quote' }: { type?: LeadType }) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const need = REQUIRED[type];
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const sending = useRef(false); // blocks double-submits before React re-renders the disabled button
  const [category, setCategory] = useState<ServiceCategory | ''>('');
  const [services, setServices] = useState<string[]>([]);
  const [msgLen, setMsgLen] = useState(0);
  const isQuote = type === 'quote';

  function pickCategory(c: ServiceCategory) {
    setCategory(c);
    // Keep only selections that still exist in the new category's list.
    setServices((cur) => cur.filter((n) => c === 'both' || n === OTHER_OPTION || (c === 'plumbing' ? PLUMBING_OPTIONS : ELECTRICAL_OPTIONS).includes(n as never)));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '');
    const values: LeadInput = {
      firstName: get('firstName'), lastName: get('lastName'), phone: get('phone'), email: get('email'), message: get('message'),
      type, preferredDate: get('preferredDate'), preferredWindow: get('preferredWindow'),
      zip: get('zip'), serviceCategory: category, services, contactPreference: get('contactPreference'),
    };

    const found = validateLead(values, type);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof LeadInput)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (sending.current) return;
    sending.current = true;
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: get('website') }),
      });
      // Success is shown only once the server confirms delivery (res.ok). Failures keep everything the visitor typed.
      if (res.ok) { setStatus('success'); return; }
      if (res.status === 503) { setStatus('not_configured'); return; }
      if (res.status === 422) {
        const data = await res.json().catch(() => null);
        setErrors(data?.errors ?? {});
        setStatus('idle');
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-card border border-line border-l-4 border-l-primary bg-white p-6 text-fg shadow-card">
        <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden />
        <h3 className="mt-3 text-xl font-bold !text-primary">Thank you for contacting Danika!</h3>
        <p className="mt-2 text-[0.95rem]">Your request has been received. Our team will be in touch.</p>
        <p className="mt-2 text-[0.95rem]">For anything urgent, call <a className="font-bold text-primary underline" href={SITE.phoneHref}>{SITE.phone}</a>, we answer 24/7 for plumbing emergencies.</p>
      </div>
    );
  }

  const clearError = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as keyof LeadInput;
    if (name && errors[name]) setErrors((cur) => { const n = { ...cur }; delete n[name]; return n; });
  };
  const invalid = (k: keyof LeadInput) => (errors[k] ? true : undefined);
  const border = (k: keyof LeadInput) => (errors[k] ? 'border-error bg-white' : 'border-line');
  const desc = (k: keyof LeadInput) => (errors[k] ? `${id(k)}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id('note')} className={cn('space-y-5')} onInput={clearError}>
      {isQuote && <p className="text-base font-bold text-primary">Your contact details</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id('firstName')} label="First name" error={errors.firstName}>
          <input id={id('firstName')} name="firstName" autoComplete="given-name" aria-invalid={invalid('firstName')} aria-describedby={desc('firstName')} className={cn(input, border('firstName'))} />
        </Field>
        <Field id={id('lastName')} label="Last name" required={need.lastName} error={errors.lastName}>
          <input id={id('lastName')} name="lastName" autoComplete="family-name" aria-invalid={invalid('lastName')} aria-describedby={desc('lastName')} className={cn(input, border('lastName'))} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id('phone')} label="Phone" error={errors.phone}>
          <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(425) 555-0123" aria-invalid={invalid('phone')} aria-describedby={desc('phone')} className={cn(input, border('phone'))} />
        </Field>
        <Field id={id('email')} label="Email" required={need.email} error={errors.email}>
          <input id={id('email')} name="email" type="email" autoComplete="email" aria-invalid={invalid('email')} aria-describedby={desc('email')} className={cn(input, border('email'))} />
        </Field>
      </div>

      {isQuote && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={id('zip')} label="ZIP code" required={false} optionalHint error={errors.zip}>
            <input id={id('zip')} name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} placeholder="98204" aria-invalid={invalid('zip')} aria-describedby={desc('zip')} className={cn(input, border('zip'))} />
          </Field>
          <div role="group" aria-labelledby={id('pref')}>
            <span id={id('pref')} className="block text-sm font-semibold text-fg">Preferred contact method <span className="font-normal text-fg-soft">(optional)</span></span>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              {CONTACT_PREFERENCES.map((p) => (
                <label key={p} className="relative flex h-[52px] cursor-pointer items-center justify-center gap-2 rounded-ui border border-line bg-white text-[0.95rem] font-semibold text-fg transition hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary">
                  <input type="radio" name="contactPreference" value={p} className="sr-only" />
                  {p === 'Email' ? <Mail className="h-4 w-4" aria-hidden /> : <Phone className="h-4 w-4" aria-hidden />}
                  {p}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {isQuote && <ServicePicker category={category} services={services} onCategory={pickCategory} onServices={setServices} />}

      {type === 'schedule' && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={id('preferredDate')} className="text-sm font-semibold text-fg">Preferred date <span className="font-normal text-fg-soft">(optional)</span></label>
            <input id={id('preferredDate')} name="preferredDate" type="date" className={cn(input, 'border-line')} />
          </div>
          <div>
            <label htmlFor={id('preferredWindow')} className="text-sm font-semibold text-fg">Best time <span className="font-normal text-fg-soft">(optional)</span></label>
            <select id={id('preferredWindow')} name="preferredWindow" defaultValue="" className={cn(input, 'border-line')}>
              <option value="">Any time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
        </div>
      )}

      <Field id={id('message')} label={MESSAGE_LABEL[type]} required={need.message} error={errors.message}>
        <textarea
          id={id('message')} name="message" rows={type === 'callback' ? 3 : 5}
          onChange={(e) => setMsgLen(e.target.value.length)}
          placeholder={isQuote ? 'Describe the problem or service you need. Any additional details will help our team understand your request.' : undefined}
          aria-invalid={invalid('message')} aria-describedby={desc('message')}
          className={cn(field, border('message'), 'min-h-[140px] resize-y py-3.5 leading-relaxed')}
        />
        {isQuote && <p className={cn('mt-1.5 text-right text-xs', msgLen > MAX_MESSAGE ? 'font-semibold text-primary' : 'text-fg-soft')} aria-hidden>{msgLen} / {MAX_MESSAGE}</p>}
      </Field>

      {/* Honeypot: hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <p id={id('note')} className="text-xs leading-relaxed text-fg-soft">
        Once you submit our form, we may reach out to you via phone, email, or text to communicate service details, which you can opt out of at any time.
        This form consent is not a condition of purchase. Message/data rates apply.{' '}
        <a className="font-semibold underline" href={orig('/terms-conditions/')}>Terms and Conditions</a> | <a className="font-semibold underline" href={orig('/privacy-policy/')}>Privacy Policy</a>.
      </p>

      <div className={cn(isQuote && 'flex')}>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={buttonClasses('primary', 'md', 'w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-[240px]')}
      >
        {status === 'submitting' ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending…</> : SUBMIT_LABEL[type]}
      </button>
      </div>

      <div aria-live="polite">
        {status === 'not_configured' && (
          <div role="alert" className="flex gap-3 rounded-field border border-line border-l-4 border-l-primary bg-white p-4 text-sm text-fg">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p>
              <strong>Online requests aren&rsquo;t connected yet on this site.</strong> Nothing was sent. Please call{' '}
              <a href={SITE.phoneHref} className="inline-flex items-center gap-1 font-bold underline"><Phone className="h-4 w-4" aria-hidden />{SITE.phone}</a>.
            </p>
          </div>
        )}
        {status === 'error' && (
          <div role="alert" className="flex gap-3 rounded-field border border-error border-l-4 bg-white p-4 text-sm text-fg">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p>Something went wrong and your request may not have been sent. Please try again, or call <a href={SITE.phoneHref} className="font-bold underline">{SITE.phone}</a>.</p>
          </div>
        )}
      </div>
    </form>
  );
}
