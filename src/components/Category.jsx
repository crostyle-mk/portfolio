import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const categories = [
    { id: 1, title: "Fashion & Lifestyle", path: "/fashion", img: "/assets/fashion.jpg", type: "Photography" },
    { id: 2, title: "Events & Portraits", path: "/events", img: "/assets/events.jpg", type: "Cinematography" },
    { id: 3, title: "Product & Brand", path: "/product", img: "/assets/product.jpg", type: "Commercial" },
    { id: 4, title: "Street & Architecture", path: "/street", img: "/assets/architecture.jpg", type: "Visual Art" },
    { id: 5, title: "Food & Beverage", path: "/food", img: "/assets/food.jpg", type: "Commercial" }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Outfit:wght@200;400;600&display=swap');

        .categories-container {
          background: #ffffff;
          padding: 100px 0 0 0;
          margin-bottom: 0;
        }

        .category-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50vh;
          text-decoration: none;
          color: #000000;
          overflow: hidden;
          background: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          transition: height 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .category-item:last-child {
          border-bottom: none;
        }

        .category-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          opacity: 0;
          transform: scale(1.1);
          filter: brightness(0.6);
          transition: opacity 0.8s ease, transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
        }

        @media (min-width: 1025px) {
          .category-item:hover .category-bg {
            opacity: 1;
            transform: scale(1);
          }
          .category-item:hover .category-title {
            color: #ffffff;
            transform: translateY(-5px);
          }
        }

        .category-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 5%; /* Use percentage for better mobile flex */
          width: 100%;   /* Ensure it takes full width to handle centering */
          box-sizing: border-box;
        }

        .category-meta {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.6em;
          text-transform: uppercase;
          color: #999;
          display: block;
          margin-bottom: 15px;
        }

        .category-title {
          font-family: 'Syncopate', sans-serif;
          /* 1. CLAMP ADJUSTMENT: Ensures it shrinks enough for small screens */
          font-size: clamp(1.1rem, 3.5vw, 4rem); 
          font-weight: 600;
          text-transform: uppercase;
          margin: 0;
          line-height: 1.2;
          transition: all 0.5s ease;
          
          /* 2. THE "ONE LINE" FIX */
          white-space: nowrap; 
          overflow: hidden;
          text-overflow: ellipsis; /* Adds '...' if text is truly too long for the screen */
          width: 100%;
        }

        /* ── MOBILE OPTIMIZATION ── */
        @media (max-width: 768px) {
          .categories-container {
            padding: 10px 0 0 0;
          }

          .category-item {
            height: 25vh; /* Slightly shorter for better scrolling on phones */
          }

          .category-bg {
            opacity: 0.4;
            filter: brightness(0.4);
          }

          .category-title {
            /* 3. MOBILE FONT SIZE: Forced smaller to guarantee it fits in one line */
            font-size: clamp(1.1rem, 6vw, 1rem);
            color: #ffffff; /* Changed to white for better contrast on mobile overlay */
            letter-spacing: -0.02em; /* Tighter letters to fit more on one line */
          }

          .category-meta {
            font-size: 0.55rem;
            letter-spacing: 0.3em;
            color: #ccc;
          }
        }
      `}</style>

      <div className="categories-container" id="category">
        {categories.map((cat) => (
          <Link key={cat.id} to={cat.path} className="category-item">
            <img 
              src={cat.img} 
              alt={cat.title} 
              className="category-bg" 
            />
            
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