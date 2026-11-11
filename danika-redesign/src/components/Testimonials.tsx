'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';
import { reviews } from '@/data/reviews';
import { orig } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/** Drift speed in px/s. Slow enough to read a card as it passes (a card is ~400px wide, so about 12s per card). */
const SPEED = 32;
/** Length of the eased slide when the previous/next buttons are used. */
const STEP_MS = 520;
/** After a touch, the row stays still this long so the reader can finish the card they were looking at. */
const TOUCH_HOLD_MS = 2800;
/** Movement before a press counts as a drag, so taps and page scrolls are never mistaken for one. */
const DRAG_THRESHOLD = 6;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Stars() {
  return (
    <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-[1.125rem] w-[1.125rem] fill-primary text-primary" aria-hidden />)}
    </span>
  );
}

/** One review card. Cards are equal height (the row stretches them) so the strip reads as a balanced band. */
function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <li className="flex w-[min(86vw,22rem)] flex-none sm:w-[22rem] lg:w-[24rem]">
      <figure className="flex w-full flex-col rounded-card border border-line bg-cream p-6 shadow-card transition-[border-color,box-shadow] duration-base ease-out-soft hover:border-primary/40 hover:shadow-lift sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <Stars />
          <span className="text-sm text-fg-soft">{review.date}</span>
        </div>
        <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed">&ldquo;{review.text}&rdquo;</blockquote>
        <figcaption className="mt-5 border-t border-line pt-4 leading-snug">
          <strong className="block font-heading text-lg text-primary-dark">{review.job}</strong>
          <span className="block text-sm text-fg-soft">Verified Google review</span>
        </figcaption>
      </figure>
    </li>
  );
}

type Motion = {
  pos: number; // distance travelled along one set of cards, always kept in [0, setWidth)
  factor: number; // 0..1 eased speed multiplier, so pausing and resuming glide instead of snapping
  setWidth: number;
  stride: number; // distance from one card's left edge to the next
  tween: { from: number; to: number; start: number } | null;
  userPaused: boolean;
  hover: boolean;
  focus: boolean;
  pressed: boolean;
  inView: boolean;
  holdUntil: number;
  reduce: boolean;
};

/**
 * Continuously drifting row of real Google reviews.
 *
 * Seamless loop: the cards are rendered as identical sets side by side and the row is translated along the width of one set.
 * When the offset reaches that width it is wrapped back by exactly that width, which draws the identical frame, so there is no jump.
 * Extra sets are added only when a very wide screen needs them to stay filled.
 *
 * Calm by default: the row eases to a stop on hover, press or keyboard focus, can be paused with a button, steps one card at a time
 * with the previous/next buttons, can be dragged or swiped, and does not move on its own when the visitor prefers reduced motion.
 * Only the first set is exposed to assistive technology; the repeats are hidden and inert.
 */
