import { Phone, Siren } from 'lucide-react';
import { SITE } from '@/data/site';
import { HeroVideo } from '@/components/HeroVideo';
import { buttonClasses } from '@/components/ui/Button';
import { QuickRequest } from '@/components/QuickRequest';

/**
 * Hero: ONE continuous video backdrop behind a two-column layout.
 *  - left:  heading, subheading and the urgent-contact block (deliberately NOT a card: just text over the video)
 *  - right: the existing Quick Request form on an opaque white card, vertically centred against the left column (lg and up)
 * Below 1024px the columns stack: content first, form directly beneath it.
 * The trust bar is a separate strip rendered right after this component.
 */
export function Hero() {
  return (
    <div className="on-red relative isolate overflow-hidden bg-primary-dark text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <HeroVideo />
        {/* Deep-brick overlay across the whole hero: heavier behind the text, lighter on the right so the circuit detail stays visible. */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/85 to-primary-dark/92 lg:bg-gradient-to-r lg:from-primary-dark/95 lg:via-primary-dark/80 lg:to-primary-dark/30" aria-hidden />
      </div>

      <div className="container-x relative grid gap-10 pb-10 pt-12 sm:gap-12 sm:pb-14 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-10 lg:py-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] xl:gap-14">
      <section aria-labelledby="hero-title">
        <div className="max-w-xl lg:max-w-2xl">
          <h1 id="hero-title" className="h1 rise text-balance !text-white !text-[clamp(1.875rem,8.4vw,2.75rem)] !leading-[1.04] sm:!text-[clamp(2.75rem,6.2vw,3.5rem)] lg:!text-[clamp(2.5rem,3.9vw,3.75rem)]">
            <span className="block">Powering Your Home.</span>
            <span className="block">Keeping Things Flowing.</span>
          </h1>
          <p className="rise mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-white/90 sm:mt-4 sm:text-base lg:max-w-xl lg:text-[1.0625rem]" style={{ animationDelay: '.08s' }}>
            Your trusted local experts for dependable plumbing and electrical services in Everett, WA. Serving Snohomish County and North King County since {SITE.founded}.
          </p>

          {/* Urgent contact: plain content over the same video, no container. */}
          <div className="rise mt-6 flex flex-col items-start sm:mt-8" style={{ animationDelay: '.16s' }}>
            <p className="inline-flex w-fit items-center gap-2 rounded-btn border border-white/35 bg-white/10 px-3 py-1.5 text-[0.8125rem] font-bold sm:text-sm">
              <Siren className="h-4 w-4" aria-hidden /> 24/7 Emergency
            </p>
            <h2 className="display mt-3 !text-white text-[clamp(1.5rem,6vw,2rem)] leading-tight sm:mt-4 lg:text-[clamp(2rem,2.6vw,2.375rem)]">Need Urgent Help?</h2>

            <a href={SITE.phoneHref} aria-label={`Call ${SITE.phone}`} className="group mt-3 inline-flex min-h-[44px] items-center gap-3 text-white sm:mt-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-ui bg-white text-primary transition-colors duration-200 group-hover:bg-cream sm:h-11 sm:w-11"><Phone className="h-5 w-5" aria-hidden /></span>
              <span className="display whitespace-nowrap text-[clamp(1.625rem,7vw,2.125rem)] leading-none decoration-2 underline-offset-[6px] group-hover:underline">{SITE.phone}</span>
            </a>

            <a href={SITE.phoneHref} className={buttonClasses('light', 'md', 'mt-4 w-full !min-h-[44px] !py-2.5 sm:w-auto sm:min-w-[200px]')}>
              <Phone className="h-5 w-5" aria-hidden /> Call Now
            </a>
          </div>
        </div>
      </section>

      <div className="w-full">
        <QuickRequest variant="hero" />
      </div>
      </div>
    </div>
  );
}
