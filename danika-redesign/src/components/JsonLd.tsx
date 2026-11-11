import { SITE } from '@/data/site';
import { plumbingServices, electricalServices } from '@/data/services';
import { kingCounty, snohomishCounty } from '@/data/areas';
import { electricalFaqs, faqs } from '@/data/faqs';

/**
 * LocalBusiness structured data. Only verified properties are included.
 * Deliberately omitted: aggregateRating (the 4.7 score comes from a third-party widget and
 * self-serving review markup is discouraged by Google), openingHours (office hours are not published),
 * priceRange (not published).
 */
export function JsonLd() {
  const a = SITE.address;
  const logo = `${SITE.url}/brand/logo-wordmark.png`;
  const image = `${SITE.url}/og.png`;

  const graph = [
    {
      '@type': ['Plumber', 'Electrician'],
      '@id': `${SITE.url}/#business`,
      name: SITE.name,
      url: `${SITE.url}/`,
      telephone: '+1-425-374-1557',
      email: SITE.email,
      image,
      logo,
      slogan: SITE.tagline,
      foundingDate: String(SITE.founded),
      description:
        'Licensed plumber and electrician in Everett, WA offering 24/7 emergency plumbing, drain cleaning, sewer repair and water heaters across Snohomish County and King County.',
      address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.city, addressRegion: a.region, postalCode: a.postal, addressCountry: a.country },
      geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      identifier: { '@type': 'PropertyValue', name: 'Washington State L&I contractor license', value: SITE.license },
      areaServed: [...snohomishCounty, ...kingCounty].map((c) => ({ '@type': 'City', name: c.name })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Plumbing and electrical services',
        itemListElement: [...plumbingServices, ...electricalServices].map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title },
        })),
      },
      sameAs: Object.values(SITE.social),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#business` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [...faqs, ...electricalFaqs].map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }}
    />
  );
}
