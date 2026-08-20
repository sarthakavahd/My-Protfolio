"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-6 z-50 mx-auto max-w-3xl px-4 md:px-6 transition-all duration-300">
      <div className="rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <nav className="flex items-center justify-between px-6 py-3.5">
          <Link href="/" className="group flex items-center gap-3">
            {/* Animated glowing dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
            </span>
            
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-ink via-ink to-muted transition-all duration-300 group-hover:from-cyan group-hover:to-gold">
                Sarthak Avhad
              </span>
            </div>

            <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted transition-all duration-300 group-hover:border-cyan/30 group-hover:text-cyan group-hover:bg-cyan/10 sm:flex shadow-[0_0_10px_rgba(0,0,0,0)] group-hover:shadow-[0_0_15px_rgba(79,209,197,0.2)]">
              <span className="h-1 w-1 rounded-full bg-gold transition-colors duration-300 group-hover:bg-cyan" />
              Developer
            </span>
          </Link>
          <ul className="hidden gap-8 font-mono text-[11px] font-medium uppercase tracking-widest md:flex">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.href} className="relative">
                  <Link
                    href={l.href}
                    className={`focus-ring rounded pb-1 transition-colors hover:text-cyan ${
                      isActive ? "text-cyan" : "text-muted"
                    }`}
                  >
                    {l.label}
                    {/* Animated cyan/gold underline on active link */}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 ${
                        isActive ? "w-full bg-cyan opacity-100" : "w-0 bg-gold opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            className="focus-ring rounded text-ink md:hidden hover:text-cyan transition-colors"
            aria-label={open ? "Close" : "Open"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        
        {/* Mobile menu */}
        <div className={`grid transition-all duration-300 md:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 font-mono text-xs uppercase tracking-widest">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={pathname === l.href ? "text-cyan" : "text-muted hover:text-cyan transition-colors"}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
