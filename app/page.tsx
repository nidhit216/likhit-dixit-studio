import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import Photo from "@/components/Photo";
import { getProjects } from "@/lib/gallery";

export default function HomePage() {
  const projects = getProjects();
  const selected = projects.slice(0, 4);

  return (
    <>
      <header className="hero-full">
        <div className="ph hero-full-media">
          <Photo
            src="/work/tanishq/01-bangles.jpg"
            alt="Engraved gold bangles for Tanishq — jewellery photography by Likhit Dixit"
            sizes="100vw"
            priority
          />
          <div className="hero-full-scrim" />

          <div className="hero-full-copy wrap">
            <Reveal>
              <span className="lab hero-full-eyebrow">Studio Practice</span>
              <h1>Details worth remembering</h1>
              <p className="hero-full-sub">
                <em>Thoughtfully seen. Beautifully captured.</em>
              </p>
            </Reveal>
            <Reveal delay={120} className="hero-full-cta">
              <Link href="/work">View work →</Link>
            </Reveal>
          </div>

          <a href="#selected-work" className="scroll-cue" aria-label="Scroll to selected work">
            <span />
          </a>
        </div>
      </header>

      <section id="selected-work">
        <div className="wrap">
          <Reveal className="hd">
            <h2>Selected Work</h2>
            <span className="lab">Index — {String(projects.length).padStart(2, "0")} projects</span>
          </Reveal>
          <div className="grid">
            {selected.map((p, i) => {
              const spans = ["c1", "c2", "c3 short", "c4 wide"];
              return (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  span={spans[i] ?? "c1"}
                  delay={i * 70}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <Reveal className="l">
            <span className="lab">The Studio</span>
            <p className="big">
              A small practice that photographs{" "}
              <span className="slate">a few things exceptionally well</span> — surface, light and
              shape.
            </p>
          </Reveal>
          <Reveal className="r">
            <div className="rows">
              <div className="r-row"><span className="n">01</span><span className="t">Product &amp; still life</span></div>
              <div className="r-row"><span className="n">02</span><span className="t">Food &amp; tabletop</span></div>
              <div className="r-row"><span className="n">03</span><span className="t">Campaign &amp; editorial</span></div>
              <div className="r-row"><span className="n">04</span><span className="t">E-commerce catalogue</span></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
