/** Questions and answers adapted from the original homepage FAQ. No new claims added. */
export type FaqCategory = 'plumbing' | 'electrical';
export type Faq = { q: string; a: string; category: FaqCategory };

export const faqs: Faq[] = [
  {
    q: 'Do you provide emergency plumbing in Everett?',
    a: 'Yes. Emergency plumbing is available 24 hours a day, 7 days a week. Call (425) 374-1557 any time. Burst pipes, sewer backups, failed water heaters and major leaks are handled around the clock by our Everett emergency plumbers.',
  },
  {
    q: 'When should I call an emergency plumber?',
    a: 'Call right away for a burst pipe, water you cannot shut off, sewage backing up into the house, a leaking water heater, or no water at all. If you smell gas, leave the house and call the gas utility first.',
  },
  {
    q: 'Does Danika Plumbing serve all of Snohomish County?',
    a: 'Yes. We serve Everett and the surrounding Snohomish County cities, including Mukilteo, Mill Creek, Marysville, Lynnwood, Edmonds, Lake Stevens, Snohomish, Arlington, Monroe, Mountlake Terrace, Brier, and Bothell, plus much of King County.',
  },
  {
    q: 'How much does a plumber cost in Everett, WA?',
    a: 'It depends on access, parts, permits, urgency, and the age of the system. We diagnose first and give you an upfront estimate before any work starts, so you know the price before you commit. Larger jobs can use financing for plumbing work.',
  },
  {
    q: 'How do you handle water heater repairs and replacements?',
    a: 'We test the unit first to see whether a part such as an element, thermostat, or gas valve will fix it. If the tank is leaking or near the end of its life, we recommend replacement. Cost depends on tank or tankless, gas or electric, venting, permit requirements, and any code upgrades needed.',
  },
  {
    q: 'Do my old cast iron drain pipes need replacing?',
    a: 'Not always. A camera inspection shows whether the pipe is cracked, scaled, or holding roots. Sections in good shape can stay, and damaged runs can be replaced without redoing the whole system.',
  },
  {
    q: 'Do you install plumbing fixtures during kitchen and bathroom upgrades?',
    a: 'Yes. We handle rough-in and finish plumbing for kitchen and bathroom remodels, including sinks, faucets, toilets, showers, tubs, dishwashers, and garbage disposals.',
  },
  {
    q: 'What causes low water pressure at home?',
    a: 'Low pressure usually comes from clogged fixtures, corroded galvanized pipe, a main line leak, or a failing pressure reducing valve. Pressure that is too high strains fixtures, water heaters, and pipe joints. A plumber can test the pressure at a hose bib and find the cause.',
  },
].map((f) => ({ ...f, category: 'plumbing' as const })) as Faq[];

/** Electrical answers restate only what the site already says about Danika's electrical services. */
export const electricalFaqs: Faq[] = [
  {
    category: 'electrical',
    q: 'Which electrical services does Danika offer?',
    a: 'Danika is a licensed electrical contractor. Our residential electrical services include panel upgrades, EV charger installation, electrical repair, emergency electrician service, generator installation, lighting installation, whole-home rewiring and safety inspections.',
  },
  {
    category: 'electrical',
    q: 'Can Danika install an EV charger?',
    a: 'Yes. EV charger installation is one of our electrical services. A panel upgrade is often the first step before an EV charger, so call us and we will explain your options and give you a written price before any work starts.',
  },
  {
    category: 'electrical',
    q: 'What should I do during an electrical emergency?',
    a: 'If anyone is in danger or you see fire, call 911 first. For sparking outlets, a burning smell, or a dead circuit after a leak, call (425) 374-1557 and ask for our emergency electrician service. If water is near wiring, our emergency electricians can make it safe on the same call.',
  },
  {
    category: 'electrical',
    q: 'Can one company handle both my plumbing and my electrical work?',
    a: 'Yes. Danika is a licensed plumbing contractor and electrical contractor, so the leak under the sink and the dead outlet beside it are one call, one dispatcher and one invoice.',
  },
];

