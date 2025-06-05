"use client";
import React, { useEffect, useRef } from "react";

const AudioVisualCircle = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const frameIndexRef = useRef(0);
  const frequencyFramesRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const img = new Image();
    img.src = "/millionviewsmusicdark.png";
    img.onload = () => {
      imageRef.current = img;
    };

    const resizeCanvas = () => {
      const parent = canvasRef.current.parentElement;
      if (
        canvasRef.current.width !== parent.offsetWidth ||
        canvasRef.current.height !== parent.offsetHeight
      ) {
        canvasRef.current.width = parent.offsetWidth;
        canvasRef.current.height = parent.offsetHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    fetch("/frequency_data_trimmed2_extended.json")
      .then((res) => res.json())
      .then((data) => {
        frequencyFramesRef.current = data.map((obj) =>
          Object.values(obj).map(Number)
        );
        animate();
      })
      .catch((err) => {
        console.error("Error loading frequency data:", err);
      });

    const drawVisualization = (array) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const threshold = 0;
      const colorPalette = ["#fff", "#fff"];

      const maxBinCount = array.length;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.save();

      ctx.globalCompositeOperation = "source-over";

      ctx.scale(0.5, 0.5);

      ctx.translate(canvasWidth, canvasHeight);

      const bass = Math.floor(array[1]);

      const radius =
        canvasWidth <= 450
          ? -(bass * 0.25 + 0.45 * canvasWidth)
          : -(bass * 0.25 + 450);
      let bar_length_factor = 1;
      if (canvasWidth >= 785) {
        bar_length_factor = 1.0;
      } else if (canvasWidth < 785) {
        bar_length_factor = 1.5;
      }
      if (canvasWidth < 500) {
        bar_length_factor = 2.5;
      }

      const rotationAngle = ((180 / 128) * Math.PI) / 180;

      // First set of bars
      for (let i = 0; i < maxBinCount; i++) {
        const value = array[i];
        if (value >= threshold) {
          ctx.fillStyle = colorPalette[i % colorPalette.length];
          ctx.fillRect(0, radius, 3, -value / bar_length_factor);
          ctx.rotate(rotationAngle);
        }
      }

      // Second set (rotate back)
      for (let i = 0; i < maxBinCount; i++) {
        const value = array[i];
        if (value >= threshold) {
          ctx.rotate(-rotationAngle);
          ctx.fillStyle = colorPalette[i % colorPalette.length];
          ctx.fillRect(0, radius, 3, -value / bar_length_factor);
        }
      }

      // Third set (rotate forward again)
      for (let i = 0; i < maxBinCount; i++) {
        const value = array[i];
        if (value >= threshold) {
          ctx.rotate(rotationAngle);
          ctx.fillStyle = colorPalette[i % colorPalette.length];
          ctx.fillRect(0, radius, 3, -value / bar_length_factor);
        }
      }

      const img = imageRef.current;
      if (img) {
        let imgWidth = 800; // px
        let imgHeight = 800; // px

        if (canvasWidth < 500) {
          imgWidth = 400; // px
          imgHeight = 400; // px
        }

        ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
      }

      ctx.restore();
    };

    const animate = () => {
      const frames = frequencyFramesRef.current;
      if (frames.length > 0) {
        const currentFrame = frames[frameIndexRef.current];

        const energy = currentFrame.reduce((a, b) => a + b, 0);

        drawVisualization(currentFrame);

        frameIndexRef.current = (frameIndexRef.current + 1) % frames.length;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="freq" className="w-full h-full" />;
};

export default AudioVisualCircle;
