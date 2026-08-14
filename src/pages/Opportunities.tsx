import React, { useState } from 'react';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { getSeoMeta } from '../lib/seo';

export const meta: MetaFunction = ({ location }) => {
  return getSeoMeta('opportunities', [
    { title: "Student Developer Opportunities Matrix | ADSC.Py" },
    { name: "description", content: "Explore verified open-source mentorships, student developer fellowships, and global hackathons." },
    { property: "og:title", content: "Student Developer Opportunities Matrix | ADSC.Py" },
    { property: "og:description", content: "Explore verified open-source mentorships, student developer fellowships, and global hackathons." },
  ], location.pathname);
};
import { Shell } from '../components/layout/Shell';
import { getOpportunities } from '../lib/dataManager';
import { PixelTrophy, PixelCompass } from '../components/stickers';
import { ExternalLink, Info } from 'lucide-react';

export default function OpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const opportunities = getOpportunities();
  const categories = ['All', ...new Set(opportunities.map(opp => opp.category))];

  const filteredOpportunities = opportunities.filter((opp) => {
    if (opp.hidden) return false;
    const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.relevantSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <Shell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 relative">
          {/* Floating Sticker Accents */}
          <div className="absolute -top-4 -left-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelTrophy className="w-14 h-14 transform -rotate-12" />
          </div>
          <div className="absolute -top-4 -right-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelCompass className="w-14 h-14 transform rotate-12" />
          </div>

          <div className="pixel-badge bg-[#34A853] text-white inline-block">
            DEVELOPER EXPOSURE MATRIX
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Developer Programs & Opportunities
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 font-medium leading-relaxed">
            Verified global open-source mentorships, hackathons, and fellowships available for university students.
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div className="bg-amber-50 border-2 border-zinc-900 p-5 flex items-start gap-4">
          <Info className="w-6 h-6 text-[#EA4335] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-zinc-800 leading-relaxed font-medium">
            <strong className="font-pixel text-zinc-900 font-bold block">HONEST COMMUNITY DISCLOSURE:</strong>
            ADSC.Py compiles official open source programs (GSoC, LFX, Hacktoberfest) and student hackathons. We never guarantee jobs or placement outcomes; we provide the roadmap and peer guidance so you can apply with confidence.
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-2 border-zinc-900 bg-zinc-50/50">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pixel-btn text-xs px-3.5 py-1.5 font-bold ${
                  selectedCategory === cat ? 'bg-zinc-900 text-white shadow-[2px_2px_0px_#34A853]' : 'bg-white text-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search program, org, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border-2 border-zinc-900 px-3 py-1.5 text-xs font-bold font-mono focus:outline-none focus:bg-amber-50/20 shadow-[2px_2px_0px_#121212] w-full md:max-w-xs"
          />
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="pixel-card p-6 sm:p-8 bg-white border-2 border-zinc-900 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-xs px-2.5 py-1 bg-zinc-900 text-white border border-zinc-900">
                    {opp.category}
                  </span>
                  {opp.featuredBadge && (
                    <span className="px-2 py-0.5 text-[10px] font-pixel font-bold bg-[#FFD43B] text-zinc-900 border border-zinc-900">
                      {opp.featuredBadge}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-zinc-900 hover:text-[#34A853] transition-colors">
                    <Link to={`/opportunities/${opp.id}`}>
                      {opp.title}
                    </Link>
                  </h3>
                  <p className="text-xs font-mono font-bold text-zinc-500">
                    {opp.organization}
                  </p>
                </div>

                <p className="text-xs text-zinc-700 leading-relaxed">
                  {opp.description}
                </p>

                {/* Eligibility */}
                <div className="bg-zinc-50 p-3 border border-zinc-900 space-y-1 text-xs">
                  <span className="font-pixel text-[10px] text-zinc-500 uppercase font-bold">ELIGIBILITY:</span>
                  <p className="font-medium text-zinc-800">{opp.eligibility}</p>
                </div>

                {/* Relevant Skills */}
                <div className="space-y-1.5">
                  <span className="font-pixel text-[10px] text-zinc-500 uppercase">RELEVANT SKILLS:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.relevantSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-white border border-zinc-900 text-[10px] font-mono font-bold text-zinc-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-zinc-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-600">
                  <span>DEADLINE:</span>
                  <span className="font-bold text-zinc-900">{opp.deadline}</span>
                </div>

                <a
                  href={opp.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn-python w-full py-2.5 text-xs flex items-center justify-center gap-1.5 font-extrabold"
                >
                  <span>Official Application / Docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-zinc-300 font-pixel text-sm text-zinc-500">
            No opportunities found matching your query.
          </div>
        )}

      </div>
    </Shell>
  );
}
