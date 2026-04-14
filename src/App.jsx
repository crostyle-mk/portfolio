import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- IMPORT YOUR COMPONENTS ---
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Hero from "./components/Hero";
import Category from "./components/Category";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// --- IMPORT YOUR NEW GALLERY PAGE ---
import WorkGallery from "./pages/WorkGallery.jsx";

function App() {
  return (
    <Router>
      <div id="top"></div>
      <div className="scroll-smooth antialiased bg-black">
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