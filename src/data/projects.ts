export interface ProjectBlueprint {
  id: string;
  level: "Level 1: Fundamentals" | "Level 2: Real-World Apps" | "Level 3: Advanced Systems";
  levelNum: 1 | 2 | 3;
  title: string;
  domain: string;
  problemSolved: string;
  whatYouWillLearn: string[];
  techStack: string[];
  estimatedHours: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  githubStarterTemplateUrl?: string;
  keyFeatures: string[];
  hidden?: boolean;
}

export const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: "cli-weather-dashboard",
    level: "Level 1: Fundamentals",
    levelNum: 1,
    title: "Terminal Weather & Forecast CLI",
    domain: "CLI & Scripting",
    problemSolved: "Moving past standard print statement scripts to fetching real-time JSON APIs and rendering rich terminal UI tables.",
    whatYouWillLearn: [
      "Making HTTP GET requests with requests/httpx",
      "Parsing nested JSON responses",
      "Handling API errors gracefully (404, rate limits)",
      "Formatting output tables with Rich"
    ],
    techStack: ["Python 3.11+", "httpx", "Rich", "OpenWeatherMap API"],
    estimatedHours: "3 - 5 hours",
    difficulty: "Beginner",
    keyFeatures: [
      "City lookup with 5-day weather forecast",
      "Color-coded temperature indicators and weather icons",
      "Saved favorite cities stored in local JSON configuration"
    ]
  },
  {
    id: "web-fastapi-link-shortener",
    level: "Level 1: Fundamentals",
    levelNum: 1,
    title: "FastAPI URL Shortener & Analytics",
    domain: "Web Development",
    problemSolved: "Understanding how URL routing, database CRUD operations, and HTTP redirects work in web services.",
    whatYouWillLearn: [
      "Defining API routes and path parameters in FastAPI",
      "Database schema creation with SQLite & SQLAlchemy",
      "Generating unique short keys with hash functions",
      "Tracking click analytics and referrer metadata"
    ],
    techStack: ["FastAPI", "SQLAlchemy", "SQLite", "Pydantic", "Uvicorn"],
    estimatedHours: "6 - 8 hours",
    difficulty: "Beginner",
    keyFeatures: [
      "POST /shorten to generate custom short code",
      "GET /{short_code} for 307 auto-redirection",
      "Interactive Swagger UI documentation at /docs"
    ]
  },
  {
    id: "automation-github-star-notifier",
    level: "Level 2: Real-World Apps",
    levelNum: 2,
    title: "GitHub Trending Repo Telegram Bot",
    domain: "Automation & Web Bots",
    problemSolved: "Automating web scraping of trending developer repositories and notifying a community channel on a daily cron schedule.",
    whatYouWillLearn: [
      "Scraping dynamic HTML with BeautifulSoup4",
      "Interacting with Telegram Bot API",
      "Task scheduling with APScheduler",
      "Deploying 24/7 Python worker scripts"
    ],
    techStack: ["Python", "BeautifulSoup4", "python-telegram-bot", "APScheduler"],
    estimatedHours: "8 - 12 hours",
    difficulty: "Intermediate",
    keyFeatures: [
      "Daily automated broadcast of top 5 trending Python repos",
      "Telegram inline keyboard for repo links & star counts",
      "Custom topic filter (e.g. #ai, #web, #cli)"
    ]
  },
  {
    id: "ai-rag-knowledge-bot",
    level: "Level 2: Real-World Apps",
    levelNum: 2,
    title: "Local PDF Search & Chatbot (RAG)",
    domain: "AI & Machine Learning",
    problemSolved: "Bridging the gap between static LLMs and custom private text documents without uploading confidential data to cloud servers.",
    whatYouWillLearn: [
      "Document chunking and text vectorization",
      "Building a local vector index with ChromaDB",
      "Query embedding similarity search",
      "Prompt engineering for factual QA"
    ],
    techStack: ["LangChain", "ChromaDB", "HuggingFace Embeddings", "Streamlit"],
    estimatedHours: "12 - 15 hours",
    difficulty: "Intermediate",
    keyFeatures: [
      "Drag-and-drop PDF reader interface in Streamlit",
      "Instant exact citation highlighting in source document",
      "Runs completely local on your laptop GPU/CPU"
    ]
  },
  {
    id: "data-student-placement-analyzer",
    level: "Level 2: Real-World Apps",
    levelNum: 2,
    title: "College Placement & Skills Data Explorer",
    domain: "Data Science",
    problemSolved: "Transforming raw survey spreadsheet data into clear actionable insights for engineering students.",
    whatYouWillLearn: [
      "Data cleaning, missing value imputation, & type coercion with Pandas",
      "Grouping, aggregations, & cross-tabulations",
      "Exploratory charts with Seaborn & Plotly",
      "Building web reporting interfaces with Streamlit"
    ],
    techStack: ["Pandas", "Plotly Express", "Streamlit", "NumPy"],
    estimatedHours: "8 - 10 hours",
    difficulty: "Intermediate",
    keyFeatures: [
      "Interactive domain popularity breakdown across engineering batches",
      "Skill matrix heatmap matching tech stacks to role requirements",
      "CSV export for custom filtered reports"
    ]
  },
  {
    id: "advanced-async-code-evaluator",
    level: "Level 3: Advanced Systems",
    levelNum: 3,
    title: "Async Python Code Sandbox Runner",
    domain: "Backend Systems",
    problemSolved: "Building a secure backend service that receives user-submitted Python code, executes it in isolated subprocesses, and captures stdout/stderr.",
    whatYouWillLearn: [
      "Asynchronous I/O with Python asyncio",
      "Process isolation and execution timeouts",
      "WebSockets for live streaming terminal output",
      "Docker container integration"
    ],
    techStack: ["FastAPI", "Asyncio", "Docker SDK", "WebSockets"],
    estimatedHours: "20+ hours",
    difficulty: "Advanced",
    keyFeatures: [
      "Subsecond code execution inside temporary Docker containers",
      "Real-time streaming console output over WebSocket",
      "Memory & CPU execution limit enforcement"
    ]
  }
];
