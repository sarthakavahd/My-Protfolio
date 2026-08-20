"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) setIsHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) setIsHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-6 w-6 items-center justify-center"
      style={{ willChange: "transform" }}
    >
      <div
        className={`relative flex h-full w-full items-center justify-center transition-all duration-300 ease-out ${
          isHovering ? "rotate-90 scale-125" : "rotate-0 scale-100"
        }`}
      >
        {/* Horizontal line */}
        <div
          className={`absolute h-[1.5px] bg-gold transition-all duration-300 ${
            isHovering ? "w-2/5 opacity-40" : "w-full opacity-100"
          }`}
        />
        {/* Vertical line */}
        <div
          className={`absolute w-[1.5px] bg-gold transition-all duration-300 ${
            isHovering ? "h-2/5 opacity-40" : "h-full opacity-100"
          }`}
        />
        {/* Center cyan dot on hover */}
        <div
          className={`absolute h-1.5 w-1.5 rounded-full bg-cyan transition-all duration-300 ${
            isHovering ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
        {/* Expanding ring on hover */}
        <div
          className={`absolute rounded-full border border-cyan/50 transition-all duration-300 ${
            isHovering ? "inset-[-6px] bg-cyan/10 opacity-100" : "inset-[4px] bg-transparent opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
