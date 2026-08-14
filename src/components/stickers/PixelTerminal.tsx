import React from 'react';

export function PixelTerminal({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Terminal Outer Body */}
        <rect x="6" y="10" width="52" height="44" fill="#121212" rx="2" />
        <rect x="8" y="12" width="48" height="8" fill="#27272A" />
        
        {/* Top Control Buttons */}
        <rect x="12" y="14" width="4" height="4" fill="#EA4335" />
        <rect x="18" y="14" width="4" height="4" fill="#FBBC04" />
        <rect x="24" y="14" width="4" height="4" fill="#34A853" />

        {/* Terminal Screen */}
        <rect x="8" y="20" width="48" height="32" fill="#18181B" />

        {/* >>> Prompt & Cursor */}
        <path d="M14 26L20 30L14 34" stroke="#4285F4" strokeWidth="3" strokeLinecap="square" />
        <path d="M22 30L28 34L22 38" stroke="#34A853" strokeWidth="3" strokeLinecap="square" />
        <rect x="30" y="32" width="6" height="4" fill="#FFD43B" className="animate-pulse" />
        <rect x="14" y="42" width="24" height="2" fill="#A1A1AA" />
        
        {/* Border */}
        <rect x="6" y="10" width="52" height="44" stroke="#121212" strokeWidth="2" />
      </svg>
    </div>
  );
}
