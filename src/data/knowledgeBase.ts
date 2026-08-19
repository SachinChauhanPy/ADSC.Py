// ─────────────────────────────────────────────────────────
// ADSC.Py Knowledge Base — RAG Context for the AI Chatbot
// Pre-compiled chunks from site data + community context
// ─────────────────────────────────────────────────────────

import { PYTHON_DOMAINS } from './domains';
import { SESSIONS_DATA } from './sessions';
import { PROJECT_BLUEPRINTS } from './projects';
import { OPPORTUNITIES_DATA } from './opportunities';
import { MAINTAINERS_DATA } from './maintainers';

export interface KnowledgeChunk {
  category: string;
  title: string;
  content: string;
  keywords: string[];
}

// ── Community Context (from ADSC.Py Context Feed.docx) ──
const COMMUNITY_CONTEXT = `ADSC.Py is a student-led, career-oriented Python community built to help students move beyond simply learning Python syntax and toward becoming confident, industry-ready contributors in the wider Python ecosystem.

Why the community exists: Many students learn Python through tutorials, problem-solving, and small projects but remain unclear about which career paths Python can lead to, what industry-relevant skills they need beyond Python, how to build practical experience and a strong portfolio, and how to choose a specialization and grow consistently.

ADSC.Py exists to reduce this confusion through guidance, peer learning, practical work, opportunities, and community collaboration.

Core belief: Learning Python alone is usually not enough to build a career. Career readiness comes from combining Python with specialization, complementary technologies, real-world projects, communication, collaboration, problem-solving, and continuous learning. The community uses an "us" mindset: helping others learn also helps contributors strengthen their own knowledge, discover gaps, gain experience, and grow.

Community goals: ADSC.Py helps students learn Python with structured guidance, explore career paths such as Web Development, AI/ML, Data Science, Automation, Cybersecurity, DevOps, and Open Source, understand the tools, technologies, and skills required for each path, build practical collaborative real-world projects, find quality resources roadmaps and learning direction, discover internships hackathons certifications open-source programs competitions and other opportunities, stay aware of relevant industry trends, and connect collaborate and learn with like-minded students.

Community activities: ADSC.Py may organize or support Python learning sessions and doubt-solving, workshops coding sessions demonstrations and revision sessions, career discussions and technology roadmaps, collaborative project-building activities, resource sharing and documentation, opportunity sharing, educational content such as posts carousels articles visual explainers videos and reels, challenges new learning formats and initiatives inspired by developer-community and industry trends.

Maintainer philosophy: A maintainer does not need to know everything or be a Python expert. A maintainer is someone who contributes consistently, collaborates responsibly, and helps the community move forward. Maintainers may contribute as career and learning mentors, Python ecosystem or technology contributors, project facilitators, workshop or session contributors, researchers and quick learners, resource curators, opportunity connectors, writers and documentation contributors, content creators, community moderators, community representatives, creative and trend contributors. A person may hold multiple roles, change roles over time, or create a new role based on community needs.

Tone and values: Welcoming, practical, motivating, and student-friendly. Inclusive of beginners and non-experts. Focused on collaboration over competition. Career-aware without making unrealistic promises. Action-oriented and grounded in real learning outcomes. Respectful, disciplined, and supportive.

ADSC.Py is NOT only a Python tutorial group or a community exclusively for experts. It is a broader ecosystem for learning, contribution, direction, practical growth, and career readiness around Python.

Desired long-term impact: ADSC.Py aims to become a platform where students discover direction, develop relevant skills, build practical experience, gain confidence, connect with others, and access meaningful opportunities in the Python ecosystem while contributors grow by helping one another.

ADSC.Py operates under ADSC (Atmiya Developer Students Club) at Atmiya University, Rajkot, Gujarat, India.`;

// ── Site Navigation Knowledge ──
const SITE_NAVIGATION = `The ADSC.Py website has the following pages:
- Home page (/) — Overview of the community with hero section, story pillars, path finder, opportunity preview, and manifesto
- Journey page (/journey) — The community's learning journey and milestones
- Paths page (/paths) — Explore all Python career domains/learning paths including Web Development, AI & Machine Learning, Automation & Web Bots, Data Science & Analytics, and CLI Tools & System Utilities. Each path has detailed information.
- Sessions page (/sessions) — Browse upcoming and past workshops, coding sessions, and knowledge base sessions
- Opportunities page (/opportunities) — Find internships, hackathons, open source programs, student fellowships, and competitions
- Community page (/community) — Meet the ADSC.Py maintainers, core team members, and learn how to get involved
- About page (/about) — Origin story, community manifesto, brand rules, and why ADSC.Py exists
- Privacy Policy page (/privacy) — Privacy policy information
- Terms of Service page (/terms) — Terms and conditions`;

