"use client";
import { useEffect, useRef } from "react";

export default function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let centerX = w / 2;
    let centerY = h / 2;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      centerX = w / 2;
      centerY = h / 2;
    };
    window.addEventListener("resize", resize);

    // Speed up stars based on mouse movement
    let speed = 2;
    window.addEventListener("mousemove", (e) => {
      const distance = Math.abs(e.clientX - centerX) + Math.abs(e.clientY - centerY);
      speed = 1 + (distance / (w / 2)) * 6; // Max speed multiplier
    });

    class Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      color: string;

      constructor() {
        this.x = Math.random() * w * 2 - w;
        this.y = Math.random() * h * 2 - h;
        this.z = Math.random() * w;
        this.pz = this.z;
        // Mix of gold and cyan stars
        this.color = Math.random() > 0.3 ? "79, 209, 197" : "201, 162, 39";
      }
      
      update() {
        this.z -= speed;
        if (this.z < 1) {
          this.z = w;
          this.x = Math.random() * w * 2 - w;
          this.y = Math.random() * h * 2 - h;
          this.pz = this.z;
        }
      }
      
      draw() {
        if (!ctx) return;
        const sx = (this.x / this.z) * w + centerX;
        const sy = (this.y / this.z) * h + centerY;
        const r = (1 - this.z / w) * 3.5; // Radius gets larger as it gets closer

        const px = (this.x / this.pz) * w + centerX;
        const py = (this.y / this.pz) * h + centerY;
        this.pz = this.z;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${this.color}, ${1 - this.z / w})`; 
        ctx.lineWidth = r;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    }

    const stars: Star[] = [];
    for (let i = 0; i < 350; i++) {
      stars.push(new Star());
    }

    let animationId: number;
    const animate = () => {
      // Trail effect for warp speed feel
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, w, h);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
