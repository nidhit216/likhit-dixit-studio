import Link from "next/link";
import Photo from "./Photo";
import type { Project } from "@/lib/types";

type Props = {
  project: Project;
  /** override the grid span classes (used by the Work page) */
  span?: string;
  sizes?: string;
};

export default function ProjectCard({ project, span, sizes }: Props) {
  const cls = span ?? "c1";
  return (
    <Link href={`/work/${project.slug}`} className={`cell ${cls}`}>
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
