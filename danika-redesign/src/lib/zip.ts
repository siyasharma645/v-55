import { VERIFIED_SERVICE_ZIPS, WA_ZIP_RANGE } from '@/data/service-zips';

/** `invalid` bad format · `empty` nothing entered · `served` verified ZIP · `outside` not in Washington · `unknown` in Washington but not verified. */
export type ZipStatus = 'empty' | 'invalid' | 'served' | 'outside' | 'unknown';

/** 5-digit ZIP, or ZIP+4 (12345-6789). Shared with lead validation so the form and the API agree. */
export const ZIP_FORMAT = /^\d{5}(-\d{4})?$/;

/** Lowest and highest ZIP codes USPS has assigned (anything else, such as 00000, is not a real ZIP). */
const ASSIGNED = { min: 501, max: 99950 };

/** Pure, reusable ZIP check. Never classifies an unverified ZIP inside Washington as outside the service area. */
export function checkZip(raw: string): ZipStatus {
  const value = raw.trim();
  if (!value) return 'empty';
  if (!ZIP_FORMAT.test(value)) return 'invalid';
  const zip5 = value.slice(0, 5);
  const n = Number(zip5);
  if (n < ASSIGNED.min || n > ASSIGNED.max) return 'invalid';
  if (VERIFIED_SERVICE_ZIPS.includes(zip5)) return 'served';
  if (n < WA_ZIP_RANGE.min || n > WA_ZIP_RANGE.max) return 'outside';
  return 'unknown';
}

/** True once the visitor has typed a complete ZIP (5 digits, or 5 + 4). */
export const isCompleteZip = (raw: string) => ZIP_FORMAT.test(raw.trim());
