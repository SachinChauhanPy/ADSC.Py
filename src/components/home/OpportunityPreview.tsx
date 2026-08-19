import React from 'react';
import { Link } from 'react-router';
import { getOpportunities } from '../../lib/dataManager';
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

export function OpportunityPreview() {
  const opportunities = getOpportunities().filter(opp => !opp.hidden);

  return (
    <section className="py-12 border-t-2 border-zinc-900 dark:border-zinc-700 my-12 bg-white dark:bg-[#0a0a0b] transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="pixel-badge bg-[#34A853] text-white mb-2">
            DEVELOPER EXPOSURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Open Source Programs & Hackathons
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium mt-1">
            Real developer opportunities compiled for university students. No fake placement claims.
          </p>
        </div>

        <Link
          to="/opportunities"
          className="pixel-btn-green text-xs px-4 py-2.5 flex items-center gap-1.5 font-bold"
        >
          <span>View All Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {opportunities.slice(0, 3).map((opp) => (
          <div
            key={opp.id}
            className="pixel-card p-6 border-2 border-zinc-900 dark:border-zinc-700 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-pixel font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 border border-zinc-900 dark:border-zinc-600">
                  {opp.category}
                </span>
                {opp.isVerified && (
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Verified
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100 leading-snug">
                {opp.title}
              </h3>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {opp.organization}
              </p>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                {opp.description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                <span>Deadline:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{opp.deadline}</span>
              </div>

              <a
                href={opp.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn w-full py-2 text-xs flex items-center justify-center gap-1 font-bold"
              >
                <span>Program Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
