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
  const [active, setActive] = useState<string>("All");

  const list = useMemo(
    () => projects.filter((p) => active === "All" || p.tags.includes(active)),
    [projects, active]
  );

  return (
    <>
      <div className="hd">
        <h2>Work</h2>
        <span className="lab">
          {list.length} project{list.length !== 1 ? "s" : ""}
        </span>
      </div>

      <p className="work-intro">
        Product, food and jewellery photography for brands that care how they look. Filter by category below.
      </p>

      <div className="filters">
        {filters.map((f) => (
          <button key={f} className={active === f ? "on" : ""} onClick={() => setActive(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid">
        {list.map((p, i) => {
          const lastOdd = i === list.length - 1 && list.length % 2 === 1;
          let span: string;
          if (lastOdd) {
            span = "wide cfull";
          } else {
            const reversedRow = Math.floor(i / 2) % 2 === 1;
            const first = i % 2 === 0;
            span = reversedRow ? (first ? "c6" : "c5") : first ? "c1" : "c2";
          }
          return (
            <ProjectCard
              key={p.slug}
              project={p}
              span={span}
              delay={Math.min(i, 5) * 60}
            />
          );
        })}
      </div>
    </>
  );
}
