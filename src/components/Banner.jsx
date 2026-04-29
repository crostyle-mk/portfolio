import React, { useEffect, useState } from "react";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return; // Disable scroll animation on mobile

    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Outfit:wght@200;400;600&display=swap');

        .luxury-banner {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: white;
          font-family: 'Outfit', sans-serif;
          will-change: transform;
          touch-action: pan-y;
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 5%;
          width: 100%;
        }

        .animate-up {
          opacity: 0;
          animation: fadeUp 1.2s ease-out forwards;
        }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .main-name {
          font-family: 'Syncopate', sans-serif;
          font-size: clamp(1.4rem, 6vw, 8rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          background: linear-gradient(to bottom, #ffffff 50%, #666666 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .role-title {
          font-size: clamp(0.7rem, 3vw, 2.2rem);
          font-weight: 200;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          margin: 15px 0 30px;
        }

        .premium-badge {
          font-size: clamp(0.5rem, 1.5vw, 1.5rem);
          letter-spacing: 0.5em;
          text-transform: uppercase;
          margin-bottom: 30px;
        }

        .description-box {
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.1rem;
          color: #94a3b8;
        }

        .luxury-cta {
          margin-top: 40px;
          display: inline-block;
          padding: 15px 35px;
          font-family: 'Syncopate', sans-serif;
          font-size: 0.65rem;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          text-decoration: none;
        }

        /* MOBILE OPTIMIZATION */
        @media (max-width: 768px) {
          .luxury-banner { min-height: 100dvh; }
          .animate-up { animation: none !important; opacity: 1 !important; transform: none !important; }
          .main-name { font-size: clamp(1.2rem, 8vw, 1.5rem); }
          .role-title { font-size: clamp(0.7rem, 4vw, 0.05rem); }
          .description-box { font-size: 0.85rem; max-width: 85%; }
        }
      `}</style>

      <section
        id="banner"
        className="luxury-banner"
        style={{
          transform: isMobile
            ? "none"
            : `translate3d(0, ${scrollY * 0.25}px, 0)`
        }}
      >
        <div className="content-wrapper">
          <div className="premium-badge animate-up">i am</div>

          <div className="animate-up">
            <h1 className="main-name">Mohammed Kareem</h1>
            <p className="role-title">photographer & videographer</p>
          </div>

          <div className="animate-up">
            <p className="description-box">
              Dubai-based Photographer & Videographer. Crafting cinematic visuals.
            </p>
            <a href="#category" className="luxury-cta">VIEW WORK —</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
