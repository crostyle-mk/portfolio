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
          padding: 120px 0 40px 0; 
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
          letter-spacing: 0.1em; 
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
            letter-spacing: 0.3em;
          }

          .body-para {
            font-size: 0.85rem;
            line-height: 1.6;
            letter-spacing: 0.05em; 
            text-align: center;
            margin: 0 auto;
            margin-bottom: 60px;

            max-width: 85%; 
            padding: 0 10px;
          }
        }
      `}</style>

      <section id="about" className="about-container">
        <div className="about-wrapper">
          {/* Mirrors "Contact" Heading precisely */}
          <h2 className="about-title">About me</h2>
          
          <p className="body-para">
           I am a Dubai-based photographer and videographer, working across fashion, events, and creative projects since 2022.
           <br /><br />
            My work focuses on bringing a cinematic quality to every frame, with strong attention to composition, lighting, and overall visual balance.
            <br /><br />
             Experienced in both studio and outdoor environments, I work comfortably in collaborative settings, contributing as part of a team to deliver strong visual outcomes.
             <br /><br />
              Each project is an opportunity to create something visually strong and meaningful, both for people and brands.
              <br /><br />
               My approach is simple — understand the moment, frame it well, and bring it to life through editing. 
               <br /><br />
              I believe in taking the time to do things right, avoiding rushed work and focusing on creating visuals that are clean, detailed, and thoughtfully crafted.

          </p>
        </div>
      </section>
    </>
  );
};

export default About;