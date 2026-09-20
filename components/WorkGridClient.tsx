"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types";

export default function WorkGridClient({
  projects,
  filters,
}: {
  projects: Project[];
  filters: string[];
}) {
  const [active, setActive] = useState<string>(filters[0] ?? "All");

  const list = useMemo(
    () => projects.filter((p) => active === "All" || p.tags.includes(active)),
    [projects, active]
  );

  return (
    <>
      <div className="filters">
        {filters.map((f) => (
          <button key={f} className={active === f ? "on" : ""} onClick={() => setActive(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid">
        {list.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            span={i % 2 === 0 ? "c1" : "c2"}
            delay={Math.min(i, 5) * 60}
          />
        ))}
      </div>
    </>
  );
}
