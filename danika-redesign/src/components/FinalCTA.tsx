import { Mail, MapPin, Phone } from 'lucide-react';
import { SITE } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { buttonClasses } from '@/components/ui/Button';

/** Final contact strip before the footer. The callback form already lives near the top, so this links back to it instead of repeating it. */
export function FinalCTA() {
  const { street, city, region, postal } = SITE.address;
  return (
    <section id="quote" aria-labelledby="cta-title" className="section on-red surface surface-red bg-primary text-white">
      <Reveal className="container-x flex flex-col items-center text-center">
        <h2 id="cta-title" className="h3-compact !text-white">Need Plumbing or Electrical Help?</h2>
        <p className="mt-4 max-w-xl text-[1.0625rem] text-white/90">Your local Everett experts are here to help. Call us any time, or request a callback and our team will reach out.</p>

        <a href={SITE.phoneHref} aria-label={`Call ${SITE.phone}`} className="group mt-7 inline-flex items-center gap-3 text-white">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-ui bg-white text-primary transition-colors duration-base ease-out-soft group-hover:bg-cream"><Phone className="h-6 w-6" aria-hidden /></span>
          <span className="display whitespace-nowrap text-[clamp(2rem,1.4rem+2.4vw,3rem)] leading-none decoration-2 underline-offset-[6px] group-hover:underline">{SITE.phone}</span>
        </a>

        <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href={SITE.phoneHref} className={buttonClasses('light', 'md', 'w-full sm:w-auto sm:min-w-[200px]')}>
            <Phone className="h-5 w-5" aria-hidden /> Call Danika
          </a>
          <a href="#quick-request" className={buttonClasses('outline-white', 'md', 'w-full sm:w-auto sm:min-w-[200px]')}>
            Request a Callback
          </a>
        </div>

        <ul className="mt-8 flex flex-col items-center gap-2 text-[0.95rem] text-white/90 sm:flex-row sm:gap-8">
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" aria-hidden /><a href={SITE.directions} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{street}, {city}, {region} {postal}<span className="sr-only"> (opens directions in a new tab)</span></a></li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" aria-hidden /><a href={`mailto:${SITE.email}`} className="break-all underline-offset-4 hover:underline">{SITE.email}</a></li>
        </ul>
      </Reveal>
    </section>
  );
}
