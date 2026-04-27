import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Links updated: Removed 'About', renamed 'Contact' to 'Connect'
  const navLinks = [
    { name: "Home", target: "#top"},
    { name: "Works", target: "#category" },
    { name: "About", target: "#about" },
    { name: "Contact", target: "#contact" },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fix: Prevent background scrolling when menu is open and handle "back" logic
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <style>{`
html {
  scroll-behavior: smooth;
}

/* Disable parallax transforms on low-end devices */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

        /* ── NAVBAR ── */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          transition: background 0.4s ease, backdrop-filter 0.4s ease;
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
          max-width: 1500px;
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
          font-size: 0.70rem;
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
        }

        .navbar-logo span {
          color: #fff;
          font-weight: 400;
        }

        /* ── DESKTOP LINKS ── */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 40px;
          list-style: none;
        }

        .navbar-links li {
  position: relative;
}

        .navbar-links li a {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(0.7rem, 3vw, 0.03rem); 
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.25s ease;
          transition: color 0.3s ease;
  padding: 4px 0;
        }

        .navbar-links li a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background-color: #fff;
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
          gap: 5px;
          background: none;
          border: none;
          z-index: 110;
        }

        .hamburger-line {
          width: 24px;
          height: 1.5px;
          background: #fff;
          transition: 0.35s ease;
        }

        .hamburger.open .hamburger-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open .hamburger-line:nth-child(2) { opacity: 0; }
        .hamburger.open .hamburger-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          height: 100vh;
          background: #050505;
          z-index: 105;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.77, 0, 0.18, 1);
        }

        .mobile-menu.open { transform: translateX(0); }

        .mobile-menu-links { list-style: none; text-align: center; padding: 0; }

        .mobile-menu-links li a {
          /* Fixed Font: Changed from Garamond to Montserrat */
          font-family: 'Montserrat', sans-serif;
          font-size: 2rem;
          font-weight: 400;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          display: block;
          padding: 15px 0;
        }

        @media (max-width: 768px) {
          .navbar-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#banner" className="navbar-logo">
            crostyle <span>.mk</span>
          </a>

          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.target}>{link.name}</a>
              </li>
            ))}
          </ul>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul className="mobile-menu-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.target} onClick={handleLinkClick}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;