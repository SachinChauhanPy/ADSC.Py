import React from 'react';
import { useParams, Link } from 'react-router';
import type { MetaFunction } from 'react-router';
import { Shell } from '../components/layout/Shell';
import { getProjects, getSessions, getOpportunities } from '../lib/dataManager';
import { getSeoMeta } from '../lib/seo';
import { getCourseSchema } from '../lib/schemaHelper';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PixelLaptop } from '../components/stickers';
import { ArrowLeft, Clock, Award, CheckCircle, ExternalLink, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const meta: MetaFunction = ({ params, location }) => {
  const project = getProjects().find(p => p.id === params.id);
  if (!project) {
    return getSeoMeta('path-detail', [{ title: "Project Path Not Found | ADSC.Py" }], location.pathname);
  }
  return getSeoMeta(
    `path-detail-${params.id}`,
    [
      { title: `${project.title} (${project.difficulty}) | ADSC.Py Project Blueprint` },
      { name: "description", content: project.problemSolved.substring(0, 150) + "..." },
      { property: "og:title", content: project.title },
      { property: "og:description", content: project.problemSolved }
    ],
    location.pathname
  );
};

export default function PathDetailPage() {
  const { id } = useParams();
  const project = getProjects().find(p => p.id === id);

  if (!project) {
    return (
      <Shell>
        <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-zinc-900">Project Path Not Found</h2>
          <p className="text-zinc-600 font-medium">The project blueprint roadmap you are looking for does not exist or has been removed.</p>
          <Link to="/paths" className="pixel-btn-primary px-4 py-2 text-xs font-bold inline-flex items-center gap-1 bg-[#4285F4] text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Project Blueprints</span>
          </Link>
        </div>
      </Shell>
    );
  }

  // 9. Internal Linking: Find Related Sessions / Workshops
  const sessions = getSessions();
  const relatedSessions = sessions.filter(sess => 
    !sess.hidden && 
    (sess.domain.toLowerCase().includes(project.domain.toLowerCase()) ||
     project.techStack.some(tech => 
       sess.title.toLowerCase().includes(tech.toLowerCase()) || 
       sess.tagline.toLowerCase().includes(tech.toLowerCase())
     ))
  ).slice(0, 2);

  // 9. Internal Linking: Find Related Opportunities
  const opportunities = getOpportunities();
  const relatedOpps = opportunities.filter(opp => 
    !opp.hidden &&
    (opp.relevantSkills.some(skill => 
       project.techStack.some(tech => 
         tech.toLowerCase().includes(skill.toLowerCase()) || 
         skill.toLowerCase().includes(tech.toLowerCase())
       )
     ))
  ).slice(0, 2);

  const courseSchema = getCourseSchema(project);

  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      
      <div className="space-y-8 max-w-4xl mx-auto py-4 text-left">
        {/* Navigation Breadcrumbs */}
        <div>
          <Breadcrumbs items={[{ name: 'Project Paths', item: '/paths' }, { name: project.title, item: `/paths/${project.id}` }]} />
        </div>

        {/* Details Wrapper */}
        <div className="pixel-card-static p-6 sm:p-10 bg-white border-2 border-zinc-900 space-y-8 relative">
          
          {/* Floating Sticker */}
          <div className="absolute -top-6 right-6 opacity-30 hover:opacity-100 transition-opacity duration-300">
            <PixelLaptop className="w-16 h-16 transform rotate-3" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-pixel text-[10px] px-2 py-0.5 bg-zinc-900 text-white border border-zinc-900">
                {project.level}
              </span>
              <span className={`px-2 py-0.5 text-xs font-mono font-bold border border-zinc-900 ${
                project.difficulty === 'Beginner' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                project.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-red-100 text-red-900 border-red-300'
              }`}>
                {project.difficulty}
              </span>
              <span className="text-xs font-mono text-zinc-500">• {project.domain}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 leading-snug">
              {project.title}
            </h1>

            <p className="text-sm text-zinc-600 font-medium">
              Estimated effort: <span className="font-bold text-zinc-900">{project.estimatedHours}</span>
            </p>
          </div>

          {/* Problem Solved */}
          <div className="space-y-3 bg-zinc-50 p-5 border-2 border-zinc-900">
            <h3 className="font-pixel text-xs text-zinc-900 font-bold uppercase tracking-wider">The Real-World Problem You Solve:</h3>
            <p className="text-sm text-zinc-700 leading-relaxed font-semibold">
              {project.problemSolved}
            </p>
          </div>

          {/* Technical Tech Stack */}
          <div className="space-y-3">
            <h4 className="font-pixel text-xs text-zinc-500 uppercase">TECH STACK BLUEPRINT:</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-white border-2 border-zinc-900 text-xs font-mono font-bold text-zinc-800 shadow-[2px_2px_0px_#121212]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Learning Objectives & Key Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-pixel text-xs text-zinc-900 font-bold border-b border-zinc-200 pb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>WHAT YOU WILL LEARN</span>
              </h4>
              <ul className="space-y-2">
                {project.whatYouWillLearn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-zinc-800">
                    <span className="w-1.5 h-1.5 bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-pixel text-xs text-[#4285F4] font-bold border-b border-zinc-200 pb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#4285F4]" />
                <span>BUILD FEATURE CHECKLIST</span>
              </h4>
              <ul className="space-y-2">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-zinc-800">
                    <CheckCircle className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Content (Internal Linking Web) */}
          {(relatedSessions.length > 0 || relatedOpps.length > 0) && (
            <div className="pt-6 border-t-2 border-zinc-100 space-y-6">
              <h3 className="font-pixel text-xs text-zinc-900 font-bold uppercase tracking-wider">Related Club Resources:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Related Workshops */}
                {relatedSessions.length > 0 && (
                  <div className="space-y-3 p-4 bg-zinc-50 border border-zinc-300">
                    <h4 className="font-pixel text-[10px] text-[#EA4335] uppercase font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Matching Workshops</span>
                    </h4>
                    <div className="space-y-2">
                      {relatedSessions.map(sess => (
                        <Link 
                          key={sess.id}
                          to={`/sessions/${sess.id}`}
                          className="block text-xs font-bold text-zinc-800 hover:text-[#4285F4] hover:underline flex items-center gap-1"
                        >
                          <ArrowRight className="w-3 h-3 shrink-0" />
                          <span className="line-clamp-1">{sess.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Opportunities */}
                {relatedOpps.length > 0 && (
                  <div className="space-y-3 p-4 bg-zinc-50 border border-zinc-300">
                    <h4 className="font-pixel text-[10px] text-[#34A853] uppercase font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Matching Careers</span>
                    </h4>
                    <div className="space-y-2">
                      {relatedOpps.map(opp => (
                        <Link 
                          key={opp.id}
                          to={`/opportunities/${opp.id}`}
                          className="block text-xs font-bold text-zinc-800 hover:text-[#34A853] hover:underline flex items-center gap-1"
                        >
                          <ArrowRight className="w-3 h-3 shrink-0" />
                          <span className="line-clamp-1">{opp.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Footer controls */}
          <div className="pt-6 border-t-2 border-zinc-100 flex flex-wrap gap-3 items-center justify-between">
            <Link to="/paths" className="pixel-btn text-xs px-4 py-2 flex items-center gap-1 font-bold bg-white text-zinc-800">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>

            {project.githubStarterTemplateUrl && (
              <a
                href={project.githubStarterTemplateUrl}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn-python text-xs px-5 py-2.5 flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
              >
                <span>Clone GitHub Starter Template</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

      </div>
    </Shell>
  );
}