// ── Build Knowledge Chunks ──

function buildDomainChunks(): KnowledgeChunk[] {
  return PYTHON_DOMAINS.filter(d => !d.hidden).map(domain => ({
    category: 'Learning Paths',
    title: domain.title,
    content: `${domain.title}: ${domain.shortDesc} ${domain.tagline}

What it is: ${domain.whatItIs}
Why Python: ${domain.whyPython}

Real-world uses: ${domain.realWorldUse.join(', ')}

Core libraries & tools: ${domain.coreLibraries.join(', ')}

Beginner Project: "${domain.beginnerProject.title}" — ${domain.beginnerProject.description} (Tech: ${domain.beginnerProject.tech.join(', ')})

Intermediate Project: "${domain.intermediateProject.title}" — ${domain.intermediateProject.description} (Tech: ${domain.intermediateProject.tech.join(', ')})

Learning steps: ${domain.learningSteps.map((step, i) => `${i + 1}. ${step}`).join(' ')}`,
    keywords: [
      domain.title.toLowerCase(),
      domain.id,
      ...domain.coreLibraries.map(l => l.toLowerCase()),
      ...domain.realWorldUse.map(u => u.toLowerCase()),
      'path', 'domain', 'learning', 'career', 'track',
      ...domain.learningSteps.map(s => s.toLowerCase()),
    ],
  }));
}

function buildSessionChunks(): KnowledgeChunk[] {
  return SESSIONS_DATA.filter(s => !s.hidden).map(session => ({
    category: 'Sessions & Workshops',
    title: session.title,
    content: `Session: "${session.title}" — ${session.tagline}
Speaker: ${session.speaker.name} (${session.speaker.role})
Date/Status: ${session.date} | Status: ${session.status}
Domain: ${session.domain} | Level: ${session.level}

Description: ${session.description}

Key Takeaways: ${session.takeaways.join('; ')}

Prerequisites: ${session.prerequisites.join('; ')}

${session.resources?.githubRepo ? `GitHub: ${session.resources.githubRepo}` : ''}`,
    keywords: [
      session.title.toLowerCase(),
      session.domain.toLowerCase(),
      session.level.toLowerCase(),
      session.status.toLowerCase(),
      'session', 'workshop', 'event', 'talk', 'lecture',
      ...session.takeaways.map(t => t.toLowerCase()),
      session.speaker.name.toLowerCase(),
    ],
  }));
}

function buildProjectChunks(): KnowledgeChunk[] {
  return PROJECT_BLUEPRINTS.filter(p => !p.hidden).map(project => ({
    category: 'Project Blueprints',
    title: project.title,
    content: `Project Blueprint: "${project.title}"
Level: ${project.level} | Domain: ${project.domain} | Difficulty: ${project.difficulty}
Estimated Time: ${project.estimatedHours}

Problem it solves: ${project.problemSolved}

What you will learn: ${project.whatYouWillLearn.join('; ')}

Tech Stack: ${project.techStack.join(', ')}

Key Features: ${project.keyFeatures.join('; ')}`,
    keywords: [
      project.title.toLowerCase(),
      project.domain.toLowerCase(),
      project.difficulty.toLowerCase(),
      'project', 'build', 'blueprint', 'portfolio',
      ...project.techStack.map(t => t.toLowerCase()),
      ...project.whatYouWillLearn.map(w => w.toLowerCase()),
    ],
  }));
}

function buildOpportunityChunks(): KnowledgeChunk[] {
  return OPPORTUNITIES_DATA.filter(o => !o.hidden).map(opp => ({
    category: 'Opportunities',
    title: opp.title,
    content: `Opportunity: "${opp.title}" by ${opp.organization}
Category: ${opp.category}
${opp.featuredBadge ? `Badge: ${opp.featuredBadge}` : ''}

Description: ${opp.description}

Eligibility: ${opp.eligibility}
Deadline: ${opp.deadline}

Relevant Skills: ${opp.relevantSkills.join(', ')}

Official URL: ${opp.officialUrl}`,
    keywords: [
      opp.title.toLowerCase(),
      opp.organization.toLowerCase(),
      opp.category.toLowerCase(),
      'opportunity', 'internship', 'hackathon', 'open source', 'fellowship', 'competition',
      ...opp.relevantSkills.map(s => s.toLowerCase()),
    ],
  }));
}

