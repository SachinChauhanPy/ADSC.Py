import React from 'react';
import { useParams, Link } from 'react-router';
import type { MetaFunction } from 'react-router';
import { Shell } from '../components/layout/Shell';
import { getSessions } from '../lib/dataManager';
import { getSeoMeta } from '../lib/seo';
import { getEventSchema } from '../lib/schemaHelper';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PixelTerminal } from '../components/stickers';
import { User, ArrowLeft, Github, FileText, Play } from 'lucide-react';

export const meta: MetaFunction = ({ params, location }) => {
  const session = getSessions().find(s => s.id === params.id);
  if (!session) {
    return getSeoMeta('session-detail', [{ title: "Session Not Found | ADSC.Py" }], location.pathname);
  }
  return getSeoMeta(
    `session-detail-${params.id}`,
    [
      { title: `${session.title} | ADSC.Py Workshops` },
      { name: "description", content: session.description.substring(0, 150) + "..." },
      { property: "og:title", content: session.title },
      { property: "og:description", content: session.description }
    ],
    location.pathname
  );
};

export default function SessionDetailPage() {
  const { id } = useParams();
  const session = getSessions().find(s => s.id === id);

  if (!session) {
    return (
      <Shell>
        <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-zinc-900">Workshop Session Not Found</h2>
          <p className="text-zinc-600 font-medium">The session you are looking for does not exist or has been removed by the administrator.</p>
          <Link to="/sessions" className="pixel-btn-python px-4 py-2 text-xs font-bold inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Workshops</span>
          </Link>
        </div>
      </Shell>
    );
  }

  const eventSchema = getEventSchema(session);

  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      
      <div className="space-y-8 max-w-4xl mx-auto py-4 text-left">
        {/* Navigation Breadcrumbs */}
        <div>
          <Breadcrumbs items={[{ name: 'Workshops', item: '/sessions' }, { name: session.title, item: `/sessions/${session.id}` }]} />
        </div>

        {/* Details Wrapper */}
        <div className="pixel-card-static p-6 sm:p-10 bg-white border-2 border-zinc-900 space-y-8 relative">
          
          {/* Floating Sticker */}
          <div className="absolute -top-6 right-6 opacity-30 hover:opacity-100 transition-opacity duration-300">
            <PixelTerminal className="w-16 h-16 transform rotate-6" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 text-xs font-pixel font-bold border border-zinc-900 ${
                session.status === 'Upcoming' ? 'bg-[#FFD43B] text-zinc-900' : 'bg-zinc-100 text-zinc-800'
              }`}>
                {session.status.toUpperCase()}
              </span>
              <span className="bg-zinc-100 border border-zinc-300 px-2 py-0.5 text-xs font-mono font-bold text-zinc-600">
                {session.level}
              </span>
              <span className="text-xs font-mono text-zinc-500">• {session.domain}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 leading-snug">
              {session.title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 font-medium italic border-l-4 border-[#4285F4] pl-3">
              {session.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-pixel text-xs text-zinc-900 font-bold uppercase tracking-wider">Session Overview:</h3>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-medium">
              {session.description}
            </p>
          </div>

          {/* Takeaways & Prerequisites grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 bg-zinc-50 p-5 border-2 border-zinc-900">
              <h4 className="font-pixel text-xs text-zinc-900 uppercase font-bold">KEY TAKEAWAYS:</h4>
              <ul className="space-y-2">
                {session.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-zinc-800">
                    <span className="w-1.5 h-1.5 bg-[#34A853] shrink-0 mt-1.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 bg-blue-50/50 p-5 border-2 border-zinc-900">
              <h4 className="font-pixel text-xs text-blue-900 uppercase font-bold">PREREQUISITES:</h4>
              <ul className="space-y-2">
                {session.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-zinc-800">
                    <span className="w-1.5 h-1.5 bg-[#4285F4] shrink-0 mt-1.5" />
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Speaker Bio Card */}
          <div className="bg-zinc-50 p-4 border border-zinc-900 flex items-center gap-3 flex-wrap">
            <User className="w-8 h-8 text-[#EA4335] border-2 border-zinc-900 p-1.5 bg-white" />
            <div>
              <p className="text-xs text-zinc-500 font-mono">MENTOR & SPEAKER</p>
              <h4 className="text-sm font-bold text-zinc-900">{session.speaker.name}</h4>
              <p className="text-[11px] text-zinc-600 font-medium">{session.speaker.role} • Atmiya University</p>
            </div>
          </div>

          {/* Action Resources buttons */}
          <div className="pt-6 border-t-2 border-zinc-100 flex flex-wrap gap-3 items-center justify-between">
            <Link to="/sessions" className="pixel-btn text-xs px-4 py-2 flex items-center gap-1 font-bold bg-white text-zinc-800">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Workshops</span>
            </Link>

            <div className="flex items-center gap-2">
              {session.resources?.githubRepo && (
                <a
                  href={session.resources.githubRepo}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn text-xs px-4 py-2.5 flex items-center gap-1.5 font-bold bg-white text-zinc-800"
                >
                  <Github className="w-4 h-4" />
                  <span>Get Code Repository</span>
                </a>
              )}
              {session.resources?.slidesUrl && (
                <a
                  href={session.resources.slidesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn text-xs px-4 py-2.5 flex items-center gap-1.5 font-bold bg-white text-zinc-800"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Slides</span>
                </a>
              )}
              {session.resources?.recordingUrl && session.resources.recordingUrl !== '#' && (
                <a
                  href={session.resources.recordingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn-python text-xs px-4 py-2.5 flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
                >
                  <Play className="w-4 h-4" />
                  <span>Watch Session</span>
                </a>
              )}
            </div>
          </div>

        </div>

      </div>
    </Shell>
  );
}
