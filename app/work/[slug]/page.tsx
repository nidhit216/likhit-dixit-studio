import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
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

  const gallery = p.images.slice(1);

  return (
    <>
      <div className="ph hero-full-media">
        <Photo
          src={p.cover}
          alt={`${p.name} — cover, ${p.cat.toLowerCase()} photography by Likhit Dixit`}
          sizes="100vw"
          priority
        />
        <div className="hero-full-scrim" />

        <div className="wrap proj-hero-top">
          <Link href="/work" className="proj-back">
            ← Back to work
          </Link>
        </div>

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

        <a href="#proj-content" className="scroll-cue" aria-label="Scroll to project details">
          <span />
        </a>
      </div>

      <div id="proj-content" className="wrap proj-top">
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
