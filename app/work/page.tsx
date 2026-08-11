import type { Metadata } from "next";
import WorkGridClient from "@/components/WorkGridClient";
import { getProjects, getFilters } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product, food and jewellery photography commissions by Likhit Dixit.",
};

export default function WorkPage() {
  const projects = getProjects();
  const filters = getFilters();
  return (
    <section>
      <div className="wrap">
        <WorkGridClient projects={projects} filters={filters} />
      </div>
    </section>
  );
}
