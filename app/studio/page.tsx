import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "About Likhit Dixit — a one-person product and food photography studio in Mumbai, working with brands and restaurants worldwide.",
};

export default function StudioPage() {
  return (
    <div className="wrap">
      <div className="studio-hero">
        <Reveal as="h1">
          I photograph a small number of things{" "}
          <span className="slate">extremely well</span> — so a single frame can carry a whole brand.
        </Reveal>
        <Reveal className="sm">
          Likhit Dixit is a product &amp; food photographer based in Mumbai, working with brands and
          restaurants worldwide.
        </Reveal>
      </div>

      <div className="studio-body">
        <Reveal className="portrait">
          <div className="ph portrait-img">
            {/* Replace public/about/headshot.jpg with a real photo of Likhit */}
            <Photo
              src="/about/headshot.jpg"
              alt="Likhit Dixit, photographer"
              sizes="(max-width: 880px) 100vw, 40vw"
            />
          </div>
        </Reveal>

        <Reveal className="bio">
          <p>
            <b>I run a one-person studio</b> for brands, e-commerce teams and restaurants who care
            how their product looks in the frame — and want a consistent, editorial hand behind
            every image.
          </p>
          <p>
            The work sits where still life meets commerce: clean light, considered composition, and
            a grade that stays coherent across an entire catalogue or campaign. Small roster, close
            collaboration, images that hold up in print and on screen.
          </p>

          <div style={{ marginTop: 34 }}>
            <span className="lab">Services</span>
          </div>
          <div className="rows" style={{ marginTop: 14 }}>
            <Row n="01" t="Product & still life" d="Studio" />
            <Row n="02" t="Food & tabletop" d="Studio / On-site" />
            <Row n="03" t="Campaign & editorial" d="With art direction" />
            <Row n="04" t="E-commerce catalogue" d="Volume · one grade" />
          </div>

          <div style={{ marginTop: 40 }}>
            <span className="lab">How a project runs</span>
          </div>
          <div className="rows">
            <Row n="01" t="Brief & references" d="Week 1" />
            <Row n="02" t="Test & look" d="Week 1–2" />
            <Row n="03" t="Shoot" d="1–3 days" />
            <Row n="04" t="Edit & delivery" d="Week 3" />
          </div>

          <div style={{ marginTop: 40 }}>
            <span className="lab">Selected clients</span>
          </div>
          <div className="clients">
            <span>Tanishq</span>
            <span>Genki Cafe</span>
            <span>Spoon Me</span>
            <span>Royal Dairy Farm</span>
            <span>DHC</span>
          </div>
        </Reveal>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}

function Row({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="r-row">
      <span className="n">{n}</span>
      <span className="t">{t}</span>
      <span className="d">{d}</span>
    </div>
  );
}
