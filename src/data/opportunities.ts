export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: "Open Source" | "Hackathon" | "Internship Track" | "Student Fellowship" | "Competition";
  description: string;
  eligibility: string;
  deadline: string;
  relevantSkills: string[];
  officialUrl: string;
  isVerified: boolean;
  featuredBadge?: string;
  accentColor: string;
  hidden?: boolean;
}

export const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: "gsoc-2026",
    title: "Google Summer of Code (GSoC)",
    organization: "Google & Python Software Foundation",
    category: "Open Source",
    description: "A global, online program focused on bringing new student developers into open source software organizations. Python organizations like PSF, Django, Scikit-Learn, and SymPy participate every year.",
    eligibility: "Enrolled University Students & Open Source Beginners (18+)",
    deadline: "Annual Window (March - April)",
    relevantSkills: ["Python", "Git", "Open Source", "Django / PyTorch"],
    officialUrl: "https://summerofcode.withgoogle.com",
    isVerified: true,
    featuredBadge: "Flagship Program",
    accentColor: "#4285F4"
  },
  {
    id: "hacktoberfest",
    title: "Hacktoberfest",
    organization: "DigitalOcean & Open Source Community",
    category: "Open Source",
    description: "A month-long celebration of open-source software. Perfect for beginners learning to submit their very first Python Pull Requests to public GitHub repositories.",
    eligibility: "Open to all developers & students worldwide",
    deadline: "Annual (October 1 - October 31)",
    relevantSkills: ["Git", "GitHub", "Python Documentation & Bug Fixes"],
    officialUrl: "https://hacktoberfest.com",
    isVerified: true,
    featuredBadge: "Beginner Friendly",
    accentColor: "#EA4335"
  },
  {
    id: "lfx-mentorship",
    title: "LFX Mentorship Program",
    organization: "Linux Foundation",
    category: "Student Fellowship",
    description: "Structured mentorship for open source developers. Work directly with experienced maintainers on cloud native, AI, and systems Python infrastructure.",
    eligibility: "Students and early-career developers",
    deadline: "3 Cycles Annually (Spring, Summer, Fall)",
    relevantSkills: ["Python", "Cloud Native", "Kubernetes / AI Tools", "Git"],
    officialUrl: "https://lfx.linuxfoundation.org/tools/mentorship",
    isVerified: true,
    accentColor: "#34A853"
  },
  {
    id: "devpost-python-ai-hackathons",
    title: "Global Python & AI Hackathons",
    organization: "Devpost / MLH",
    category: "Hackathon",
    description: "Curated list of worldwide virtual and hybrid hackathons focused on Python backends, AI agents, and open-source innovations with cash prizes and mentorship.",
    eligibility: "Student teams & individual developers",
    deadline: "Rolling Monthly Events",
    relevantSkills: ["FastAPI / Flask", "PyTorch / OpenAI API", "Rapid Prototyping"],
    officialUrl: "https://devpost.com/hackathons?search=python",
    isVerified: true,
    featuredBadge: "Active Community",
    accentColor: "#FBBC04"
  },
  {
    id: "mlh-fellowship",
    title: "Major League Hacking (MLH) Fellowship",
    organization: "MLH & GitHub",
    category: "Student Fellowship",
    description: "A 12-week internship alternative where software engineering students collaborate on real open-source projects under mentor guidance.",
    eligibility: "Enrolled university students or recent graduates",
    deadline: "Batch applications open year-round",
    relevantSkills: ["Python", "Software Design", "Code Review", "Git"],
    officialUrl: "https://fellowship.mlh.io",
    isVerified: true,
    accentColor: "#306998"
  }
];
