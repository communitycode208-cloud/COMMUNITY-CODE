import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="container-main pt-3 md:pt-5">
        <nav className="site-navbar flex min-h-16 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:px-6">
          {/* ===================================================== */}
          {/* LOGO */}
          {/* ===================================================== */}

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b1b3a] text-lg font-bold text-white">
              {"</>"}
            </div>

            <div className="leading-none">
              <div className="font-extrabold tracking-tight text-[#0b1b3a]">
                Community <span className="text-[#1761dc]">Code</span>
              </div>

              <div className="mt-1 text-[9px] text-slate-400">
                LEARN • BUILD • GROW
              </div>
            </div>
          </Link>

          {/* ===================================================== */}
          {/* DESKTOP NAVIGATION */}
          {/* ===================================================== */}

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `nav-link relative py-3 text-[15px] font-semibold transition-colors ${
                    isActive
                      ? "nav-link-active text-[#1761dc]"
                      : "text-slate-600 hover:text-[#1761dc]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* ===================================================== */}
          {/* ACTIONS */}
          {/* ===================================================== */}

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden text-sm font-semibold text-[#0b1b3a] transition-colors hover:text-[#1761dc] sm:block"
            >
              Login
            </Link>

            <Link to="/courses">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="button-primary hidden sm:flex"
              >
                Start Learning
                <ArrowRight size={15} />
              </motion.div>
            </Link>

            {/* Mobile menu button */}

            <button
              type="button"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#0b1b3a] transition-colors hover:bg-blue-50 hover:text-[#1761dc] md:hidden"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </nav>

        {/* ===================================================== */}
        {/* MOBILE MENU */}
        {/* ===================================================== */}

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="site-navbar mt-2 rounded-xl border border-slate-200 bg-white p-2 md:hidden"
          >
            <div className="grid gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-l-4 border-[#1761dc] bg-blue-50 pl-3 text-[#1761dc]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#1761dc]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <Link
              to="/courses"
              onClick={() => setMenuOpen(false)}
              className="button-primary mt-2 w-full rounded-lg"
            >
              Start Learning
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}
