import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { getGeneralSettings } from '../../lib/dataManager';
import { useTheme } from '../../hooks/useTheme';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Journey Map', href: '/journey' },
    { label: 'Learning Paths', href: '/paths' },
    { label: 'Sessions', href: '/sessions' },
    { label: 'Opportunities', href: '/opportunities' },
    { label: 'Community', href: '/community' },
    { label: 'About', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const settings = getGeneralSettings();

  const clubName = settings.clubName || 'ADSC.Py';
  const endsWithPy = clubName.toLowerCase().endsWith('.py');
  const baseName = endsWithPy ? clubName.slice(0, -3) : clubName;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b-2 border-zinc-900 dark:border-zinc-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative transform transition-transform group-hover:scale-105">
              <img src="/python_logo.png" alt="ADSC Logo" className="w-16 h-16 object-contain pixel-sticker-interactive" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-pixel text-xl tracking-tight text-zinc-900 dark:text-zinc-100 font-bold">
                  {baseName}
                  {endsWithPy && (
                    <>
                      <span className="text-[#EA4335]">.</span>
                      <span className="text-[#306998]">Py</span>
                    </>
                  )}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                Atmiya University • Rajkot
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-semibold transition-all ${
                    active
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-2 border-zinc-900 dark:border-zinc-100 shadow-[2px_2px_0px_#4285F4]'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-2 border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA + Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="pixel-btn p-2 flex items-center justify-center cursor-pointer"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#FFD43B]" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href={settings.discordUrl || 'https://discord.gg'}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn text-xs px-3 py-2 flex items-center gap-1.5"
            >
              <span>Discord</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={settings.whatsappUrl || 'https://chat.whatsapp.com'}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn-python text-xs px-4 py-2 flex items-center gap-1 font-bold"
            >
              <span>Join Community</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="pixel-btn p-2 cursor-pointer"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#FFD43B]" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="pixel-btn p-2"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-2 transition-colors duration-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 font-semibold text-base border-2 ${
                isActive(item.href)
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-[3px_3px_0px_#4285F4]'
                  : 'border-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={settings.whatsappUrl || 'https://chat.whatsapp.com'}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="pixel-btn-python w-full text-center py-3 text-sm font-bold block"
            >
              Join Community
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
