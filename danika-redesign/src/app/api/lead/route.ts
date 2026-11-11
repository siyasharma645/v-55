import { NextResponse } from 'next/server';
import { ALL_SERVICE_OPTIONS, CONTACT_PREFERENCES, SERVICE_CATEGORIES } from '@/data/quote-options';
import { LEAD_TYPES, validateLead, type LeadInput, type LeadType } from '@/lib/validation';

export const runtime = 'nodejs';

/** Allow-listed tag so the business can tell Quick Request Form leads apart from the popup and detailed forms. */
const QUICK_SOURCE = 'homepage-quick-request';

/**
 * Quote-request endpoint.
 * Delivery requires integration: set LEAD_WEBHOOK_URL (CRM, Zapier/Make, Formspree, email service...).
 * Without it the endpoint responds 503 { error: 'not_configured' } and the UI tells visitors to call,
 * so a request is never silently dropped. Add CAPTCHA/rate limiting (e.g. Cloudflare Turnstile) before launch.
 */
export async function POST(req: Request) {
  let body: Partial<LeadInput> & { website?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success, deliver nothing.
  if (body.website) return NextResponse.json({ ok: true });

  const lead: LeadInput = {
    firstName: String(body.firstName ?? ''),
    lastName: String(body.lastName ?? ''),
    phone: String(body.phone ?? ''),
    email: String(body.email ?? ''),
    message: String(body.message ?? ''),
  };
  const zip = String(body.zip ?? '').trim().slice(0, 10);
  lead.zip = zip;
  const type: LeadType = LEAD_TYPES.includes(body.type as LeadType) ? (body.type as LeadType) : 'quote';
  const extra = {
    preferredDate: String(body.preferredDate ?? '').slice(0, 20),
    preferredWindow: String(body.preferredWindow ?? '').slice(0, 30),
    zip,
    // Allow-listed so the webhook never receives arbitrary strings from these fields.
    serviceCategory: SERVICE_CATEGORIES.find((c) => c === body.serviceCategory) ?? '',
    services: Array.isArray(body.services) ? ALL_SERVICE_OPTIONS.filter((s) => (body.services as unknown[]).includes(s)) : [],
    contactPreference: CONTACT_PREFERENCES.find((c) => c === body.contactPreference) ?? '',
  };
  const errors = validateLead(lead, type);
  if (Object.keys(errors).length) return NextResponse.json({ error: 'validation', errors }, { status: 422 });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, ...extra, type, source: body.source === QUICK_SOURCE ? QUICK_SOURCE : `homepage-${type}`, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  }
}
