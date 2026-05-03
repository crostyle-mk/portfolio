import React, { useEffect, useState } from "react";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Safe mobile detection (no window usage during initial render)
  useEffect(() => {
    const updateIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Scroll parallax only on desktop
  useEffect(() => {
    if (isMobile) return;

    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (typeof window !== "undefined") {
          setScrollY(window.scrollY);
        }
      });
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
          background: #000;
        }

        /* BACKGROUND CONTAINER */
        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .video-background video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.1); /* Slight zoom to prevent white edges during parallax */
          display: block;
        }

        .video-background img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.1);
          display: block;
        }

        /* DARK OVERLAY FOR READABILITY */
        .video-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(0,0,0,0) 20%, rgba(0,0,0,0.4) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
          z-index: 1;
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
          font-size: clamp(1.4rem, 5vw, 8rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          background: linear-gradient(to bottom, #ffffff 60%, #999999 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.1;
          text-shadow: 0 0 20px rgba(255,255,255,0.25); /* Soft glow (Option A) */
        }

        .role-title {
          font-size: clamp(0.7rem, 2vw, 1.8rem);
          font-weight: 200;
          letter-spacing: 0.5em;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          margin: 20px 0 40px;
        }

        .premium-badge {
          font-size: 0.75rem;
          letter-spacing: 0.8em;
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0.8;
        }

        .description-box {
          max-width: 500px;
          margin: 0 auto;
          font-size: 1rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }

        .luxury-cta {
          margin-top: 50px;
          display: inline-block;
          padding: 18px 40px;
          font-family: 'Syncopate', sans-serif;
          font-size: clamp(0.7rem, 0.1vw, 1rem);
          letter-spacing: 0.2em;
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          text-decoration: none;
          transition: all 0.4s ease;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(5px);
        }

        .luxury-cta:hover {
          background: white;
          color: black;
          letter-spacing: 0.3em;
        }

        @media (max-width: 768px) {
          .luxury-banner { min-height: 100svh; }
          .main-name { font-size: clamp(1.2rem, 8vw, 1.5rem); }
          .animate-up { animation: none !important; opacity: 1 !important; transform: none !important; }
          .role-title { letter-spacing: 0.3em; margin: 10px 0 20px; }
          .description-box { font-size: 0.8rem; max-width: 60%; }
          .luxury-cta { display: none; } /* Remove Explore Portfolio on mobile */
          .video-background video { transform: scale(1); }
        }
      `}</style>

      <section id="banner" className="luxury-banner">
        {/* VIDEO BACKGROUND CONTAINER */}
        <div
          className="video-background"
          style={{
            transform: isMobile ? "none" : `translate3d(0, ${scrollY * 0.4}px, 0)`
          }}
        >
          {isMobile ? (
            <>
              {/* Mobile image (public-assets-banner) */}
              <img
                src="/assets/banner-mobile.jpg" // your public-assets-banner image
                alt="Cinematic mobile background"
              />
              <div className="video-overlay"></div>
            </>
          ) : (
            <>
              <video autoPlay loop muted playsInline poster="/assets/fallback-image.jpg">
                <source src="assets/logo.mp4" type="video/mp4" />
              </video>
              {/* VIGNETTE OVERLAY */}
              <div className="video-overlay"></div>
            </>
          )}
        </div>

        <div className="content-wrapper">
          <div className="premium-badge animate-up">i am</div>

          <div className="animate-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="main-name">Mohammed Kareem</h1>
            <p className="role-title">photographer & videographer</p>
          </div>

          <div className="animate-up" style={{ animationDelay: "0.4s" }}>
            <p className="description-box">
              Dubai-based Visual Storyteller. Specializing in crafting high-end cinematic experiences.
            </p>
            <a href="#category" className="luxury-cta">EXPLORE PORTFOLIO</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
