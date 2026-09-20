import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import { CLIENT_META, FILTER_ORDER } from "@/content/clients";
import type { GalleryImage, Project } from "@/lib/types";

const WORK_DIR = path.join(process.cwd(), "public", "work");
const IMG_RE = /\.(jpe?g|png|webp|avif)$/i;

const titleCase = (s: string) =>
  s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function readImages(slug: string, alt: string): GalleryImage[] {
  const dir = path.join(WORK_DIR, slug);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => IMG_RE.test(f)).sort();
  } catch {
    return [];
  }
  return files.map((f) => {
    const buf = fs.readFileSync(path.join(dir, f));
    const dim = sizeOf(buf);
    return {
      src: `/work/${slug}/${f}`,
      width: dim.width ?? 1600,
      height: dim.height ?? 1200,
      alt,
    };
  });
}

let cache: Project[] | null = null;

/** Reads every folder in /public/work and builds the project list at build time. */
export function getProjects(): Project[] {
  if (cache) return cache;

  let slugs: string[] = [];
  try {
    slugs = fs
      .readdirSync(WORK_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    slugs = [];
  }

  const projects = slugs
    .map((slug) => {
      const meta = CLIENT_META[slug] ?? { name: titleCase(slug), cat: "Work", tags: ["Work"] };
      const name = meta.name ?? titleCase(slug);
      const alt = `${name} — ${(meta.cat ?? "work").toLowerCase()} photography by Likhit Dixit`;
      const images = readImages(slug, alt);
      return {
        slug,
        name,
        cat: meta.cat ?? "Work",
        tags: meta.tags ?? ["Work"],
        order: meta.order ?? 999,
        client: name,
        year: meta.year,
        services: meta.services,
        deliverables: meta.deliverables,
        summary: meta.summary,
        approach: meta.approach,
        cover: images[0]?.src ?? "",
        images,
      } as Project;
    })
    .filter((p) => p.images.length > 0)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

  cache = projects;
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const ps = getProjects();
  const i = ps.findIndex((p) => p.slug === slug);
  return ps[(i + 1) % ps.length];
}

export function prevProject(slug: string): Project {
  const ps = getProjects();
  const i = ps.findIndex((p) => p.slug === slug);
  return ps[(i - 1 + ps.length) % ps.length];
}

export function getFilters(): string[] {
  const tags = new Set<string>();
  getProjects().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  const ordered = FILTER_ORDER.filter((t) => tags.has(t));
  const extras = [...tags].filter((t) => !FILTER_ORDER.includes(t));
  return [...ordered, ...extras, "All"];
}
