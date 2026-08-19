import React, { useState } from 'react';
import { Link } from 'react-router';
import { PYTHON_DOMAINS } from '../../data/domains';
import { RenderSticker } from '../stickers';
import { ArrowRight, Code, Check } from 'lucide-react';

export function PathFinder() {
  const [activeDomainId, setActiveDomainId] = useState(PYTHON_DOMAINS[0].id);

  const activeDomain = PYTHON_DOMAINS.find((d) => d.id === activeDomainId) || PYTHON_DOMAINS[0];

  return (
    <section className="py-12 bg-white dark:bg-[#0a0a0b] transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="pixel-badge bg-[#4285F4] text-white mb-2">
            INTERACTIVE DOMAIN MAP
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Where Can Python Take You?
          </h2>
        </div>
        <Link
          to="/journey"
          className="pixel-btn text-xs px-4 py-2.5 flex items-center gap-1.5 font-bold"
        >
          <span>View Full Roadmap Explorer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Domain Tabs */}
        <div className="lg:col-span-4 space-y-2.5">
          {PYTHON_DOMAINS.map((domain) => {
            const isSelected = domain.id === activeDomainId;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainId(domain.id)}
                className={`w-full text-left p-4 transition-all border-2 flex items-center justify-between ${
                  isSelected
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-[4px_4px_0px_#FFD43B]'
                    : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-900 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-[2px_2px_0px_var(--pixel-shadow-color)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <RenderSticker name={domain.iconName} className="w-8 h-8 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{domain.title}</h4>
                    <p className={`text-xs ${isSelected ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'}`}>
                      {domain.coreLibraries.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-[#FFD43B] dark:text-[#4285F4]" />}
              </button>
            );
          })}
        </div>

        {/* Selected Domain Preview Card */}
        <div className="lg:col-span-8 pixel-card-static p-6 sm:p-8 border-2 border-zinc-900 dark:border-zinc-700 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-100 dark:border-zinc-700 pb-4">
            <div className="flex items-center gap-4">
              <RenderSticker name={activeDomain.iconName} className="w-12 h-12" />
              <div>
                <span className={`px-2.5 py-0.5 text-xs font-pixel font-bold border border-zinc-900 dark:border-zinc-600 ${activeDomain.badgeBg} ${activeDomain.badgeText}`}>
                  PYTHON DOMAIN
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
                  {activeDomain.title}
                </h3>
              </div>
            </div>

            <Link
              to={`/journey#${activeDomain.id}`}
              className="pixel-btn-python text-xs px-4 py-2 flex items-center gap-1 font-bold"
            >
              <span>Explore Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-zinc-700 dark:text-zinc-300 font-medium text-base leading-relaxed">
            {activeDomain.tagline}
          </p>

          {/* Real World Applications */}
          <div className="space-y-2">
            <h5 className="font-pixel text-xs text-zinc-500 dark:text-zinc-400 uppercase">WHERE IT IS USED:</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeDomain.realWorldUse.map((use) => (
                <div key={use} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 p-2.5 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <span className="w-2 h-2 bg-[#4285F4] shrink-0" />
                  <span>{use}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Tools */}
          <div className="space-y-2 pt-2">
            <h5 className="font-pixel text-xs text-zinc-500 dark:text-zinc-400 uppercase">ESSENTIAL LIBRARIES & TOOLS:</h5>
            <div className="flex flex-wrap gap-2">
              {activeDomain.coreLibraries.map((lib) => (
                <span key={lib} className="pixel-badge bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200">
                  {lib}
                </span>
              ))}
            </div>
          </div>

          {/* Starter Project Idea */}
          <div className="bg-amber-50/80 dark:bg-amber-950/30 border-2 border-zinc-900 dark:border-zinc-700 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-pixel text-zinc-900 dark:text-zinc-100">
              <Code className="w-4 h-4 text-[#EA4335]" />
              <span>RECOMMENDED STARTER PROJECT:</span>
            </div>
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
              {activeDomain.beginnerProject.title}
            </h4>
            <p className="text-xs text-zinc-700 dark:text-zinc-400">
              {activeDomain.beginnerProject.description}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
