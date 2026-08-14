export interface Session {
  id: string;
  title: string;
  tagline: string;
  speaker: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  date: string;
  status: "Upcoming" | "Completed" | "Knowledge Base" | "Past";
  domain: string;
  level: "Beginner" | "Intermediate" | "All Levels" | "Advanced";
  description: string;
  takeaways: string[];
  prerequisites: string[];
  resources?: {
    githubRepo?: string;
    slidesUrl?: string;
    recordingUrl?: string;
    notesUrl?: string;
  };
  hidden?: boolean;
}

export const SESSIONS_DATA: Session[] = [
  {
    id: "python-after-basics-01",
    title: "Python Beyond Syntax: Finding Your Path in 2026",
    tagline: "The roadmap session every first-year & second-year student needs.",
    speaker: {
      name: "ADSC.Py Core Maintainers",
      role: "Atmiya Developer Students Club"
    },
    date: "Upcoming • Special Session",
    status: "Upcoming",
    domain: "Developer Orientation",
    level: "Beginner",
    description: "You learned loops, functions, and basic data structures. What comes next? In this interactive session, we map out Web, AI, Data Science, and Automation, showing real code examples for each path so you can choose what to build.",
    takeaways: [
      "Clear understanding of the 5 primary Python career domains",
      "Hands-on demonstration of FastAPI vs PyTorch vs Playwright",
      "Step-by-step guidance on escaping tutorial hell",
      "How to set up your developer environment & GitHub portfolio"
    ],
    prerequisites: [
      "Basic understanding of Python variables and loops",
      "Laptop with VS Code & Python installed"
    ],
    resources: {
      githubRepo: "https://github.com/ADSC-Py/python-beyond-syntax-roadmap",
      notesUrl: "#"
    }
  },
  {
    id: "fastapi-microservices-101",
    title: "Building Production JSON APIs with FastAPI & Pydantic",
    tagline: "Learn modern backend API design from scratch.",
    speaker: {
      name: "Backend Working Group",
      role: "ADSC.Py Technical Lead"
    },
    date: "Knowledge Base",
    status: "Knowledge Base",
    domain: "Web & Fullstack",
    level: "Intermediate",
    description: "FastAPI is the modern gold standard for Python web backends. We build a functional microservice with database integration, automated openapi docs, and validation schemas.",
    takeaways: [
      "Asynchronous request handlers with async/await",
      "Strict data validation with Pydantic v2",
      "SQLite database ORM wiring with SQLAlchemy",
      "Deploying your backend to cloud platforms"
    ],
    prerequisites: [
      "Basic Python functions & dictionary manipulation"
    ],
    resources: {
      githubRepo: "https://github.com/ADSC-Py/fastapi-starter-blueprint",
      slidesUrl: "#",
      recordingUrl: "#"
    }
  },
  {
    id: "ai-rag-intro",
    title: "Generative AI Engineering: Building Your First RAG Agent",
    tagline: "Turn LLMs into specialized document question-answering engines.",
    speaker: {
      name: "AI & ML Track Lead",
      role: "ADSC.Py AI Working Group"
    },
    date: "Knowledge Base",
    status: "Knowledge Base",
    domain: "AI & Machine Learning",
    level: "Intermediate",
    description: "Learn how Retrieval-Augmented Generation works under the hood. We walk through embeddings, vector stores, and local model inference to build a document assistant.",
    takeaways: [
      "Understanding vector embeddings & cosine similarity",
      "Using LangChain / LlamaIndex for document chunking",
      "Building local vector search with ChromaDB",
      "Designing anti-hallucination prompts"
    ],
    prerequisites: [
      "Familiarity with Python lists & basic API calls"
    ],
    resources: {
      githubRepo: "https://github.com/ADSC-Py/local-rag-agent-blueprint",
      slidesUrl: "#"
    }
  },
  {
    id: "web-scraping-playwright",
    title: "Web Scraping & Automation with Playwright & Python",
    tagline: "Scrape dynamic single-page web applications effortlessly.",
    speaker: {
      name: "Automation Squad",
      role: "ADSC.Py Maintainer"
    },
    date: "Knowledge Base",
    status: "Knowledge Base",
    domain: "Automation & Web Bots",
    level: "Beginner",
    description: "Static HTML scrapers break on modern JavaScript sites. Learn how to use headless Playwright in Python to automate browsers, handle pagination, and bypass anti-bot challenges.",
    takeaways: [
      "Headless browser control with Playwright Python",
      "Handling network requests & waiting for DOM elements",
      "Exporting structured JSON & CSV datasets",
      "Ethical scraping practices & rate limiting"
    ],
    prerequisites: [
      "Basic HTML knowledge"
    ],
    resources: {
      githubRepo: "https://github.com/ADSC-Py/playwright-scraper-guide"
    }
  }
];
