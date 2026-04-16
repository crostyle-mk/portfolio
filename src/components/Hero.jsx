import React from "react";
// Removed useState and useEffect since we no longer need scrollY to animate text

const Hero = () => {

  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

  body { margin: 0; padding: 0; }

  /* --- DESKTOP (UNTOUCHED) --- */
  .parallax-wrapper {
    position: relative;
    height: 100vh; 
    width: 100%;
  }

  .video-sticky-container {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0); 
    z-index: 1;
  }

  /* --- MOBILE ONLY OPTIMIZATION (Fixes Landscape View) --- */
  @media (max-width: 768px) {
    .parallax-wrapper {
      height: auto; /* Disables long scroll on mobile if no text is present */
      background: #000;
    }

    .video-sticky-container {
      position: relative; /* Removes sticky behavior for a cleaner mobile fit */
      height: auto; 
      /* This creates a 16:9 Landscape Aspect Ratio Box */
      aspect-ratio: 16 / 9; 
      width: 100%;
    }

    .hero-video {
      width: 100%;
      height: 100%;
      object-fit: contain; /* Shows the FULL 1920x1080 frame without cropping */
      background: #000;
    }
  }
`}</style>  

      <section>
        <div className="parallax-wrapper">
          <div className="video-sticky-container">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="assets/song.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay" />

            {/* Content overlay is kept, but its children are removed */}
            <div 
              className="hero-content-overlay"
              style={{
                /* transform and opacity animations removed */
              }}
            >
              {/* CHANGE 2: h1 and p tags have been completely removed */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;