export function Testimonials() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const m = useRef<Motion>({
    pos: 0, factor: 1, setWidth: 0, stride: 0, tween: null,
    userPaused: false, hover: false, focus: false, pressed: false, inView: false, holdUntil: 0, reduce: false,
  });
  const drag = useRef<{ id: number; startX: number; lastX: number; active: boolean; touch: boolean } | null>(null);

  const [copies, setCopies] = useState(1); // one set until JS measures; without JS the row is a plain scrollable list
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState<boolean | null>(null);
  const [paused, setPaused] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  // Measure one set and add just enough repeats to cover the viewport plus one extra set.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const set = setRef.current;
    if (!viewport || !set) return;
    const measure = () => {
      const s = m.current;
      const width = set.getBoundingClientRect().width;
      if (!width) return;
      const first = set.children[0] as HTMLElement | undefined;
      const second = set.children[1] as HTMLElement | undefined;
      if (s.setWidth) s.pos = (s.pos / s.setWidth) * width; // keep the same place in the loop after a resize
      s.setWidth = width;
      s.stride = first && second ? second.getBoundingClientRect().left - first.getBoundingClientRect().left : width;
      s.tween = null;
      setCopies(Math.max(2, Math.ceil(viewport.clientWidth / width) + 1));
    };
    measure();
    setReady(true);
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(set);
    return () => ro.disconnect();
  }, []);

  // Reduced motion: no automatic movement; previous/next jump instead of sliding.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      m.current.reduce = mq.matches;
      m.current.userPaused = mq.matches;
      setReduce(mq.matches);
      setPaused(mq.matches);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Only animate while the section is on screen.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof IntersectionObserver === 'undefined') { m.current.inView = true; return; }
    const io = new IntersectionObserver(([e]) => { m.current.inView = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(viewport);
    return () => io.disconnect();
  }, []);

  // The animation loop. Position lives in a ref and is written straight to the transform, so React never re-renders per frame.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const s = m.current;
      const dt = Math.min((now - last) / 1000, 0.05); // a backgrounded tab must not cause a leap on return
      last = now;
      if (!s.setWidth || !s.inView) return;

      const hold = s.userPaused || s.hover || s.focus || s.pressed || now < s.holdUntil;
      const dragging = !!drag.current?.active;
      s.factor += ((hold || dragging ? 0 : 1) - s.factor) * (1 - Math.exp(-dt / (hold ? 0.16 : 0.45)));

      if (s.tween) {
        const t = Math.min((now - s.tween.start) / STEP_MS, 1);
        s.pos = s.tween.from + (s.tween.to - s.tween.from) * easeInOut(t);
        if (t >= 1) s.tween = null;
      } else if (!dragging) {
        s.pos += SPEED * s.factor * dt;
      }

      // Wrap by exactly one set width; the repeated set draws an identical frame, so the loop has no seam.
      while (s.pos >= s.setWidth) { s.pos -= s.setWidth; if (s.tween) { s.tween.from -= s.setWidth; s.tween.to -= s.setWidth; } }
      while (s.pos < 0) { s.pos += s.setWidth; if (s.tween) { s.tween.from += s.setWidth; s.tween.to += s.setWidth; } }
      track.style.transform = `translate3d(${-s.pos}px,0,0)`;
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const s = m.current;
    if (!s.setWidth || !s.stride) return;
    const n = s.pos / s.stride;
    // Land on the next card edge in that direction; skip one if we are already almost on it.
    let k = dir === 1 ? Math.floor(n + 1e-4) + 1 : Math.ceil(n - 1e-4) - 1;
    if (Math.abs(k * s.stride - s.pos) < 40) k += dir;
    const to = k * s.stride;
    if (s.reduce) { s.pos = to; s.tween = null; return; }
    s.tween = { from: s.pos, to, start: performance.now() };
  }, []);

  const toggle = () => {
    const next = !m.current.userPaused;
    m.current.userPaused = next;
    setPaused(next);
  };

  // Pointer handling: mouse hover pauses; press-and-drag (mouse, touch or pen) moves the row by hand.
  const onPointerEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse') m.current.hover = true; };
  const onPointerLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') m.current.hover = false; };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { id: e.pointerId, startX: e.clientX, lastX: e.clientX, active: false, touch: e.pointerType !== 'mouse' };
    m.current.pressed = true;
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.active) {
      if (Math.abs(e.clientX - d.startX) < DRAG_THRESHOLD) return;
      d.active = true;
      m.current.tween = null;
      viewportRef.current?.setPointerCapture(e.pointerId);
      setGrabbing(true);
    }
    m.current.pos -= e.clientX - d.lastX;
    d.lastX = e.clientX;
  };
  const endPress = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    m.current.pressed = false;
    if (d.touch) m.current.holdUntil = performance.now() + TOUCH_HOLD_MS;
    if (d.active) setGrabbing(false);
  };

  // Keyboard focus inside the controls pauses the row; a mouse click on a button does not leave it stuck paused.
  const onControlsFocus = (e: FocusEvent<HTMLDivElement>) => { if (e.target.matches(':focus-visible')) m.current.focus = true; };
  const onControlsBlur = (e: FocusEvent<HTMLDivElement>) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) m.current.focus = false; };

  const btn = 'grid h-11 w-11 place-items-center rounded-full border-2 border-primary bg-white text-primary btn-motion hover:bg-primary hover:text-white';

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section overflow-hidden bg-white">
      <Reveal className="container-x">
        <p className="eyebrow">Testimonials</p>
        <h2 id="reviews-title" className="h2">What People Say About Us</h2>
      </Reveal>

      {/* Full-bleed viewport. Soft edges show the row continues beyond the screen. */}
      <Reveal index={1}>
      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPress}
        onPointerCancel={endPress}
        className={cn(
          'mt-10 select-none py-3 [touch-action:pan-y] lg:mt-14',
          ready ? 'overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]' : 'no-scrollbar overflow-x-auto px-4',
          ready && (grabbing ? 'cursor-grabbing' : 'cursor-grab'),
        )}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {Array.from({ length: copies }).map((_, c) => (
            <ul
              key={c}
              ref={c === 0 ? setRef : undefined}
              role="list"
              className="flex flex-none items-stretch gap-5 pr-5"
              {...(c > 0 ? { 'aria-hidden': true, inert: true } : {})}
            >
              {reviews.map((r) => <ReviewCard key={r.job + r.date} review={r} />)}
            </ul>
          ))}
        </div>
      </div>
      </Reveal>

      <div className="container-x mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3" role="group" aria-label="Review controls" onFocus={onControlsFocus} onBlur={onControlsBlur}>
          <button type="button" onClick={() => step(-1)} aria-label="Previous review" className={btn}><ChevronLeft className="h-5 w-5" aria-hidden /></button>
          {reduce === false && (
            <button type="button" onClick={toggle} aria-label={paused ? 'Play review scrolling' : 'Pause review scrolling'} className={btn}>
              {paused ? <Play className="h-5 w-5" aria-hidden /> : <Pause className="h-5 w-5" aria-hidden />}
            </button>
          )}
          <button type="button" onClick={() => step(1)} aria-label="Next review" className={btn}><ChevronRight className="h-5 w-5" aria-hidden /></button>
        </div>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-sm text-fg-soft">Reviews shown as posted by customers on Google.</p>
          <ButtonLink href={orig('/reviews/')} variant="primary">Read our customer reviews</ButtonLink>
        </div>
      </div>
    </section>
  );
}
