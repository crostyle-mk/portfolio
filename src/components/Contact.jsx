import React from "react";

const Contact = () => {
  return (
    <>
      {/* ── FONT AWESOME CDN ── */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@100;300;400;600&display=swap');

        /* ── CLEAN WHITE TRANSITION ZONE ── */
        .cinematic-transition {
          width: 100%;
          height: 120px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(0,0,0,0.03); 
        }

        .cinematic-text {
          font-family: 'Syncopate', sans-serif;
          color: rgba(0, 0, 0, 0.2);
          font-size: 0.7rem;
          letter-spacing: 1.5em;
          text-transform: uppercase;
          animation: pulseFade 3s infinite alternate;
        }

        @keyframes pulseFade {
          from { opacity: 0.2; letter-spacing: 1.2em; }
          to { opacity: 0.5; letter-spacing: 1.8em; }
        }

        /* ── CONTACT CONTAINER WITH BG IMAGE ── */
        .contact-container {
          position: relative;
          width: 100%;
          min-height: 40vh; 
          display: flex;
          flex-direction: column;
          align-items: center; 
          justify-content: center;
          padding: 80px 0 60px 0; 
          overflow: hidden;
          
          /* BACKGROUND SETTINGS */
          background-image: url('../assets/contact.jpg'); 
          background-size: cover;
          background-position: center;
          background-attachment: fixed; /* Premium Parallax Effect */
          background-repeat: no-repeat;
        }

        /* PREMIUM OVERLAY (Keeps text readable) */
        .contact-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.50); /* High opacity for an editorial feel */
          z-index: 1;
        }

        /* ── PINNED TO THE CORNER LEFT ── */
        .contact-wrapper {
          position: relative;
          z-index: 2;
          width: 90%; /* Matches global grid consistency */
          max-width: 1600px; 
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .cta-label {
          font-family: 'Syncopate', sans-serif;
          font-size: clamp(1.5rem, 2vw, 4rem);
          font-weight: 700;
          letter-spacing: 0.4em; 
          text-transform: uppercase;
          color: #a855f7; 
          margin-bottom: 60px; 
            text-align: left; /* Pinned to the left corner of the wrapper */
          width: 100%;
            opacity: 1;
        }
          
        /* ── ICONS STAY CENTERED ── */
        .social-icons {
          display: flex;
          justify-content: center; 
          gap: clamp(40px, 8vw, 80px); 
          margin-bottom: 120px; 
          width: 100%;
        }

        .social-icon {
          color: #000; 
          font-size: clamp(1.8rem, 5vw, 2.5rem); 
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          opacity: 0.6;
          text-decoration: none;
        }

        .social-icon:hover {
          color: #a855f7;
          opacity: 1;
          transform: translateY(-8px);
        }

        .copyright-area {
          position: relative;
          z-index: 2;
          width: 90%;
          max-width: 1600px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(0, 0, 0, 0.5); 
          text-transform: uppercase;
          letter-spacing: 0.2em;
          border-top: 1px solid rgba(0, 0, 0, 0.08); 
          padding-top: 40px;
        }

        @media (max-width: 768px) {
          .contact-container { 
            padding: 60px 0 40px 0; 
            background-attachment: scroll; /* Fixed bg can be buggy on mobile */
          }

          .contact-wrapper {
    align-items: center; /* Centers the children horizontally */
    text-align: center;   /* Ensures the text inside children aligns center */
  }

  .cta-label {
    text-align: center;   /* Overrides the 'text-align: left' from desktop */
    margin-bottom: 40px;  /* Slightly reduced spacing for smaller screens */
    letter-spacing: 0.2em; /* Tightened slightly so it doesn't wrap awkwardly */
  }
    
          .copyright-area { 
            flex-direction: column; 
            gap: 15px; 
            align-items: center; 
            text-align: center;
          }
        }
      `}</style>

      <section id="contact" className="contact-container">
        <div className="contact-wrapper">
          <span className="cta-label">Connect</span>
          
          <div className="social-icons">
            <a href="mailto:kareembuflyzz@gmail.com" className="social-icon" title="Email">
              <i className="fa-regular fa-envelope"></i>
            </a>
            <a href="https://wa.me/971544572471" target="_blank" rel="noreferrer" className="social-icon" title="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="https://linkedin.com/in/mohammed-kareem" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" title="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" title="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="copyright-area">
          <span>© 2026 Mohammed Kareem </span>
          <span>Dubai • United Arab Emirates </span>
        </div>
      </section>
    </>
  );
};

export default Contact;