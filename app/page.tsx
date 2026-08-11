import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import Photo from "@/components/Photo";
import { getProjects } from "@/lib/gallery";

export default function HomePage() {
  const projects = getProjects();
  const selected = projects.slice(0, 4);

  return (
    <>
      <header className="hero wrap">
        <div className="hero-grid">
          <Reveal as="h1">
            Product &amp; food
            <br />
            photography, built
            <br />
            on <span className="slate">precision.</span>
          </Reveal>

          <Reveal className="meta">
            <span className="lab">Studio Practice</span>
            <p>Clean, consistent, considered frames for brands that sell on how things look.</p>
          </Reveal>

          <Reveal className="measure">
            <span>Product · Food · Still Life</span>
            <span>Est. 2019</span>
            <span>Mumbai / Remote</span>
          </Reveal>

          <Reveal className="ph lead-img">
            <Photo
              src="/work/tanishq/01-bangles.jpg"
              alt="Engraved gold bangles for Tanishq — jewellery photography by Likhit Dixit"
              sizes="100vw"
              priority
            />
            <span className="tag">Tanishq Jewellery — 2025</span>
          </Reveal>
        </div>
      </header>

      <section>
        <div className="wrap">
          <Reveal className="hd">
            <h2>Selected Work</h2>
            <span className="lab">Index — {String(projects.length).padStart(2, "0")} projects</span>
          </Reveal>
          <div className="grid">
            {selected.map((p, i) => {
              const spans = ["c1", "c2", "c3 short", "c4 wide"];
              return <ProjectCard key={p.slug} project={p} span={spans[i] ?? "c1"} />;
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
              <div className="r-row"><span className="n">01</span><span className="t">Product &amp; still life</span><span className="d">Studio</span></div>
              <div className="r-row"><span className="n">02</span><span className="t">Food &amp; tabletop</span><span className="d">Studio / On-site</span></div>
              <div className="r-row"><span className="n">03</span><span className="t">Campaign &amp; editorial</span><span className="d">Art direction</span></div>
              <div className="r-row"><span className="n">04</span><span className="t">E-commerce catalogue</span><span className="d">Volume · one grade</span></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
