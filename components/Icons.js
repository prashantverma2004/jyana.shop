const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.2 };

const paths = {
  drop: <><path d="M12 3.5c3 4 6 7.4 6 10.8A6 6 0 0 1 6 14.3C6 10.9 9 7.5 12 3.5Z" /><path d="M9.2 14.6a2.9 2.9 0 0 0 2.6 2.6" /></>,
  leaf: <><path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z" /><path d="M5 19 14 10" /><path d="M9.5 14.5h3.5M11.8 12.2v-3" /></>,
  shield: <><path d="M12 3.5 19 6v5.6c0 4.3-2.9 7.5-7 8.9-4.1-1.4-7-4.6-7-8.9V6l7-2.5Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" /></>,
  bottle: <><rect x="8" y="2.5" width="8" height="6.5" rx="1" /><rect x="7" y="9" width="10" height="12.5" rx="1.5" /><path d="M10 14h4" /></>,
  bag: <><path d="M5 8h14l-1.2 12.5H6.2L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>
};

export function Icon({ name, className, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...P} className={className} aria-hidden="true" {...rest}>
      {paths[name] || paths.leaf}
    </svg>
  );
}

export const Arrow = () => (
  <svg className="arrow" width="16" height="10" viewBox="0 0 16 10" {...P} aria-hidden="true"><path d="M0 5h14.5M10.5 1l4 4-4 4" /></svg>
);

export const Close = () => (
  <svg viewBox="0 0 18 18" {...P} aria-hidden="true"><path d="M2 2l14 14M16 2 2 16" /></svg>
);

export const ChevronLeft = () => (
  <svg viewBox="0 0 16 16" {...P} aria-hidden="true"><path d="M10 2 4 8l6 6" /></svg>
);

export const ChevronRight = () => (
  <svg viewBox="0 0 16 16" {...P} aria-hidden="true"><path d="m6 2 6 6-6 6" /></svg>
);
