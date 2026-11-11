import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

/**
 * One featured service: picture on the left, title, short description and an "Explore service" cue on the right.
 * The whole card is one link to the service page. Hover (see .motion-lift, .card-outline, .svc-icon in globals.css): a small lift, a deeper shadow, an overlay border, the picture or illustration eases up slightly and the arrow nudges.
 */
export function ServiceCard({ title, text, href, media, index = 0 }: { title: string; text: string; href: string; media: ReactNode; index?: number }) {
  return (
    <Reveal as="li" index={index % 2} className="flex">
      <a
        href={href}
        className="group svc-card card-outline motion-lift relative flex min-h-[9.5rem] w-full overflow-hidden rounded-card bg-white text-fg shadow-card hover:shadow-lift"
      >
        <span className="relative block w-[36%] min-w-[7.5rem] max-w-[14rem] shrink-0 overflow-hidden bg-primary-dark sm:w-2/5 [&_p]:text-[0.5625rem] [&_p]:leading-snug">{media}</span>
        <span className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-heading text-lg font-bold leading-tight text-primary-dark sm:text-xl">{title}</h3>
          <span className="mt-1.5 line-clamp-3 text-sm leading-snug text-fg-soft">{text}</span>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-primary">
            Explore service
            <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={2} aria-hidden />
          </span>
        </span>
      </a>
    </Reveal>
  );
}
