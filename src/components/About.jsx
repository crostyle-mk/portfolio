import React from "react";

const About = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@100;300;400;600&display=swap');

        .about-container {
          background: #000;
          color: #fff;
          /* ── SIGNIFICANTLY REDUCED VERTICAL PADDING ── */
          padding: 5px 10%; 
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Removed 40vh to prevent forced empty space */
          min-height: auto; 
          text-align: center;
          width: 100%;
          overflow: hidden;
        }

        /* ── LARGE OUTLINE BACKGROUND TEXT ── */
        .bg-outline-text {
          position: absolute;
          font-family: 'Cinzel', serif;
          font-size: 15vw;
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.03);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          pointer-events: none;
          z-index: 0;
        }

        .about-wrapper {
          position: relative;
          z-index: 1;
          max-width: 900px; 
        }

        /* ── CENTERED HEADING ── */
        .about-title {
            font-family: 'Syncopate', sans-serif;
          font-size: clamp(1.2rem, 2.5vw, 2.2rem);
          line-height: 1;
          text-transform: uppercase;
          /* Tightened gap between Title and Paragraph */
          margin-bottom: 15px; 
          letter-spacing: 0.2em;
        }

        /* ── CENTERED DESCRIPTION ── */
        .body-para {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 1.3vw, 1rem);
          line-height: 1.6;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 auto;
          letter-spacing: 0.02em;
        }

        .highlight {
          color: #a855f7;
        }

        @media (max-width: 768px) {
          .about-container {
            padding: 30px 5%;
          }
          .bg-outline-text {
            font-size: 25vw;
          }
        }
      `}</style>

      <section id="about" className="about-container">
        <div className="bg-outline-text">CREATIVE</div>

        <div className="about-wrapper">
          <h2 className="about-title highlight">About Me</h2>
          
          <p className="body-para">
            Creative and detail-oriented Photographer and Videographer with 
            over <strong>3 years of professional experience</strong> in fashion, event, product, portrait, and 
            landscape photography. Proven ability to produce high-quality visual content that 
            enhances brand image and engagement. Experienced in both studio and outdoor 
            environments, with strong post-production and storytelling skills.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;