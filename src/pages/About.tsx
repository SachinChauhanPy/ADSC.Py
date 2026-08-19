import React from 'react';
import type { MetaFunction } from 'react-router';
import { getSeoMeta } from '../lib/seo';

export const meta: MetaFunction = ({ location }) => {
  return getSeoMeta('about', [
    { title: "Origin Story & Community Manifesto | ADSC.Py" },
    { name: "description", content: "Learn why ADSC.Py exists: bridging the gap between basic syntax and real-world software engineering at Atmiya University." },
    { property: "og:title", content: "Origin Story & Community Manifesto | ADSC.Py" },
    { property: "og:description", content: "Learn why ADSC.Py exists: bridging the gap between basic syntax and real-world software engineering at Atmiya University." },
  ], location.pathname);
};
import { Shell } from '../components/layout/Shell';
import { PixelPython, PixelCompass, PixelBook } from '../components/stickers';
import { ShieldCheck, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <Shell>
      <div className="space-y-12 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-4 relative">
          {/* Floating Sticker Accents */}
          <div className="absolute -top-4 -left-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelPython className="w-14 h-14 transform -rotate-12" />
          </div>
          <div className="absolute -top-4 -right-12 opacity-25 hover:opacity-100 transition-opacity duration-300 hidden lg:block z-10">
            <PixelCompass className="w-14 h-14 transform rotate-12" />
          </div>
          <div className="pixel-badge bg-[#FFD43B] text-zinc-900 inline-block">
            ABOUT ADSC.Py
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Why ADSC.Py Exists
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            The story, philosophy, and brand rules behind Atmiya University's Python student developer community.
          </p>
        </div>

        {/* The Core Problem */}
        <div className="pixel-card-static p-8 border-2 border-zinc-900 dark:border-zinc-700 space-y-4">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-[#EA4335]" />
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">The Problem We Are Solving</h2>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed font-medium">
            At universities worldwide, thousands of students complete introductory Python programming courses. They learn loops, variables, list comprehensions, and basic OOP principles.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed font-medium">
            However, a massive gap exists right after learning syntax: <strong className="text-zinc-900 dark:text-zinc-100 bg-amber-100 dark:bg-amber-900/60 px-1">Students don't know what to build or where Python can take them.</strong> They get trapped in endless YouTube tutorial loops without building real software or gaining industry exposure.
          </p>
        </div>

        {/* The Solution Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pixel-card p-6 bg-blue-50/60 dark:bg-blue-950/30 border-2 border-zinc-900 dark:border-zinc-700 space-y-3">
            <PixelCompass className="w-10 h-10" />
            <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100">1. UNDERSTAND</h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              We provide explicit domain roadmaps (Web APIs, AI/ML, Data Science, Web Bots) showing where Python is actually used in tech.
            </p>
          </div>

          <div className="pixel-card p-6 bg-amber-50/60 dark:bg-amber-950/30 border-2 border-zinc-900 dark:border-zinc-700 space-y-3">
            <PixelBook className="w-10 h-10" />
            <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100">2. PREPARE</h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              We offer structured project blueprints with feature checklists and peer code reviews so students build capability.
            </p>
          </div>

          <div className="pixel-card p-6 bg-emerald-50/60 dark:bg-emerald-950/30 border-2 border-zinc-900 dark:border-zinc-700 space-y-3">
            <PixelPython className="w-10 h-10" />
            <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100">3. GET EXPOSURE</h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              We connect students to global open-source programs (GSoC, LFX) and hackathons outside the classroom.
            </p>
          </div>
        </div>

        {/* Brand Rules & Honesty */}
        <div className="pixel-card-static p-8 bg-zinc-900 dark:bg-zinc-950 text-white border-2 border-zinc-900 dark:border-zinc-700 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#FFD43B]" />
            <h2 className="text-2xl font-extrabold">Our Brand Rules</h2>
          </div>
          <ul className="space-y-3 text-sm text-zinc-300 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-[#FFD43B] font-bold">1.</span>
              <span>Always casing as <strong>ADSC.Py</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFD43B] font-bold">2.</span>
              <span>Never promise jobs, placements, or guaranteed employment.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFD43B] font-bold">3.</span>
              <span>Never invent fake member numbers or fabricated testimonials.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFD43B] font-bold">4.</span>
              <span>Operating under ADSC (Atmiya Developer Students Club) at Atmiya University, Rajkot.</span>
            </li>
          </ul>
        </div>

      </div>
    </Shell>
  );
}
