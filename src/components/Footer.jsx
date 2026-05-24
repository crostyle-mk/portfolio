import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-transparent border-t border-white/5 py-4 md:py-5 text-center">
      <div className="container mx-auto px-4">
        {/* text-[8px] for mobile, text-sm (14px) for desktop */}
        <p className="text-[8px] md:text-sm text-gray-400 tracking-[0.3em] md:tracking-widest uppercase font-light">
          &copy; {new Date().getFullYear()} MK. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;