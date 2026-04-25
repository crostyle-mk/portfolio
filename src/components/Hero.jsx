import React, { useState, useRef } from "react";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

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
    background: transparent;
    z-index: 1;
  }
      .pause-btn {
          position: absolute;
          top: 30px;
          right: 30px;
          z-index: 50;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.7);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .pause-btn:hover { background: rgba(255, 255, 255, 0.5); }

        .poster-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: url('assets/poster.jpg') center/cover no-repeat;
          opacity: ${isPlaying ? 0 : 1};
          pointer-events: none;
          transition: opacity 0.5s ease-in-out;
        }

.icon { width: 18px; fill: white; }

  /* --- MOBILE ONLY OPTIMIZATION (Fixes Landscape View) --- */
  @media (max-width: 768px) {
    .parallax-wrapper {
      height: auto; /* Disables long scroll on mobile if no text is present */
      background: transparent;
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
      background: transparent;
    }
    .pause-btn { 
    width: 30px;
    height: 30px;  
   }   
    
  `}</style>

      <section>
        <div className="parallax-wrapper">
          <div className="video-sticky-container">
            {/* PAUSE BUTTON */}
            <button className="pause-btn" onClick={togglePlay}>
              {isPlaying ? (
                <svg className="icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>

            {/* POSTER IMAGE OVERLAY */}
            <div className="poster-overlay" />

            <video
              ref={videoRef}
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="assets/song.mp4" type="video/mp4" />
            </video>
            
            <div className="hero-overlay" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;