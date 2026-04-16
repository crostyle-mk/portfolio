import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// --- 1. ATOMIC COMPONENTS ---

const Grid3Row = ({ ids, folder, prefix, activeIndex }) => (
  <>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes cinematicSlow {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `}} />
    <div className="grid grid-cols-3 gap-2 md:gap-8 px-[5%] mb-12">
      {ids.map((cellData, idx) => {
        const cellImages = Array.isArray(cellData) ? cellData : [cellData];
        const localIndex = Math.floor((activeIndex + idx) % cellImages.length);
        return (
          <div key={idx} className="aspect-[2/3] bg-zinc-950 overflow-hidden relative">
            {cellImages.map((id, imgIdx) => {
              const isActive = imgIdx === localIndex;
              return (
                <img
                  key={id}
                  src={`/assets/${folder}/${prefix}${id}.jpg`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ 
                    transition: "opacity 1000ms cubic-bezier(0.2, 0, 0.1, 1)", 
                    transitionDelay: isActive ? `${idx * 150}ms` : "0ms",
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 2 : 1,
                    animation: "cinematicSlow 20s ease-in-out infinite",
                    animationDelay: `${idx * 2}s`, // Each column starts 2 seconds apart
                    willChange: "opacity, transform"
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  </>
);

const WideRow = ({ id, isVideo, pos, fit, folder, prefix }) => {
  const isContained = fit === "contain";
  return (
    <div className="w-full flex justify-center mb-10 md:mb-16 px-[5%]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cinematicPulse {
          0% { transform: scale(1.01); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1.01); }
        }
        .cinematic-media {
          animation: cinematicPulse 12s ease-in-out infinite;
          will-change: transform;
        }
      `}} />

      <div className={`relative overflow-hidden shadow-2xl transition-all duration-1000 
        ${isContained ? "w-auto h-[30vh] md:h-[60vh]" : "w-full aspect-video md:aspect-auto md:h-[60vh] bg-zinc-950"}`}>
        {isVideo ? (
          <video src={`/assets/${folder}/${prefix}${id}.mp4`} 
          autoPlay loop muted playsInline 
          className="h-full w-full object-cover cinematic-media" 
         style={{ 
              objectPosition: `center ${pos || "50%"}`,
              /* Inline fallback to ensure it starts slightly zoomed */
              transform: 'scale(1)' 
            }} 
          />
        ) : (
          <img src={`/assets/${folder}/${prefix}${id}.jpg`} 
          className="h-full w-full object-cover cinematic-media" 
         style={{ 
              objectPosition: `center ${pos || "50%"}`,
              transform: 'scale(1)' 
            }}
          alt="" 
          />
        )}
      </div>
    </div>
  );
};

const SlideshowRow = ({ images, activeIndex, folder, prefix }) => (
  <div className="w-full px-[5%] mb-20">
    <div className="relative w-full h-[30vh] md:h-[80vh] overflow-hidden bg-black shadow-2xl">
      {images.map((img, i) => {
        const isCurrent = i === activeIndex % images.length;
        return (
          <div key={i} className="absolute inset-0" style={{ zIndex: isCurrent ? 20 : 10, opacity: isCurrent ? 1 : 0, transition: "opacity 1500ms ease-in-out" }}>
            <img
              src={`/assets/${folder}/${prefix}${img.id}.jpg`}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: img.pos || "center", animation: "cinematicZoom 30s linear infinite" }}
            />
          </div>
        );
      })}
    </div>
    <style dangerouslySetInnerHTML={{ __html: `@keyframes cinematicZoom { 0% { transform: scale(1.1); } 100% { transform: scale(1); } }`}} />
  </div>
);

// --- 2. MAIN GALLERY ---

const WorkGallery = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

 const workData = {



    fashion: {

    title: "Fashion & Lifestyle",
    folder: "fashion",
    prefix: "f",
    layout: [
        { type: "wide", id: 1 , isVideo: false, pos: "90%"},
        {
      type: "grid3",
      ids: [
        [2, 5, 8], // Wrap in brackets to enable the cycling logic
        [3, 7, 9],
        [4, 6, 10]
      ]
    },
  ],
},



    product: {

     title: "Product & Brand",
      folder: "product",
     prefix: "p",
      layout: [
        { type: "wide", id: 1, isVideo: true, fit: "cover" }, // Tall, contained look
        { type: "grid3", ids: [2, 3, 4] },
         { 
      type: "slideshow", 
      images: [
        { id: 5, pos: "center" },
        { id: 6, pos: "center" },
        { id: 7, pos: "center" }
      ] 
    },
  ],
},



    events: {

      title: "Events & Portraits",
      folder: "events",
      prefix: "e",
      layout: [
        { type: "wide", id: 1, isVideo: false, pos: "36%" },
       {
        type: "grid3",
        ids: [
          [2, 7, 10, 13], // Left column cycles these 4
          [3, 8, 11, 14], // Middle column cycles these 4
          [4, 9, 12, 15]  // Right column cycles these 4
        ]
      },

        { type: "slideshow", images: [{ id: 5, pos: "center" }, { id: 6, pos: "center" }] },

      ],
    },


    street: {

      title: "Street & Architecture",
      folder: "street",
      prefix: "s",
      layout: [
        { type: "wide", id: 1, isVideo: false, fit: "cover" }, // Tall, contained look
        {
      type: "grid3",
      ids: [
        [2, 5], // Wrap in brackets to enable the cycling logic
        [3, 7],
        [4, 6]
      ]
    },
  ],
},



    food: {

      title: "Food & Beverage",
      folder: "food",
      prefix: "b",
      layout: [
        { type: "grid3", ids: [1, 2, 3] },
        { type: "wide", id: 4, isVideo: true, fit: "contain" },
      ],
    },

  };

  const categories = Object.keys(workData);
  const currentIndex = categories.indexOf(categoryName);
  const nextCategory = categories[(currentIndex + 1) % categories.length];
  const currentWork = workData[categoryName];

  useEffect(() => { window.scrollTo(0, 0); }, [categoryName]);
  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((prev) => prev + 1), 5000);
    return () => clearInterval(timer);
  }, [categoryName]);

  if (!currentWork) return <div className="bg-black h-screen" />;

  return (
    <div 
    key={categoryName} // <--- PLACE IT HERE
    className="min-h-screen bg-black text-white pt-32 overflow-x-hidden selection:bg-white selection:text-black">
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link { position: relative; display: inline-block; }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0; height: 1px;
          bottom: -4px; left: 0;
          background-color: white;
          transition: width 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .nav-link:hover::after { width: 100%; }
      `}} />

      {/* Header */}
      <div className="px-[6%] mb-12  md:mb-24">
        <button 
          onClick={() => navigate("/")} 
          className="nav-link text-[10px] md:text-[11px] tracking-[0.6em] text-zinc-400 hover:text-white mb-6 md:mb-12 uppercase transition-colors"
        >
          ← BACK
        </button>
        <h1 
        className= "font-bold uppercase tracking-[-0.05em] leading-[0.9]" 
        style={{
            fontFamily: "Syncopate, sans-serif",
            fontSize: "clamp(1rem, 5vw, 8rem)",
            wordBreak: "keep-all"
        }}
        >
          {currentWork.title}
        </h1>
      </div>

      {/* Dynamic Content */}
      <div className="flex flex-col gap-y-12">
        {currentWork.layout.map((row, index) => {
          const commonProps = { folder: currentWork.folder, prefix: currentWork.prefix };
          switch (row.type) {
            case "grid3": return <Grid3Row key={index} {...row} {...commonProps} activeIndex={activeIndex} />;
            case "wide": return <WideRow key={index} {...row} {...commonProps} />;
            case "slideshow": return <SlideshowRow key={index} {...row} {...commonProps} activeIndex={activeIndex} />;
            default: return null;
          }
        })}
      </div>

      {/* Footer - Next Project */}
      <footer className="mt-40 mb-32 px-[6%] text-center">
        <p className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase mb-6">Next Category</p>
        <Link 
          to={`/${nextCategory}`} // <--- CHANGE THIS (remove "work")
          className="group inline-block"
        >
          <h2 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter transition-all duration-700 group-hover:tracking-normal" 
          style={{ 
            fontFamily: "Syncopate, sans-serif",
            fontSize: "clamp(1.5rem, 6vw, 5rem)"
            }}>
            {workData[nextCategory].title} →
          </h2>
          <div className="h-[1px] w-0 group-hover:w-full bg-white mx-auto transition-all duration-1000 mt-4" />
        </Link>
      </footer>
    </div>
  );
};

export default WorkGallery;