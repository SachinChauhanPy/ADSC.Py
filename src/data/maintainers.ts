export interface Maintainer {
  id: string;
  name: string;
  role: string;
  category: "Lead" | "Core Team" | "Class Representative" | "Advisor";
  university: string;
  bio: string;
  avatarPixelBg: string;
  githubUrl?: string;
  linkedinUrl?: string;
  focusDomain: string;
  hidden?: boolean;
}

export const MAINTAINERS_DATA: Maintainer[] = [
  {
    id: "lead-adscpy",
    name: "ADSC.Py Lead Maintainer",
    role: "Community Lead & Frontend Architect",
    category: "Lead",
    university: "Atmiya University, Rajkot",
    bio: "Passionate about bridging classroom Python theory with real-world open source projects, web APIs, and developer exposure.",
    avatarPixelBg: "bg-blue-100 text-blue-900 border-blue-900",
    focusDomain: "Fullstack Python & Community Growth"
  },
  {
    id: "core-ai-track",
    name: "AI & ML Track Lead",
    role: "Core Maintainer",
    category: "Core Team",
    university: "Atmiya University, Rajkot",
    bio: "Focuses on PyTorch models, local RAG document engines, and introducing students to modern LLM APIs.",
    avatarPixelBg: "bg-red-100 text-red-900 border-red-900",
    focusDomain: "Generative AI & Machine Learning"
  },
  {
    id: "core-web-backend",
    name: "Backend & Systems Lead",
    role: "Core Maintainer",
    category: "Core Team",
    university: "Atmiya University, Rajkot",
    bio: "Building fast async microservices with FastAPI, Pydantic, and database ORMs.",
    avatarPixelBg: "bg-green-100 text-green-900 border-green-900",
    focusDomain: "FastAPI, PostgreSQL & Web APIs"
  },
  {
    id: "core-automation-lead",
    name: "Automation & Data Lead",
    role: "Core Maintainer",
    category: "Core Team",
    university: "Atmiya University, Rajkot",
    bio: "Teaching web scraping, headless browser automation, and data analytics dashboards.",
    avatarPixelBg: "bg-amber-100 text-amber-900 border-amber-900",
    focusDomain: "Playwright, Pandas & Streamlit"
  },
  {
    id: "class-rep-1",
    name: "Department Representatives",
    role: "Class Representatives",
    category: "Class Representative",
    university: "Atmiya University, Rajkot",
    bio: "Connecting first-year and second-year Computer Science & IT batches with ADSC.Py resources and sessions.",
    avatarPixelBg: "bg-purple-100 text-purple-900 border-purple-900",
    focusDomain: "Student Orientation & Peer Mentorship"
  }
];
