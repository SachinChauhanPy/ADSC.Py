import React from 'react';
import { Link } from 'react-router';
import { getGeneralSettings } from '../../lib/dataManager';

export function Footer() {
  const settings = getGeneralSettings();
  const clubName = settings.clubName || 'ADSC.Py';
  const endsWithPy = clubName.toLowerCase().endsWith('.py');
  const baseName = endsWithPy ? clubName.slice(0, -3) : clubName;

  return (
    <footer className="bg-zinc-900 dark:bg-zinc-950 text-white border-t-4 border-zinc-900 dark:border-zinc-800 mt-20 relative overflow-hidden transition-colors duration-300">
      {/* Google Color Accent Bar */}
      <div className="h-2 w-full grid grid-cols-4">
        <div className="bg-[#EA4335]" />
        <div className="bg-[#34A853]" />
        <div className="bg-[#4285F4]" />
        <div className="bg-[#FBBC04]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/python_logo.png" alt="ADSC Logo" className="w-16 h-16 object-contain pixel-sticker-interactive" />
              <span className="font-pixel text-xl font-bold tracking-tight text-white">
                {baseName}
                {endsWithPy && (
                  <>
                    <span className="text-[#EA4335]">.</span>
                    <span className="text-[#FFD43B]">Py</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-sans">
              {settings.clubSlogan || 'The Python Community at Atmiya University, Rajkot. Helping students go from basic syntax to real-world software engineering, open source, and developer exposure.'}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Atmiya University • Rajkot, Gujarat</span>
            </div>
          </div>

          {/* Core Paths */}
          <div>
            <h4 className="font-pixel text-xs text-[#FFD43B] uppercase tracking-wider mb-4">
              Explore Paths
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/journey" className="text-zinc-300 hover:text-white hover:underline transition">
                  Python Journey Map
                </Link>
              </li>
              <li>
                <Link to="/journey#web-development" className="text-zinc-400 hover:text-white transition">
                  Web & Fullstack (FastAPI)
                </Link>
              </li>
              <li>
                <Link to="/journey#ai-machine-learning" className="text-zinc-400 hover:text-white transition">
                  AI & LLM Engineering
                </Link>
              </li>
              <li>
                <Link to="/journey#automation-scraping" className="text-zinc-400 hover:text-white transition">
                  Automation & Web Scraping
                </Link>
              </li>
              <li>
                <Link to="/journey#data-science" className="text-zinc-400 hover:text-white transition">
                  Data Science & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Hub */}
          <div>
            <h4 className="font-pixel text-xs text-[#4285F4] uppercase tracking-wider mb-4">
              Student Hub
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/paths" className="text-zinc-300 hover:text-white hover:underline transition">
                  Guided Projects
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="text-zinc-300 hover:text-white hover:underline transition">
                  Sessions & Knowledge Library
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="text-zinc-300 hover:text-white hover:underline transition">
                  Hackathons & GSoC Matrix
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-zinc-300 hover:text-white hover:underline transition">
                  Maintainers & Core Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Non-negotiable Brand Rules & Disclosure */}
          <div className="space-y-4">
            <h4 className="font-pixel text-xs text-[#EA4335] uppercase tracking-wider">
              Community Disclaimer
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans bg-zinc-800/80 dark:bg-zinc-900/80 p-3 border border-zinc-700">
              ADSC.Py is a student-led developer community operating under Atmiya Developer Students Club (ADSC) at Atmiya University. We do not promise job placements or guaranteed employment; we provide real-world project roadmaps, peer mentorship, and developer exposure.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} ADSC.Py — Atmiya Developer Students Club. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to="/about" className="hover:text-zinc-300 transition">Community Manifesto</Link>
            <span className="hidden sm:inline">•</span>
            <span className="font-mono text-zinc-400 hidden sm:inline">PIXEL-ART × MODERN WEB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
