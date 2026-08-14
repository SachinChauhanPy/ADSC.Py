import React, { useState } from 'react';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { getSeoMeta } from '../lib/seo';

export const meta: MetaFunction = ({ location }) => {
  return getSeoMeta('sessions', [
    { title: "Practical Python Workshops & Sessions | ADSC.Py" },
    { name: "description", content: "Hands-on workshops, code repositories, and knowledge library created by student mentors at Atmiya University." },
    { property: "og:title", content: "Practical Python Workshops & Sessions | ADSC.Py" },
    { property: "og:description", content: "Hands-on workshops, code repositories, and knowledge library created by student mentors at Atmiya University." },
  ], location.pathname);
};
import { Shell } from '../components/layout/Shell';
import { getSessions } from '../lib/dataManager';
import { PixelBook, PixelTerminal } from '../components/stickers';
import { Calendar, User, CheckCircle2, Github, FileText } from 'lucide-react';

export default function SessionsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const statuses = ['All', 'Upcoming', 'Past'];

  const sessions = getSessions();
  const filteredSessions = sessions.filter((session) => {
    if (session.hidden) return false;
    const matchesStatus = selectedStatus === 'All' || 
      (selectedStatus === 'Upcoming' && session.status === 'Upcoming') ||
      (selectedStatus === 'Past' && (session.status === 'Past' || session.status === 'Completed' || session.status === 'Knowledge Base'));
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Shell>
      <div className="space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 relative">
          {/* Floating Sticker Accents */}
          <div className="absolute -top-4 -left-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelBook className="w-14 h-14 transform -rotate-12" />
          </div>
          <div className="absolute -top-4 -right-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelTerminal className="w-14 h-14 transform rotate-12" />
          </div>

          <div className="pixel-badge bg-[#EA4335] text-white inline-block">
            SESSIONS & KNOWLEDGE BASE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Practical Python Workshops
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 font-medium leading-relaxed">
            Hands-on technical sessions led by maintainers and senior students. Past sessions remain available as a growing open-source knowledge library.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-2 border-zinc-900 bg-zinc-50/50">
          <div className="flex flex-wrap items-center gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`pixel-btn text-xs px-3.5 py-1.5 font-bold ${
                  selectedStatus === status ? 'bg-zinc-900 text-white shadow-[2px_2px_0px_#EA4335]' : 'bg-white text-zinc-800'
                }`}
              >
                {status} Sessions
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search topic, library, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border-2 border-zinc-900 px-3 py-1.5 text-xs font-bold font-mono focus:outline-none focus:bg-amber-50/20 shadow-[2px_2px_0px_#121212] w-full md:max-w-xs"
          />
        </div>

        {/* Sessions List */}
        <div className="space-y-8">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 text-xs font-pixel font-bold border border-zinc-900 ${
                      session.status === 'Upcoming' ? 'bg-[#FFD43B] text-zinc-900' : 'bg-zinc-100 text-zinc-800'
                    }`}>
                      {session.status.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">• {session.domain}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 hover:text-[#4285F4] transition-colors">
                    <Link to={`/sessions/${session.id}`}>
                      {session.title}
                    </Link>
                  </h2>
                  <p className="text-sm font-semibold text-zinc-600">
                    {session.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-zinc-600 bg-zinc-50 p-3 border border-zinc-900 shrink-0">
                  <Calendar className="w-4 h-4 text-[#4285F4]" />
                  <span>{session.date}</span>
                </div>
              </div>

              <p className="text-zinc-700 text-sm leading-relaxed font-medium">
                {session.description}
              </p>

              {/* Takeaways & Prerequisites */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 bg-emerald-50/50 p-4 border border-zinc-900">
                  <h4 className="font-pixel text-xs text-emerald-900 uppercase font-bold">KEY LEARNING OUTCOMES:</h4>
                  <ul className="space-y-1.5">
                    {session.takeaways.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 bg-blue-50/50 p-4 border border-zinc-900">
                  <h4 className="font-pixel text-xs text-blue-900 uppercase font-bold">PREREQUISITES:</h4>
                  <ul className="space-y-1.5">
                    {session.prerequisites.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                        <span className="w-2 h-2 bg-[#4285F4] shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Resources & Speaker */}
              <div className="pt-4 border-t-2 border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs font-semibold text-zinc-700">
                  <User className="w-4 h-4 text-[#EA4335]" />
                  <span>Speaker: <strong>{session.speaker.name}</strong> ({session.speaker.role})</span>
                </div>

                <div className="flex items-center gap-2">
                  {session.resources?.githubRepo && (
                    <a
                      href={session.resources.githubRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="pixel-btn text-xs px-3 py-1.5 flex items-center gap-1 font-bold text-zinc-800"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code Repo</span>
                    </a>
                  )}
                  {session.resources?.slidesUrl && (
                    <a
                      href={session.resources.slidesUrl}
                      className="pixel-btn text-xs px-3 py-1.5 flex items-center gap-1 font-bold text-zinc-800"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Slides</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-zinc-300 font-pixel text-sm text-zinc-500">
            No sessions found matching your query.
          </div>
        )}

      </div>
    </Shell>
  );
}
