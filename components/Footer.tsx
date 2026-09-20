import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="big">
            Have something worth photographing well?{" "} <br />
            <Link href="/contact" className="foot-cta">
              Start a project →
            </Link>
          </div>
          <div className="links">
            <Link href="/work">Work</Link>
            <Link href="/studio">About</Link>
            <Link href="/contact">Contact</Link>
            <a href="mailto:likhitdixit@gmail.com">likhitdixit@gmail.com</a>
            <a href="https://instagram.com/likhitdixit" target="_blank" rel="noreferrer">
              @likhitdixit
            </a>
          </div>
        </div>
        <div className="foot-base">
          <span>© {new Date().getFullYear()} Likhit Dixit Studio</span>
          <span>Product &amp; Food Photography — Mumbai</span>
          <span>Made with ❤️ by Nidhi.</span>
        </div>
      </div>
    </footer>
  );
}
