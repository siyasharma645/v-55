'use client';

/** Home: on the homepage it smooth-scrolls to the very top (instant for reduced-motion users); elsewhere it is a normal link to "/". */
export function HomeLink({ className, children, onNavigate, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { onNavigate?: () => void }) {
  return (
    <a
      href="/"
      className={className}
      {...rest}
      onClick={(e) => {
        onNavigate?.();
        if (window.location.pathname !== '/') return;
        e.preventDefault();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
      }}
    >
      {children}
    </a>
  );
}
