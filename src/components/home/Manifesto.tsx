import React from 'react';
import { Link } from 'react-router';
import { PixelCommunity, PixelPython } from '../stickers';
import { ArrowRight, HeartHandshake, ShieldAlert } from 'lucide-react';

export function Manifesto() {
  return (
    <section className="py-16 my-12">
      <div className="pixel-card-static bg-amber-50/60 p-8 sm:p-12 border-2 border-zinc-900 relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FFD43B] text-zinc-900 border border-zinc-900 px-3 py-1 text-xs font-pixel font-bold shadow-[2px_2px_0px_#121212]">
              <HeartHandshake className="w-4 h-4 text-zinc-900" />
              <span>THE ADSC.Py MANIFESTO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              Built by Students, for Students at Atmiya University.
            </h2>

            <div className="space-y-4 text-zinc-700 text-sm sm:text-base leading-relaxed font-medium">
              <p>
                ADSC.Py operates under ADSC (Atmiya Developer Students Club) at Atmiya University, Rajkot. We operate with zero fluff, zero fake statistics, and zero corporate marketing.
              </p>
              <p>
                We noticed that most students learn Python syntax in class, but have no clear roadmap for what to build next. ADSC.Py exists to give every student the clarity, peer support, and project blueprints needed to become a capable software developer.
              </p>
            </div>

            {/* Honest Stance Callout */}
            <div className="bg-white p-4 border-2 border-zinc-900 shadow-[3px_3px_0px_#121212] space-y-2">
              <div className="flex items-center gap-2 text-xs font-pixel text-[#EA4335]">
                <ShieldAlert className="w-4 h-4" />
                <span>OUR HONEST PROMISE:</span>
              </div>
              <p className="text-xs text-zinc-800 leading-relaxed">
                We never promise jobs, guaranteed placements, or instant shortcuts. We provide structured learning paths, project reviews, open source guidance, and genuine community support.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/community"
                className="pixel-btn-python px-6 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2"
              >
                <span>Meet Team & Join ADSC.Py</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="pixel-btn px-5 py-3 text-xs sm:text-sm font-bold text-zinc-800"
              >
                <span>Read Full Origin Story</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#121212] space-y-4">
            <PixelCommunity className="w-24 h-24" />
            <div className="space-y-1">
              <h4 className="font-pixel text-sm text-zinc-900 font-bold">ATMIYA UNIVERSITY</h4>
              <p className="text-xs text-zinc-500 font-mono">Rajkot, Gujarat • India</p>
            </div>
            <div className="w-full pt-4 border-t border-zinc-200 text-xs font-semibold text-zinc-700">
              Open to CS, IT, AI & All Student Batches
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
