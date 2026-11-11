/** Single source of truth for verified business information (taken from danikaplumbing.com). */
export const ORIGIN = 'https://danikaplumbing.com';

export const SITE = {
  name: 'Danika Plumbing & Electric',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? ORIGIN).replace(/\/$/, ''),
  phone: '(425) 374-1557',
  phoneHref: 'tel:+14253741557',
  email: 'office@danikaplumbing.com',
  address: { street: '11015 Airport Road', city: 'Everett', region: 'WA', postal: '98204', country: 'US' },
  license: 'DANIKPL839PF',
  licenseUrl: 'https://secure.lni.wa.gov/verify/',
  founded: 2009,
  // From the coordinates in the original site's Google Maps embed.
  geo: { lat: 47.8979, lng: -122.2666 },
  tagline: 'Quick Service, Quality Materials, Realistic Prices',
  social: {
    facebook: 'https://www.facebook.com/DanikaPlumbing',
    twitter: 'https://twitter.com/DanikaCo',
    instagram: 'https://www.instagram.com/danikaplumbing/',
    youtube: 'https://www.youtube.com/@danikaplumbingllc7121',
  },
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=Danika%20Plumbing%20%26%20Electric%2011015%20Airport%20Rd%20Everett%20WA%2098204',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.9920016096003!2d-122.26655212262958!3d47.897894771217935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485536986531ebf%3A0x4c8317b840fa6a72!2sDanika%20Plumbing%20%26%20Electric!5e1!3m2!1sen!2sca!4v1760475499221!5m2!1sen!2sca',
  rating: { value: '4.7', label: '690+ Google reviews' },
} as const;

/** Link to a page on the original website (the redesign covers the homepage only). */
export const orig = (path = '/') => `${ORIGIN}${path}`;
