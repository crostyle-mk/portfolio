import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WorkGallery = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, [categoryName]);

  const workData = {
    "fashion": {
      title: "Fashion & Lifestyle",
      folder: "fashion",
      prefix: "f",
      // ==========================================
      // THIS IS YOUR "PLAYLIST" - TOTAL CONTROL
      // ==========================================
      layout: [
        { type: "grid3", ids: [1, 2, 3] }, // Row 1: Three clean columns
        { type: "wide", id: 4, isVideo: true }, // Row 2: One big cinematic video
      ]
    },

   "events": {
      title: "Events & Portraits",
      folder: "events",
      prefix: "e",

      layout: [
        { type: "wide", id: 1, isVideo: false, pos: "36%" }, // Row 1: Three clean columns
          { type: "grid3", ids: [2, 3, 4] }, // Row 2: One big cinematic video
      ]
    },

    "product": {
      title: "Product & Brand",
      folder: "product",
      prefix: "p",

      layout: [
        { type: "grid3", ids: [1, 2, 3] }, // Row 1: Three clean columns
        { type: "wide", id: 4, isVideo: true }, // Row 2: One big cinematic video
      ]
    },

     "street": {
      title: "Street & Architecture",
      folder: "street",
      prefix: "s",

      layout: [
        { type: "grid3", ids: [1, 2, 3] }, // Row 1: Three clean columns
        { type: "wide", id: 4, isVideo: true }, // Row 2: One big cinematic video
      ]
    },

      "food": {
      title: "Food & Beverage",
      folder: "food",
      prefix: "b",

      layout: [
        { type: "grid3", ids: [1, 2, 3] }, // Row 1: Three clean columns
        { type: "wide", id: 4, isVideo: true }, // Row 2: One big cinematic video
      ]
    }
  };

  const currentWork = workData[categoryName];
  if (!currentWork) return <div className="bg-black h-screen" />;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 overflow-x-hidden">
      {/* Header */}
      <div className="px-[6%] mb-20">
        <button onClick={() => navigate('/')} className="text-[10px] tracking-[0.5em] text-zinc-500 hover:text-white mb-16 uppercase">
          ← BACK TO INDEX
        </button>
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter" style={{ fontFamily: 'Syncopate, sans-serif' }}>
          {currentWork.title}
        </h1>
      </div>

      {/* RENDERER - NO MORE MASONRY LAG */}
      <div className="flex flex-col gap-y-6"> {/* Tight gap like your photo */}
        {currentWork.layout.map((row, index) => (
          <div key={index}>
            
            {/* 1. THREE COLUMN GRID (Stills) */}
            {row.type === "grid3" && (
              <div className="grid grid-cols-3 gap-6 px-[5%]">
                {row.ids.map(id => (
                  <div key={id} className="aspect-[2/3] bg-zinc-900 overflow-hidden">
                    <img 
                      src={`/assets/${currentWork.folder}/${currentWork.prefix}${id}.jpg`}
                      alt="" loading="lazy"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 2. WIDE CINEMATIC HERO (Video or Image) */}
            {row.type === "wide" && (
              <div className="w-full px-[5%] bg-zinc-900 h-[50vh]">
                {row.isVideo ? (
                  <video 
                    src={`/assets/${currentWork.folder}/${currentWork.prefix}${row.id}.mp4`}
                    autoPlay loop muted playsInline preload="metadata"
                    className="w-full h-full object-cover" 
                    style={{ objectPosition: `center ${row.pos || '50%'}` }} // Add this
                  />
                ) : (
                  <img 
                    src={`/assets/${currentWork.folder}/${currentWork.prefix}${row.id}.jpg`}
                    alt="" loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: `center ${row.pos || '50%'}` }} // Add this
                  />
                )}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGallery;
