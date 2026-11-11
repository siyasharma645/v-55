import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceTabs } from '@/components/ServiceTabs';
import { StockImage } from '@/components/StockImage';
import { ServiceIcon } from '@/components/icons/ServiceIcon';
import { Reveal } from '@/components/ui/Reveal';
import { getImage } from '@/lib/images';
import { discoveryCategories, type DiscoveryMedia, type DiscoveryRow } from '@/data/service-discovery';

const SIZES = '(min-width: 1024px) 240px, (min-width: 640px) 18vw, 36vw';

function Media({ media, icon }: { media: DiscoveryMedia; icon: DiscoveryRow['icon'] }) {
  if (media.kind === 'danika') {
    const img = getImage(media.key);
    return <Image src={img.src} alt={img.alt} fill loading="lazy" sizes={SIZES} className="img-zoom object-cover" style={{ objectPosition: media.position ?? 'center' }} />;
  }
  if (media.kind === 'stock') return <StockImage slot={media.slot} compact zoom sizes={SIZES} position={media.position} />;
  // No photo for this service yet: the same branded tile the site uses for missing stock images, carrying the service's own icon.
  return (
    <span className="blueprint absolute inset-0 grid place-items-center bg-primary-dark" aria-hidden>
      <ServiceIcon name={icon} size={52} className="text-white/85" />
    </span>
  );
}

/**
 * Unified service discovery: choose Plumbing or Electrical, see that category's four featured services, or follow "View all".
 * Server component: it builds every card (both categories are in the HTML, so links are crawlable); <ServiceTabs> only switches which panel shows.
 */
export function ServiceDiscovery() {
  const panels = Object.fromEntries(
    discoveryCategories.map((c) => [
      c.id,
      <div key={c.id}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:gap-4">
          {c.rows.map((r, i) => (
            <ServiceCard key={r.title} index={i} title={r.title} text={r.text} href={r.href} media={<Media media={r.media} icon={r.icon} />} />
          ))}
        </ul>
        <a
          href={c.all.href}
          className="group mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-md text-base font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors duration-base ease-out-soft hover:decoration-white"
        >
          {c.all.label}
          <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={2} aria-hidden />
        </a>
      </div>,
    ]),
  );

  return (
    <section id="services" aria-labelledby="services-title" className="on-red surface surface-dark bg-primary-dark py-10 text-white sm:py-12 lg:py-14">
      <div className="container-x">
        <Reveal as="header" className="max-w-3xl">
          <h2 id="services-title" className="h3-compact !text-white">What Do You Need Help With?</h2>
          <p className="mt-2 text-base text-white/85 sm:text-lg">Explore our plumbing and electrical services to find the right solution for your home.</p>
        </Reveal>

        <ServiceTabs
          className="mt-6"
          categories={discoveryCategories.map(({ id, label, description }) => ({ id, label, description }))}
          panels={panels as Record<'plumbing' | 'electrical', React.ReactNode>}
        />
      </div>
    </section>
  );
}
