"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Check, MapPin, Briefcase, Globe, Zap, Coffee, Star } from "lucide-react";
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
  { icon: Mail,         label: contact.email,  href: `mailto:${contact.email}`, sublabel: "Email" },
  ...(contact.phone ? [{ icon: Phone, label: contact.phone, href: `tel:${contact.phone}`, sublabel: "Phone" }] : []),
  { icon: LinkedinIcon, label: "LinkedIn",     href: contact.linkedin,          sublabel: "Connect" },
  { icon: GithubIcon,   label: "GitHub",       href: contact.github,            sublabel: "Code" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const facts = [
  { icon: MapPin,    label: "Location",        value: "Pune, India" },
  { icon: Briefcase, label: "Availability",    value: "Open to work" },
  { icon: Globe,     label: "Work Preference", value: "Remote / Hybrid" },
];

const highlights = [
  { icon: Zap,    text: "Fast response — usually within 24 hours" },
  { icon: Coffee, text: "Love discussing ideas over a virtual coffee" },
  { icon: Star,   text: "Open to freelance, full-time & contract roles" },
];

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

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-10 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gold shadow-[0_0_20px_rgba(201,162,39,0.1)] backdrop-blur-sm"
      >
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gold" />
        </span>
        <span>Contact</span>
      </motion.div>

      {/* TOP — two column: Heading left, Info right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">

        {/* LEFT — Heading + description */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-4 flex flex-col gap-4"
          >
            <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl tracking-tight leading-[1.1]">
              Let&apos;s build<br />something<br /><span className="text-cyan">great.</span>
            </h1>
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 w-fit shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted mt-0.5">Available for Work</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-sm text-muted leading-relaxed"
          >
            Open to full-stack web development, backend engineering, and Web3 roles. Whether it&apos;s a quick question or a big project — I&apos;d love to hear from you.
          </motion.p>

          {/* Highlights */}
          <div className="mt-6 flex flex-col gap-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                className="flex items-center gap-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <h.icon size={13} className="text-gold" />
                </div>
                <p className="text-sm text-muted">{h.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT — Quick Info */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col justify-between gap-5"
        >
          {/* Info card */}
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-xl h-full flex flex-col justify-between">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-gold">Quick Info</p>
            <div className="flex flex-col gap-4 flex-1 justify-center">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    <fact.icon size={15} className="text-cyan" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted">{fact.label}</p>
                    <p className="text-sm font-medium text-ink">{fact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative bottom quote */}
            <div className="mt-6 pt-5 border-t border-white/5">
              <p className="text-xs text-muted italic leading-relaxed">
                &ldquo;Great software is built by people who care. Let&apos;s care together.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-10 border-b border-border"
        style={{ transformOrigin: "left" }}
      />

      {/* BOTTOM — Contact cards full width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            variants={cardVariants}
            className="cursor-pointer focus-ring group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_0_40px_rgba(79,209,197,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-45deg] transition-all duration-700 group-hover:translate-x-[150%]" />
            <div className="mb-6 flex items-start justify-between relative z-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 shadow-inner border border-white/10 transition-all duration-500 group-hover:bg-cyan/10 group-hover:border-cyan/30 group-hover:scale-110 group-hover:rotate-3">
                {item.sublabel === "Email" && copied ? (
                  <Check size={18} className="text-cyan" />
                ) : (
                  <item.icon size={18} className="text-gold transition-colors duration-500 group-hover:text-cyan" />
                )}
              </div>
              <span className="font-mono text-sm text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan">
                {item.sublabel === "Email" && copied ? "✓" : "↗"}
              </span>
            </div>
            <div className="relative z-10">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">{item.sublabel}</p>
              <p className="font-display text-sm font-medium text-ink transition-colors duration-300 group-hover:text-cyan truncate">
                {item.label}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

    </main>
  );
}
