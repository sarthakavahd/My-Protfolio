"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, Rocket } from "lucide-react";
import Link from "next/link";

function MagneticButton({ href, children, className = "", download }: { href: string; children: React.ReactNode; className?: string, download?: boolean | string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      el.style.transition = "transform 0.1s linear";
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = "translate(0, 0)";
      el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((r) => [...r, { x, y, id }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
  };

  const isExternal = download !== undefined || href.startsWith("http");

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        className={`relative overflow-hidden ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        download={download}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
      >
        {ripples.map((rp) => (
          <span
            key={rp.id}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{ left: rp.x - 5, top: rp.y - 5, width: 10, height: 10, animation: "ripple-expand 0.6s ease-out forwards" }}
          />
        ))}
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref as any}
      href={href}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{
            left: rp.x - 5,
            top: rp.y - 5,
            width: 10,
            height: 10,
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      ))}
      {children}
    </Link>
  );
}

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
    <main className="relative mx-auto flex max-w-5xl flex-col justify-center px-6 py-28 md:min-h-[85vh] md:py-32">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-64 w-64 rounded-full bg-gold/5 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-0 -right-20 h-80 w-80 rounded-full bg-cyan/5 blur-[100px]" />
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
          <Rocket size={14} className="mr-2 animate-bounce" />
          <span className="uppercase tracking-wider text-[11px] font-semibold">currently shipping</span>
        </motion.div>
        
        <div className="relative group flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-1.5 shadow-[0_0_20px_rgba(79,209,197,0.3)] backdrop-blur-md">
          {/* Animated Sweep Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/30 to-transparent -translate-x-[150%] skew-x-[-45deg] animate-[sweep_3s_ease-in-out_infinite]" />
          </div>

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
              className="flex flex-wrap gap-1.5 relative z-10"
            >
              {roles[index].split(" ").map((word, i) => (
                <motion.span key={i} variants={blurRevealVariants} className="text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
          
          <motion.span variants={blurRevealVariants} className="animate-pulse text-gold font-bold relative z-10">
            _
          </motion.span>
        </div>
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
          <MagneticButton
            href="/projects"
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-cyan transition-all hover:bg-cyan/20 hover:shadow-[0_0_30px_rgba(79,209,197,0.35)] hover:scale-105"
          >
            View all work
            <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </MagneticButton>
          <MagneticButton
            href="/resume.pdf"
            download={true}
            className="focus-ring rounded font-mono text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:text-cyan hover:scale-105"
          >
            Download Resume
          </MagneticButton>
          <MagneticButton
            href="/about"
            className="focus-ring rounded font-mono text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-ink hover:scale-105"
          >
            More about me
          </MagneticButton>
        </motion.div>
      </motion.div>
    </main>
  );
}
