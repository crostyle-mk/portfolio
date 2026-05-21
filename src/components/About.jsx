import React, { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`${styles.aboutContainer} ${isVisible ? styles.isVisible : ""} mobileAbout`}
    >
      <div className={styles.aboutBackground} aria-hidden="true">
        <img src="/assets/poster.webp" alt="" />
      </div>

      <div className={styles.aboutOverlay} aria-hidden="true"></div>

      <div className={styles.aboutWrapper}>
        <h2 className={styles.aboutTitle}>About me</h2>

        <p className={styles.bodyPara}>
          Dubai-based Photographer &amp; Videographer specializing in fashion, events, commercial, and brand content.
          Focused on translating creative concepts into visual storytelling through photography and cinematic
          videography, with hands-on experience in both studio and outdoor productions for social media, campaigns,
          and digital platforms.
        </p>
      </div>
    </section>
  );
};

export default About;
