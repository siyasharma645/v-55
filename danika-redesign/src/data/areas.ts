import { orig } from './site';

export type Area = { name: string; href: string };
const a = (name: string, path?: string): Area => ({ name, href: path ? orig(path) : orig('/service-area/') });

export const snohomishCounty: Area[] = [
  a('Everett', '/'), a('Mukilteo', '/plumber-mukilteo-wa/'), a('Mill Creek', '/plumber-mill-creek-wa/'),
  a('Marysville', '/plumber-marysville-wa/'), a('Lynnwood', '/plumber-lynnwood-wa/'), a('Edmonds', '/plumber-edmonds-wa/'),
  a('Lake Stevens', '/plumber-lake-stevens-wa/'), a('Snohomish', '/snohomish-plumbing/'), a('Arlington', '/plumbers-arlington-wa/'),
  a('Monroe', '/plumber-monroe-wa/'), a('Mountlake Terrace', '/plumber-mountlake-terrace-wa/'), a('Brier', '/plumber-brier-wa/'),
  a('Bothell', '/bothell-plumbing/'),
];

export const kingCounty: Area[] = [
  a('Shoreline', '/plumber-shoreline-wa/'), a('Kenmore', '/kenmore-plumbing/'), a('Woodinville', '/plumber-woodinville-wa/'),
  a('Kirkland', '/plumber-kirkland-wa/'), a('Redmond', '/plumber-redmond-wa/'), a('Bellevue', '/plumber-bellevue-wa/'),
  a('Issaquah', '/plumber-issaquah-wa/'), a('Duvall', '/plumber-duvall-wa/'), a('Maple Valley', '/plumber-maple-valley-wa/'),
  a('Seattle', '/plumber-seattle-wa/'), a('Lake City', '/plumber-lake-city-wa/'), a('West Seattle'),
];
