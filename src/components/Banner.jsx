import React, { useEffect, useState } from "react";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Outfit:wght@200;400;600&display=swap');

        .luxury-banner {
          position: relative;
          background: #050505;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: white;
          font-family: 'Outfit', sans-serif;
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
          animation: revealSlowly 1.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        @keyframes revealSlowly {
          0% { opacity: 0; transform: translateY(80px); filter: blur(15px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        /* --- DESKTOP (LOCKED) --- */
        .main-name {
          font-family: 'Syncopate', sans-serif;
           font-size: clamp(1.4rem, 6vw, 8rem);
          font-weight: 600;
          white-space: nowrap;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
          text-transform: uppercase;
          background: linear-gradient(to bottom, #ffffff 40%, #666666 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation-delay: 0.6s;
        }

        .role-title {
          font-family: 'Outfit', sans-serif;
           font-size: clamp(0.7rem, 3vw, 2.2rem);
          font-weight: 200;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          margin: 15px 0 30px;
          white-space: nowrap;
          animation-delay: 0.9s;
        }

        .premium-badge {
          font-size: clamp(0.7rem, 1.5vw, 3rem);
          letter-spacing: 0.5em;
          color: #a855f7;
          text-transform: uppercase;
          margin-bottom: 30px;
          animation-delay: 0.3s;
        }

        .description-box {
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.1rem;
          color: #94a3b8;
          animation-delay: 1.2s;
        }

        .luxury-cta {
          margin-top: 50px;
          display: inline-block;
          padding: 15px 35px;
          font-family: 'Syncopate', sans-serif;
          font-size: 0.65rem;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          text-decoration: none;
          animation-delay: 1.5s;
        }

        .orb {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%);
          filter: blur(80px);
        }

        /* --- MOBILE ONLY (MAX 768px) --- */
        @media (max-width: 768px) {
          .luxury-banner { min-height: 50vh; }
          
          .main-name {
            font-size: clamp(1.4rem, 8vw, 1.6rem); 
            letter-spacing: -0.04em;
          }

          .role-title {
            font-size: clamp(0.7rem, 4vw, 0.8rem);
            letter-spacing: 0.20em;
          }
          
          .content-wrapper { padding: 0 15px; }

          .description-box { font-size: 0.9rem; max-width: 90%; }
        }
      `}</style>

<section id="banner" className="luxury-banner" style={{ transform: `translate3d(0, ${scrollY * 0.3}px, 0)` }}>        <div className="orb" style={{ transform: `translate3d(0, ${scrollY * 0.4}px, 0)` }} />
        <div className="content-wrapper">
          <div style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}>
            <div className="premium-badge animate-up">Visual Storyteller</div>
          </div>

          <div style={{ transform: `translateY(${scrollY * 0.2}px)`, opacity: 1 - scrollY/700 }}>
            <h1 className="main-name animate-up">Mohammed Kareem</h1>
            <p className="role-title animate-up">photographer & videographer</p>
          </div>

          <div style={{ transform: `translateY(${scrollY * 0.15}px)`, opacity: 1 - scrollY/800 }}>
            <p className="description-box animate-up">
              Dubai-based Photographer & Videographer. Crafting cinematic visuals for luxury brands.
            </p>
            <a href="#category" className="luxury-cta animate-up">VIEW WORK —</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;