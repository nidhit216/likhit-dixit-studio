"use client";

import Link from "next/link";
import Photo from "./Photo";
import { useReveal } from "./Reveal";
import type { Project } from "@/lib/types";

type Props = {
  project: Project;
  /** override the grid span classes (used by the Work page) */
  span?: string;
  sizes?: string;
  /** stagger delay in ms, for a cascading reveal across a grid */
  delay?: number;
};

export default function ProjectCard({ project, span, sizes, delay = 0 }: Props) {
  const cls = span ?? "c1";
  const { ref, className, style } = useReveal<HTMLAnchorElement>(delay);
  return (
    <Link
      ref={ref}
      href={`/work/${project.slug}`}
      className={`cell ${cls} ${className}`.trim()}
      style={style}
    >
      <div className="ph card-img">
        <Photo
          src={project.cover}
          alt={`${project.name} — ${project.cat.toLowerCase()} photography by Likhit Dixit`}
          sizes={sizes ?? "(max-width: 880px) 100vw, 50vw"}
        />
      </div>
      <div className="cap">
        <b>{project.name}</b>
        <span className="cat">{project.cat}</span>
        <span className="arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
