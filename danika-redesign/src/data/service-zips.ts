/**
 * Verified service-area ZIP data for the ZIP check in the Quick Request form.
 *
 * Only add a ZIP here once the business has confirmed it. Never guess or generate ZIP codes:
 * a ZIP that is missing from this list is treated as "unknown" (please call to confirm), never as "outside".
 *
 * Source today: the business address in `site.ts` (11015 Airport Road, Everett, WA 98204).
 * The Service Areas section lists cities and neighbourhoods by name only and no ZIP codes appear anywhere
 * else in the project, so those areas cannot be matched by ZIP until the business supplies the list.
 */
import { SITE } from './site';

export const VERIFIED_SERVICE_ZIPS: readonly string[] = [
  SITE.address.postal, // 98204 · Everett (home base)
  // Add further verified ZIPs here, e.g. '98xxx', once confirmed by the business.
];

/**
 * The company only works in Washington State (Snohomish County, King County and Seattle; see `areas.ts`).
 * USPS ZIP codes for Washington run 98001-99403, so a valid ZIP outside that range is definitely outside coverage.
 * Inside the range, a ZIP that is not verified above is "unknown": it may or may not be served.
 */
export const WA_ZIP_RANGE = { min: 98001, max: 99403 } as const;
