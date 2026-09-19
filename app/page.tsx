import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroSlider from "@/components/HeroSlider";

const HERO_SLIDES = [
  { src: "/work/tanishq/01-bangles.jpg", alt: "Engraved gold bangles for Tanishq — jewellery photography by Likhit Dixit" },
  { src: "/work/genki-cafe/01-tray.jpg", alt: "Smoothie bowl and healthy plate for Genki Cafe — food photography by Likhit Dixit" },
  { src: "/work/spoon-me/01-plates.jpg", alt: "Dessert plating for Spoon Me — food photography by Likhit Dixit" },
  { src: "/work/royal-dairy/01-jalebi.jpg", alt: "Jalebi sweets for Royal Dairy Farm — product photography by Likhit Dixit" },
  { src: "/work/dhc/01-row.jpg", alt: "Milkshake flight for DHC — beverage photography by Likhit Dixit" },
  { src: "/work/tanishq/02-earrings.jpg", alt: "Gold earrings for Tanishq — jewellery photography by Likhit Dixit" },
];

export default function HomePage() {
  return (
    <>
      <header className="hero-full">
        <div className="ph hero-full-media">
          <HeroSlider slides={HERO_SLIDES} />
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

          <a href="#studio-teaser" className="scroll-cue" aria-label="Scroll to the studio">
            <span />
          </a>
        </div>
      </header>

      <section id="studio-teaser">
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
