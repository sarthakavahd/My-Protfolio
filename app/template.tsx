"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const routeColors: Record<string, string> = {
  "/": "#c9a227",
  "/projects": "#4fd1c5",
  "/about": "#c9a227",
  "/contact": "#4fd1c5",
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const accentColor = routeColors[pathname] ?? "#c9a227";

  return (
    <>
      {/* Full black wipe overlay that fades out */}
      <motion.div
        key={`overlay-${pathname}`}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ background: "#050505" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }}
      />

      {/* Accent color flash at top — like a progress bar wipe */}
      <motion.div
        key={`bar-${pathname}`}
        className="fixed top-0 left-0 right-0 z-[101] h-[3px] pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
      />

      {/* Radial glow burst from center on route change */}
      <motion.div
        key={`glow-${pathname}`}
        className="fixed inset-0 z-[99] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColor}18 0%, transparent 70%)`,
        }}
        initial={{ opacity: 1, scale: 0.8 }}
        animate={{ opacity: 0, scale: 1.5 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] as const }}
      />

      {/* Content: zoom-in from slightly scaled up with blur clearing */}
      <motion.div
        key={`content-${pathname}`}
        initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      >
        {children}
      </motion.div>
    </>
  );
}
