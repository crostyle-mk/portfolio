import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Works", "About", "Contact"];

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        /* ── NAVBAR ── */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;
        }

        .navbar.scrolled {
          background: rgba(5, 5, 5, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .navbar:not(.scrolled) {
          background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%);
        }

        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── LOGO ── */
        .navbar-logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.68rem;
            font-weight: 500;
          color: #fff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          line-height: 1;
        }

        .navbar-logo span {
          color: rgba(255,255,255,0.45);
          font-weight: 400;
        }

        /* ── DESKTOP LINKS ── */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 40px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-links li a {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.25s ease;
        }

        .navbar-links li a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #fff;
          transition: width 0.3s ease;
        }

        .navbar-links li a:hover {
          color: #fff;
        }

        .navbar-links li a:hover::after {
          width: 100%;
        }

        /* ── HAMBURGER ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          cursor: pointer;
          gap: 5px;
          background: none;
          border: none;
          padding: 0;
          z-index: 110;
        }

        .hamburger-line {
          display: block;
          width: 24px;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.35s ease, opacity 0.35s ease, width 0.35s ease;
          transform-origin: center;
        }

        /* Animated X state */
        .hamburger.open .hamburger-line:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0;
          width: 0;
        }
        .hamburger.open .hamburger-line:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* ── MOBILE DRAWER ── */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          height: 100vh;
          background: rgba(5, 5, 5, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 105;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.77, 0, 0.18, 1);
          pointer-events: none;
        }

        .mobile-menu.open {
          transform: translateX(0);
          pointer-events: all;
        }

        .mobile-menu-links {
          list-style: none;
          margin: 0;
          padding: 0;
          text-align: center;
        }

        .mobile-menu-links li {
          overflow: hidden;
        }

        .mobile-menu-links li a {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 9vw, 4rem);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.12);
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: block;
          padding: 6px 0;
          transition: color 0.3s ease;
          -webkit-text-stroke: 1px rgba(255,255,255,0.5);
        }

        .mobile-menu-links li a:hover {
          color: #fff;
          -webkit-text-stroke: 0px transparent;
        }

        .mobile-menu-tagline {
          position: absolute;
          bottom: 40px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.25);
        }

        /* ── RESPONSIVE BREAKPOINTS ── */

        /* Tablet & Mobile: show hamburger, hide desktop links */
        @media (max-width: 768px) {
          .navbar-inner {
            padding: 0 24px;
          }

          .navbar-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }
        }

        /* Small mobile adjustments */
        @media (max-width: 380px) {
          .navbar-inner {
            padding: 0 18px;
            height: 60px;
          }

          .navbar-logo {
            font-size: 1.3rem;
          }
        }
        #impo{
            color: #fff;
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <a href="/" className="navbar-logo">
  crostyle <span id="impo">.mk</span>
</a>

          {/* Desktop Nav */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`${link.toLowerCase()}`}>{link}</a>   
              </li>
            ))}
          </ul>

          {/* Hamburger Button */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} role="dialog" aria-modal="true">
        <ul className="mobile-menu-links">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`${link.toLowerCase()}`}
                onClick={handleLinkClick}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <p className="mobile-menu-tagline">Visual Content Creator</p>
      </div>
    </>
  );
};

export default Navbar;