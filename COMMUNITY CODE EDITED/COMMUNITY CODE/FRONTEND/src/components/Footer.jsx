import { ArrowUpRight, Code2, Mail } from "lucide-react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer page-section bg-[#081630] text-white">
      <div className="container-main">
        <div className="footer-accent" />

        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#0b1b3a] shadow-lg shadow-blue-950/20">
                &lt;/&gt;
              </span>

              <span className="text-xl font-extrabold tracking-tight">
                Community <span className="text-blue-400">Code</span>
              </span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
              Practical programming sessions for people who want to understand,
              build and keep growing.
            </p>

            <div className="footer-tagline mt-7">
              <Code2 size={15} />
              <span>Learn • Build • Grow</span>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <p className="footer-label">Explore</p>

              <div className="mt-5 grid gap-3 text-sm text-white/65">
                <Link
                  to="/courses"
                  className="transition-colors hover:text-white"
                >
                  Courses
                </Link>
                <Link
                  to="/pricing"
                  className="transition-colors hover:text-white"
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  className="transition-colors hover:text-white"
                >
                  About us
                </Link>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <p className="footer-label">Stay connected</p>

              <a
                href="mailto:hello@communitycode.dev"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition-colors hover:text-white"
              >
                <Mail size={16} />
                hello@communitycode.dev
                <ArrowUpRight size={15} />
              </a>

              <p className="mt-4 max-w-xs text-sm leading-7 text-white/45">
                Have a question? We would love to hear from you.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-12 border-t border-white/10 pt-7 text-center text-sm text-white/45">
          <span>© 2026 Community Code</span>
          <span className="inline-flex items-center gap-2">
            <Code2 size={14} />
            Learn by building.
          </span>
        </div>
      </div>
    </footer>
  );
}
