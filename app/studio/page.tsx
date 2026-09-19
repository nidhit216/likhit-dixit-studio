import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { getProjects } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "About Likhit Dixit — a one-person product and food photography studio in Mumbai, working with brands and restaurants worldwide.",
};

export default function StudioPage() {
  const projects = getProjects();

  return (
    <div className="wrap">
      <div className="studio-split">
        <Reveal className="studio-left">
          <div className="ph portrait-img">
            {/* Replace public/about/headshot.jpg with a real photo of Likhit */}
            <Photo
              src="/about/headshot.jpg"
              alt="Likhit Dixit, photographer"
              sizes="(max-width: 880px) 100vw, 40vw"
            />
          </div>
          <p className="studio-caption">
            Likhit Dixit is a product &amp; food photographer based in Mumbai, working with brands and
            restaurants worldwide.
          </p>
        </Reveal>

        <Reveal className="studio-right" delay={120}>
          <h1>
            Every brand has something worth noticing. <br/> I'm here to find it, <span className="slate">capture it</span> and make it memorable.{" "}
          </h1>
          <p>
            I work closely with a select number of brands, creating images that feel considered, distinctive, and true to what they're building.
          </p>
          <p>
            My approach is simple: thoughtful composition, beautiful light, and an eye for the details that make something worth noticing. Whether it’s a single hero image or an entire campaign, I care about creating work that feels cohesive, timeless, and unmistakably yours.
          </p>
          <div style={{ marginTop: 34 }}>
            <span className="lab">Services</span>
          </div>
          <div className="clients" style={{ marginTop: 14 }}>
            <span>Product &amp; still life</span>
            <span>Food &amp; tabletop</span>
            <span>Campaign &amp; editorial</span>
            <span>E-commerce catalogue</span>
          </div>

          <div style={{ marginTop: 40 }}>
            <span className="lab">Selected clients</span>
          </div>
          <div className="clients">
            {projects.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`}>
                {p.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}
