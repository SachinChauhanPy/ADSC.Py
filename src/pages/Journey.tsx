import React from 'react';
import type { MetaFunction } from 'react-router';
import { getSeoMeta } from '../lib/seo';

export const meta: MetaFunction = ({ location }) => {
  return getSeoMeta('journey', [
    { title: "Python Domain Journey Map | ADSC.Py" },
    { name: "description", content: "Explore custom roadmaps for Python domains (Web, AI/ML, Data Science, Automation) at Atmiya University, Rajkot." },
    { property: "og:title", content: "Python Domain Journey Map | ADSC.Py" },
    { property: "og:description", content: "Explore custom roadmaps for Python domains (Web, AI/ML, Data Science, Automation) at Atmiya University, Rajkot." },
  ], location.pathname);
};
import { Shell } from '../components/layout/Shell';
import { getDomains } from '../lib/dataManager';
import { RenderSticker } from '../components/stickers';
import { Link } from 'react-router';
import { CheckCircle2, Code2, Sparkles, Layers } from 'lucide-react';

export default function JourneyPage() {
  const domains = getDomains().filter(d => !d.hidden);

  return (
    <Shell>
      <div className="space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="pixel-badge bg-[#4285F4] text-white inline-block">
            INTERACTIVE ROADMAP EXPLORER
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            The Python Domain Journey
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Python isn't just one career path — it's an ecosystem of specializations. Explore what each domain builds, what tools to learn, and what starter projects to construct.
          </p>
        </div>

        {/* Quick Nav Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 py-4 border-y-2 border-zinc-900 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 transition-colors">
          <span className="font-pixel text-xs text-zinc-500 dark:text-zinc-400 uppercase mr-2">JUMP TO DOMAIN:</span>
          {domains.map((domain) => (
            <a
              key={domain.id}
              href={`#${domain.id}`}
              className="pixel-btn text-xs px-3 py-1.5 font-bold hover:bg-[#FFD43B]"
            >
              {domain.title}
            </a>
          ))}
        </div>

        {/* Detailed Domain Cards */}
        <div className="space-y-16">
          {domains.map((domain, index) => (
            <div
              key={domain.id}
              id={domain.id}
              className="pixel-card-static p-6 sm:p-10 border-2 border-zinc-900 dark:border-zinc-700 scroll-mt-28 space-y-8 relative"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
                <div className="flex items-center gap-4">
                  <RenderSticker name={domain.iconName} className="w-14 h-14 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-xs font-bold text-zinc-400">TRACK 0{index + 1}</span>
                      <span className={`px-2.5 py-0.5 text-xs font-pixel font-bold border border-zinc-900 dark:border-zinc-600 ${domain.badgeBg} ${domain.badgeText}`}>
                        {domain.title}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1 hover:text-[#4285F4] dark:hover:text-[#7aafff] transition-colors">
                      <Link to={`/journey/${domain.id}`}>
                        {domain.title}
                      </Link>
                    </h2>
                  </div>
                </div>

                <Link
                  to="/paths"
                  className="pixel-btn-python text-xs px-4 py-2.5 flex items-center justify-center gap-1.5 font-extrabold shrink-0"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Build {domain.title} Project</span>
                </Link>
              </div>

              {/* Overview & Why Python */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3 bg-zinc-50 dark:bg-zinc-800 p-5 border-2 border-zinc-900 dark:border-zinc-700">
                  <h3 className="font-pixel text-xs text-zinc-900 dark:text-zinc-100 uppercase font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4285F4]" />
                    <span>WHAT IS THIS DOMAIN?</span>
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                    {domain.whatItIs}
                  </p>
                </div>

                <div className="space-y-3 bg-amber-50/60 dark:bg-amber-950/30 p-5 border-2 border-zinc-900 dark:border-zinc-700">
                  <h3 className="font-pixel text-xs text-zinc-900 dark:text-zinc-100 uppercase font-bold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#EA4335]" />
                    <span>WHY PYTHON LEADS HERE:</span>
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                    {domain.whyPython}
                  </p>
                </div>
              </div>

              {/* Real World Applications */}
              <div className="space-y-3">
                <h4 className="font-pixel text-xs text-zinc-500 dark:text-zinc-400 uppercase">REAL WORLD APPLICATIONS:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {domain.realWorldUse.map((use) => (
                    <div key={use} className="flex items-center gap-3 bg-white dark:bg-zinc-800 p-3 border-2 border-zinc-900 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-[2px_2px_0px_var(--pixel-shadow-color)]">
                      <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0" />
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Roadmap Steps */}
              <div className="space-y-3">
                <h4 className="font-pixel text-xs text-zinc-500 dark:text-zinc-400 uppercase">THE RECOMMENDED LEARNING PATH:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {domain.learningSteps.map((step, sIdx) => (
                    <div key={step} className="p-4 bg-zinc-900 dark:bg-zinc-950 text-white border-2 border-zinc-900 dark:border-zinc-700 shadow-[3px_3px_0px_#FFD43B] space-y-2">
                      <span className="font-pixel text-[10px] text-[#FFD43B]">STEP 0{sIdx + 1}</span>
                      <p className="text-xs font-bold leading-snug">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Blueprints */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-zinc-100 dark:border-zinc-700">
                <div className="bg-blue-50/50 dark:bg-blue-950/30 p-5 border-2 border-zinc-900 dark:border-zinc-700 space-y-3">
                  <span className="pixel-badge bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100">BEGINNER PROJECT</span>
                  <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">{domain.beginnerProject.title}</h4>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{domain.beginnerProject.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {domain.beginnerProject.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-900 dark:border-zinc-700 text-[10px] font-mono font-bold text-zinc-900 dark:text-zinc-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50/50 dark:bg-amber-950/30 p-5 border-2 border-zinc-900 dark:border-zinc-700 space-y-3">
                  <span className="pixel-badge bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100">INTERMEDIATE PROJECT</span>
                  <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">{domain.intermediateProject.title}</h4>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{domain.intermediateProject.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {domain.intermediateProject.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-900 dark:border-zinc-700 text-[10px] font-mono font-bold text-zinc-900 dark:text-zinc-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </Shell>
  );
}
