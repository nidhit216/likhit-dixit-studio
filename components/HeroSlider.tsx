"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string };

/**
 * Auto-advancing crossfade slider for the homepage hero. No controls or
 * index dots — it just cycles on a timer, and holds on the first slide for
 * anyone with prefers-reduced-motion.
 */
export default function HeroSlider({
  slides,
  intervalMs = 3000,
}: {
  slides: Slide[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <>
      {slides.map((s, i) => (
        <div key={s.src} className={`hero-slide ${i === index ? "in" : ""}`}>
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            className="photo-img"
          />
        </div>
      ))}
    </>
  );
}
