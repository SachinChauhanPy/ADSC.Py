import React, { useState } from 'react';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { getSeoMeta } from '../lib/seo';

export const meta: MetaFunction = ({ location }) => {
  return getSeoMeta('paths', [
    { title: "Guided Python Project Blueprints | ADSC.Py" },
    { name: "description", content: "Stop tutorial hell. Build real Python projects with structured feature checklists and starter templates." },
    { property: "og:title", content: "Guided Python Project Blueprints | ADSC.Py" },
    { property: "og:description", content: "Stop tutorial hell. Build real Python projects with structured feature checklists and starter templates." },
  ], location.pathname);
};
import { Shell } from '../components/layout/Shell';
import { getProjects } from '../lib/dataManager';
import { Code2, Clock, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { PixelTerminal, PixelLaptop } from '../components/stickers';

export default function PathsPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');

  const projects = getProjects();
  const filteredProjects = projects.filter((p) => {
    if (p.hidden) return false;
    return selectedLevel === 'all' || p.levelNum === selectedLevel;
  });

  return (
    <Shell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 relative">
          {/* Floating Sticker Accents */}
          <div className="absolute -top-4 -left-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelTerminal className="w-14 h-14 transform -rotate-12" />
          </div>
          <div className="absolute -top-4 -right-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelLaptop className="w-14 h-14 transform rotate-12" />
          </div>

          <div className="pixel-badge bg-[#FFD43B] text-zinc-900 inline-block">
            GUIDED PROJECT BLUEPRINTS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Stop Tutorial Hell: Build Real Projects
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 font-medium leading-relaxed">
            The fastest way to learn Python is by building projects with clear specs, feature requirements, and real-world architectures.
          </p>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`pixel-btn text-xs px-4 py-2 font-bold ${
              selectedLevel === 'all' ? 'bg-zinc-900 text-white shadow-[3px_3px_0px_#FFD43B]' : 'bg-white text-zinc-800'
            }`}
          >
            All Project Levels ({projects.length})
          </button>
          <button
            onClick={() => setSelectedLevel(1)}
            className={`pixel-btn text-xs px-4 py-2 font-bold ${
              selectedLevel === 1 ? 'bg-[#4285F4] text-white shadow-[3px_3px_0px_#121212]' : 'bg-white text-zinc-800'
            }`}
          >
            Level 1: Fundamentals
          </button>
          <button
            onClick={() => setSelectedLevel(2)}
            className={`pixel-btn text-xs px-4 py-2 font-bold ${
              selectedLevel === 2 ? 'bg-[#FFD43B] text-zinc-900 shadow-[3px_3px_0px_#121212]' : 'bg-white text-zinc-800'
            }`}
          >
            Level 2: Real-World Apps
          </button>
          <button
            onClick={() => setSelectedLevel(3)}
            className={`pixel-btn text-xs px-4 py-2 font-bold ${
              selectedLevel === 3 ? 'bg-[#EA4335] text-white shadow-[3px_3px_0px_#121212]' : 'bg-white text-zinc-800'
            }`}
          >
            Level 3: Advanced Systems
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="pixel-card p-6 sm:p-8 bg-white border-2 border-zinc-900 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-xs px-2.5 py-1 bg-zinc-900 text-white border border-zinc-900">
                    {project.level}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-zinc-600">
                    <Clock className="w-3.5 h-3.5" />
                    {project.estimatedHours}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-pixel text-[#4285F4] uppercase font-bold">
                    {project.domain}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 hover:text-[#4285F4] transition-colors">
                    <Link to={`/paths/${project.id}`}>
                      {project.title}
                    </Link>
                  </h3>
                </div>

                {/* Problem Solved */}
                <div className="bg-amber-50/60 p-3.5 border-2 border-zinc-900 space-y-1">
                  <span className="font-pixel text-[10px] text-zinc-600 uppercase font-bold">PROBLEM SOLVED:</span>
                  <p className="text-xs text-zinc-800 leading-relaxed font-medium">
                    {project.problemSolved}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-2">
                  <h5 className="font-pixel text-[10px] text-zinc-500 uppercase">KEY FEATURE CHECKLIST:</h5>
                  <ul className="space-y-1.5">
                    {project.keyFeatures.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-2">
                  <h5 className="font-pixel text-[10px] text-zinc-500 uppercase">TECH STACK:</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-zinc-100 border border-zinc-900 text-xs font-mono font-bold text-zinc-900">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t-2 border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-pixel text-zinc-500">
                  DIFFICULTY: <strong className="text-zinc-900">{project.difficulty.toUpperCase()}</strong>
                </span>

                <button
                  onClick={() => alert(`Starting Blueprint for "${project.title}". Connect with ADSC.Py team for repository starter templates!`)}
                  className="pixel-btn-python text-xs px-4 py-2.5 flex items-center gap-1.5 font-extrabold"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Start Blueprint</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </Shell>
  );
}
