import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <>
      {/* FONT AWESOME */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
      />

      <section id="contact" className={styles.contactContainer}>
        <div className={styles.contactWrapper}>
          <span className={styles.ctaLabel}>Contact</span>

          <div className={styles.socialIcons}>
            <a href="mailto:kareembuflyzz@gmail.com" className={styles.socialIcon} title="Email">
              <i className="fa-regular fa-envelope"></i>
            </a>
            <a href="https://wa.me/971544572471" target="_blank" rel="noreferrer" className={styles.socialIcon} title="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="https://www.linkedin.com/in/mohammed-kareem-photographer/" target="_blank" rel="noreferrer" className={styles.socialIcon} title="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/crostyle.mk/?hl=en://" target="_blank" rel="noreferrer" className={styles.socialIcon} title="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialIcon} title="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className={styles.copyrightArea}>
          <span>© 2026 Mohammed Kareem</span>
          <span>Dubai • United Arab Emirates</span>
        </div>
      </section>
    </>
  );
};

export default Contact;
