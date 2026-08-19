import React, { useState } from 'react';
import { Link } from 'react-router';
import { PixelTerminal, PixelCompass, PixelAIBrain } from '../stickers';
import { ArrowRight, Sparkles, Code2, ChevronRight } from 'lucide-react';
import { getGeneralSettings } from '../../lib/dataManager';

export function HeroSection() {
  const settings = getGeneralSettings();
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  const feelings = [
    {
      id: "syntax-only",
      prompt: "I know loops & variables, but what do I build?",
      response: "That is 100% normal. Basic syntax is just the keyboard; Python's real power begins when you plug it into Web APIs, AI models, and automated bots.",
      targetDomain: "Web & AI",
      link: "/journey"
    },
    {
      id: "confused-domains",
      prompt: "Web, AI, Data Science, Bots... which one is for me?",
      response: "Let's test each path with small 2-hour mini projects rather than reading endless theory. Check our interactive Domain Journey Map.",
      targetDomain: "Journey Map",
      link: "/journey"
    },
    {
      id: "tutorial-hell",
      prompt: "I follow video tutorials, but I freeze on a blank screen.",
      response: "Tutorial hell ends here. ADSC.Py provides structured Guided Project Blueprints with clear feature checklists and starter repos.",
      targetDomain: "Guided Projects",
      link: "/paths"
    }
  ];

  return (
    <section className="relative pt-6 pb-16 md:py-20 overflow-hidden">
      
      {/* Background Pixel Accent Elements */}
      <div className="absolute top-4 left-4 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
        <PixelTerminal className="w-16 h-16 transform -rotate-12" />
      </div>
      <div className="absolute top-12 right-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
        <PixelAIBrain className="w-20 h-20 transform rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Atmiya University Badge */}
        <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 border-2 border-zinc-900 dark:border-zinc-600 px-3 sm:px-4 py-1.5 shadow-[3px_3px_0px_var(--pixel-shadow-color)] font-pixel text-[10px] sm:text-xs transition-colors duration-300 max-w-full flex-wrap justify-center">
          <span className="w-2.5 h-2.5 bg-[#EA4335] border border-zinc-900 dark:border-zinc-600 shrink-0" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100">ATMIYA UNIVERSITY • RAJKOT</span>
          <span className="text-zinc-400 font-mono">|</span>
          <span className="text-[#306998] dark:text-[#FFD43B] font-bold">ADSC.Py</span>
        </div>

        {/* Conversational Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.15]">
            You learned Python syntax. <br className="hidden sm:inline" />
            <span className="bg-[#FFD43B] text-zinc-900 px-3 py-1 inline-block border-2 border-zinc-900 dark:border-zinc-600 shadow-[4px_4px_0px_var(--pixel-shadow-color)] transform -rotate-1">
              Now what?
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-medium">
            {settings.clubSlogan || 'Many students learn loops and functions, but get stuck on what comes next. ADSC.Py gives you the map to move from basic scripts to production web apps, AI models, and developer exposure.'}
          </p>
        </div>

        {/* Conversational Interactive Prompt Selector */}
        <div className="pixel-card-static p-6 max-w-2xl mx-auto bg-amber-50/50 dark:bg-zinc-800/50 border-2 border-zinc-900 dark:border-zinc-700 text-left space-y-4">
          <div className="flex items-center gap-2 text-xs font-pixel text-zinc-700 dark:text-zinc-300">
            <Sparkles className="w-4 h-4 text-[#EA4335]" />
            <span>HOW ARE YOU FEELING RIGHT NOW? SELECT ONE:</span>
          </div>

          <div className="space-y-2">
            {feelings.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFeeling(f.id)}
                className={`w-full text-left p-3 text-sm font-semibold transition-all border-2 flex items-center justify-between ${
                  selectedFeeling === f.id
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-[3px_3px_0px_#FFD43B]'
                    : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-900 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                }`}
              >
                <span>"{f.prompt}"</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedFeeling === f.id ? 'rotate-90 text-[#FFD43B]' : ''}`} />
              </button>
            ))}
          </div>

          {selectedFeeling && (
            <div className="bg-white dark:bg-zinc-800 p-4 border-2 border-zinc-900 dark:border-zinc-600 shadow-[2px_2px_0px_var(--pixel-shadow-color)] space-y-3 animate-fade-in">
              <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                {feelings.find((f) => f.id === selectedFeeling)?.response}
              </p>
              <div className="pt-1 flex justify-end">
                <Link
                  to={feelings.find((f) => f.id === selectedFeeling)?.link || "/journey"}
                  className="pixel-btn-primary text-xs px-4 py-2 flex items-center gap-1.5 font-bold"
                >
                  <span>Explore {feelings.find((f) => f.id === selectedFeeling)?.targetDomain}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Primary Call To Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/journey"
            className="pixel-btn-python w-full sm:w-auto px-8 py-4 text-base flex items-center justify-center gap-2 font-extrabold"
          >
            <PixelCompass className="w-6 h-6" />
            <span>Explore Python Journey Map</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/paths"
            className="pixel-btn w-full sm:w-auto px-6 py-4 text-base flex items-center justify-center gap-2 font-bold"
          >
            <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>View Guided Projects</span>
          </Link>
        </div>

        {/* Real Status Badge */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Atmiya University Chapter
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            100% Free & Student Led
          </span>
        </div>

      </div>
    </section>
  );
}
