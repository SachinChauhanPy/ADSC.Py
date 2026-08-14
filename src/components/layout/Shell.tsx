import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col bg-pixel-grid selection:bg-[#FFD43B] selection:text-zinc-900">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
