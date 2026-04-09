import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6 text-center">
      &copy; {new Date().getFullYear()} MK. All Rights Reserved.
    </footer>
  );
};

export default Footer;