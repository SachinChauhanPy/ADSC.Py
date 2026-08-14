import React from 'react';
import { PixelBook, PixelGears, PixelTrophy } from '../stickers';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function StoryPillars() {
  const pillars = [
    {
      step: "01",
      title: "UNDERSTAND",
      subtitle: "Beyond Basic Syntax",
      badgeBg: "bg-[#4285F4] text-white",
      borderColor: "border-[#4285F4]",
      icon: <PixelBook className="w-12 h-12" />,
      description: "Discover where Python is actually used in production software. Understand Web APIs, AI models, Data Pipelines, and Automation bots so you know what path to choose.",
      bulletPoints: [
        "Interactive domain roadmaps",
        "Clear stack breakdowns (FastAPI, PyTorch, Pandas)",
        "Beginner vs. Intermediate project ideas"
      ]
    },
    {
      step: "02",
      title: "PREPARE",
      subtitle: "Stop Tutorial Hell",
      badgeBg: "bg-[#FFD43B] text-zinc-900",
      borderColor: "border-[#FFD43B]",
      icon: <PixelGears className="w-12 h-12" />,
      description: "Build real projects instead of blindly watching videos. ADSC.Py provides hands-on project blueprints, peer code reviews, and practical workshops.",
      bulletPoints: [
        "Step-by-step Guided Project Blueprints",
        "Practical hands-on technical sessions",
        "GitHub repository best practices"
      ]
    },
    {
      step: "03",
      title: "GET EXPOSURE",
      subtitle: "Step Outside Classroom",
      badgeBg: "bg-[#34A853] text-white",
      borderColor: "border-[#34A853]",
      icon: <PixelTrophy className="w-12 h-12" />,
      description: "Connect with the broader developer ecosystem. Gain exposure through open-source contributions (GSoC, Hacktoberfest), hackathons, and developer communities.",
      bulletPoints: [
        "Verified Open Source program matrices",
        "Student Hackathons & Fellowships",
        "Peer mentorship from senior students"
      ]
    }
  ];

  return (
    <section className="py-16 border-t-2 border-zinc-900 my-12 bg-white">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="pixel-badge bg-[#FFD43B] text-zinc-900 inline-block">
          THE THREE PILLARS OF ADSC.Py
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          How ADSC.Py Guides Your Python Journey
        </h2>
        <p className="text-zinc-600 text-base font-medium">
          We don't teach syntax again. We give you the map to turn your syntax knowledge into real capability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {pillars.map((p, index) => (
          <div
            key={p.title}
            className="pixel-card p-8 flex flex-col justify-between relative bg-white border-2 border-zinc-900 space-y-6"
          >
            {/* Step Number & Sticker */}
            <div className="flex items-center justify-between">
              <span className={`font-pixel text-xs px-3 py-1 border-2 border-zinc-900 shadow-[2px_2px_0px_#121212] ${p.badgeBg}`}>
                STEP {p.step} • {p.title}
              </span>
              {p.icon}
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-zinc-900">
                {p.subtitle}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                {p.description}
              </p>
            </div>

            {/* Bullet points */}
            <ul className="space-y-2.5 pt-4 border-t-2 border-zinc-100">
              {p.bulletPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Story Flow Indicator */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-900 text-white border-2 border-zinc-900 shadow-[4px_4px_0px_#FFD43B] font-pixel text-xs font-bold">
          <span>UNDERSTAND</span>
          <ArrowRight className="w-4 h-4 text-[#FFD43B]" />
          <span>PREPARE</span>
          <ArrowRight className="w-4 h-4 text-[#34A853]" />
          <span>GET EXPOSURE</span>
        </div>
      </div>
    </section>
  );
}
