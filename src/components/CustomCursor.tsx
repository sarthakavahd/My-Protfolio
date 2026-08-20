"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

interface Burst {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trailId = useRef(0);
  const burstId = useRef(0);
  const rafRef = useRef<number>(0);

  const addTrailDot = useCallback((x: number, y: number) => {
    trailId.current++;
    const id = trailId.current;
    setTrail((prev) => [...prev.slice(-10), { x, y, id }]);
    setTimeout(() => setTrail((prev) => prev.filter((d) => d.id !== id)), 500);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
      addTrailDot(e.clientX, e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-hover]")) setIsHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-hover]")) setIsHovering(false);
    };

    const onClick = (e: MouseEvent) => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 200);
      // Spawn burst
      burstId.current++;
      const id = burstId.current;
      setBursts((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 700);
    };

    // Smooth ring follows with lag
    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, [addTrailDot]);

  const burstAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <>
      {/* Trail dots */}
      {trail.map((dot, i) => (
        <div
          key={dot.id}
          className="pointer-events-none fixed left-0 top-0 z-[9990] rounded-full"
          style={{
            width: `${3 + i * 0.5}px`,
            height: `${3 + i * 0.5}px`,
            transform: `translate(${dot.x - 2}px, ${dot.y - 2}px)`,
            background: i % 2 === 0 ? "rgba(79, 209, 197, 0.4)" : "rgba(201, 162, 39, 0.4)",
            opacity: (i + 1) / trail.length * 0.6,
            transition: "opacity 0.5s",
          }}
        />
      ))}

      {/* Click burst particles */}
      {bursts.map((burst) => (
        <div key={burst.id} className="pointer-events-none fixed left-0 top-0 z-[9998]">
          {burstAngles.map((angle, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: "5px",
                height: "5px",
                left: burst.x,
                top: burst.y,
                background: i % 2 === 0 ? "#4fd1c5" : "#c9a227",
                animation: `burst-${angle} 0.6s ease-out forwards`,
                transform: `rotate(${angle}deg)`,
              }}
            />
          ))}
        </div>
      ))}

      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-all duration-150"
        style={{
          width: isClicking ? "14px" : "10px",
          height: isClicking ? "14px" : "10px",
          background: isHovering ? "#4fd1c5" : "#c9a227",
          boxShadow: isHovering
            ? "0 0 12px rgba(79,209,197,0.8), 0 0 25px rgba(79,209,197,0.4)"
            : "0 0 10px rgba(201,162,39,0.8), 0 0 20px rgba(201,162,39,0.3)",
          willChange: "transform",
          marginLeft: isClicking ? "-2px" : "0",
          marginTop: isClicking ? "-2px" : "0",
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full transition-all duration-300"
        style={{
          width: isHovering ? "56px" : "40px",
          height: isHovering ? "56px" : "40px",
          border: isHovering ? "1.5px solid rgba(79,209,197,0.6)" : "1.5px solid rgba(201,162,39,0.4)",
          background: isHovering ? "rgba(79,209,197,0.05)" : "transparent",
          boxShadow: isHovering ? "0 0 20px rgba(79,209,197,0.2), inset 0 0 20px rgba(79,209,197,0.05)" : "none",
          willChange: "transform",
          marginLeft: isHovering ? "-8px" : "0",
          marginTop: isHovering ? "-8px" : "0",
        }}
      />

      {/* Burst keyframe CSS */}
      <style jsx global>{`
        @keyframes burst-anim {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        ${burstAngles.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const tx = Math.cos(rad) * 30;
          const ty = Math.sin(rad) * 30;
          return `
            @keyframes burst-${angle} {
              0% { transform: translate(0,0) scale(1); opacity: 1; }
              100% { transform: translate(${tx}px, ${ty}px) scale(0); opacity: 0; }
            }`;
        }).join("")}
      `}</style>
    </>
  );
}
