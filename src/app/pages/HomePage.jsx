"use client";
import React from "react";
import AudioVisualCircle from "../components/AudioVisualCircle";
import { Element } from "react-scroll";
const HomePage = () => {
  return (
    <Element
      name="HOME"
      className="h-[calc(100vh-80px)] w-full  flex flex-col items-center md:flex-row"
    >
      <div className="w-full h-72 sm:h-full md:w-1/2 order-2 md:order-1 flex items-start sm:items-center justify-center p-6 md:p-8 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl text-white font-lora leading-snug">
          Music That Speaks to the Soul, Created from the Heart
        </h1>
      </div>

      <div className="w-full md:w-1/2 mt-32 md:mt-0 order-1 md:order-2 h-3/4    md:h-screen relative">
        <AudioVisualCircle />
      </div>
    </Element>
  );
};

export default HomePage;
