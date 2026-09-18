import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a product or food photography project with Likhit Dixit.",
};

export default function ContactPage() {
  return (
    <div className="wrap contact-grid">
      <div className="contact-left">
        <Reveal as="h1">
          Let&apos;s put your product in <span className="slate">the right light.</span>
        </Reveal>
        <Reveal delay={80}>
          <p>
            Tell me a little about the work. I take on a small number of projects each month, so the
            more detail the better.
          </p>
        </Reveal>
        <Reveal className="contact-details" delay={160}>
          <div>
            <b>Email</b>
            <a href="mailto:likhitdixit@gmail.com">likhitdixit@gmail.com</a>
          </div>
          <div>
            <b>Based in</b>
            <span>Mumbai, India · Remote worldwide</span>
          </div>
          <div>
            <b>Instagram</b>
            <a href="https://instagram.com/likhitdixit" target="_blank" rel="noreferrer">
              @likhitdixit
            </a>
          </div>
        </Reveal>
      </div>

      <ContactForm />

      <div style={{ height: 80, gridColumn: "1 / -1" }} />
    </div>
  );
}
