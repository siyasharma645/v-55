import type { ReactNode } from 'react';
import { TrustIcon, type TrustIconName } from '@/components/icons/TrustIcon';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/data/site';

/** Every line restates something already on the site (address, service areas, in-house trades, one-year warranty). */
const points: { icon: TrustIconName; title: string; text: string }[] = [
  {
    icon: 'local', title: 'Locally Operated',
    text: `Our shop is at ${SITE.address.street} in Everett, not a regional dispatch center, and we serve homes across Snohomish and King County.`,
  },
  {
    icon: 'honest', title: 'Honest Recommendations',
    text: 'We explain what we find and the options available, with no scripted upsell. If a cheaper repair will hold, you will hear about it.',
  },
  {
    icon: 'one-company', title: 'Plumbing & Electrical Expertise',
    text: 'Both trades are handled in-house: one call, one dispatcher and one invoice.',
  },
  {
    icon: 'warranty', title: 'Work Backed by Warranty',
    text: 'One-year parts and labor warranty. We stand behind our work and the products we install.',
  },
];

/** Combined credibility section (replaces the old motto band and the five-point red panel). The photo slot is passed in so the page decides which image is used. */
export function WhyChooseUs({ media }: { media: ReactNode }) {
  return (
    <section id="why-danika" aria-labelledby="why-title" className="section surface surface-cream bg-cream text-fg !py-[clamp(2.5rem,1.9rem+2.2vw,3.75rem)]">
      <div className="container-x">
        {/* Top row: heading (about two lines on desktop) with the intro paragraph beside it, centred on the same axis. */}
        <Reveal as="header" className="grid gap-3 sm:gap-4 lg:grid-cols-12 lg:items-center lg:gap-x-12">
          <div className="lg:col-span-8">
            <p className="eyebrow uppercase tracking-wider !mb-3 sm:!mb-4">Why Danika</p>
            <h2 id="why-title" className="display !text-fg !leading-[1.05] sm:!leading-[.97] text-[1.875rem] sm:text-[clamp(2rem,1.3rem+3.2vw,3.25rem)] lg:max-w-[40rem]">
              Good work starts with doing right by the homeowner.
            </h2>
          </div>
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-fg-soft sm:text-[1.0625rem] lg:col-span-4 lg:mt-7 lg:border-l lg:border-line lg:pl-8">
            We&rsquo;re a local Everett company built on honest recommendations, quality workmanship and relationships that last.
          </p>
        </Reveal>

        {/* Lower row: image 38% / features 62% on desktop; stacked (image first) below that so text never gets compressed. */}
        <div className="mt-5 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[38fr_62fr] lg:gap-x-10">
          <Reveal className="group relative aspect-video overflow-hidden rounded-card sm:aspect-[21/9] lg:aspect-auto lg:min-h-[27rem]">{media}</Reveal>

          <ul className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-rows-2 lg:gap-x-10">
            {points.map((p, i) => (
              <Reveal as="li" index={i} key={p.title} className="trust-item flex items-start gap-3.5 border-t border-line py-3.5 max-sm:last:border-b sm:block sm:py-5 lg:pr-2">
                {/* Mobile: icon in a small tile at the left, text at the right. From 640px up the icon sits above the text as before. */}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white/70 sm:block sm:h-auto sm:w-auto sm:rounded-none sm:border-0 sm:bg-transparent">
                  <TrustIcon name={p.icon} className="h-5 w-5 text-fg sm:h-8 sm:w-8" />
                </span>
                <div className="min-w-0">
                  <h3 className="h4 !text-[0.9375rem] !leading-snug !text-fg sm:mt-3 sm:!text-[1.1875rem]">{p.title}</h3>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-fg-soft sm:mt-1.5 sm:text-[0.9375rem]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
