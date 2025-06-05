"use client"; // if you're using App Router (optional)
import { Link } from "react-scroll";
import React from "react";

const Navbar = () => {
  return (
    <nav
      className="h-20 w-full bg-[rgba(34,40,49,0.85)] sticky top-0 z-50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border-b-2   border-slate-700 
"
    >
      <div className="max-w-7xl h-full mx-auto px-4  flex justify-center  sm:justify-end items-center gap-8 sm:pr-32 ">
        <Link
          to="HOME"
          smooth={true}
          duration={500}
          className="text-white text-2xl hover:text-gray-300 transition cursor-pointer"
        >
          Home
        </Link>
        <Link
          to="PLAYLIST"
          smooth={true}
          duration={500}
          className="text-white text-2xl hover:text-gray-300 transition cursor-pointer"
        >
          Our Music
        </Link>
        <Link
          to="CONTACT"
          smooth={true}
          duration={500}
          className="text-white text-2xl hover:text-gray-300 transition cursor-pointer"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
