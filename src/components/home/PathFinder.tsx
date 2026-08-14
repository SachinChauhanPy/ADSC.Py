import React, { useState } from 'react';
import { Link } from 'react-router';
import { PYTHON_DOMAINS } from '../../data/domains';
import { RenderSticker } from '../stickers';
import { ArrowRight, Code, Check } from 'lucide-react';

export function PathFinder() {
  const [activeDomainId, setActiveDomainId] = useState(PYTHON_DOMAINS[0].id);

  const activeDomain = PYTHON_DOMAINS.find((d) => d.id === activeDomainId) || PYTHON_DOMAINS[0];

  return (
    <section className="py-12 bg-white">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="pixel-badge bg-[#4285F4] text-white mb-2">
            INTERACTIVE DOMAIN MAP
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Where Can Python Take You?
          </h2>
        </div>
        <Link
          to="/journey"
          className="pixel-btn text-xs px-4 py-2.5 flex items-center gap-1.5 font-bold text-zinc-800"
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
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-[4px_4px_0px_#FFD43B]'
                    : 'bg-white text-zinc-800 border-zinc-900 hover:bg-zinc-50 shadow-[2px_2px_0px_#121212]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <RenderSticker name={domain.iconName} className="w-8 h-8 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{domain.title}</h4>
                    <p className={`text-xs ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {domain.coreLibraries.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-[#FFD43B]" />}
              </button>
            );
          })}
        </div>

        {/* Selected Domain Preview Card */}
        <div className="lg:col-span-8 pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-4">
            <div className="flex items-center gap-4">
              <RenderSticker name={activeDomain.iconName} className="w-12 h-12" />
              <div>
                <span className={`px-2.5 py-0.5 text-xs font-pixel font-bold border border-zinc-900 ${activeDomain.badgeBg} ${activeDomain.badgeText}`}>
                  PYTHON DOMAIN
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-900 mt-1">
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

          <p className="text-zinc-700 font-medium text-base leading-relaxed">
            {activeDomain.tagline}
          </p>

          {/* Real World Applications */}
          <div className="space-y-2">
            <h5 className="font-pixel text-xs text-zinc-500 uppercase">WHERE IT IS USED:</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeDomain.realWorldUse.map((use) => (
                <div key={use} className="flex items-center gap-2 bg-zinc-50 p-2.5 border border-zinc-200 text-xs font-semibold text-zinc-800">
                  <span className="w-2 h-2 bg-[#4285F4] shrink-0" />
                  <span>{use}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Tools */}
          <div className="space-y-2 pt-2">
            <h5 className="font-pixel text-xs text-zinc-500 uppercase">ESSENTIAL LIBRARIES & TOOLS:</h5>
            <div className="flex flex-wrap gap-2">
              {activeDomain.coreLibraries.map((lib) => (
                <span key={lib} className="pixel-badge bg-zinc-100 text-zinc-900">
                  {lib}
                </span>
              ))}
            </div>
          </div>

          {/* Starter Project Idea */}
          <div className="bg-amber-50/80 border-2 border-zinc-900 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-pixel text-zinc-900">
              <Code className="w-4 h-4 text-[#EA4335]" />
              <span>RECOMMENDED STARTER PROJECT:</span>
            </div>
            <h4 className="font-extrabold text-sm text-zinc-900">
              {activeDomain.beginnerProject.title}
            </h4>
            <p className="text-xs text-zinc-700">
              {activeDomain.beginnerProject.description}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
