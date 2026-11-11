import { processSteps } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { Timeline } from '@/components/Timeline';

/** How the process works: what happens from the first call to finished work. */
export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="section surface surface-dots bg-white">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="lg:self-center">
          <p className="eyebrow">The Danika way</p>
          <h2 id="process-title" className="h2">From your first call to finished work</h2>
        </Reveal>
        <Timeline steps={processSteps} />
      </div>
    </section>
  );
}
