"use client";

import { useEffect } from "react";

export function FluidBackground() {
  useEffect(() => {
    // Create and inject the canvas
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = window.innerWidth < 768 ? "-1" : "0"; // Adjust z-index for mobile
    canvas.style.opacity = "0.8";
    canvas.style.transition = "opacity 0.3s ease";
    canvas.style.pointerEvents = "auto";
    document.body.appendChild(canvas);

    // Add hover effect
    canvas.addEventListener("mouseenter", () => {
      canvas.style.opacity = "1";
    });

    canvas.addEventListener("mouseleave", () => {
      canvas.style.opacity = "0.8";
    });

    // Add resize listener to handle z-index changes
    const handleResize = () => {
      canvas.style.zIndex = window.innerWidth < 768 ? "-1" : "0";
    };
    window.addEventListener("resize", handleResize);

    // Inject the original script
    const script = document.createElement("script");
    script.src = "/fluid-simulation.js";
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(canvas);
      document.body.removeChild(script);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
} 