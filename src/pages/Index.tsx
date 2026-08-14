import React from 'react';
import type { MetaFunction } from 'react-router';
import { getSeoMeta } from '../lib/seo';

export const meta: MetaFunction = ({ location }) => {
  return getSeoMeta('home', [
    { title: "ADSC.Py — Atmiya Developer Students Club" },
    { name: "description", content: "The student-led Python developer community at Atmiya University, Rajkot. Explore roadmaps, build real projects, and escape tutorial hell." },
    { property: "og:title", content: "ADSC.Py — Atmiya Developer Students Club" },
    { property: "og:description", content: "The student-led Python developer community at Atmiya University, Rajkot." },
    { property: "og:image", content: "/python_logo.png" },
    { name: "twitter:card", content: "summary" },
  ], location.pathname);
};
import { Shell } from '../components/layout/Shell';
import { HeroSection } from '../components/home/HeroSection';
import { StoryPillars } from '../components/home/StoryPillars';
import { PathFinder } from '../components/home/PathFinder';
import { OpportunityPreview } from '../components/home/OpportunityPreview';
import { Manifesto } from '../components/home/Manifesto';

export default function IndexPage() {
  return (
    <Shell>
      <div className="space-y-12">
        <HeroSection />
        <StoryPillars />
        <PathFinder />
        <OpportunityPreview />
        <Manifesto />
      </div>
    </Shell>
  );
}
