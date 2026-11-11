import { BadgeCheck, CalendarCheck, Clock, MapPin, MessageSquareText, ShieldCheck, Star, type LucideIcon } from 'lucide-react';
import { SITE } from '@/data/site';
import { kingCounty, snohomishCounty } from '@/data/areas';
import { CountUp } from '@/components/CountUp';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Credibility strip, directly under the hero (compact, unified, no individual cards). Every figure is derived from data already in the project, nothing is typed in by hand:
 *  - years in business: this year minus SITE.founded (2009)
 *  - Google rating and review count: SITE.rating (4.7, "690+ Google reviews")
 *  - service areas: the cities listed in data/areas.ts (Snohomish + King County)
 * If any source changes, the number here follows it.
 */
const reviewCount = Number.parseInt(SITE.rating.label, 10); // "690+ Google reviews" -> 690
const reviewSuffix = SITE.rating.label.match(/^\d+(\+)/)?.[1] ?? '';

const stats: { value: number; decimals?: number; suffix?: string; label: string; text: string; Icon: LucideIcon | 'stars' }[] = [
  { value: new Date().getFullYear() - SITE.founded, label: 'Years in business', text: `Locally owned in Everett since ${SITE.founded}.`, Icon: CalendarCheck },
  { value: Number(SITE.rating.value), decimals: 1, label: 'Google rating', text: 'Average star rating from our customers.', Icon: 'stars' },
  { value: reviewCount, suffix: reviewSuffix, label: 'Google reviews', text: 'Homeowners who took the time to share their experience.', Icon: MessageSquareText },
  { value: snohomishCounty.length + kingCounty.length, label: 'Service areas', text: 'Cities across Snohomish and North King County.', Icon: MapPin },
];

const assurances: { text: string; Icon: LucideIcon }[] = [
  { text: `Licensed & Insured · WA license ${SITE.license}`, Icon: ShieldCheck },
  { text: '24/7 emergency plumbing', Icon: Clock },
  { text: '1-year parts & labor warranty', Icon: BadgeCheck },
];

export function TrustBar() {
  return (
    <section aria-label="Danika Plumbing & Electric at a glance" className="relative z-10 border-b border-line bg-cream">
      <div className="container-x py-3 lg:py-3.5">
        {/* One unified strip: no card chrome. Four even columns on desktop, two on tablet and mobile. Thin inset dividers on desktop only. */}
        <ul className="grid grid-cols-2 gap-x-3 gap-y-3 lg:grid-cols-4 lg:gap-x-0">
          {stats.map(({ value, decimals, suffix, label, text, Icon }, i) => (
            <Reveal
              as="li"
              key={label}
              index={i}
              className="relative flex flex-col items-center px-2 text-center sm:px-4 lg:before:absolute lg:before:bottom-1 lg:before:left-0 lg:before:top-1 lg:before:w-px lg:before:bg-line lg:first:before:hidden"
            >
              <div className="flex items-center justify-center gap-1.5">
                {Icon === 'stars' ? (
                  <Star className="h-3.5 w-3.5 shrink-0 fill-primary sm:h-4 sm:w-4 text-primary" strokeWidth={1.6} role="img" aria-label={`${SITE.rating.value} out of 5 stars`} />
                ) : (
                  <Icon className="h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" strokeWidth={1.8} aria-hidden />
                )}
                <CountUp value={value} decimals={decimals} suffix={suffix} className="display !leading-none text-primary text-[length:clamp(1.5rem,1.1rem+1.4vw,2.125rem)]" />
              </div>
              <p className="mt-1 font-heading text-[length:clamp(0.6875rem,0.65rem+0.12vw,0.75rem)] font-semibold uppercase leading-tight tracking-[0.07em] text-primary-dark">{label}</p>
              <p className="mt-0.5 max-w-[19rem] text-balance text-[length:clamp(0.6875rem,0.64rem+0.2vw,0.8125rem)] font-normal leading-[1.35] text-fg-soft">{text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal index={4}>
          <ul className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 border-t border-line/70 pt-2 text-[length:clamp(0.6875rem,0.66rem+0.1vw,0.75rem)] font-medium leading-tight text-primary sm:gap-x-7">
            {assurances.map(({ text, Icon }) => (
              <li key={text} className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Icon className="h-[13px] w-[13px] shrink-0 sm:h-3.5 sm:w-3.5" strokeWidth={1.9} aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
