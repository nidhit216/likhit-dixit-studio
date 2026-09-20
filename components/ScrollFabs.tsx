"use client";

import { useEffect, useState } from "react";

/**
 * Floating bottom-right arrows: "back to top", and (when `downTargetId` is
 * given) "jump to more images". Both stay hidden until the viewer scrolls
 * past the hero; the down arrow hides again once its target is in view so
 * it doesn't sit on top of the prev/next row.
 */
export default function ScrollFabs({ downTargetId }: { downTargetId?: string }) {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const target = downTargetId ? document.getElementById(downTargetId) : null;

    let ticking = false;
    const update = () => {
      ticking = false;
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      setShowUp(pastHero);
      if (target) {
        const targetInView = target.getBoundingClientRect().top < window.innerHeight;
        setShowDown(pastHero && !targetInView);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [downTargetId]);

  return (
    <div className="scroll-fab-group">
      {downTargetId && (
        <a
          href={`#${downTargetId}`}
          className={`scroll-fab down${showDown ? " show" : ""}`}
          aria-label="Scroll to see more"
        >
          <span />
        </a>
      )}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`scroll-fab up${showUp ? " show" : ""}`}
        aria-label="Back to top"
      >
        <span />
      </button>
    </div>
  );
}
