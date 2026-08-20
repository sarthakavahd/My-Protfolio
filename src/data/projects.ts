export type ProjectStatus = "DEPLOYED" | "LIVE" | "SHIPPED";

export interface Project {
  hash: string;
  block: number;
  date: string;
  status: ProjectStatus;
  title: string;
  link?: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Contact {
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
}

// Stored oldest → newest; the Projects component reverses for display (newest first)
export const projects: Project[] = [
  {
    hash: "linkstore-03",
    block: 3,
    date: "Jan 2026",
    status: "SHIPPED",
    title: "LinkStore",
    link: "https://github.com/sarthakavahd/storing-link",
    summary:
      "A full-stack bookmark manager with authenticated CRUD, category organisation, and rich link previews powered by a resilient OG metadata scraper.",
    highlights: [
      "Developed authenticated CRUD bookmark management with category organisation and Row-Level Security using Supabase.",
      "Built a resilient OG metadata scraper using Cheerio with Open Graph, Twitter Card, and HTML fallbacks for rich link previews.",
      "Implemented multi-level sorting, pinning, XSS sanitisation with DOMPurify, and strict Content Security Policy headers.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Cheerio", "DOMPurify"],
  },
  {
    hash: "stealthpay-02",
    block: 2,
    date: "Mar 2026",
    status: "SHIPPED",
    title: "StealthPay",
    link: "https://stealth-address-payment-system-web-weld.vercel.app/",
    summary:
      "An Ethereum dApp implementing EIP-5564 stealth addresses for privacy-preserving payments, recognised by BitGo engineers at EthMumbai 2026.",
    highlights: [
      "Built an Ethereum dApp with EIP-5564 stealth addresses, Next.js frontend, and Node.js blockchain scanner.",
      "Implemented ECDH-based key derivation, stealth meta-address registry support, and ephemeral key handling compliant with EIP-5564 / EIP-6538.",
      "Recognised by BitGo engineers at EthMumbai 2026 for the stealth address protocol implementation.",
    ],
    stack: ["MPC", "Web3", "Node.js", "Next.js", "EIP-5564", "secp256k1", "Solidity"],
  },
  {
    hash: "testgen-ai-01",
    block: 1,
    date: "Jun 2026",
    status: "DEPLOYED",
    title: "TestGen-AI",
    link: "https://team-deploy-or-die.vercel.app/",
    summary:
      "A full-stack AI platform that generates unit tests from Python source code via AST analysis and user stories, then executes them with coverage reporting.",
    highlights: [
      "Generated unit tests from Python AST analysis and user stories using GPT-4.1-mini with Gemini fallback.",
      "Integrated pytest and pytest-cov via FastAPI to execute tests in isolated environments with pass/fail status and line-level coverage reports.",
      "Persisted generated tests, execution logs, and coverage reports in Supabase (PostgreSQL) powering a historical analytics dashboard.",
    ],
    stack: ["FastAPI", "Python", "OpenAI", "Gemini", "Supabase", "PostgreSQL", "pytest"],
  },
];

export const contact: Contact = {
  email: "avhadsarthak908@gmail.com",
  linkedin: "https://www.linkedin.com/in/sarthak-avhad-391023321/",
  github: "https://github.com/sarthakavahd",
};

export const skills: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "C++"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  Backend: ["Node.js", "FastAPI", "Express", "REST APIs", "Microservices", "JWT Authentication"],
  Databases: ["PostgreSQL", "Supabase", "MongoDB", "Prisma ORM", "pgvector"],
  "AI & Agents": ["RAG", "LLM Integration", "n8n", "MCP"],
  "Blockchain & Cryptography": [
    "Ethereum",
    "Solidity",
    "ethers.js",
    "Smart Contracts",
    "Stealth Addresses",
    "Cryptography",
  ],
};

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
}

export const education: EducationEntry[] = [
  {
    degree: "M.Sc. Blockchain Technology",
    school: "MIT World Peace University, Pune",
    period: "2025 – 2027",
  },
  {
    degree: "B.Sc. Computer Science",
    school: "Mumbai University",
    period: "2022 – 2025",
  },
];
