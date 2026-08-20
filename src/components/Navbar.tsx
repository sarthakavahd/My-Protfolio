"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

function MagneticLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const ref = useRef<HTMLLIElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
  };

  return (
    <li
      ref={ref}
      className="relative"
      style={{ transition: "transform 0.1s ease" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className={`focus-ring relative rounded pb-1 transition-colors duration-300 hover:text-cyan ${
          isActive ? "text-cyan" : "text-muted"
        }`}
      >
        {label}
        <motion.span
          className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-cyan"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isActive ? "100%" : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        />
        {/* Hover underline glow */}
        <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gold opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
      </Link>
    </li>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed left-0 right-0 top-6 z-50 mx-auto max-w-3xl px-4 md:px-6"
    >
      <div className="relative rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden group">
        {/* Animated glow sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />

        <nav className="flex items-center justify-between px-6 py-3.5">
          <Link href="/" className="group/logo flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-ink via-ink to-muted transition-all duration-500 group-hover/logo:from-cyan group-hover/logo:to-gold">
                Sarthak Avhad
              </span>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted transition-all duration-300 group-hover/logo:border-cyan/30 group-hover/logo:text-cyan group-hover/logo:bg-cyan/10 sm:flex">
              <span className="h-1 w-1 rounded-full bg-gold transition-colors duration-300 group-hover/logo:bg-cyan" />
              Developer
            </span>
          </Link>

          <ul className="hidden gap-8 font-mono text-[11px] font-medium uppercase tracking-widest md:flex">
            {links.map((l) => (
              <MagneticLink key={l.href} href={l.href} label={l.label} isActive={pathname === l.href} />
            ))}
          </ul>

          <motion.button
            whileTap={{ scale: 0.85, rotate: 90 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="focus-ring rounded text-ink md:hidden hover:text-cyan transition-colors"
            aria-label={open ? "Close" : "Open"}
            onClick={() => setOpen(!open)}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile menu with AnimatePresence */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 font-mono text-xs uppercase tracking-widest">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={pathname === l.href ? "text-cyan" : "text-muted hover:text-cyan transition-colors"}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
