import type { Config } from 'tailwindcss';

/**
 * DESIGN TOKENS: Danika brick-red brand system.
 * Source values live as CSS variables in src/app/globals.css (:root) and are referenced here with the `<alpha-value>` format
 * so opacity utilities (bg-primary-dark/80) keep working. No colour value is defined anywhere else.
 *
 *   primary        #8F3328  brick red: header, CTAs, accents, links
 *   primary-dark   #70271F  deep brick: headings, footer, hover/pressed, dark bands
 *   cream          #F7F3ED  warm cream: page and alternating section backgrounds
 *   white          #FFFFFF  cards, forms, menus
 *   line / muted   #E9E2DA  warm grey: borders, dividers, input outlines
 *   fg             #70271F  body + heading text (deep brick)
 *   fg-soft        #765B54  supporting text only
 *   error          #B3261E  validation errors only (semantic exception)
 * No black, charcoal or yellow UI colours. Yellow survives only inside the logo artwork.
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: v('c-surface'),
        cream: v('c-background'),
        line: v('c-border'),
        muted: v('c-surface-muted'),
        primary: { DEFAULT: v('c-primary'), dark: v('c-primary-dark') },
        error: v('c-error'),
        fg: { DEFAULT: v('c-text'), soft: v('c-text-secondary') },
      },
      borderColor: { DEFAULT: v('c-border') },
      fontFamily: {
        heading: ['"Bricolage Grotesque Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      // ONE radius for the whole site: --ui-radius (10px, defined in globals.css). btn / field / card / ui are aliases of it,
      // so buttons, inputs, cards, menus and widgets can never drift apart. Use `rounded-full` only for intentionally circular icons.
      borderRadius: { ui: 'var(--ui-radius)', btn: 'var(--ui-radius)', field: 'var(--ui-radius)', card: 'var(--ui-radius)' },
      boxShadow: {
        card: '0 1px 2px rgba(112,39,31,.05), 0 8px 24px -12px rgba(112,39,31,.16)',
        lift: '0 2px 4px rgba(112,39,31,.08), 0 18px 40px -14px rgba(112,39,31,.32)',
        // Header and menus: small and tight. The two header shadows share a shape so the transition interpolates smoothly.
        'header-rest': '0 1px 0 rgba(112,39,31,0), 0 10px 20px -14px rgba(112,39,31,0)',
        'header-stuck': '0 1px 0 rgba(112,39,31,.9), 0 10px 20px -14px rgba(112,39,31,.65)',
        menu: '0 1px 2px rgba(112,39,31,.06), 0 12px 24px -14px rgba(112,39,31,.3)',
      },
      // Motion tokens (values live in globals.css :root). `duration-fast|base|reveal`, `ease-out-soft`.
      transitionDuration: { fast: 'var(--dur-fast)', base: 'var(--dur-base)', reveal: 'var(--dur-reveal)', image: 'var(--dur-image)' },
      transitionTimingFunction: { 'out-soft': 'var(--ease-out)' },
      keyframes: {
        'fade-down': { from: { opacity: '0', transform: 'translateY(-6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: { 'fade-down': 'fade-down var(--dur-base) var(--ease-out)' },
    },
  },
  plugins: [],
};
export default config;
