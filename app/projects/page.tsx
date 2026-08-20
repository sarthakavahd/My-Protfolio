"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const statusColor: Record<string, string> = {
  DEPLOYED: "text-cyan border-cyan/30 bg-cyan/10",
  LIVE:     "text-gold border-gold/30 bg-gold/10",
  SHIPPED:  "text-muted border-border bg-white/5",
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-6 flex items-baseline justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-medium text-ink"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring", bounce: 0.4 }}
          className="font-mono text-xs text-muted"
        >
          {projects.length} builds · latest first
        </motion.p>
      </div>
      {/* Separator — grows from left */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 border-b border-border"
        style={{ transformOrigin: "left" }}
      />

      <ol className="space-y-6">
        {[...projects].reverse().map((p, i) => (
          <motion.li
            key={p.hash}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={cardVariants}
          >
            {/* Hover lift effect */}
            <div className="rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_#c9a22718]">
              {/* Card number + status + date */}
              <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                {/* Gold block number in top-left */}
                <span className="font-mono text-sm font-medium text-gold">
                  {String(p.block).padStart(2, "0")}
                </span>
                <span className="text-border">·</span>
                <span className={`rounded-full border px-2.5 py-1 ${statusColor[p.status] ?? "text-muted border-border bg-white/5"}`}>
                  {p.status}
                </span>
                <span>{p.date}</span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 focus-ring rounded" aria-label={`Open ${p.title}`}>
                    <h2 className="font-display text-xl font-medium text-ink transition-colors group-hover:text-cyan">{p.title}</h2>
                    <ExternalLink size={15} className="text-muted transition-colors group-hover:text-cyan" />
                  </a>
                ) : (
                  <h2 className="font-display text-xl font-medium text-ink">{p.title}</h2>
                )}
              </div>
              <p className="mb-4 max-w-2xl text-sm text-muted">{p.summary}</p>
              <ul className="mb-4 space-y-1.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-ink/80">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </main>
  );
}
