"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, Rocket } from "lucide-react";
import Link from "next/link";

const roles = [
  "scalable backend systems",
  "full-stack web apps",
  "AI-integrated platforms",
  "smart contracts",
];

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 90, filter: "blur(10px)" },
  visible: { 
    opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

const blurRevealVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(12px)" },
  visible: { 
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="mx-auto flex max-w-5xl flex-col justify-center px-6 py-28 md:min-h-[85vh] md:py-32">
      {/* Intro label — slides in from left */}
      <motion.div
        initial={{ opacity: 0, x: -60, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gold shadow-[0_0_20px_rgba(201,162,39,0.1)] backdrop-blur-sm"
      >
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gold"></span>
        </span>
        <span>Full-Stack Web Developer <span className="opacity-40 mx-1">·</span> M.Sc. Blockchain Technology</span>
      </motion.div>

      {/* Hero headline — words flip up from 3D with heavy stagger */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
          }
        }}
        className="font-display text-4xl font-medium leading-[1.1] sm:text-5xl md:text-6xl"
        style={{ perspective: "600px" }}
      >
        <div className="flex flex-wrap text-ink">
          {["Sarthak", "Avhad", "builds"].map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="mr-3 block"
              style={{ transformOrigin: "bottom center" }}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } }}
            className="animate-pulse text-gold"
          >
            _
          </motion.span>
        </div>
        <div className="flex flex-wrap text-muted mt-2">
          {["scalable", "web", "applications", "and"].map((word, i) => (
            <motion.span
              key={i}
              variants={blurRevealVariants}
              className="mr-3 block"
            >
              {word}
            </motion.span>
          ))}
        </div>
        <div className="flex flex-wrap text-cyan mt-2">
          {["decentralized", "solutions."].map((word, i) => (
            <motion.span
              key={i}
              variants={blurRevealVariants}
              className="mr-3 block"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Current Focus — Staggered Reveal */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.7 } }
        }}
        className="mt-8 flex flex-wrap items-center gap-2.5 font-mono text-sm text-muted"
      >
        <motion.div variants={blurRevealVariants} className="flex items-center text-gold">
          <Rocket size={14} className="mr-2" />
          <span>currently shipping</span>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={roles[index]}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
              exit: { opacity: 0, filter: "blur(6px)", transition: { duration: 0.3 } }
            }}
            className="flex flex-wrap gap-2.5"
          >
            {roles[index].split(" ").map((word, i) => (
              <motion.span key={i} variants={blurRevealVariants} className="text-ink">
                {word}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <motion.span variants={blurRevealVariants} className="animate-pulse text-cyan">
          _
        </motion.span>
      </motion.div>

      {/* Bio — slides up with blur */}
      <motion.p
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
      >
        Bridging the gap between robust web infrastructure and decentralized networks. I specialize in architecting high-performance backend systems, intuitive React frontends, and secure smart contracts.
      </motion.p>

      {/* Separator — grows from left */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
        className="mt-10 border-b border-white/10"
        style={{ transformOrigin: "left" }}
      />

      {/* Bottom section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 1.0 } }
        }}
        className="mt-10 flex flex-col gap-8"
      >
        {/* Actions */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -50, filter: "blur(8px)" },
            visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
          }}
          className="flex flex-wrap items-center gap-6"
        >
          <Link
            href="/projects"
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-cyan transition-all hover:bg-cyan/20 hover:shadow-[0_0_20px_rgba(79,209,197,0.2)]"
          >
            View all work
            <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Link>
          <Link
            href="/about"
            className="focus-ring rounded font-mono text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-ink"
          >
            More about me
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
