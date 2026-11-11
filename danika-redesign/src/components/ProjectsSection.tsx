import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { orig } from '@/data/site';
import { getImage } from '@/lib/images';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { CarouselControls } from '@/components/CarouselControls';

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section surface surface-cream bg-cream">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Real jobs, real photos</p>
            <h2 id="projects-title" className="h2 max-w-3xl">Recent Plumbing Projects Around Snohomish County</h2>
            <p className="lead mt-5">Not stock photos. Each write-up covers what the homeowner called about, what we found, how we fixed it and how it looks now.</p>
          </div>
          <ButtonLink href={orig('/projects/')} variant="primary" className="self-start lg:self-auto">See all projects <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
        </Reveal>

        {/* All projects are equal cards in one slider: 1.2 visible on phones, 2 on tablets, 3 on desktop. Snap scrolling plus prev/next controls. */}
        <ul id="projects-track" tabIndex={0} aria-label="Projects. Scroll horizontally to see more." className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-pl-4 gap-5 overflow-x-auto px-4 pb-6 pt-2 sm:-mx-6 sm:scroll-pl-6 sm:px-6 lg:mx-0 lg:scroll-pl-0 lg:gap-7 lg:px-0">
          {projects.map((p, i) => {
            const img = getImage(p.image);
            return (
              <Reveal as="li" index={i} key={p.href} className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.5rem)/3)]">
                <article className="group motion-lift h-full overflow-hidden rounded-card border border-line bg-white shadow-card hover:border-primary hover:shadow-lift">
                  <a href={p.href} aria-label={`${p.title}, ${p.place}`} className="flex h-full flex-col">
                    <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-muted">
                      <Image src={img.src} alt={img.alt} fill loading="lazy" sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 82vw" className="img-zoom object-cover" />
                    </div>
                    <div className="flex-1 p-6">
                      <p className="text-sm font-bold text-primary">{p.type}</p>
                      <p className="text-sm text-fg-soft">{p.place}</p>
                      <h3 className="h4 mt-2 line-clamp-2 min-h-[2.5em] decoration-primary decoration-2 underline-offset-4 group-hover:underline">{p.title}</h3>
                    </div>
                  </a>
                </article>
              </Reveal>
            );
          })}
        </ul>
        <CarouselControls targetId="projects-track" label="projects" className="mt-2" />
      </div>
    </section>
  );
}
