import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import { kingCounty, snohomishCounty, type Area } from '@/data/areas';
import { SITE, orig } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

function County({ title, areas }: { title: string; areas: Area[] }) {
  return (
    <div>
      <h3 className="border-b-2 border-primary pb-2 font-heading text-xl font-bold text-primary max-sm:text-lg">{title}</h3>
      {/* Full-width grid: equal columns so every name starts on a shared left edge and rows keep one rhythm. */}
      <ul className="mt-2 grid grid-cols-2 gap-x-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {areas.map((a) => (
          <li key={a.name} className={a.name === 'Everett' ? 'col-span-2' : undefined}>
            <a
              href={a.href}
              className={`inline-flex min-h-[44px] max-w-full flex-wrap items-center gap-x-1.5 text-[1.0625rem] transition-colors duration-fast ease-out-soft hover:text-primary hover:underline ${a.name === 'Everett' ? 'font-heading text-[1.1875rem] font-extrabold text-primary' : 'font-semibold'}`}
            >
              {a.name === 'Everett' && <MapPin className="h-4 w-4" aria-hidden />}
              {a.name}
              {a.name === 'Everett' && <span className="ml-1 whitespace-nowrap rounded bg-primary px-2 py-0.5 text-xs font-bold text-white max-sm:ml-0.5 max-sm:px-1.5 max-sm:text-[0.6875rem]">Home base</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceAreas() {
  return (
    <section id="service-areas" aria-labelledby="areas-title" className="section surface surface-cream bg-cream">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Where the trucks go</p>
          <h2 id="areas-title" className="h2 max-w-4xl max-sm:text-[clamp(1.75rem,7.6vw,2rem)] max-sm:leading-[1.08]">Our Service Area: Snohomish County and King County</h2>
          <p className="lead mt-5 max-sm:mt-4 max-sm:text-base max-sm:leading-relaxed">Our plumbers work from Everett north to Arlington, east to Monroe, and south through Lynnwood and Bothell into Seattle and the Eastside.</p>
        </Reveal>

        <div className="mt-10 space-y-8 max-sm:mt-7 max-sm:space-y-6 lg:mt-12">
          <County title="Snohomish County Cities We Serve" areas={snohomishCounty} />
          <County title="King County and Seattle Neighborhoods We Serve" areas={kingCounty} />
        </div>

        <div className="mt-8 flex flex-col gap-5 max-sm:mt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="rounded-field border border-line border-l-4 border-l-primary bg-white px-4 py-3 text-[0.95rem] font-medium lg:max-w-2xl">
            Emergency plumbing is available across the whole service area. If your town is not listed, call and ask.
          </p>
          <div><ButtonLink href={orig('/service-area/')} variant="primary">See all 25 cities we serve <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink></div>
        </div>

        {/* Map: full column width so its edges line up with the lists above. */}
        <Reveal className="mt-10 overflow-hidden rounded-card border border-line bg-white shadow-card max-sm:mt-8 lg:mt-12">
          <div className="h-[300px] bg-cream sm:h-[360px] lg:h-[400px]">
            <iframe
              title="Map showing Danika Plumbing & Electric at 11015 Airport Road, Everett, WA"
              src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" allowFullScreen
            />
          </div>
          <div className="flex flex-col gap-4 border-t-4 border-primary bg-white p-6 max-sm:gap-3 max-sm:p-4 sm:flex-row sm:items-center sm:justify-between">
            <address className="text-sm not-italic leading-relaxed text-fg-soft">
              <strong className="block text-base text-primary">Head office, Everett</strong>
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
            </address>
            <ButtonLink href={SITE.directions} target="_blank" rel="noopener noreferrer" variant="secondary" className="max-sm:w-full">
              <Navigation className="h-4 w-4" aria-hidden /> Get directions<span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