function buildMaintainerChunks(): KnowledgeChunk[] {
  return MAINTAINERS_DATA.filter(m => !m.hidden).map(maintainer => ({
    category: 'Team & Maintainers',
    title: maintainer.name,
    content: `Team Member: ${maintainer.name}
Role: ${maintainer.role} | Category: ${maintainer.category}
University: ${maintainer.university}

Bio: ${maintainer.bio}

Focus Domain: ${maintainer.focusDomain}`,
    keywords: [
      maintainer.name.toLowerCase(),
      maintainer.role.toLowerCase(),
      maintainer.category.toLowerCase(),
      maintainer.focusDomain.toLowerCase(),
      'team', 'maintainer', 'member', 'who', 'lead', 'people',
    ],
  }));
}

// ── Exported API ──

let _cachedChunks: KnowledgeChunk[] | null = null;

export function getKnowledgeChunks(): KnowledgeChunk[] {
  if (_cachedChunks) return _cachedChunks;

  _cachedChunks = [
    // Community context as a single large chunk
    {
      category: 'About ADSC.Py',
      title: 'Community Overview & Mission',
      content: COMMUNITY_CONTEXT,
      keywords: [
        'adsc', 'adsc.py', 'community', 'about', 'mission', 'what is', 'who are',
        'why', 'purpose', 'goals', 'values', 'python', 'atmiya', 'university',
        'rajkot', 'student', 'career', 'learning', 'join', 'how to join',
        'maintainer', 'tone', 'belief', 'activities', 'brand',
      ],
    },
    // Site navigation
    {
      category: 'Website Navigation',
      title: 'Site Pages & Navigation',
      content: SITE_NAVIGATION,
      keywords: [
        'page', 'pages', 'navigate', 'navigation', 'find', 'where', 'website',
        'site', 'link', 'url', 'home', 'journey', 'paths', 'sessions',
        'opportunities', 'community', 'about', 'privacy', 'terms',
      ],
    },
    // Data-driven chunks
    ...buildDomainChunks(),
    ...buildSessionChunks(),
    ...buildProjectChunks(),
    ...buildOpportunityChunks(),
    ...buildMaintainerChunks(),
  ];

  return _cachedChunks;
}

/**
 * Lightweight client-side search: scores chunks by keyword overlap
 * with the user query. Returns the top N most relevant chunks.
 */
export function searchKnowledge(query: string, topN: number = 5): KnowledgeChunk[] {
  const chunks = getKnowledgeChunks();
  const queryLower = query.toLowerCase();
  const queryTokens = queryLower
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2); // skip very short tokens

  const scored = chunks.map(chunk => {
    let score = 0;

    // 1. Exact phrase match in content (highest weight)
    if (chunk.content.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // 2. Exact phrase match in title
    if (chunk.title.toLowerCase().includes(queryLower)) {
      score += 8;
    }

    // 3. Token overlap with keywords
    for (const token of queryTokens) {
      for (const keyword of chunk.keywords) {
        if (keyword.includes(token)) {
          score += 3;
        }
        if (token.includes(keyword) && keyword.length > 3) {
          score += 2;
        }
      }
    }

    // 4. Token overlap with content
    for (const token of queryTokens) {
      if (chunk.content.toLowerCase().includes(token)) {
        score += 1;
      }
    }

    // 5. Category bonus — if query mentions a category keyword
    const categoryKeywords: Record<string, string[]> = {
      'Learning Paths': ['path', 'domain', 'career', 'track', 'learn', 'roadmap'],
      'Sessions & Workshops': ['session', 'workshop', 'event', 'talk', 'upcoming'],
      'Project Blueprints': ['project', 'build', 'blueprint', 'portfolio', 'create'],
      'Opportunities': ['opportunity', 'internship', 'hackathon', 'gsoc', 'fellowship'],
      'Team & Maintainers': ['team', 'who', 'maintainer', 'member', 'lead', 'people'],
      'About ADSC.Py': ['about', 'what is', 'adsc', 'mission', 'join', 'community'],
      'Website Navigation': ['page', 'where', 'find', 'navigate', 'link', 'website'],
    };

    const catKeys = categoryKeywords[chunk.category] || [];
    for (const token of queryTokens) {
      if (catKeys.includes(token)) {
        score += 4;
      }
    }

    return { chunk, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(s => s.chunk);
}
