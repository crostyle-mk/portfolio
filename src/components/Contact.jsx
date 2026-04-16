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
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Outfit:wght@100;300;400;600&display=swap');

        /* ── CONTACT CONTAINER - PURE CINEMATIC BLACK ── */
        .contact-container {
          position: relative;
          width: 100%;
          min-height: 45vh; 
          display: flex;
          flex-direction: column;
          align-items: center; 
          justify-content: center;
          padding: 120px 0 60px 0; 
          background: #000000; /* Pure black background as requested */
          overflow: hidden;
        }

        .contact-wrapper {
          position: relative;
          z-index: 2;
          width: 90%; 
          max-width: 2500px; 
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* ── CONNECT LABEL - PINNED LEFT ── */
        .cta-label {
          font-family: 'Syncopate', sans-serif;
          font-size: clamp(2rem, 2vw, 6rem);
          font-weight: 700;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: #ffffff; 
          margin-bottom: 80px; 
          text-align: left; /* Left side only */
          width: 100%;
        }
          
        /* ── PROFESSIONAL CENTERED CIRCULAR ICONS ── */
        .social-icons {
          display: flex;
          justify-content: center; 
          gap: clamp(20px, 5vw, 50px); 
          margin-bottom: 120px; 
          width: 100%;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(50px, 8vw, 85px);
          height: clamp(50px, 8vw, 85px);
          background: rgba(255, 255, 255, 0.15); /* Glass-like circular background */
          color: #ffffff; 
          font-size: clamp(1.2rem, 9vw, 2rem); 
          border-radius: 50%;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          text-decoration: none;
        }

        .social-icon:hover {
          background: #ffffff;
          color: #000000;
          transform: translateY(-10px) scale(1.1);
        }

        /* ── FOOTER - HIGH VISIBILITY ── */
        .copyright-area {
          position: relative;
          z-index: 2;
          width: 90%;
          max-width: 2500px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          font-family: 'Outfit', sans-serif;
          font-size: 0.60rem;
          color: #ffffff; /* Fully visible footer font */
          text-transform: uppercase;
          letter-spacing: 0.4em;
          border-top: 1px solid rgba(255, 255, 255, 0.1); 
          padding-top: 40px;
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          .contact-container { 
            padding: 80px 0 40px 0; 
          }

          .cta-label {
            text-align: center; /* Maintains left alignment even on mobile */
            font-size: 1.03rem;
            margin-bottom: 50px;
          }

          .social-icons {
             gap: 15px;
             margin-bottom: 80px;
          }

          .social-icon {
            width: 55px;
            height: 55px;
            font-size: 1.3rem;
          }
    
          .copyright-area { 
            flex-direction: column; 
            gap: 15px; 
            align-items: center; 
            text-align: center;
            letter-spacing: 0.2em;
            font-size: 0.65rem;
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
            <a href="https://www.linkedin.com/in/mohammed-kareem-photographer/" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/crostyle.mk/?hl=en://" target="_blank" rel="noreferrer" className="social-icon" title="Instagram">
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