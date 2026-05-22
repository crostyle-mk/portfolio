import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";

const categories = [
  { 
    id: 1, 
    title: "Fashion & Lifestyle", 
    path: "/fashion", 
    mediaType: "video", 
    videoSrc: "/assets/fashion.mp4",
    img: "/assets/fashion.jpg", 
    type: "cinematography", 
    active: true,
    pos: "center 75%",
    hasAudio: true   // ⭐ Enable audio toggle for this category
  },
  { 
    id: 2, 
    title: "Events & Portraits", 
    path: "/events", 
    img: "/assets/events.jpg", 
    type: "Photography", 
    active: true, 
    pos: "center" 
  },
  { 
    id: 3, 
    title: "Product & Brand", 
    path: "/product", 
    img: "/assets/product.jpg", 
    type: "Commercial", 
    active: true, 
    pos: "center" 
  },
  { 
    id: 4, 
    title: "Street & Architecture", 
    path: "/street", 
    img: "/assets/architecture.jpg", 
    type: "Visual Art", 
    active: true, 
    pos: "center" 
  },
  { 
    id: 5, 
    title: "Food & Beverage", 
    path: "/food", 
    img: "/assets/food.jpg", 
    type: "Commercial", 
    active: false, 
    pos: "center" 
  } 
];

const Category = () => {
  const [isMutedMap, setIsMutedMap] = useState({});
  const videoRefs = useRef({});

  const toggleMute = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const video = videoRefs.current[id];
    if (!video) return;

    const newState = !video.muted;
    video.muted = newState;

    setIsMutedMap(prev => ({
      ...prev,
      [id]: newState
    }));
  };

  return (
    <div className={styles.categoriesContainer} id="category">
      {categories
        .filter(cat => cat.active)
        .map((cat) => {
          const isMuted = isMutedMap[cat.id] !== false;

          return (
            /* ⭐ Added parent structural element to keep styling intact while isolating the click signals */
            <div key={cat.id} className={styles.cardWrapper}>
              
              <Link to={cat.path} className={styles.categoryItem}>
                
                {/* Media */}
                {cat.mediaType === "video" ? (
                  <video 
                    ref={(el) => (videoRefs.current[cat.id] = el)}
                    src={cat.videoSrc} 
                    poster={cat.img}
                    preload="metadata"
                    autoPlay loop muted playsInline
                    className={styles.categoryMedia}
                    style={{ objectPosition: cat.pos }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                ) : (
                  <img 
                    src={cat.img} 
                    alt={cat.title}
                    loading="lazy"
                    className={styles.categoryMedia}
                    style={{ objectPosition: cat.pos }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                
                {/* Text */}
                <div className={styles.categoryContent}>
                  <span className={styles.categoryMeta}>{cat.type}</span>
                  <h2 className={styles.categoryTitle}>{cat.title}</h2>
                </div>
                
              </Link>

              {/* ⭐ AUDIO TOGGLE BUTTON — Placed safely outside <Link> to process audio cleanly */}
              {cat.mediaType === "video" && cat.hasAudio && (
                <button
                  type="button"
                  onClick={(e) => toggleMute(e, cat.id)}
                  className={styles.audioToggleBtn}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  aria-pressed={!isMuted}
                >
                  <span className={styles.srOnly}>
                    {isMuted ? "Unmute video audio" : "Mute video audio"}
                  </span>
                  {isMuted ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <line x1="22" y1="9" x2="16" y2="15"></line>
                      <line x1="16" y1="9" x2="22" y2="15"></line>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                  )}
                </button>
              )}

            </div>
          );
        })}
    </div>
  );
};

export default Category;