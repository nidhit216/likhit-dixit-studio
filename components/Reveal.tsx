"use client";

import * as React from "react";

/**
 * Drives the scroll-reveal effect. Elements already in view on mount (e.g.
 * above-the-fold content, or content revisited via client navigation) are
 * shown immediately via useLayoutEffect, before the browser's first paint —
 * so there's no flash of invisible content. Anything below the fold still
 * fades in via IntersectionObserver as the user scrolls to it.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(delay = 0) {
  const ref = React.useRef<T | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return {
    ref,
    className: `reveal ${shown ? "in" : ""}`.trim(),
    style: delay ? { transitionDelay: `${delay}ms` } : undefined,
  };
}

type Props = {
  children: React.ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

export default function Reveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const { ref, className: revealClass, style } = useReveal(delay);

  return React.createElement(
    as,
    { ref, className: `${revealClass} ${className}`.trim(), style },
    children
  );
}
