/**
 * Genuine Google reviews copied from danikaplumbing.com (shown there via Trustindex).
 * Text is as posted (light punctuation tidy-up); ellipses mark trimmed passages. All were displayed as 5-star reviews.
 */
export type Review = { date: string; job: string; text: string };

export const reviews: Review[] = [
  {
    date: '20 October 2026', job: 'Water heater & pressure valve',
    text: 'Mike is an honest, kind, straight-shooter who was upfront about what needed to be handled sooner rather than later and what could wait. … This was all done SAME DAY.',
  },
  {
    date: '22 October 2026', job: 'Water heater replacement',
    text: 'Travis very knowledgeable and professional. Him and juan replaced my hot water tank in a couple hours. Very detailed and explained everything. Highly recommend.',
  },
  {
    date: '17 October 2026', job: 'Sump pump & pipe repair',
    text: 'What really stood out was that Travis took the time to understand the issue, explain things, and make a proper recommendation. … I really appreciated the professionalism and personal touch.',
  },
  {
    date: '8 October 2026', job: 'Hose bib & bathtub caulking',
    text: 'They came out quickly and provided a free quote, and their pricing was reasonable and fair. … He was honest and straightforward about the issues and never tried to upsell us on unnecessary work.',
  },
  {
    date: '2 October 2026', job: 'Electrical (doorbell voltage)',
    text: 'Messaged last night regarding a voltage issue with the doorbell and Dallas came the following the day. Easy to work with and customer service was excellent!',
  },
  {
    date: '1 October 2026', job: 'Sewer backup',
    text: 'Danika Plumbing has helped us through a very challenging sewer backup. Every step of the way there was communication around scheduling, estimates, referrals for mitigation and more.',
  },
  {
    date: '11 September 2026', job: 'Plumbing repairs',
    text: 'He handled everything quickly, easily, and professionally, and even took the extra time to zip-tie the hoses together and organize everything so it looked cleaner and better than it did before.',
  },
  {
    date: '3 September 2026', job: '114-year-old cast iron sewer stack',
    text: 'Not only was it fixed, it was fixed right, no corners cut, no unnecessary charges, and he did not drag it out for days.',
  },
  {
    date: '20 August 2026', job: 'Plumbing repairs',
    text: 'Showed up early, super professional, clean work, wore shoe covers, solved our plumbing issues quickly and dropped some great knowledge that I, as a newer homeowner found very informative.',
  },
];
