import React from "react";
import { Link } from "react-router-dom";


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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Outfit:wght@100;300;400&display=swap');

        .categories-container {
          background: transparent;
          padding: 0 0 80px 0;
          margin: 0;
          margin-top: 120px;
        }

        .category-item {
          position: relative;
          display: flex;
          align-items: center;
          height: 50vh; 
          text-decoration: none;
          overflow: hidden;
          background:transparent;
          margin-bottom: 12vh;
          transition: height 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .category-item:last-child { margin-bottom: 0; }

        .category-media {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          opacity: 0.6;
          will-change: opacity, transform;
          transition: opacity 0.8s ease, transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
          mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%);
          -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%);
          contain: paint;
        }

        @media (min-width: 1025px) {
          .category-item:hover .category-media {
            opacity: 0.9;
            transform: scale(1.02);
          }
          .category-item:hover .category-title {
            color: #ffffff;
            transform: translateX(10px);
          }
        }
        
        @media (max-width: 1024px) {
          .category-item:hover .category-media {
            transform: none;
          }
        }

        .category-content {
          position: relative;
          z-index: 10;
          padding-left: 8%;
          width: 100%;
          box-sizing: border-box;
        }

        .category-meta {
          font-family: 'Outfit', sans-serif;
          font-size: 0.80rem;
          font-weight: 300;
          letter-spacing: 0.8em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          display: block;
          margin-bottom: 12px;
        }

        .category-title {
          font-family: 'Syncopate', sans-serif;
          font-size: clamp(1.1rem, 3.5vw, 4rem); 
          font-weight: 700;
          text-transform: uppercase;
          margin: 0;
          line-height: 1.1;
          color: #ffffff;
          letter-spacing: -0.02em;
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* ── MOBILE VERSION ── */
        @media (max-width: 768px) {
          .category-item { height: 25vh; margin-bottom: 6vh; }
          .category-media {
            opacity: 1; 
            mask-image: linear-gradient(to left side, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%);
            -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 100%, rgba(0,0,0,0) 100%); 
          }
          .categories-container { margin-top: 60px; }
          .category-content { margin-top: auto; padding-bottom: 100px; padding-left: 6%; }
          .category-title { font-size: 1.2rem; }
          .category-meta { font-size: 0.40rem; letter-spacing: 0.5em; } 
        }
          @media (max-width: 768px) {
  .category-content {
    margin-top: auto;
    padding-bottom: 100px;
    padding-left: 0;        /* remove left padding */
    text-align: center;     /* center all text */
    width: 100%;
  }

  .category-title {
    font-size: 1rem;
    letter-spacing: 0.1em;
    text-align: center;     /* ensure title is centered */
  }

  .category-meta {
    font-size: 0.40rem;
    letter-spacing: 0.5em;
     margin-bottom: 5px;
    text-align: center;     /* center meta text */
  }
}

      `}</style>

      <div className="categories-container" id="category">
        {categories
          .filter(cat => cat.active)
          .map((cat) => (
            <Link key={cat.id} to={cat.path} className="category-item">
              
              {/* Media Handling */}
              {cat.mediaType === "video" ? (
                <video 
                  src={cat.videoSrc} 
                  poster={cat.img}
                  preload="metadata"
                  autoPlay loop muted playsInline
                  className="category-media"
                  loading="lazy"
                  style={{ objectPosition: cat.pos }}
                  onError={(e) => e.target.style.display = 'none'}
                />
              ) : (
                <img 
                  src={cat.img} 
                  alt={cat.title}
                  loading="lazy"
                  className="category-media"
                  style={{ objectPosition: cat.pos }}
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              
              {/* Title Content */}
              <div className="category-content">
                <span className="category-meta">{cat.type}</span>
                <h2 className="category-title">{cat.title}</h2>
              </div>
              
            </Link>
          ))}
      </div>
    </>
  );
};

export default Category;