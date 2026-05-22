import React, { useEffect, useState, useMemo, useCallback, memo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./WorkGallery.module.css";

/* -----------------------------------------------------------
   VIDEO VISIBILITY HOOK
----------------------------------------------------------- */
function useVideoVisibility() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* -----------------------------------------------------------
   GRID3 ROW
----------------------------------------------------------- */
const Grid3Row = memo(({ ids, mobileIds, folder, prefix }) => {
  const [localIndex, setLocalIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [ids]);

  const flatIds = useMemo(
    () => mobileIds || ids.map((item) => (Array.isArray(item) ? item[0] : item)),
    [mobileIds, ids]
  );

  const displayIds = useMemo(() => [...flatIds, ...flatIds], [flatIds]);

  return (
    <div className="relative z-10 w-full">

      {/* MOBILE */}
      <div className="md:hidden w-full overflow-x-scroll overflow-y-hidden py-4" style={{ WebkitOverflowScrolling: "touch" }}>
        <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4 px-[4%]">
          HIGHLIGHTS
        </h3>

        <div className={`flex gap-0 w-max ${styles.autoScrollTrack}`}>
          {displayIds.map((id, idx) => (
            <div key={`scroll-${id}-${idx}`} className="w-[30vw] aspect-[2/3] px-1 flex-shrink-0">
              <div className="w-full h-full overflow-hidden rounded-sm shadow-lg relative">
                <img
                  src={`/assets/${folder}/${prefix}${id}.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-3 gap-2 md:gap-8 px-[5%] mb-12">
        {ids.map((cellData, idx) => {
          const cellImages = Array.isArray(cellData) ? cellData : [cellData];
          const indexToShow = localIndex % cellImages.length;

          return (
            <div key={`grid-${idx}`} className="aspect-[2/3] overflow-hidden relative" style={{ contain: "layout style paint" }}>
              {cellImages.map((id, imgIdx) => {
                const isActive = imgIdx === indexToShow;
                return (
                  <img
                    key={`img-${id}`}
                    src={`/assets/${folder}/${prefix}${id}.jpg`}
                    loading="lazy"
                    decoding="async"
                    alt=""
                    className={`${styles.gridImg} ${isActive ? styles.active : styles.inactive}`}
                    style={{ transitionDelay: isActive ? `${idx * 150}ms` : "0ms" }}
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
      <div
        className={`relative overflow-hidden shadow-lg transition-all duration-1000 ${
          isContained ? "w-auto h-[30vh] md:h-[60vh]" : "w-full aspect-video md:aspect-auto md:h-[60vh]"
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
            className={`h-full w-full object-cover ${styles.cinematicMedia}`}
            style={{ objectPosition: `center ${pos || "50%"}` }}
          />
        ) : (
          <img
            src={`/assets/${folder}/${prefix}${id}.jpg`}
            loading="lazy"
            decoding="async"
            alt=""
            className={`h-full w-full object-cover ${styles.cinematicMedia}`}
            style={{ objectPosition: `center ${pos || "50%"}` }}
          />
        )}
      </div>
    </div>
  );
});

/* -----------------------------------------------------------
   SLIDE (WideSlideshow)
----------------------------------------------------------- */
function Slide({ item, index, isCurrent, folder, prefix, pos, onNext }) {
  const id = typeof item === "object" ? item.id : item;
  const isVideo = typeof item === "object" ? item.isVideo : false;
  const itemPos = typeof item === "object" && item.pos ? item.pos : pos;

  // NEW: Extract caption safely
  const caption = typeof item === "object" ? item.caption : null;

  const videoRef = useRef(null);
  const [containerRef, visible] = useVideoVisibility();

  useEffect(() => {
    if (!isVideo) return;
    const v = videoRef.current;
    if (!v) return;

    if (visible && isCurrent) v.play().catch(() => {});
    else v.pause();
  }, [visible, isCurrent, isVideo]);

  return (
    <div
      ref={containerRef}
      className={`${styles.slide} ${isCurrent ? styles.slideActive : styles.slideInactive}`}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={`/assets/${folder}/${prefix}${id}.mp4`}
          muted
          playsInline
          preload="metadata"
          onEnded={onNext}
          className="w-full h-full object-cover"
          style={{ objectPosition: `center ${itemPos}` }}
        />
      ) : (
        <img
          src={`/assets/${folder}/${prefix}${id}.jpg`}
          className="w-full h-full object-cover"
          style={{ objectPosition: `center ${itemPos}` }}
          alt=""
        />
      )}

{/* ⭐ CAPTION OVERLAY (only when slide is active and on desktop) */}
{caption && isCurrent && (
  <div className="hidden md:block absolute left-[4%] bottom-12 z-20 pointer-events-none">
   <p
  className="
    text-white text-xs md:text-sm uppercase font-bold tracking-[0.4em] opacity-80
    md:font-[Syncopate,sans-serif]
  "
  style={{ fontFamily: "system-ui, sans-serif" }} // mobile override
>
  {caption}
</p>

        </div>
      )}
    </div>
  );
}


/* -----------------------------------------------------------
   WIDE SLIDESHOW ROW
----------------------------------------------------------- */
const WideSlideshowRow = memo(({ images, activeIndex, folder, prefix, pos, onNext }) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[20vh] mb-[-10vh] md:h-[60vh] md:mb-16 md:px-[5%] overflow-hidden" style={{ contain: "layout paint style" }}>
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
              caption={typeof item === "object" ? item.caption : null}
            />
          ))}
        </div>
      </div>
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
      <div className="relative overflow-hidden shadow-lg w-full aspect-video md:aspect-auto md:h-[80vh]" style={{ contain: "layout style paint" }}>
        {images.map((img, i) => {
          const isCurrent = i === localIndex;

          return (
            <div
              key={`slideshow-${img.id}`}
              className={`${styles.smallSlide} ${isCurrent ? styles.smallSlideActive : styles.smallSlideInactive}`}
            >
              <img
                src={`/assets/${folder}/${prefix}${img.id}.jpg`}
                loading="lazy"
                decoding="async"
                alt=""
                className="w-full h-full object-cover"
                style={{ objectPosition: img.pos || "center" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

/* -----------------------------------------------------------
   BEFORE/AFTER SLIDER
----------------------------------------------------------- */
const BeforeAfterSlider = memo(({ before, after, folder }) => {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) / rect.width * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") setSliderPos((prev) => Math.max(0, prev - 5));
    if (e.key === "ArrowRight") setSliderPos((prev) => Math.min(100, prev + 5));
  }, []);

  return (
    <div
      className={styles.beforeAfterContainer}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPos)}
      aria-label="Before and after comparison slider"
    >
      <img
        src={`/assets/${folder}/${after}`}
        loading="lazy"
        decoding="async"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className={styles.beforeAfterClip}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={`/assets/${folder}/${before}`}
          loading="lazy"
          decoding="async"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={styles.beforeAfterDivider}
        style={{ left: `${sliderPos}%` }}
      />
    </div>
  );
});

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
   WIDE SLIDESHOW CONTROLLER
----------------------------------------------------------- */
function WideSlideshowController({ currentWork, layoutItem, categoryName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const lastAdvanceRef = useRef(0);
  const imagesRef = useRef(layoutItem.images || []);

  // When layoutItem changes (new slideshow), reset images + index
  useEffect(() => {
    imagesRef.current = layoutItem.images || [];
    setActiveIndex(0);
  }, [layoutItem]);

  // First auto‑advance
  useEffect(() => {
    setTimeout(() => setActiveIndex(1), 1000);
  }, []);

  // Keep ref synced
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const onNext = useCallback(() => {
    const now = Date.now();
    if (now - lastAdvanceRef.current < 400) return;
    lastAdvanceRef.current = now;
    setActiveIndex((prev) => prev + 1);
  }, []);

  // Autoplay
  useEffect(() => {
    const tick = () => {
      if (document.hidden) return;

      const images = imagesRef.current;
      if (!images.length) return;

      const idx = activeIndexRef.current % images.length;
      const currentSlide = images[idx];

      if (currentSlide?.isVideo) return;

      setActiveIndex((prev) => prev + 1);
    };

    const timer = setInterval(tick, 3000);
    return () => clearInterval(timer);
  }, [categoryName]);

  if (!layoutItem || !layoutItem.images) return null;

  return (
    <div className="relative flex flex-col items-center w-full">
      <WideSlideshowRow
        images={layoutItem.images}
        activeIndex={activeIndex}
        folder={currentWork.folder}
        prefix={currentWork.prefix}
        pos={layoutItem.pos || "50%"}
        onNext={onNext}
      />

      {/* DOTS */}
      <div className="flex justify-center gap-3 z-30 absolute left-1/2 -translate-x-1/2 bottom-2 translate-y-20 md:bottom-4 md:translate-y-[-6px]">
        {layoutItem.images.map((_, i) => {
          const total = layoutItem.images.length;
          const isActive = i === activeIndex % total;

          return (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-1 h-1 md:w-2 md:h-2 rounded-full cursor-pointer transition-all duration-300 ${
                isActive ? "bg-white scale-125" : "bg-white/30"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}


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
            ],
            pos: "60%",
          },
          {
            type: "grid3",
            ids: [
              [4, 5, 9],
              [2, 3, 6],
              [7, 10, 8],
            ],
            mobileIds: [4, 5, 9, 8, 2, 6, 7, 10, 3],
          },
          {
            type: "wideSlideshow",
            images: [
              { id: 13, caption: "Fashion show" },
              { id: 17, pos: "20%", caption: "Nemara group" },
            ],
          },
           {
            type: "grid3",
            ids: [
              [14], [15], [16]
            ],
            mobileIds: [14, 15, 16],
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
              [10, 2],
              [3, 8],
            ],
            mobileIds: [4, 8, 9, 10, 2, 3],
          },
          {
            type: "slideshow",
            images: [
              { id: 5, pos: "center" },
              { id: 6, pos: "center" },
              { id: 7, pos: "center" },
              { id: 11, pos: "center" },
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
            images: [1, 
               {id: 22, caption: "gulfood" }, 
               {id: 23, caption: "gulfood"},
               {id: 24, caption: "gulfood"}
              ],
            pos: "50%",
          },
          {
            type: "grid3",
            ids: [
              [2, 7, 13],
              [3, 11, 14],
              [4,12, 15],
            ],
            mobileIds: [
              2, 7, 13, 8, 11, 14, 4, 12, 15,
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
              { id: 9, isVideo: true },
              10,
              { id: 11, pos: "80%" },
              12,
              13,
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
        layout: [],
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
                   layoutItem={row} 
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
<footer className="text-center px-[6%] mt-10 mb-10 md:mt-40 md:mb-32">
  {nextCategory === "food" ? (
    /* Food category is disabled → send user to Highlights on Home */
    <Link to="/#highlights" className="group inline-block">
      <p className="text-zinc-300 uppercase text-[6px] tracking-[0.50em] mb-1 md:text-[10px] md:tracking-[0.5em] md:mb-6">
        Return Home
      </p>
      <h2
        className="text-3xl md:text-7xl font-bold uppercase tracking-tighter transition-all duration-700 group-hover:tracking-normal"
        style={{
          fontFamily: "Syncopate, sans-serif",
          fontSize: "clamp(1.5rem, 3vw, 5rem)",
        }}
      >
        Highlights →
      </h2>
      <div className="h-[1px] w-0 group-hover:w-full bg-white mx-auto transition-all duration-1000 mt-4" />
    </Link>
  ) : (
    /* Normal next category */
    <Link to={`/${nextCategory}`} className="group inline-block">
      <p className="text-zinc-300 uppercase text-[6px] tracking-[0.50em] mb-1 md:text-[10px] md:tracking-[0.5em] md:mb-6">
        Next Category
      </p>
      <h2
        className="text-3xl md:text-7xl font-bold uppercase tracking-tighter transition-all duration-700 group-hover:tracking-normal"
        style={{
          fontFamily: "Syncopate, sans-serif",
          fontSize: "clamp(1.5rem, 3vw, 5rem)",
        }}
      >
        {workData[nextCategory]?.title} →
      </h2>
      <div className="h-[1px] w-0 group-hover:w-full bg-white mx-auto transition-all duration-1000 mt-4" />
    </Link>
  )}
</footer>
    </div>
  );
};

export default WorkGallery;
