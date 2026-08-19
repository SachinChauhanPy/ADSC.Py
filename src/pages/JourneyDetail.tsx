import React from 'react';
import { useParams, Link } from 'react-router';
import type { MetaFunction } from 'react-router';
import { Shell } from '../components/layout/Shell';
import { getDomains, getProjects } from '../lib/dataManager';
import { getSeoMeta } from '../lib/seo';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { RenderSticker } from '../components/stickers';
import { ArrowLeft, CheckCircle2, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const meta: MetaFunction = ({ params, location }) => {
  const domain = getDomains().find(d => d.id === params.id);
  if (!domain) {
    return getSeoMeta('journey-detail', [{ title: "Roadmap Not Found | ADSC.Py" }], location.pathname);
  }
  return getSeoMeta(
    `journey-detail-${params.id}`,
    [
      { title: `${domain.title} Roadmap & Journey | ADSC.Py` },
      { name: "description", content: domain.shortDesc },
      { property: "og:title", content: domain.title },
      { property: "og:description", content: domain.shortDesc }
    ],
    location.pathname
  );
};

export default function JourneyDetailPage() {
  const { id } = useParams();
  const domain = getDomains().find(d => d.id === id);

  if (!domain) {
    return (
      <Shell>
        <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-zinc-900">Roadmap Track Not Found</h2>
          <p className="text-zinc-600 font-medium">The Python domain journey roadmap you are looking for does not exist or has been removed.</p>
          <Link to="/journey" className="pixel-btn-python px-4 py-2 text-xs font-bold inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journey Map</span>
          </Link>
        </div>
      </Shell>
    );
  }

  // 9. Internal Linking: Related Project Blueprints matching this domain
  const relatedProjects = getProjects().filter(proj => 
    !proj.hidden && 
    (proj.domain.toLowerCase().includes(domain.title.toLowerCase()) || 
     domain.title.toLowerCase().includes(proj.domain.toLowerCase()) ||
     proj.domain.toLowerCase().includes(domain.id.toLowerCase()))
  );

  return (
    <Shell>
      <div className="space-y-8 max-w-4xl mx-auto py-4 text-left">
        {/* Navigation Breadcrumbs */}
        <div>
          <Breadcrumbs items={[{ name: 'Journey Map', item: '/journey' }, { name: domain.title, item: `/journey/${domain.id}` }]} />
        </div>

        {/* Detailed Domain Card */}
        <div className="pixel-card-static p-6 sm:p-10 bg-white border-2 border-zinc-900 space-y-8 relative">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-6">
            <div className="flex items-center gap-4">
              <RenderSticker name={domain.iconName} className="w-14 h-14 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-xs font-pixel font-bold border border-zinc-900 ${domain.badgeBg} ${domain.badgeText}`}>
                    {domain.badgeText}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{domain.tagline}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 mt-1">
                  {domain.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Overview & Why Python */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3 bg-zinc-50 p-5 border-2 border-zinc-900">
              <h3 className="font-pixel text-xs text-zinc-900 uppercase font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4285F4]" />
                <span>WHAT IS THIS DOMAIN?</span>
              </h3>
              <p className="text-zinc-700 text-sm leading-relaxed font-medium">
                {domain.whatItIs}
              </p>
            </div>

            <div className="space-y-3 bg-amber-50/60 p-5 border-2 border-zinc-900">
              <h3 className="font-pixel text-xs text-zinc-900 uppercase font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#EA4335]" />
                <span>WHY PYTHON LEADS HERE:</span>
              </h3>
              <p className="text-zinc-700 text-sm leading-relaxed font-medium">
                {domain.whyPython}
              </p>
            </div>
          </div>

          {/* Real World Applications */}
          <div className="space-y-3">
            <h4 className="font-pixel text-xs text-zinc-500 uppercase">REAL WORLD APPLICATIONS:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {domain.realWorldUse.map((use) => (
                <div key={use} className="flex items-center gap-3 bg-white p-3 border-2 border-zinc-900 text-xs font-bold text-zinc-800 shadow-[2px_2px_0px_#121212]">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span>{use}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Roadmap Steps */}
          <div className="space-y-3">
            <h4 className="font-pixel text-xs text-zinc-500 uppercase">THE RECOMMENDED LEARNING PATH:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {domain.learningSteps.map((step, sIdx) => (
                <div key={step} className="p-4 bg-zinc-900 text-white border-2 border-zinc-900 shadow-[3px_3px_0px_#FFD43B] space-y-2">
                  <span className="font-pixel text-[10px] text-[#FFD43B]">STEP 0{sIdx + 1}</span>
                  <p className="text-xs font-bold leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Libraries */}
          <div className="space-y-3">
            <h4 className="font-pixel text-xs text-zinc-500 uppercase">CORE LIBRARIES & TOOLS:</h4>
            <div className="flex flex-wrap gap-2">
              {domain.coreLibraries.map((lib) => (
                <span key={lib} className="px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-300 font-mono text-xs font-bold">
                  {lib}
                </span>
              ))}
            </div>
          </div>

          {/* Project Blueprints (Internal Linking) */}
          <div className="space-y-4 pt-4 border-t-2 border-zinc-100">
            <h3 className="font-pixel text-xs text-zinc-900 font-bold uppercase tracking-wider">Guided Project Templates:</h3>
            
            {relatedProjects.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50/50 p-5 border-2 border-zinc-900 space-y-3">
                  <span className="pixel-badge bg-blue-100 text-blue-900">BEGINNER PROJECT</span>
                  <h4 className="font-extrabold text-base text-zinc-900">{domain.beginnerProject.title}</h4>
                  <p className="text-xs text-zinc-700 leading-relaxed">{domain.beginnerProject.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {domain.beginnerProject.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-white border border-zinc-900 text-[10px] font-mono font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50/50 p-5 border-2 border-zinc-900 space-y-3">
                  <span className="pixel-badge bg-amber-100 text-amber-900">INTERMEDIATE PROJECT</span>
                  <h4 className="font-extrabold text-base text-zinc-900">{domain.intermediateProject.title}</h4>
                  <p className="text-xs text-zinc-700 leading-relaxed">{domain.intermediateProject.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {domain.intermediateProject.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-white border border-zinc-900 text-[10px] font-mono font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProjects.map(proj => (
                  <div key={proj.id} className="p-4 bg-zinc-50 border-2 border-zinc-900 space-y-3 hover:bg-zinc-100 transition-colors">
                    <span className="text-[10px] font-pixel text-zinc-500 uppercase">{proj.level}</span>
                    <h4 className="font-extrabold text-sm text-zinc-900">{proj.title}</h4>
                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">{proj.problemSolved}</p>
                    <Link 
                      to={`/paths/${proj.id}`}
                      className="text-xs font-bold text-[#4285F4] hover:underline flex items-center gap-1.5 pt-1"
                    >
                      <span>Explore Blueprint Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer controls */}
          <div className="pt-6 border-t-2 border-zinc-100">
            <Link to="/journey" className="pixel-btn text-xs px-4 py-2 flex items-center gap-1 font-bold bg-white text-zinc-800">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journey Map</span>
            </Link>
          </div>

        </div>

      </div>
    </Shell>
  );
}
