import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { electricalAll, electricalNav, plumbingAll, plumbingNav } from '@/data/nav';
import { snohomishCounty } from '@/data/areas';
import { SITE, orig } from '@/data/site';
import Image from 'next/image';
import { LOGO } from '@/lib/brand';
import { HelpTrigger } from '@/components/help/HelpProvider';
import { FooterGroup } from '@/components/FooterGroup';

const social = [
  { href: SITE.social.facebook, label: 'Facebook', icon: Facebook },
  { href: SITE.social.instagram, label: 'Instagram', icon: Instagram },
  { href: SITE.social.twitter, label: 'X (Twitter)', icon: Twitter },
  { href: SITE.social.youtube, label: 'YouTube', icon: Youtube },
];

const link = 'inline-flex min-h-[44px] items-center text-sm text-white/85 transition-colors hover:text-cream sm:min-h-[34px]';
/** Column title: a hairline rule separates it from its links so each column reads as a unit. */
const heading = 'border-b border-primary pb-3 font-heading text-lg font-bold !text-white';

export function Footer() {
  return (
    <footer className="on-red bg-primary-dark pb-[4.75rem] pt-9 text-white/85 sm:pb-20 sm:pt-16 md:pb-10 lg:pt-20">
      <div className="container-x">
        <div className="grid gap-x-12 max-sm:gap-y-0 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="max-sm:pb-6">
            <a href="/" className="inline-block" aria-label={`${SITE.name} home`}>
              <Image src={LOGO.full.src} alt={LOGO.full.alt} width={LOGO.full.width} height={LOGO.full.height} loading="lazy" sizes="240px" className="h-auto w-44 sm:w-56" />
            </a>
            <p className="mt-3 max-w-xs text-sm text-white/85 sm:mt-4">{SITE.tagline}</p>
            <address className="mt-4 space-y-1.5 text-sm not-italic sm:mt-5 sm:space-y-2.5">
              <p className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cream" aria-hidden />{SITE.address.street}<br />{SITE.address.city}, {SITE.address.region} {SITE.address.postal}</p>
              <p><a href={SITE.phoneHref} className="flex items-center gap-2.5 font-semibold text-white hover:text-cream"><Phone className="h-4 w-4 text-cream" aria-hidden />{SITE.phone}</a></p>
              <p><a href={`mailto:${SITE.email}`} className="flex min-h-[44px] items-center gap-2.5 hover:text-white sm:min-h-0"><Mail className="h-4 w-4 text-cream" aria-hidden />{SITE.email}</a></p>
            </address>
            <ul className="mt-3 flex gap-2 sm:mt-5">
              {social.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full bg-primary transition hover:bg-white hover:text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterGroup as="nav" label="Plumbing services" title="Plumbing" desktopHeadingClass={heading}>
            <ul className="mt-2">
              {plumbingNav.slice(0, 10).map((l) => <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>)}
              <li><a href={plumbingAll.href} className={`${link} !font-semibold !text-white underline decoration-white/50 underline-offset-4`}>{plumbingAll.label} →</a></li>
            </ul>
          </FooterGroup>

          <FooterGroup as="nav" label="Electrical services" title="Electrical" desktopHeadingClass={heading}>
            <ul className="mt-2">
              {electricalNav.map((l) => <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>)}
              <li><a href={electricalAll.href} className={`${link} !font-semibold !text-white underline decoration-white/50 underline-offset-4`}>{electricalAll.label} →</a></li>
            </ul>
          </FooterGroup>

          <div>
            <FooterGroup title="Company" desktopHeadingClass={heading}>
            <ul className="mt-2">
              {[['About Us', '/about-us/'], ['Reviews', '/reviews/'], ['Projects', '/projects/'], ['Plumbing Financing', '/plumbing-financing/'], ['Blog', '/blog/'], ['Contact Us', '/contact-us/']].map(([l, p]) => (
                <li key={l}>{l === 'Contact Us' ? <HelpTrigger type="message" className={link}>{l}</HelpTrigger> : <a href={orig(p)} className={link}>{l}</a>}</li>
              ))}
            </ul>
            </FooterGroup>
            <FooterGroup title="Service Areas" className="sm:mt-8" desktopHeadingClass={heading}>
            <ul className="mt-2">
              {snohomishCounty.slice(0, 6).map((a) => <li key={a.name}><a href={a.href} className={link}>{a.name}</a></li>)}
              <li><a href={orig('/service-area/')} className={`${link} !font-semibold !text-white underline decoration-white/50 underline-offset-4`}>All 25 cities →</a></li>
            </ul>
            </FooterGroup>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1 border-white/20 pt-3 max-sm:border-t-0 sm:mt-14 sm:border-t text-sm sm:gap-3 sm:pt-6 text-white/85 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name} · WA contractor license{' '}
            <a href={SITE.licenseUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline-offset-4 hover:underline">{SITE.license}</a>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li><a href={orig('/reviews/')} className="inline-flex min-h-[44px] items-center hover:text-cream md:min-h-0">Reviews</a></li>
            <li><a href={orig('/privacy-policy/')} className="inline-flex min-h-[44px] items-center hover:text-cream md:min-h-0">Privacy Policy</a></li>
            <li><a href={orig('/terms-conditions/')} className="inline-flex min-h-[44px] items-center hover:text-cream md:min-h-0">Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
