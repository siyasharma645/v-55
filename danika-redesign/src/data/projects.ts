import { orig } from './site';
import type { ImageKey } from '@/lib/images';

/** Real projects from danikaplumbing.com/projects/ (descriptions condensed from the original write-ups). */
export type Project = { title: string; place: string; type: string; text: string; href: string; image: ImageKey };

export const projects: Project[] = [
  {
    title: 'Electric Water Heater Replacement: Bedroom Closet Install',
    place: 'Everett, WA', type: 'Water Heaters',
    text: 'An aging electric water heater in a master-bedroom closet was dripping and rusting at the connections. We replaced it with a new Rheem tank, expansion tank and straps, all to code.',
    href: orig('/projects/closet-electric-water-heater-replacement-everett-wa/'), image: 'project2',
  },
  {
    title: 'Two-Leak Repair: Ice Maker Line and 2" ABS Drain',
    place: 'Everett, WA', type: 'Leak Detection & Repair',
    text: 'Water was showing up behind the fridge and under the house. We fixed a leaking ice maker line and spliced new ABS into a leaking 2-inch drain in the crawl space.',
    href: orig('/projects/ice-maker-line-abs-drain-leak-repair-everett-wa/'), image: 'project1',
  },
  {
    title: 'Leaking Gate Valve Replaced with a Ball Valve',
    place: 'Bothell, WA', type: 'Repiping & Water Lines',
    text: 'An old gate valve on the water line was leaking at the joint. We replaced it with a lead-free, full-port ball valve on copper press fittings.',
    href: orig('/projects/valve-replacement-bothell-wa/'), image: 'project3',
  },
  {
    title: 'Water Heater Code Upgrade: Galvanized to Copper',
    place: 'Marysville, WA', type: 'Water Heaters',
    text: 'A 4-year-old water heater had been plumbed in galvanized pipe that was corroding, leaking and out of code. We repiped it in copper and brass and kept the tank warranty intact.',
    href: orig('/projects/water-heater-upgrade-marysville-wa/'), image: 'project4',
  },
];
