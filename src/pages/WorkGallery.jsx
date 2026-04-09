import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WorkGallery = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  const workData = {
    "fashion": {
      title: "Fashion & Lifestyle",
      description: "High-fashion editorial work.",
      images: ["/assets/fashion1.jpg", "/assets/fashion2.jpg"]
    },
    "events": {
      title: "Events & Portraits",
      description: "Cinematic event coverage.",
      images: ["/assets/event1.jpg", "/assets/event2.jpg"]
    },
    "product": {
      title: "Product & Brand",
      description: "Luxury commercial visuals.",
      images: ["/assets/prod1.jpg", "/assets/prod2.jpg"]
    },
    "street": {
      title: "Street & Architecture",
      description: "Urban moody cinematic environments.",
      images: ["/assets/street1.jpg", "/assets/street2.jpg"]
    },
    "food": {
      title: "Food & Beverage",
      description: "Commercial culinary photography.",
      images: ["/assets/food1.jpg", "/assets/food2.jpg"]
    }
  };

  const currentWork = workData[categoryName];

  if (!currentWork) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        <p>Category not found. <button onClick={() => navigate('/')} className="underline">Go Home</button></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-[8%]">
      <button onClick={() => navigate('/')} className="text-xs tracking-[0.4em] text-gray-500 hover:text-white mb-10">
        ← BACK TO HOME
      </button>

      <header className="mb-20">
        <h1 className="text-5xl md:text-7xl uppercase mb-4" style={{ fontFamily: 'Syncopate' }}>
          {currentWork.title}
        </h1>
        <p className="text-gray-400 tracking-widest text-sm">{currentWork.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentWork.images.map((img, index) => (
          <div key={index} className="overflow-hidden bg-zinc-900 aspect-[3/4]">
            <img 
              src={img} 
              alt="portfolio" 
              className="w-full h-full object-cover" 
              onError={(e) => { e.target.src = "https://via.placeholder.com/600x800?text=Image+Not+Found"; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGallery;