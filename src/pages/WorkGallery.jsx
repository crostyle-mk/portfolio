import React, { useEffect, useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";


const Grid3Row = ({ ids, folder, prefix, activeIndex }) => (

  <>

    <style dangerouslySetInnerHTML={{ __html: `

      @keyframes cinematicSlow {

        0% { transform: scale(1); }

        50% { transform: scale(1.03); }

        100% { transform: scale(1); }

      }

    `}} />

    <div className="grid grid-cols-3 gap-2 md:gap-8 px-[5%] mb-12">

      {ids.map((cellData, idx) => {

        const cellImages = Array.isArray(cellData) ? cellData : [cellData];

        const localIndex = Math.floor((activeIndex + idx) % cellImages.length);

        return (

          <div key={idx} className="aspect-[2/3]  overflow-hidden relative">

            {cellImages.map((id, imgIdx) => {

              const isActive = imgIdx === localIndex;

              return (

                <img

                  key={id}

                  src={`/assets/${folder}/${prefix}${id}.jpg`}

                  loading="lazy"

                  alt={folder}

                  className="absolute inset-0 w-full h-full object-cover"

                  onError={(e) => e.target.style.display = 'none'}

                  style={{

                    transition: "opacity 1000ms cubic-bezier(0.2, 0, 0.1, 1)",

                    transitionDelay: isActive ? `${idx * 150}ms` : "0ms",

                    opacity: isActive ? 1 : 0,

                    zIndex: isActive ? 2 : 1,

                    animation: "cinematicSlow 10s ease-in-out infinite",

                    animationDelay: `${idx * 1}s`, // Each column starts 2 seconds apart

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

        ${isContained ? "w-auto h-[30vh] md:h-[60vh]" : "w-full aspect-video md:aspect-auto md:h-[60vh] "}`}>

        {isVideo ? (

          <video src={`/assets/${folder}/${prefix}${id}.mp4`}

          autoPlay loop muted playsInline

          className="h-full w-full object-cover cinematic-media"

          onError={(e) => e.target.style.display = 'none'}

         style={{

              objectPosition: `center ${pos || "50%"}`,

              transform: 'scale(1)'

            }}

          />

        ) : (

          <img src={`/assets/${folder}/${prefix}${id}.jpg`}

          loading="lazy"

          className="h-full w-full object-cover cinematic-media"

          onError={(e) => e.target.style.display = 'none'}

         style={{

              objectPosition: `center ${pos || "50%"}`,

              transform: 'scale(1)'

            }}

          alt={folder}

          />

        )}

      </div>

    </div>

  );

};


const WideSlideshowRow = ({ images, activeIndex, folder, prefix, pos }) => {
  return (
    <div className="w-full flex justify-center mb-10 md:mb-16 px-[5%]">
      {/* Container dimensions and shadow match your WideRow exactly */}
      <div className="relative overflow-hidden shadow-2xl w-full aspect-video md:aspect-auto md:h-[60vh] ">
        {images.map((imgId, i) => {
          // Logic to determine which image is currently active
          const isCurrent = i === activeIndex % images.length;
          
          return (
            <div 
              key={imgId} 
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ 
                zIndex: isCurrent ? 20 : 10, 
                opacity: isCurrent ? 1 : 0,
                willChange: "opacity, transform"
              }}
            >
              <img 
                src={`/assets/${folder}/${prefix}${imgId}.jpg`}
                loading="lazy"
                alt={folder}
                className="h-full w-full object-cover"
                onError={(e) => e.target.style.display = 'none'}
                style={{
                  objectPosition: `center ${pos || "50%"}`,
                  /* Applying your WideRow's cinematicPulse for that breathing effect */
                  animation: isCurrent ? "cinematicPulse 12s ease-in-out infinite" : "none",
                  transform: 'scale(1)'
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GridComparisonRow = ({ items, folder, prefix }) => {

  return (

    <div className="grid grid-cols-3 gap-2 md:gap-8 px-[2%] md:px-[5%] mb-12">

      {items.map((item, idx) => (

        <div key={idx} className="flex flex-col gap-2">

          <div className="relative aspect-[2/3] overflow-hidden group">

             <BeforeAfterSlider

                before={`${prefix}${item.before}.jpg`}

                after={`${prefix}${item.after}.jpg`}

                folder={folder}

             />

          </div>

        </div>

      ))}

    </div>

  );

};
// Internal Slider Logic for the Grid

const BeforeAfterSlider = ({ before, after, folder }) => {

  const [sliderPos, setSliderPos] = useState(50);

 const handleMove = (e) => {

    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) / rect.width * 100;

    setSliderPos(Math.max(0, Math.min(100, x)));

  };

  return (

    <div

      className="relative w-full h-full cursor-col-resize select-none"

      onMouseMove={handleMove}

      onTouchMove={handleMove}

      onKeyDown={(e) => {

        if (e.key === 'ArrowLeft') setSliderPos(Math.max(0, sliderPos - 5));

        if (e.key === 'ArrowRight') setSliderPos(Math.min(100, sliderPos + 5));

      }}

      tabIndex={0}

      role="slider"

      aria-valuemin={0}

      aria-valuemax={100}

      aria-valuenow={Math.round(sliderPos)}

      aria-label="Before and after comparison slider"

    >

      {/* After Image */}

      <img

        src={`/assets/${folder}/${after}`}
        
        loading="lazy"

        alt="after comparison"

        className="absolute inset-0 w-full h-full object-cover"

        onError={(e) => e.target.style.display = 'none'}

      />

      {/* Before Image */}

      <div

        className="absolute inset-0 w-full h-full z-10"

        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}

      >

        <img

          src={`/assets/${folder}/${before}`}

          loading="lazy"

          alt="before comparison"

          className="w-full h-full object-cover"

          onError={(e) => e.target.style.display = 'none'}

        />

      </div>

      {/* Line */}

      <div

        className="absolute top-0 bottom-0 w-[1px] bg-white/40 z-20"

        style={{ left: `${sliderPos}%` }}

      />

    </div>

  );

};



const SlideshowRow = ({ images, activeIndex, folder, prefix }) => (

  <div className="w-full px-[5%] mb-20">

    <div className="relative w-full h-[40vh] md:h-[80vh] overflow-hidden shadow-2xl">

      {images.map((img, i) => {

        const isCurrent = i === activeIndex % images.length;

        return (

          <div

            key={i}

            className="absolute inset-0"

            style={{

              zIndex: isCurrent ? 20 : 10,

              opacity: isCurrent ? 1 : 0,

              /* Matching your Grid's smooth 1000ms transition */

              transition: "opacity 1000ms cubic-bezier(0.1, 1, 0.1, 1)"

            }}

          >

            <img

              src={`/assets/${folder}/${prefix}${img.id}.jpg`}

              loading="lazy"

              alt={folder}

              className="w-full h-full object-cover"

              onError={(e) => e.target.style.display = 'none'}

              style={{

                objectPosition: img.pos || "center",

                /* Matching Grid's scale: Only 1.05 instead of 1.1 to keep clarity */

                animation: isCurrent ? "cinematicSlow 15s ease-in-out infinite" : "none",

                willChange: "transform, opacity"

              }}

            />

          </div>

        );

      })}

    </div>

    <style dangerouslySetInnerHTML={{ __html: `

      @keyframes cinematicSlow {

        0% { transform: scale(1); }

        50% { transform: scale(1.03); }

        100% { transform: scale(1); }

      }

    `}} />

  </div>

);


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
        [4, 5, 9], // Wrap in brackets to enable the cycling logic
        [8, 2, 6],
        [7, 10, 3]

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

        {

      type: "grid3",

      ids: [
        [4, 9,], // Wrap in brackets to enable the cycling logic
        [3, 2,],
        [10, 8,]

      ]

    },
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

        { 
      type: "wideSlideshow", 
      images: [1, 22, 23, 24], // These f1, f2, f3 images will now cycle automatically
      pos: "50%" // Adjust vertical centering
    },

       {

        type: "grid3",

        ids: [
          [2, 7, 10, 13], // Left column cycles these 4
          [3, 8, 11, 14], // Middle column cycles these 4
          [4, 9, 12, 15]  // Right column cycles these 4

        ]

      },

        { type: "slideshow", images: [{ id: 5, pos: "center" }, { id: 6, pos: "center" }

        ]

      },

      {

      type: "gridComparison",

      items: [
        { before: 17, after: 16 }, // Column 1: Before f4, After f5
        { before: 19, after: 18 }, // Column 2: Before f6, After f7
        { before: 21, after: 20 }  // Column 3: Before f8, After f9

      ]

    },

      ],

    },

    street: {

      title: "Street & Architecture",

      folder: "street",

      prefix: "s",

      layout: [

         { 
      type: "wideSlideshow", 
      images: [1, 8],
      pos: "50%" 
    },

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

    const timer = setInterval(() => setActiveIndex((prev) => prev + 1), 3000);

    return () => clearInterval(timer);

  }, 
  
  [categoryName]);

  if (!currentWork) return <div className="h-screen" />;

  return (

    <div

    key={categoryName} // <--- PLACE IT HERE

    className="min-h-screen  text-white pt-32 overflow-x-hidden selection:bg-white selection:text-black">

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

      <div className="px-[6%] mb-12  md:mb-24">

        <button

          onClick={() => navigate("/")}

          className="nav-link text-[10px] md:text-[11px] tracking-[0.6em] text-zinc-300 hover:text-white mb-6 md:mb-12 uppercase transition-colors"

        >
          ← Back
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

            case "wideSlideshow": return <WideSlideshowRow key={index} {...row} {...commonProps} activeIndex={activeIndex} />;

            case "gridComparison": return <GridComparisonRow key={index} {...row} {...commonProps} />;

            default: return null;

          }

        })}

      </div>

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