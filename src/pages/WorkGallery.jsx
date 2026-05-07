import React, { useEffect, useState, useMemo, useCallback, memo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

/* -----------------------------------------------------------
   GRID3 ROW
----------------------------------------------------------- */
const Grid3Row = memo(({ ids, mobileIds, folder, prefix }) => {
  const [localIndex, setLocalIndex] = useState(0);

  // Desktop animation loop (every 3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setLocalIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const flatIds = useMemo(
    () =>
      mobileIds ||
      ids.map((item) => (Array.isArray(item) ? item[0] : item)),
    [mobileIds, ids]
  );

  const displayIds = useMemo(() => [...flatIds, ...flatIds], [flatIds]);

  return (
    <div className="relative z-10 w-full">

      {/* MOBILE (scrolling) */}
      <div
        className="md:hidden w-full overflow-x-scroll overflow-y-hidden py-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes scrollLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-15%); }
              }
              .auto-scroll-track {
                animation: scrollLeft 45s linear infinite;
              }
            `,
          }}
        />

        <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4 px-[4%]">
          HIGHLIGHTS
        </h3>

        <div className="flex gap-0 w-max auto-scroll-track">
          {displayIds.map((id, idx) => (
            <div
              key={`scroll-${id}-${idx}`}
              className="w-[30vw] aspect-[2/3] px-1 flex-shrink-0"
            >
              <div className="w-full h-full overflow-hidden rounded-sm shadow-lg relative">
                <img
                  src={`/assets/${folder}/${prefix}${id}.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP (animated) */}
      <div className="hidden md:grid grid-cols-3 gap-2 md:gap-8 px-[5%] mb-12">
        {ids.map((cellData, idx) => {
          const cellImages = Array.isArray(cellData) ? cellData : [cellData];
          const indexToShow = localIndex % cellImages.length;

          return (
            <div
              key={`grid-${idx}`}
              className="aspect-[2/3] overflow-hidden relative"
              style={{ contain: "layout style paint" }}
            >
              {cellImages.map((id, imgIdx) => {
                const isActive = imgIdx === indexToShow;
                return (
                  <img
                    key={`img-${id}`}
                    src={`/assets/${folder}/${prefix}${id}.jpg`}
                    loading="lazy"
                    decoding="async"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                    style={{
                      opacity: isActive ? 1 : 0,
                      zIndex: isActive ? 2 : 1,
                      transitionDelay: isActive ? `${idx * 150}ms` : "0ms",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
});

/* -----------------------------------------------------------
   WIDE ROW
----------------------------------------------------------- */
const WideRow = memo(({ id, isVideo, pos, fit, folder, prefix }) => {
  const isContained = fit === "contain";

  return (
    <div className="w-full flex justify-center mb-10 md:mb-16 px-[5%]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes cinematicPulse {
          0% { transform: scale(1.01); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1.01); }
        }
        .cinematic-media {
          animation: cinematicPulse 12s ease-in-out infinite;
          will-change: transform;
        }
      `,
        }}
      />

      <div
        className={`relative overflow-hidden shadow-lg transition-all duration-1000 ${
          isContained
            ? "w-auto h-[30vh] md:h-[60vh]"
            : "w-full aspect-video md:aspect-auto md:h-[60vh]"
        }`}
        style={{ contain: "layout style paint" }}
      >
        {isVideo ? (
          <video
            src={`/assets/${folder}/${prefix}${id}.mp4`}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover cinematic-media"
            onError={(e) => {
              e.target.style.display = "none";
            }}
            style={{ objectPosition: `center ${pos || "50%"}` }}
          />
        ) : (
          <img
            src={`/assets/${folder}/${prefix}${id}.jpg`}
            loading="lazy"
            decoding="async"
            alt=""
            className="h-full w-full object-cover cinematic-media"
            onError={(e) => {
              e.target.style.display = "none";
            }}
            style={{ objectPosition: `center ${pos || "50%"}` }}
          />
        )}
      </div>
    </div>
  );
});

/* -----------------------------------------------------------
   SLIDE (used by WideSlideshowRow)
----------------------------------------------------------- */
function Slide({ item, index, isCurrent, folder, prefix, pos, onNext }) {
  const id = typeof item === "object" ? item.id : item;
  const isVideo = typeof item === "object" ? item.isVideo : false;
  const itemPos = typeof item === "object" && item.pos ? item.pos : pos;

  const videoRef = useRef(null);

  useEffect(() => {
    if (!isVideo) return;
    const v = videoRef.current;
    if (!v) return;

    if (isCurrent) {
      const p = v.play?.();
      if (p?.catch) p.catch(() => {});
    } else {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {}
    }
  }, [isVideo, isCurrent, id]);

  if (isVideo && !isCurrent) return null;

  return (
    <div
      className="absolute inset-0 transition-opacity duration-1000"
      style={{
        opacity: isCurrent ? 1 : 0,
        zIndex: isCurrent ? 10 : 0,
        pointerEvents: isCurrent ? "auto" : "none",
      }}
    >
      {isVideo ? (
        <video
          key={`vid-${id}`}
          ref={videoRef}
          src={`/assets/${folder}/${prefix}${id}.mp4`}
          onEnded={onNext}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ objectPosition: `center ${itemPos}` }}
        />
      ) : (
        <img
          src={`/assets/${folder}/${prefix}${id}.jpg`}
          className="h-full w-full object-cover"
          style={{ objectPosition: `center ${itemPos}` }}
          alt=""
        />
      )}
    </div>
  );
}

/* -----------------------------------------------------------
   WIDE SLIDESHOW ROW
----------------------------------------------------------- */
const WideSlideshowRow = memo(
  ({ images, activeIndex, folder, prefix, pos, onNext }) => {
    return (
      <div className="w-full">
        <div
          className="
            relative w-full 
            h-[20vh] mb-[-10vh]
            md:h-[60vh] md:mb-16 md:px-[5%]
            overflow-hidden
          "
          style={{ contain: "layout" }}
        >
          <div className="relative w-full h-full shadow-lg overflow-hidden">
            {images.map((item, i) => (
              <Slide
                key={`slide-${i}`}
                item={item}
                index={i}
                isCurrent={i === activeIndex % images.length}
                folder={folder}
                prefix={prefix}
                pos={pos}
                onNext={onNext}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

/* -----------------------------------------------------------
   WIDE SLIDESHOW CONTROLLER
----------------------------------------------------------- */
function WideSlideshowController({ currentWork, categoryName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const currentWorkRef = useRef(currentWork);
  const lastAdvanceRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    currentWorkRef.current = currentWork;
  }, [currentWork]);

  const onNext = useCallback(() => {
    const now = Date.now();
    if (now - lastAdvanceRef.current < 500) return;
    lastAdvanceRef.current = now;
    setActiveIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!currentWorkRef.current) return;

    const tick = () => {
      if (document.hidden) return;

      const layoutItem = currentWorkRef.current.layout.find(
        (l) => l.type === "wideSlideshow"
      );

      const images = Array.isArray(layoutItem?.images)
        ? layoutItem.images
        : null;

      if (!images || images.length === 0) return;

      const idx = activeIndexRef.current % images.length;
      const currentSlide = images[idx];

      if (currentSlide?.isVideo) return;

      setActiveIndex((prev) => prev + 1);
    };

    const timer = setInterval(tick, 3000);
    return () => clearInterval(timer);
  }, [categoryName]);

  const layoutItem = currentWork.layout.find(
    (l) => l.type === "wideSlideshow"
  );

  const images = layoutItem.images;
  const folder = currentWork.folder;
  const prefix = currentWork.prefix;
  const pos = layoutItem.pos || "50%";

  return (
    <WideSlideshowRow
      images={images}
      activeIndex={activeIndex}
      folder={folder}
      prefix={prefix}
      pos={pos}
      onNext={onNext}
    />
  );
}

/* -----------------------------------------------------------
   GRID COMPARISON
----------------------------------------------------------- */
const GridComparisonRow = memo(({ items, folder, prefix }) => (
  <div className="grid grid-cols-3 gap-2 md:gap-8 px-[2%] md:px-[5%] mb-12">
    {items.map((item, idx) => (
      <div key={`comparison-${idx}`} className="flex flex-col gap-2">
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
));

/* -----------------------------------------------------------
   BEFORE/AFTER SLIDER
----------------------------------------------------------- */
const BeforeAfterSlider = memo(({ before, after, folder }) => {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x =
      ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) /
      rect.width *
      100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") setSliderPos((prev) => Math.max(0, prev - 5));
    if (e.key === "ArrowRight") setSliderPos((prev) => Math.min(100, prev + 5));
  }, []);

  return (
    <div
      className="relative w-full h-full cursor-col-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPos)}
      aria-label="Before and after comparison slider"
      style={{ contain: "layout style" }}
    >
      <img
        src={`/assets/${folder}/${after}`}
        loading="lazy"
        decoding="async"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={`/assets/${folder}/${before}`}
          loading="lazy"
          decoding="async"
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/40 z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      />
    </div>
  );
});

/* -----------------------------------------------------------
   SMALL SLIDESHOW ROW
----------------------------------------------------------- */
const SlideshowRow = memo(({ images, folder, prefix }) => {
  const [localIndex, setLocalIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full flex justify-center mb-5 md:mb-16 px-[5%]">
      <div
        className="relative overflow-hidden shadow-lg w-full aspect-video md:aspect-auto md:h-[80vh]"
        style={{ contain: "layout style paint" }}
      >
        {images.map((img, i) => {
          const isCurrent = i === localIndex;

          return (
            <div
              key={`slideshow-${img.id}`}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                zIndex: isCurrent ? 20 : 10,
                opacity: isCurrent ? 1 : 0,
              }}
            >
              <img
                src={`/assets/${folder}/${prefix}${img.id}.jpg`}
                loading="lazy"
                decoding="async"
                alt=""
                className="w-full h-full object-cover"
                style={{ objectPosition: img.pos || "center" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

/* -----------------------------------------------------------
   MAIN WORKGALLERY
----------------------------------------------------------- */
const WorkGallery = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  /* ---------------- DATA ---------------- */
  const workData = useMemo(
    () => ({
      fashion: {
        title: "Fashion & Lifestyle",
        folder: "fashion",
        prefix: "f",
        layout: [
          {
            type: "wideSlideshow",
            images: [
              1,
                { id: 13, isVideo: true, pos: "50%" },
              { id: 12, isVideo: true, pos: "90%" }
            ],
            pos: "50%",
          },
          {
            type: "grid3",
            ids: [
              [4, 5, 9],
              [8, 2, 6],
              [7, 10, 3],
            ],
            mobileIds: [4, 5, 9, 8, 2, 6, 7, 10, 3],
          },
        ],
      },

      product: {
        title: "Product & Brand",
        folder: "product",
        prefix: "p",
        layout: [
          {
            type: "wideSlideshow",
            images: [{ id: 1, isVideo: true }],
            pos: "50%",
          },
          {
            type: "grid3",
            ids: [
              [4, 9],
              [3, 2],
              [10, 8],
            ],
            mobileIds: [4, 8, 9, 10, 2, 3],
          },
          {
            type: "slideshow",
            images: [
              { id: 5, pos: "center" },
              { id: 6, pos: "center" },
              { id: 7, pos: "center" },
            ],
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
            images: [1, 22, 23, 24],
            pos: "50%",
          },
          {
            type: "grid3",
            ids: [
              [2, 7, 10, 13],
              [3, 8, 11, 14],
              [4, 9, 12, 15],
            ],
            mobileIds: [
              2, 7, 10, 13, 3, 8, 11, 14, 4, 9, 12, 15,
            ],
          },
          {
            type: "slideshow",
            images: [
              { id: 5, pos: "center" },
              { id: 6, pos: "center" },
            ],
          },
          {
            type: "gridComparison",
            items: [
              { before: 17, after: 16 },
              { before: 19, after: 18 },
              { before: 21, after: 20 },
            ],
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
            images: [
              1,
              8,
              { id: 9, isVideo: true }
            ],
            pos: "50%",
          },
          {
            type: "grid3",
            ids: [
              [2, 5],
              [3, 7],
              [4, 6],
            ],
            mobileIds: [2, 5, 3, 7, 4, 6],
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
    }),
    []
  );

  /* ---------------- CATEGORY LOGIC ---------------- */
  const categories = useMemo(() => Object.keys(workData), [workData]);

  const currentIndex = useMemo(
    () => categories.indexOf(categoryName),
    [categories, categoryName]
  );

  const nextCategory = useMemo(
    () => categories[(currentIndex + 1) % categories.length],
    [categories, currentIndex]
  );

  const currentWork = workData[categoryName];

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [categoryName]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [categoryName]);

  if (!currentWork) return <div className="h-screen bg-black" />;

  /* ---------------- RENDER ---------------- */
  return (
    <div
      key={categoryName}
      className="min-h-screen text-white pt-32 overflow-x-hidden selection:bg-white selection:text-black relative"
    >
      {isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}

      {/* HEADER */}
      <div className="px-[6%] mb-12 md:mb-24">
        <button
          onClick={() => navigate("/")}
          className="nav-link text-[10px] md:text-[11px] tracking-[0.6em] text-zinc-300 hover:text-white mb-6 md:mb-12 uppercase transition-colors"
        >
          ← Back
        </button>

        <h1
          className="font-bold uppercase tracking-[-0.01em] leading-[0.9]"
          style={{
            fontFamily: "Syncopate, sans-serif",
            fontSize: "clamp(1rem, 5vw, 4rem)",
            wordBreak: "keep-all",
          }}
        >
          {currentWork.title}
        </h1>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-y-12">
        {currentWork.layout.map((row, index) => {
          const commonProps = {
            folder: currentWork.folder,
            prefix: currentWork.prefix,
          };

          switch (row.type) {
            case "grid3":
              return (
                <Grid3Row
                  key={index}
                  {...row}
                  {...commonProps}
                  activeIndex={0}
                />
              );

            case "wide":
              return <WideRow key={index} {...row} {...commonProps} />;

            case "slideshow":
              return (
                <SlideshowRow
                  key={index}
                  {...row}
                  {...commonProps}
                />
              );

            case "wideSlideshow":
              return (
                <WideSlideshowController
                  key={index}
                  currentWork={currentWork}
                  categoryName={categoryName}
                />
              );

            case "gridComparison":
              return (
                <GridComparisonRow
                  key={index}
                  {...row}
                  {...commonProps}
                />
              );

            default:
              return null;
          }
        })}
      </div>

      {/* FOOTER */}
      <footer className="mt-40 mb-32 px-[6%] text-center">
        <p className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase mb-6">
          Next Category
        </p>

        <Link to={`/${nextCategory}`} className="group inline-block">
          <h2
            className="text-3xl md:text-7xl font-bold uppercase tracking-tighter transition-all duration-700 group-hover:tracking-normal"
            style={{
              fontFamily: "Syncopate, sans-serif",
              fontSize: "clamp(1.5rem, 6vw, 5rem)",
            }}
          >
            {workData[nextCategory].title} →
          </h2>

          <div className="h-[1px] w-0 group-hover:w-full bg-white mx-auto transition-all duration-1000 mt-4" />
        </Link>
      </footer>
    </div>
  );
};

export default WorkGallery;
