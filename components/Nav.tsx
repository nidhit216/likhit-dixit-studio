"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/work" ? pathname.startsWith("/work") : pathname === href;

  return (
    <>
      <nav>
        <div className="wrap">
          <Link href="/" className="mark" aria-label="Likhit Dixit — home">
            LIKHIT DIXIT<span className="dot-mark">.</span>
          </Link>
          <div className="navlinks">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : ""}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="navright">
            <span className="dot" aria-hidden="true" />
            Mumbai / Remote
          </div>
          <button
            className={`burger ${open ? "open" : ""}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <Link href="/">Home</Link>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
