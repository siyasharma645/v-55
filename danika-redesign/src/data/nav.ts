import { orig } from './site';

export type NavLink = { label: string; href: string };

export const plumbingNav: NavLink[] = [
  { label: 'Emergency Plumber', href: orig('/24-hour-emergency-plumber-everett-wa/') },
  { label: 'Drain Cleaning', href: orig('/drain-cleaning-everett-wa/') },
  { label: 'Hydro Jetting', href: orig('/hydro-jet-service-everett/') },
  { label: 'Sewer Repair', href: orig('/sewer-repair-everett-wa/') },
  { label: 'Water Heaters', href: orig('/water-heaters-everett-wa/') },
  { label: 'Tankless Water Heaters', href: orig('/tankless-water-heaters-everett-wa/') },
  { label: 'Leak Detection', href: orig('/water-leak-detection-everett-wa/') },
  { label: 'Pipe Repair', href: orig('/pipe-repair-everett/') },
  { label: 'Repiping', href: orig('/repiping-everett-wa/') },
  { label: 'Water Line Repair', href: orig('/water-line-replacement-everett-wa/') },
  { label: 'Gas Line Services', href: orig('/gas-line-installation-everett/') },
  { label: 'Sump Pump Services', href: orig('/sump-pump-repair-installation-everett/') },
  { label: 'French Drain Services', href: orig('/french-drain-installation-everett/') },
  { label: 'Faucets, Showers & Toilets', href: orig('/faucet-installation-repair-everett-wa/') },
  { label: 'Plumbing Remodeling', href: orig('/plumbing-remodeling/') },
  { label: 'Commercial Plumbing', href: orig('/commercial-plumbing-everett/') },
];
export const plumbingAll: NavLink = { label: 'View all plumbing services', href: orig('/plumbing-services/') };

export const electricalNav: NavLink[] = [
  { label: 'Electrical Panel Upgrades', href: orig('/electrical-panel-upgrade-services/') },
  { label: 'EV Charger Installation', href: orig('/ev-charger-installation-services/') },
  { label: 'Electrical Repair', href: orig('/electrical-repair-services/') },
  { label: 'Emergency Electrician', href: orig('/emergency-electrician-services/') },
  { label: 'Generator Installation', href: orig('/generator-installation-services/') },
  { label: 'Whole-Home Rewiring', href: orig('/electrical-rewiring-services/') },
  { label: 'Safety Inspections', href: orig('/electrical-safety-inspection-services/') },
  { label: 'Lighting Installation', href: orig('/lighting-installation-everett-wa/') },
];
export const electricalAll: NavLink = { label: 'View all electrical services', href: orig('/electrician-everett-wa/') };

/** Dropdown / mega-menu grouping. Links are looked up in the lists above, so destinations stay in one place and a typo fails the build. */
export type NavGroup = { heading: string; links: NavLink[] };

const pick = (list: NavLink[], labels: string[]): NavLink[] =>
  labels.map((label) => {
    const hit = list.find((l) => l.label === label);
    if (!hit) throw new Error(`nav: "${label}" not found`);
    return hit;
  });

export const plumbingGroups: NavGroup[] = [
  { heading: 'Emergency & Repairs', links: pick(plumbingNav, ['Emergency Plumber', 'Leak Detection', 'Pipe Repair']) },
  { heading: 'Drains & Sewer', links: pick(plumbingNav, ['Drain Cleaning', 'Hydro Jetting', 'Sewer Repair', 'Sump Pump Services', 'French Drain Services']) },
  { heading: 'Water Systems', links: pick(plumbingNav, ['Water Heaters', 'Tankless Water Heaters', 'Repiping', 'Water Line Repair']) },
  { heading: 'Installations', links: pick(plumbingNav, ['Faucets, Showers & Toilets', 'Gas Line Services', 'Plumbing Remodeling', 'Commercial Plumbing']) },
];

export const electricalGroups: NavGroup[] = [
  { heading: 'Electrical Repairs', links: pick(electricalNav, ['Emergency Electrician', 'Electrical Repair', 'Lighting Installation']) },
  { heading: 'Panels & Safety', links: pick(electricalNav, ['Electrical Panel Upgrades', 'Safety Inspections', 'Whole-Home Rewiring']) },
  { heading: 'Installations', links: pick(electricalNav, ['EV Charger Installation', 'Generator Installation']) },
];

export const topLinks = {
  home: { label: 'Home', href: '/' },
  about: { label: 'About', href: orig('/about-us/') },
  serviceAreas: { label: 'Service Areas', href: '#service-areas' },
};
