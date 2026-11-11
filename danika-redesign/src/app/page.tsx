import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { ServiceDiscovery } from '@/components/ServiceDiscovery';
import { StockImage } from '@/components/StockImage';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ProcessSection } from '@/components/ProcessSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { Testimonials } from '@/components/Testimonials';
import { ServiceAreas } from '@/components/ServiceAreas';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { JsonLd } from '@/components/JsonLd';

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd />
      <Hero />
      <TrustBar />
      <ServiceDiscovery />
      <WhyChooseUs
        media={<StockImage slot="electricianWiring" compact zoom sizes="(min-width: 1024px) 40vw, 100vw" position="center 15%" />}
      />
      <ProcessSection />
      <ProjectsSection />
      <Testimonials />
      <AboutSection />
      <ServiceAreas />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
