import { checkZip } from './zip';

/** Which kind of request a visitor is making. `help` is the header "Get Help Now" popup. */
export type LeadType = 'help' | 'quote' | 'schedule' | 'callback' | 'message';
export const LEAD_TYPES: readonly LeadType[] = ['help', 'quote', 'schedule', 'callback', 'message'];

export type LeadInput = {
  firstName: string; lastName: string; phone: string; email: string; message: string;
  type?: LeadType; preferredDate?: string; preferredWindow?: string;
  /** Optional quote-form extras. All are additive: the original fields above keep their meaning. */
  zip?: string; serviceCategory?: string; services?: string[]; contactPreference?: string;
};
export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Fields that must be filled in, per request type. First name and phone are always required. */
export const REQUIRED: Record<LeadType, { lastName: boolean; email: boolean; message: boolean }> = {
  help: { lastName: true, email: true, message: true },
  quote: { lastName: true, email: true, message: true },
  message: { lastName: true, email: true, message: true },
  schedule: { lastName: true, email: true, message: false },
  callback: { lastName: false, email: false, message: false },
};

/** US number: 10 digits (optional leading 1), area code and exchange cannot start with 0 or 1. */
export function isUsPhone(raw: string): boolean {
  let d = raw.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(d);
}

/** Shared by the client form and the API route so both enforce identical rules. */
export function validateLead(v: LeadInput, type: LeadType = 'quote'): LeadErrors {
  const need = REQUIRED[type];
  const e: LeadErrors = {};
  if (!v.firstName.trim()) e.firstName = 'Please enter your first name.';
  if (need.lastName && !v.lastName.trim()) e.lastName = 'Please enter your last name.';
  if (!isUsPhone(v.phone)) e.phone = v.phone.trim() ? 'Enter a valid US phone number, e.g. (425) 555-0123.' : 'Please enter your phone number.';
  if (need.email && !v.email.trim()) e.email = 'Please enter your email address.';
  else if (v.email.trim() && !EMAIL.test(v.email.trim())) e.email = 'Enter a valid email address, e.g. name@example.com.';
  if (v.zip?.trim() && checkZip(v.zip) === 'invalid') e.zip = 'Please enter a valid 5-digit ZIP code.';
  if (need.message && v.message.trim().length < 5) e.message = 'Tell us briefly how we can help.';
  if (v.message.length > 2000) e.message = 'Please keep your message under 2,000 characters.';
  return e;
}
