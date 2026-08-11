import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjects, getProject, nextProject } from "@/lib/gallery";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    openGraph: {
      title: p.name,
      description: p.summary,
      images: p.cover ? [{ url: p.cover }] : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const next = nextProject(slug);

  return (
    <>
      <div className="wrap proj-top">
        <Link href="/work" className="backlink">
          ← Back to work
        </Link>

        <div className="proj-head">
          <div className="ttl">
            <span className="lab">{p.tags.join(" · ")}</span>
            <h1>{p.name}</h1>
          </div>
          {(p.client || p.year) && (
            <div className="sm">
              {p.client}
              {p.year ? ` — ${p.year}` : ""}
            </div>
          )}
        </div>

        <div className="proj-meta">
          {p.client && (
            <dl>
              <dt>Client</dt>
              <dd>{p.client}</dd>
            </dl>
          )}
          {p.services && (
            <dl>
              <dt>Services</dt>
              <dd>{p.services}</dd>
            </dl>
          )}
          {p.year && (
            <dl>
              <dt>Year</dt>
              <dd>{p.year}</dd>
            </dl>
          )}
          {p.deliverables && (
            <dl>
              <dt>Deliverables</dt>
              <dd>{p.deliverables}</dd>
            </dl>
          )}
          {p.summary && <p className="proj-summary">{p.summary}</p>}
        </div>
      </div>

      <div className="wrap">
        <div className="gallery">
          {p.images.map((im, i) => (
            <div key={im.src} className={`gallery-item ${i === 0 ? "lead" : ""}`}>
              <Image
                src={im.src}
                alt={im.alt}
                width={im.width}
                height={im.height}
                sizes={i === 0 ? "(max-width: 880px) 100vw, 1240px" : "(max-width: 880px) 100vw, 620px"}
                priority={i === 0}
                className="gal-photo"
              />
            </div>
          ))}
        </div>

        {p.approach && (
          <div className="proj-note">
            <span className="lab k">Approach</span>
            <p className="p" dangerouslySetInnerHTML={{ __html: p.approach }} />
          </div>
        )}

        <Link className="next" href={`/work/${next.slug}`}>
          <span className="k">Next project</span>
          <span className="t">{next.name}</span>
        </Link>
      </div>
    </>
  );
}
