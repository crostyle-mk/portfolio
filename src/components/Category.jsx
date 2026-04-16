import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const categories = [
    { id: 1, title: "Fashion & Lifestyle", path: "/fashion", img: "/assets/fashion.jpg", type: "Cinematography", active: true },
    { id: 2, title: "Events & Portraits", path: "/events", img: "/assets/events.jpg", type: "Photography", active: true },
    { id: 3, title: "Product & Brand", path: "/product", img: "/assets/product.jpg", type: "Commercial", active: true },
    { id: 4, title: "Street & Architecture", path: "/street", img: "/assets/architecture.jpg", type: "Visual Art", active: true },
    { id: 5, title: "Food & Beverage", path: "/food", img: "/assets/food.jpg", type: "Commercial", active: false } 
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Outfit:wght@100;300;400&display=swap');

        .categories-container {
          background: #000000; /* Pure black background */
          padding: 80px 0;
          margin: 0;
        }

        /* The Category Item with Bottom Gap */
        .category-item {
          position: relative;
          display: flex;
          align-items: center;
          height: 45vh; 
          text-decoration: none;
          overflow: hidden;
          background: #000000;
          margin-bottom: 12vh; /* Professional vertical gap at the bottom */
          transition: height 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .category-item:last-child {
          margin-bottom: 0;
        }

        /* Minimal Image Styling - No Heavy Filters */
        .category-bg {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%; /* Keeps image full width as requested */
          height: 100%;
          object-fit: cover;
          z-index: 1;
          opacity: 0.6; /* Balanced visibility without looking "over darkened" */
          transform: scale(1);
          transition: opacity 0.8s ease, transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
          /* Minimal gradient to bleed text into black without a muddy overlay */
          mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%);
          -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%);
        }

        @media (min-width: 1025px) {
          .category-item:hover .category-bg {
            opacity: 0.9;
            transform: scale(1.03);
          }
          .category-item:hover .category-title {
            color: #ffffff;
            transform: translateX(10px);
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
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.8em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          display: block;
          margin-bottom: 12px;
          text-shadow: none; /* Removed shadow for luxury minimal look */
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
          text-shadow: none; /* Removed shadow */
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* ── MOBILE OPTIMIZATION - Kept as per your original sizes ── */
        @media (max-width: 768px) {
          .categories-container {
            padding: 20px 0 0 0;
          }

          .category-item {
            height: 25vh;
            margin-bottom: 4vh; /* Vertical gap for mobile scrolling */
          }

          .category-bg {
            opacity: 0.7;
            mask-image: linear-gradient(to top, rgba(0,0,0,1) 100%, rgba(0,0,0,0.3));
          }

          .category-title {
            font-size: clamp(1.1rem, 6vw, 1rem);
            color: #ffffff;
            letter-spacing: -0.02em;
          }

          .category-meta {
            font-size: 0.55rem;
            letter-spacing: 0.3em;
            color: #ffffff;
            opacity: 0.8;
          }
        }
      `}</style>

      <div className="categories-container" id="category">
        {categories
          .filter(cat => cat.active !== false)
          .map((cat) => (
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