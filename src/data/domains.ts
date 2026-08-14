export interface PythonDomain {
  id: string;
  title: string;
  shortDesc: string;
  tagline: string;
  iconName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  whatItIs: string;
  whyPython: string;
  realWorldUse: string[];
  coreLibraries: string[];
  beginnerProject: {
    title: string;
    description: string;
    tech: string[];
  };
  intermediateProject: {
    title: string;
    description: string;
    tech: string[];
  };
  learningSteps: string[];
  hidden?: boolean;
}

export const PYTHON_DOMAINS: PythonDomain[] = [
  {
    id: "web-development",
    title: "Web & Fullstack Python",
    shortDesc: "Build high-performance web applications, dynamic sites, and fullstack platforms.",
    tagline: "From simple sites to scalable web platforms with Django, FastAPI, & React Router.",
    iconName: "browser",
    color: "#4285F4",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-900",
    whatItIs: "Web development with Python powers backend APIs, database management, user authentication, and server-side rendering for modern web products.",
    whyPython: "Python offers the fastest iteration time from idea to deployed web backend with batteries-included frameworks like Django and high-speed async frameworks like FastAPI.",
    realWorldUse: [
      "Building RESTful & GraphQL microservices",
      "Server-Side Rendered portals and CMS backends",
      "Fullstack web apps with Python API backends & React/Vue frontends",
      "Real-time websockets & async worker processing"
    ],
    coreLibraries: ["FastAPI", "Django", "Flask", "Pydantic", "SQLAlchemy", "Uvicorn"],
    beginnerProject: {
      title: "FastAPI Task Management API",
      description: "Build a complete JSON REST API with SQLite database, interactive Swagger docs, and request validation.",
      tech: ["FastAPI", "Pydantic", "SQLite", "Uvicorn"]
    },
    intermediateProject: {
      title: "Realtime Collaborative Notes Platform",
      description: "Build a Django backend with WebSockets for live typing collaboration, JWT auth, and PostgreSQL storage.",
      tech: ["Django", "Django Channels", "PostgreSQL", "React"]
    },
    learningSteps: [
      "Master HTTP basics, Status codes & JSON APIs",
      "Learn FastAPI routing & Pydantic data schemas",
      "Connect SQLite/PostgreSQL with SQLAlchemy or Django ORM",
      "Implement Auth (JWT/OAuth2) & Deploy to cloud"
    ]
  },
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning",
    shortDesc: "Train intelligent models, build LLM agents, vision apps, and neural networks.",
    tagline: "The world's #1 language for Artificial Intelligence & Generative AI.",
    iconName: "brain",
    color: "#EA4335",
    badgeBg: "bg-red-100",
    badgeText: "text-red-900",
    whatItIs: "AI & Machine Learning involves teaching computers to learn from data, recognize patterns, process human language, and generate original content.",
    whyPython: "Python is the undisputed king of AI because the world's leading research labs and frameworks (PyTorch, TensorFlow, Hugging Face) are built around Python bindings.",
    realWorldUse: [
      "Generative AI & LLM Agent workflows (RAG, Chatbots)",
      "Computer Vision for detection & image classification",
      "Predictive analytics & forecasting engines",
      "Natural Language Processing (NLP) sentiment analyzers"
    ],
    coreLibraries: ["PyTorch", "Scikit-Learn", "Hugging Face", "LangChain", "OpenCV", "NumPy"],
    beginnerProject: {
      title: "Custom PDF Q&A AI Assistant",
      description: "Build a Retrieval-Augmented Generation (RAG) tool that reads any PDF file and answers questions based on its content.",
      tech: ["LangChain", "Hugging Face", "ChromaDB", "Python"]
    },
    intermediateProject: {
      title: "Real-time Object Recognition System",
      description: "Train a computer vision pipeline that processes webcam video feeds to detect and annotate objects in real-time.",
      tech: ["PyTorch", "OpenCV", "YOLOv8", "Streamlit"]
    },
    learningSteps: [
      "Master NumPy array manipulations & Pandas DataFrames",
      "Learn fundamental ML algorithms with Scikit-Learn",
      "Build deep neural networks with PyTorch",
      "Leverage pre-trained LLMs & Vector databases"
    ]
  },
  {
    id: "automation-scraping",
    title: "Automation & Web Bots",
    shortDesc: "Turn repetitive computer tasks into fast automated scripts and web crawlers.",
    tagline: "Automate browsers, extract structured data, script workflows, and save hundreds of hours.",
    iconName: "gears",
    color: "#34A853",
    badgeBg: "bg-green-100",
    badgeText: "text-green-900",
    whatItIs: "Automation & Web Scraping uses code to mimic human interactions on computers, extract unstructured web data, and process repetitive files automatically.",
    whyPython: "Python's syntax makes writing automation scripts in 20 lines of code what takes hundreds of lines in other languages.",
    realWorldUse: [
      "Automating daily file organization & Excel processing",
      "Scraping e-commerce prices, news feeds, and research datasets",
      "Headless browser testing with Playwright & Selenium",
      "Automated email reporting & web monitoring alerts"
    ],
    coreLibraries: ["Playwright", "BeautifulSoup4", "Scrapy", "Selenium", "APScheduler", "Pandas"],
    beginnerProject: {
      title: "Smart Price Tracker & Alert Bot",
      description: "Build a bot that checks product prices across e-commerce sites daily and emails you when a price drop occurs.",
      tech: ["BeautifulSoup4", "Requests", "smtplib", "Python"]
    },
    intermediateProject: {
      title: "Full-Scale Async Web Crawler",
      description: "Scrape thousands of job listings across tech portals, extract clean JSON, and automatically upload to a database.",
      tech: ["Playwright", "Scrapy", "Asyncio", "MongoDB"]
    },
    learningSteps: [
      "Understand HTML DOM, CSS Selectors, & Network Requests",
      "Extract static HTML content with BeautifulSoup & Requests",
      "Control headless browsers using Playwright or Selenium",
      "Build scheduler bots & deploy to background servers"
    ]
  },
  {
    id: "data-science",
    title: "Data Science & Analytics",
    shortDesc: "Transform raw datasets into actionable insights, dashboards, and visual stories.",
    tagline: "Clean, analyze, visualize, and extract business intelligence from mass data.",
    iconName: "database",
    color: "#FBBC04",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-900",
    whatItIs: "Data Science combines statistical analysis, data cleaning, exploratory data visualization, and data pipeline engineering to solve business queries.",
    whyPython: "Pandas and Polars make handling millions of data rows effortless, while Matplotlib and Seaborn produce publication-quality charts.",
    realWorldUse: [
      "Exploratory Data Analysis (EDA) for business decisions",
      "Interactive analytics dashboards with Streamlit & Plotly",
      "Cleaning messy datasets from CSVs, SQL databases & APIs",
      "Statistical modeling and hypothesis validation"
    ],
    coreLibraries: ["Pandas", "Polars", "Matplotlib", "Seaborn", "Plotly", "Streamlit"],
    beginnerProject: {
      title: "Student Performance EDA Dashboard",
      description: "Analyze university grading trends across semesters and render interactive charts using Streamlit.",
      tech: ["Pandas", "Plotly", "Streamlit", "Python"]
    },
    intermediateProject: {
      title: "Automated Data Quality & Profiling Engine",
      description: "Create a CLI tool that accepts raw CSV files, detects outliers & missing values, and generates HTML audit reports.",
      tech: ["Polars", "Seaborn", "Jinja2", "Python"]
    },
    learningSteps: [
      "Master Pandas Series & DataFrame operations",
      "Learn data cleaning, filtering, & grouping algorithms",
      "Create data visualizations with Seaborn & Plotly",
      "Build web apps with Streamlit to present findings"
    ]
  },
  {
    id: "cli-system-scripting",
    title: "CLI Tools & System Utilities",
    shortDesc: "Build powerful command-line interfaces, dev tools, and devops scripts.",
    tagline: "Craft fast terminal utilities that developers love to use every single day.",
    iconName: "terminal",
    color: "#306998",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-900",
    whatItIs: "Command-Line Interface (CLI) engineering creates terminal tools for developer workflows, server management, file batch operations, and devops tooling.",
    whyPython: "Libraries like Click and Rich make building beautiful, colorful terminal UIs with subcommands and flags interactive and easy.",
    realWorldUse: [
      "Developer productivity CLI tools",
      "Cloud infrastructure deployment scripts",
      "Git repository helpers and code linters",
      "Log file parsers and monitor watchers"
    ],
    coreLibraries: ["Click", "Typer", "Rich", "Sh", "Subprocess", "Pathlib"],
    beginnerProject: {
      title: "Interactive Developer Environment Setup CLI",
      description: "Build a terminal wizard that configures Git, installs recommended extensions, and sets up SSH keys with rich terminal graphics.",
      tech: ["Typer", "Rich", "Pathlib"]
    },
    intermediateProject: {
      title: "Git Repository Audit & Health Scanner",
      description: "Build a CLI that scans Git repos for exposed secret keys, large binary files, and commit history stats.",
      tech: ["Click", "Rich", "GitPython"]
    },
    learningSteps: [
      "Understand OS paths, environment variables, & sys/os modules",
      "Learn Typer or Click for parsing CLI flags & subcommands",
      "Add rich formatting, spinners, & tables with Rich",
      "Package your tool with setuptools & publish to PyPI"
    ]
  }
];
