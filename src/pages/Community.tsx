import React from 'react';
import type { MetaFunction } from 'react-router';
import { getSeoMeta } from '../lib/seo';

export const meta: MetaFunction = ({ location }) => {
  return getSeoMeta('community', [
    { title: "Meet the ADSC.Py Maintainers & Core Team | ADSC.Py" },
    { name: "description", content: "Meet the student team leading the Python developer community at Atmiya University, Rajkot." },
    { property: "og:title", content: "Meet the ADSC.Py Maintainers & Core Team | ADSC.Py" },
    { property: "og:description", content: "Meet the student team leading the Python developer community at Atmiya University, Rajkot." },
  ], location.pathname);
};
import { Shell } from '../components/layout/Shell';
import { getMaintainers } from '../lib/dataManager';
import { PixelCommunity, PixelPython } from '../components/stickers';
import { HeartHandshake, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CommunityPage() {
  const maintainers = getMaintainers().filter(m => !m.hidden);

  return (
    <Shell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 relative">
          {/* Floating Sticker Accents */}
          <div className="absolute -top-4 -left-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelCommunity className="w-14 h-14 transform -rotate-12" />
          </div>
          <div className="absolute -top-4 -right-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelPython className="w-14 h-14 transform rotate-12" />
          </div>
          <div className="pixel-badge bg-[#4285F4] text-white inline-block">
            ATMIYA UNIVERSITY DEVELOPER COMMUNITY
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Meet the ADSC.Py Team
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 font-medium leading-relaxed">
            ADSC.Py is built and run by students at Atmiya University, Rajkot. We welcome every beginner regardless of their current programming level.
          </p>
        </div>

        {/* Maintainers Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {maintainers.map((maintainer) => (
            <div
              key={maintainer.id}
              className="pixel-card p-6 sm:p-8 bg-white border-2 border-zinc-900 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 text-xs font-pixel font-bold border-2 ${maintainer.avatarPixelBg}`}>
                    {maintainer.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Rajkot</span>
                </div>

                <div className="flex items-center gap-3">
                  <PixelCommunity className="w-12 h-12" />
                  <div>
                    <h3 className="text-xl font-extrabold text-zinc-900">
                      {maintainer.name}
                    </h3>
                    <p className="text-xs font-mono font-bold text-zinc-600">
                      {maintainer.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                  {maintainer.bio}
                </p>

                <div className="bg-zinc-50 p-3 border border-zinc-900 space-y-1 text-xs">
                  <span className="font-pixel text-[10px] text-zinc-500 uppercase font-bold">FOCUS TRACK:</span>
                  <p className="font-bold text-zinc-900">{maintainer.focusDomain}</p>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>{maintainer.university}</span>
              </div>
            </div>
          ))}
        </div>

        {/* How to Join & Contribute */}
        <div className="pixel-card-static p-8 sm:p-12 bg-amber-50/60 border-2 border-zinc-900 space-y-6">
          <div className="max-w-2xl space-y-3">
            <span className="pixel-badge bg-[#FFD43B] text-zinc-900">BEGINNER FRIENDLY</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              How Can You Get Involved?
            </h2>
            <p className="text-zinc-700 text-sm sm:text-base leading-relaxed font-medium">
              You don't need to be an expert to join ADSC.Py. If you know basic Python syntax or are currently taking a Python course at Atmiya University, you are ready to start.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-5 border-2 border-zinc-900 space-y-2">
              <span className="font-pixel text-xs text-[#EA4335]">01 • ATTEND SESSIONS</span>
              <h4 className="font-bold text-base text-zinc-900">Join Workshops</h4>
              <p className="text-xs text-zinc-600">Participate in hands-on practical sessions and roadmaps.</p>
            </div>

            <div className="bg-white p-5 border-2 border-zinc-900 space-y-2">
              <span className="font-pixel text-xs text-[#4285F4]">02 • BUILD BLUEPRINTS</span>
              <h4 className="font-bold text-base text-zinc-900">Build Projects</h4>
              <p className="text-xs text-zinc-600">Complete Guided Project Blueprints and request peer code reviews.</p>
            </div>

            <div className="bg-white p-5 border-2 border-zinc-900 space-y-2">
              <span className="font-pixel text-xs text-[#34A853]">03 • BECOME MAINTAINER</span>
              <h4 className="font-bold text-base text-zinc-900">Lead & Mentors</h4>
              <p className="text-xs text-zinc-600">Help junior students and lead technical domain tracks.</p>
            </div>
          </div>
        </div>

      </div>
    </Shell>
  );
}
