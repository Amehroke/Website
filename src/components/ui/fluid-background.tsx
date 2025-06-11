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
    canvas.style.zIndex = "0";
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

    // Inject the original script
    const script = document.createElement("script");
    script.src = "/fluid-simulation.js";
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(canvas);
      document.body.removeChild(script);
    };
  }, []);

  return null;
} 