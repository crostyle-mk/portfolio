import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- IMPORT YOUR COMPONENTS ---
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Hero from "./components/Hero";
import Category from "./components/Category";
import Highlights from "./components/Highlights";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WorkGallery from "./pages/WorkGallery";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";


// ------------------------------------------------------
// HASH SCROLL FIX — Smooth scroll to #highlights, etc.
// ------------------------------------------------------
function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // Delay ensures DOM is fully rendered before scrolling
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
  }, [hash]);

  return null;
}


// ------------------------------------------------------
// MAIN APP
// ------------------------------------------------------
function App() {
  return (
    <>
      <Router>
        <ScrollToHash /> {/* <-- Enables smooth hash scrolling */}

        <div id="top"></div>
        <div className="scroll-smooth antialiased">
          {/* Preload critical assets */}
          <link rel="preload" href="/assets/me/portrait-shot.png" as="image" />
          <link rel="preload" href="/assets/fashion.mp4" as="video" />

          <Navbar />

          <Routes>
            {/* --- HOME PAGE ROUTE --- */}
            <Route
              path="/"
              element={
                <main>
                  <Banner />
                  <About />
                  <Hero />
                  <Category />
                  <Highlights /> {/* <-- Make sure this has id="highlights" */}
                  <Contact />
                </main>
              }
            />

            {/* --- DYNAMIC WORK PAGES --- */}
            <Route path="/:categoryName" element={<WorkGallery />} />
          </Routes>

          <Footer />
        </div>
      </Router>

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
