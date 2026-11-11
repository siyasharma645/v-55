/** Motion helpers. The durations/easing themselves are CSS tokens in globals.css (:root, "MOTION SYSTEM"). Keep this in step with --stagger. */
export const STAGGER_MS = 80;
/** Delay for the i-th sibling of a group, capped so a long row never waits more than ~3 steps. */
export const stagger = (i: number, max = 3) => Math.min(Math.max(i, 0), max) * STAGGER_MS;
