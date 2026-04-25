import React from "react";

const Footer = () => {
  return (
    
    <footer className="w-full bg-transparent backdrop-blur-sm border-t border-white/5 py-10 text-center">
      <div className="container mx-auto px-4">
        <p className="text-gray-400 text-sm tracking-widest uppercase font-light">
          &copy; {new Date().getFullYear()} MK. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;