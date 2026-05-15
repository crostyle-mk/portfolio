import React from "react";
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
    pos: "center 75%" 
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
  return (
    <div className={styles.categoriesContainer} id="category">
      {categories
        .filter(cat => cat.active)
        .map((cat) => (
          <Link key={cat.id} to={cat.path} className={styles.categoryItem}>
            
            {/* Media */}
            {cat.mediaType === "video" ? (
              <video 
                src={cat.videoSrc} 
                poster={cat.img}
                preload="metadata"
                autoPlay loop muted playsInline
                className={styles.categoryMedia}
                loading="lazy"
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
        ))}
    </div>
  );
};

export default Category;
