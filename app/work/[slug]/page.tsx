import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import ScrollFabs from "@/components/ScrollFabs";
import { getProjects, getProject, nextProject, prevProject } from "@/lib/gallery";

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
  const prev = prevProject(slug);

  const rest = p.images.slice(1);
  const duo = rest.slice(0, 2);
  const gallery = rest.slice(2);

  return (
    <>
      {/* 1. Intro — first two images + summary statement */}
      <div className="wrap proj-top">
        {duo.length > 0 && (
          <div className="proj-duo">
            {duo.map((im) => (
              <div key={im.src} className="ph">
                <Photo src={im.src} alt={im.alt} sizes="(max-width: 880px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        )}

        {p.summary && (
          <div className="proj-meta">
            <p className="proj-summary">{p.summary}</p>
          </div>
        )}

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
        </div>

        {p.approach && (
          <div className="proj-note">
            <span className="lab k">Approach</span>
            <p className="p" dangerouslySetInnerHTML={{ __html: p.approach }} />
          </div>
        )}
      </div>

      {/* 2. Hero image */}
      <div className="ph hero-full-media">
        <Photo
          src={p.cover}
          alt={`${p.name} — cover, ${p.cat.toLowerCase()} photography by Likhit Dixit`}
          sizes="100vw"
          priority
        />
        <div className="hero-full-scrim" />

        <div className="hero-full-copy proj wrap">
          <div>
            <span className="lab hero-full-eyebrow">{p.tags.join(" · ")}</span>
            <h1>{p.name}</h1>
            {(p.client || p.year) && (
              <p className="hero-full-sub">
                {p.client}
                {p.year ? ` — ${p.year}` : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      <ScrollFabs downTargetId={gallery.length > 0 ? "proj-nav" : undefined} />

      {/* 3. Remaining images */}
      <div className="wrap">
        {gallery.length > 0 && (
          <div className="gallery">
            {gallery.map((im) => (
              <div key={im.src} className="gallery-item">
                <Image
                  src={im.src}
                  alt={im.alt}
                  width={im.width}
                  height={im.height}
                  sizes="(max-width: 880px) 100vw, 620px"
                  className="gal-photo"
                />
              </div>
            ))}
          </div>
        )}

        <div id="proj-nav" className="proj-nav">
          <Link className="prev" href={`/work/${prev.slug}`}>
            <span className="arrow">&larr;</span>
            <span className="col">
              <span className="k">Previous</span>
              <span className="t">{prev.name}</span>
            </span>
          </Link>
          <Link className="next" href={`/work/${next.slug}`}>
            <span className="col">
              <span className="k">Next project</span>
              <span className="t">{next.name}</span>
            </span>
            <span className="arrow">&rarr;</span>
          </Link>
        </div>
      </div>
    </>
  );
}
