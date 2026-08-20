"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Check } from "lucide-react";
import { contact } from "@/data/projects";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#FFFFFF" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#0A66C2" d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      <path fill="#FFFFFF" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
    </svg>
  );
}

const items = [
  { icon: Mail,         label: contact.email,   href: `mailto:${contact.email}`,  sublabel: "Email" },
  ...(contact.phone ? [{ icon: Phone, label: contact.phone, href: `tel:${contact.phone}`, sublabel: "Phone" }] : []),
  { icon: LinkedinIcon, label: "LinkedIn",      href: contact.linkedin,           sublabel: "Connect" },
  { icon: GithubIcon,   label: "GitHub",        href: contact.github,             sublabel: "Code" },
];

const contactCardVariants = {
  hidden: { opacity: 0, x: 60, scale: 0.9, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, x: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (itemLabel: string, itemSublabel: string) => {
    if (itemSublabel === "Email") {
      navigator.clipboard.writeText(itemLabel);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gold shadow-[0_0_20px_rgba(201,162,39,0.1)] backdrop-blur-sm"
      >
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gold"></span>
        </span>
        <span>Contact</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6"
      >
        <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl tracking-tight">
          Let&apos;s build <br className="hidden sm:block"/> something.
        </h1>
        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-2 w-fit shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted mt-0.5">Available for Work</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 max-w-md text-sm text-muted"
      >
        Open to full-stack web development, backend engineering, and Web3 roles —
        reach out through any of these.
      </motion.p>

      {/* Separator — grows from left */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 border-b border-border"
        style={{ transformOrigin: "left" }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
        {items.map((item, i) => (
          <motion.a
            key={item.sublabel}
            href={item.href}
            onClick={() => handleEmailClick(item.label, item.sublabel)}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={contactCardVariants}
            className={`cursor-pointer focus-ring group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_0_40px_rgba(79,209,197,0.15)] ${
              item.sublabel === 'Email' ? 'sm:col-span-2' : 'sm:col-span-1'
            }`}
          >
            {/* Animated Shine Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-45deg] transition-all duration-700 group-hover:translate-x-[150%]" />

            <div className="mb-8 flex items-start justify-between relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 shadow-inner border border-white/10 transition-all duration-500 group-hover:bg-cyan/10 group-hover:border-cyan/30 group-hover:scale-110 group-hover:rotate-3">
                {item.sublabel === "Email" && copied ? (
                  <Check size={22} className="text-cyan transition-colors duration-500" />
                ) : (
                  <item.icon size={22} className="text-gold transition-colors duration-500 group-hover:text-cyan" />
                )}
              </div>
              <span className="font-mono text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan">
                {item.sublabel === "Email" && copied ? "Copied!" : "↗"}
              </span>
            </div>
            
            <div className="relative z-10">
              <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">{item.sublabel}</p>
              <p className="font-display text-lg sm:text-xl font-medium text-ink transition-colors duration-300 group-hover:text-cyan truncate">
                {item.label}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </main>
  );
}
