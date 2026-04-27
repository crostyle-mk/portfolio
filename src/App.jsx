import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- IMPORT YOUR COMPONENTS ---
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Hero from "./components/Hero";
import Category from "./components/Category";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WorkGallery from "./pages/WorkGallery";

function App() {
  return (
    <Router>
      <div id="top"></div>
      <div className="scroll-smooth antialiased ">
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
                <Hero /> 
                <Category />
                 <About />
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
  );
}

// --- THIS LINE IS CRITICAL: IT FIXES THE EXPORT ERROR ---
export default App;