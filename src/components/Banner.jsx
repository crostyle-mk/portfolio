import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile once + on resize
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Smooth parallax (desktop only)
  useEffect(() => {
    if (isMobile) return;

    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <section id="banner" className={styles.luxuryBanner}>
      {/* BACKGROUND MEDIA */}
      <div
        className={styles.videoBackground}
        style={{
          transform: isMobile ? "none" : `translate3d(0, ${scrollY * 0.4}px, 0)`
        }}
      >
        {isMobile ? (
          <>
            <img
              src="/assets/banner-mobile.jpg"
              alt="Cinematic mobile background"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <div className={styles.videoOverlay}></div>
          </>
        ) : (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/banner-desktop.webp"
            >
              <source src="/assets/Logo.mp4" type="video/mp4" />
            </video>
            <div className={styles.videoOverlay}></div>
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className={styles.contentWrapper}>
        <div className={`${styles.premiumBadge} ${styles.animateUp}`}>i am</div>

        <div className={styles.animateUp} style={{ animationDelay: "0.2s" }}>
          <h1 className={styles.mainName}>Mohammed Kareem</h1>
          <p className={styles.roleTitle}>photographer & videographer</p>
        </div>

        <div className={styles.animateUp} style={{ animationDelay: "0.4s" }}>
          <p className={styles.descriptionBox}>
            Dubai-based Visual Storyteller. Specializing in crafting high-end cinematic experiences.
          </p>
          <a href="#category" className={styles.luxuryCta}>EXPLORE PORTFOLIO</a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
