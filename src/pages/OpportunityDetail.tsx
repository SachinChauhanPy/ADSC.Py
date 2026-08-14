import React from 'react';
import { useParams, Link } from 'react-router';
import type { MetaFunction } from 'react-router';
import { Shell } from '../components/layout/Shell';
import { getOpportunities } from '../lib/dataManager';
import { getSeoMeta } from '../lib/seo';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PixelTrophy } from '../components/stickers';
import { ArrowLeft, ExternalLink, ShieldCheck, MapPin, Calendar, BookOpen } from 'lucide-react';

export const meta: MetaFunction = ({ params, location }) => {
  const opp = getOpportunities().find(o => o.id === params.id);
  if (!opp) {
    return getSeoMeta('opportunity-detail', [{ title: "Opportunity Not Found | ADSC.Py" }], location.pathname);
  }
  return getSeoMeta(
    `opportunity-detail-${params.id}`,
    [
      { title: `${opp.title} (${opp.organization}) | ADSC.Py Opportunities` },
      { name: "description", content: opp.description.substring(0, 150) + "..." },
      { property: "og:title", content: opp.title },
      { property: "og:description", content: opp.description }
    ],
    location.pathname
  );
};

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const opp = getOpportunities().find(o => o.id === id);

  if (!opp) {
    return (
      <Shell>
        <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-zinc-900">Opportunity Not Found</h2>
          <p className="text-zinc-600 font-medium">The opportunity program details you are looking for do not exist or have been removed.</p>
          <Link to="/opportunities" className="pixel-btn-green px-4 py-2 text-xs font-bold inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Opportunities Matrix</span>
          </Link>
        </div>
      </Shell>
    );
  }

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": opp.title,
    "description": opp.description,
    "datePosted": "2026-01-01T00:00:00Z",
    "validThrough": "2026-12-31T00:00:00Z",
    "hiringOrganization": {
      "@type": "Organization",
      "name": opp.organization,
      "logo": "https://adscpy.atmiyadevelopers.org/python_logo.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      }
    },
    "employmentType": "OTHER"
  };

  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      
      <div className="space-y-8 max-w-4xl mx-auto py-4 text-left">
        {/* Navigation Breadcrumbs */}
        <div>
          <Breadcrumbs items={[{ name: 'Opportunities', item: '/opportunities' }, { name: opp.title, item: `/opportunities/${opp.id}` }]} />
        </div>

        {/* Details Wrapper */}
        <div className="pixel-card-static p-6 sm:p-10 bg-white border-2 border-zinc-900 space-y-8 relative">
          
          {/* Floating Sticker */}
          <div className="absolute -top-6 right-6 opacity-30 hover:opacity-100 transition-opacity duration-300">
            <PixelTrophy className="w-16 h-16 transform rotate-6" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-zinc-100 border border-zinc-300 px-2 py-0.5 text-xs font-mono font-bold text-zinc-600">
                {opp.category}
              </span>
              {opp.featuredBadge && (
                <span className="bg-[#FFD43B] text-zinc-900 border border-zinc-900 px-2 py-0.5 text-xs font-pixel font-bold">
                  {opp.featuredBadge}
                </span>
              )}
              {opp.isVerified && (
                <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Program
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 leading-snug">
              {opp.title}
            </h1>

            <p className="text-sm sm:text-base font-semibold text-zinc-600">
              Host Organization: <strong className="text-zinc-900">{opp.organization}</strong>
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y-2 border-zinc-100 py-4 font-mono text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4285F4]" />
              <span>Deadline: <strong className="text-zinc-900">{opp.deadline}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#EA4335]" />
              <span>Location: <strong className="text-zinc-900">Remote / Global</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#34A853]" />
              <span>Eligibility: <strong className="text-zinc-900">{opp.eligibility}</strong></span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-pixel text-xs text-zinc-900 font-bold uppercase tracking-wider">Opportunity Description:</h3>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-medium">
              {opp.description}
            </p>
          </div>

          {/* Relevant Skills */}
          <div className="space-y-3">
            <h4 className="font-pixel text-xs text-zinc-500 uppercase">RELEVANT SKILLS & TRACKS:</h4>
            <div className="flex flex-wrap gap-2">
              {opp.relevantSkills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-zinc-50 border-2 border-zinc-900 text-xs font-mono font-bold text-zinc-800 shadow-[2px_2px_0px_#121212]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Footer controls */}
          <div className="pt-6 border-t-2 border-zinc-100 flex flex-wrap gap-3 items-center justify-between">
            <Link to="/opportunities" className="pixel-btn text-xs px-4 py-2 flex items-center gap-1 font-bold bg-white text-zinc-800">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Opportunities</span>
            </Link>

            <a
              href={opp.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn-green text-xs px-5 py-2.5 flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
            >
              <span>Apply on Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </Shell>
  );
}
