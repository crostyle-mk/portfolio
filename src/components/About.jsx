import React from "react";

const About = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@300;400;600&display=swap');

        /* ── MATCHES CONTACT CONTAINER ── */
        .about-container {
          position: relative;
          width: 100%;
          min-height: 45vh; 
          display: flex;
          flex-direction: column;
          align-items: center; 
          justify-content: center;
          padding: 100px 0 40px 0; 
          background: #000000; 
          overflow: hidden;
        }

        /* ── MATCHES CONTACT WRAPPER (90% width, 2500px max) ── */
        .about-wrapper {
          position: relative;
          z-index: 2;
          width: 90%; 
          max-width: 2500px; 
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* ── HEADING: PINNED LEFT (Matches .cta-label) ── */
        .about-title {
          font-family: 'Syncopate', sans-serif;
          font-size: clamp(2rem, 2vw, 6rem); /* Identical to Contact clamp */
          font-weight: 400;
          letter-spacing: 0.4em; /* Identical spacing */
          text-transform: uppercase;
          color: #ffffff; 
          margin-bottom: 80px; /* Identical spacing before content */
          text-align: left; 
          width: 100%;
        }

        /* ── CONTENT: PROFESSIONAL CINEMATIC WIDTH ── */
        .body-para {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 1.4vw, 1.1rem);
          line-height: 1.8;
          font-weight: 300; 
          color: rgba(255, 255, 255, 0.7); 
          text-align: left;
          max-width: 1500px; /* Professional reading width for desktop */
          margin-bottom: 120px; /* Matches the bottom margin of Contact's icons */
        }

        .highlight-white {
          color: #ffffff;
          font-weight: 500;
        }

        /* ── MOBILE OPTIMIZATION: MATCHES CONTACT MEDIA QUERIES ── */
        @media (max-width: 768px) {
          .about-container { 
            padding: 80px 0 40px 0; 
          }

          .about-title {
            text-align: center; /* Mirrors Contact's mobile center alignment */
            font-size: 1.03rem;
            margin-bottom: 50px;
          }

          .body-para {
            font-size: 0.95rem;
            line-height: 1.5;
            text-align: left;
            margin-bottom: 80px;
          }
        }
      `}</style>

      <section id="about" className="about-container">
        <div className="about-wrapper">
          {/* Mirrors "Contact" Heading precisely */}
          <h2 className="about-title">About me</h2>
          
          <p className="body-para">
           A Dubai-based photographer and videographer capturing visuals across fashion, events, products, and portraits.
           Working in Dubai since 2022, with a focus on creating high-quality content that blends detail, composition, and storytelling.
           Each project is approached with a cinematic eye, delivering visuals that elevate both moments and brands. 
          </p>
        </div>
      </section>
    </>
  );
};

export default About;