/**
 * Options for the quote form's service picker. Plain strings only (no icons) so the API route can
 * import the same lists to validate what the browser sends. Every name comes from the services
 * already listed on the website (see services.ts); "Other / Not sure" is the only catch-all.
 */
export const SERVICE_CATEGORIES = ['plumbing', 'electrical', 'both'] as const;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export const CATEGORY_LABEL: Record<ServiceCategory, string> = { plumbing: 'Plumbing', electrical: 'Electrical', both: 'Both' };

export const PLUMBING_OPTIONS = [
  'Emergency Plumbing',
  'Drain Cleaning',
  'Hydro Jetting',
  'Sewer Repair',
  'Water Heater Services',
  'Leak Detection',
  'Pipe Repair and Repiping',
  'Water Line Repair',
  'Gas Line Services',
  'Sump Pump Services',
  'French Drain Services',
  'Faucets, Showers and Toilets',
  'Commercial Plumbing',
] as const;

export const ELECTRICAL_OPTIONS = [
  'Electrical Panel Upgrades',
  'EV Charger Installation',
  'Electrical Repair',
  'Emergency Electrician',
  'Generator Installation',
  'Whole-Home Rewiring',
  'Safety Inspections',
  'Lighting Installation',
] as const;

export const OTHER_OPTION = 'Other / Not Sure';

export const ALL_SERVICE_OPTIONS: readonly string[] = [...PLUMBING_OPTIONS, ...ELECTRICAL_OPTIONS, OTHER_OPTION];

export const CONTACT_PREFERENCES = ['Phone Call', 'Email'] as const;
export type ContactPreference = (typeof CONTACT_PREFERENCES)[number];
