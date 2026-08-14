import React from 'react';

export function PixelCommunity({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Left Character (Blue) */}
        <rect x="10" y="24" width="14" height="14" fill="#4285F4" stroke="#121212" strokeWidth="2" />
        <rect x="6" y="40" width="22" height="16" fill="#306998" stroke="#121212" strokeWidth="2" />
        <rect x="14" y="28" width="2" height="4" fill="#FFFFFF" />
        <rect x="18" y="28" width="2" height="4" fill="#FFFFFF" />

        {/* Right Character (Green) */}
        <rect x="40" y="24" width="14" height="14" fill="#34A853" stroke="#121212" strokeWidth="2" />
        <rect x="36" y="40" width="22" height="16" fill="#2D9248" stroke="#121212" strokeWidth="2" />
        <rect x="44" y="28" width="2" height="4" fill="#FFFFFF" />
        <rect x="48" y="28" width="2" height="4" fill="#FFFFFF" />

        {/* Center Chat Bubble */}
        <rect x="20" y="8" width="24" height="16" fill="#FFD43B" stroke="#121212" strokeWidth="2" />
        <rect x="24" y="12" width="16" height="3" fill="#121212" />
        <rect x="24" y="17" width="10" height="3" fill="#121212" />
        <polygon points="28,24 32,24 28,28" fill="#FFD43B" stroke="#121212" strokeWidth="1" />
      </svg>
    </div>
  );
}
