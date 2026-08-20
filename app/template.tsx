"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ease = [0.76, 0, 0.24, 1];

  return (
    <>
      {/* Elegant Cinematic Overlay */}
      <motion.div
        key={`overlay-${pathname}`}
        className="fixed inset-0 bg-[#050505] z-[100] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Content smoothly scales down and unblurs for immersive depth */}
      <motion.div
        key={`content-${pathname}`}
        initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
