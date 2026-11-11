import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HelpProvider } from '@/components/help/HelpProvider';

const title = 'Plumber & Electrician in Everett, WA | Danika Plumbing & Electric';
const description =
  'Licensed plumber and electrician in Everett, WA. 24/7 emergency plumbing, drain cleaning, water heaters, panel upgrades and EV chargers. Call (425) 374-1557.';
const og = { src: '/og.png', alt: 'Danika Plumbing & Electric: Quick Service, Quality Materials, Realistic Prices' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: '%s | Danika Plumbing & Electric' },
  description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE.name,
    title,
    description,
    images: [{ url: og.src, width: 1200, height: 630, alt: og.alt }],
  },
  twitter: { card: 'summary_large_image', site: '@DanikaCo', title, description, images: [og.src] },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8F3328',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Flags JS availability before paint so reveal animations never hide content when JS is off. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <HelpProvider>
          <Header />
          {children}
          <Footer />
        </HelpProvider>
      </body>
    </html>
  );
}
