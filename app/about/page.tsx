import Image from "next/image";
import { education, skills } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";
import { Terminal, Database, Code2, Globe, Cpu, ShieldAlert, Wrench, GraduationCap, Building2 } from "lucide-react";

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("language")) return <Image src="https://cdn-icons-png.flaticon.com/128/10817/10817310.png" alt="Languages" width={56} height={56} unoptimized className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />;
  if (cat.includes("frontend")) return <Image src="https://img.icons8.com/?size=160&id=dhecLjnptiQg&format=png" alt="Frontend" width={56} height={56} unoptimized className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />;
  if (cat.includes("backend")) return <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQi9XLPY5wwlPWsNSwO7CsEu9pt_6fcCKXxD2L4Z0LBQ&s=10" alt="Backend" width={56} height={56} unoptimized className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />;
  if (cat.includes("database")) return <Image src="https://cdn-icons-png.flaticon.com/128/9672/9672242.png" alt="Database" width={56} height={56} unoptimized className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />;
  if (cat.includes("ai")) return <Image src="https://cdn-icons-png.flaticon.com/128/5278/5278402.png" alt="AI & Agents" width={56} height={56} unoptimized className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />;
  if (cat.includes("blockchain")) return <ShieldAlert size={24} className="text-gold transition-colors group-hover:text-cyan" />;
  return <Wrench size={24} className="text-muted transition-colors group-hover:text-cyan" />;
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <ScrollReveal>
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gold shadow-[0_0_20px_rgba(201,162,39,0.1)] backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gold"></span>
          </span>
          <span>About Me</span>
        </div>
        <h1 className="mb-6 max-w-2xl font-display text-4xl font-medium text-ink sm:text-5xl">
          Full-stack engineer building scalable web apps with a touch of Web3.
        </h1>
        <p className="mb-4 max-w-xl text-sm leading-relaxed text-muted">
          My primary focus is engineering production-grade web applications. I spend most of my time
          architecting Node &amp; FastAPI backends, designing robust PostgreSQL schemas, and crafting
          interactive React frontends deployed via Vercel and Docker.
        </p>
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted">
          While my core lies in traditional full-stack development, I also hold a strong interest in the decentralized web — leveraging my M.Sc. in Blockchain Technology to integrate smart contracts and privacy protocols when a project demands it.
        </p>

        {/* Separator */}
        <div className="mb-16 border-b border-border" />
      </ScrollReveal>

      <ScrollReveal>
        <h2 className="mb-8 font-display text-2xl font-medium text-ink">Education</h2>
      </ScrollReveal>
      <div className="mb-6 divide-y divide-border rounded-xl border border-border bg-surface">
        {education.map((e, i) => (
          <ScrollReveal key={e.degree} delay={i * 0.08}>
            <div className="flex flex-col gap-1 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {e.degree.includes("M.Sc.") ? (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-gold/30 shadow-[0_0_15px_rgba(201,162,39,0.15)] overflow-hidden">
                    <img 
                      src="https://akm-img-a-in.tosshub.com/sites/resources/campus/prod/img/logo/2023/6/34821837533623230573214722061605514945984735n895269102026.jpg" 
                      alt="MIT-WPU Logo" 
                      className="h-full w-full object-contain p-1.5"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-white/10 overflow-hidden">
                    <img 
                      src="https://p7.hiclipart.com/preview/918/523/610/university-of-mumbai-alkesh-dinesh-mody-institute-for-financial-management-studies-college-school.jpg" 
                      alt="Mumbai University Logo" 
                      className="h-full w-full object-cover p-1"
                    />
                  </div>
                )}
                <div>
                  <p className="font-display text-base font-medium text-ink">{e.degree}</p>
                  <p className="text-sm text-muted">{e.school}</p>
                </div>
              </div>
              <p className="font-mono text-xs text-gold sm:mt-0 mt-3">{e.period}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Separator */}
      <div className="mb-16 border-b border-border" />

      <ScrollReveal>
        <h2 className="mb-10 font-display text-3xl font-medium text-ink tracking-tight">Tech Stack</h2>
      </ScrollReveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items], i) => (
          <ScrollReveal key={category} delay={i * 0.06}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-cyan/30 hover:shadow-[0_0_40px_rgba(79,209,197,0.15)]">
              {/* Highlight sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-45deg] transition-all duration-700 group-hover:translate-x-[150%]" />
              
              <div className="mb-6 flex flex-col gap-5 relative z-10">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden ${
                  ['language', 'frontend', 'backend', 'database', 'ai'].some(c => category.toLowerCase().includes(c))
                    ? 'group-hover:bg-cyan/10' 
                    : 'border border-white/10 group-hover:bg-cyan/10 group-hover:border-cyan/30'
                }`}>
                  {getCategoryIcon(category)}
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-cyan">
                  {category}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {items.map((item) => (
                  <span 
                    key={item} 
                    className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[11px] text-muted transition-all duration-300 hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan hover:shadow-[0_0_20px_rgba(79,209,197,0.2)] hover:-translate-y-0.5 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}
