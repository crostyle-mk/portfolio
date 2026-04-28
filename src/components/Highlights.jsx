import React, { useState, useRef, useEffect, useCallback } from "react";

const Highlights = () => {
  const scrollRef = useRef(null);
  const rafId = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = [
    { id: "h1", src: "h1.jpg", format: "portrait" },
    { id: "h2", src: "h2.jpg", format: "portrait" },
    { id: "h3", src: "h3.jpg", format: "landscape" },
    { id: "h4", src: "h4.jpg", format: "portrait" },
    { id: "h5", src: "h5.jpg", format: "landscape" },
    { id: "h6", src: "h6.jpg", format: "portrait" },
  ];

  // DESKTOP-ONLY smooth scroll (CSS handles it)
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 292 : 512;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount
      });
    }
  };

  const handleScroll = useCallback(() => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      if (!scrollRef.current) {
        rafId.current = null;
        return;
      }
      const container = scrollRef.current;
      const center = container.scrollLeft + container.offsetWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const childCenter =
          rect.left - containerRect.left + rect.width / 2 + container.scrollLeft;

        const distance = Math.abs(center - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) setActiveIndex(closestIndex);
      rafId.current = null;
    });
  }, [activeIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const sidePadding = isMobile
    ? `calc((100vw - 280px) / 2)`
    : `calc((100vw - 500px) / 2)`;

  return (
    <section className="py-10 md:py-20 bg-transparent relative overflow-hidden">
      <div className="px-[6%] mb-2 md:mb-10 text-center md:text-left">
        <h2
          className="text-white text-4xl md:text-7xl font-bold uppercase tracking-tighter"
          style={{ fontFamily: "Syncopate, sans-serif" }}
        >
          Highlights
        </h2>
      </div>

      <div className="relative w-full">
        {!isMobile && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-[100] p-5 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all bg-black/40 backdrop-blur-md"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-[100] p-5 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all bg-black/40 backdrop-blur-md"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className={`flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory items-end outline-none pb-20 ${
            !isMobile ? "scroll-smooth" : ""
          }`}
          style={{
            height: isMobile ? "400px" : "650px",
            paddingLeft: sidePadding,
            paddingRight: sidePadding,
            scrollPaddingLeft: sidePadding,
            scrollPaddingRight: sidePadding,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            const isLandscape = img.format === "landscape";

            return (
              <div
                key={img.id}
                className="flex-none snap-center relative"
                style={{
                  width: isMobile ? "280px" : "500px",
                  height: isMobile ? "280px" : "500px",
                }}
              >
                <div
                  className={`absolute inset-0 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl 
                    transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-[transform,opacity]
                    ${isActive ? "z-50 opacity-100 scale-105 md:scale-110" : "z-10 opacity-20 scale-[0.9]"}
                  `}
                  style={{
                    width: isActive && isLandscape ? (isMobile ? "130%" : "160%") : "95%",
                    left: isActive && isLandscape ? (isMobile ? "-15%" : "-30%") : "0%",
                    height: isActive && isLandscape ? "90%" : "100%",
                    top: isActive && isLandscape ? "5%" : "10%",
                  }}
                >
                  <img
                    src={`/assets/highlights/${img.src}`}
                    alt={`Highlight ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover will-change-[transform]"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.backgroundColor = "#27272a";
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-0 md:mt-10 mb-4 md:mb-10">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] rounded-full transition-all duration-500 ${
              i === activeIndex ? "w-10 bg-white opacity-100" : "w-6 bg-white/20 opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Highlights;
