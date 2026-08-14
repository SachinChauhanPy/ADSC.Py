import React from 'react';

export function PixelCompass({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Ring */}
        <circle cx="32" cy="32" r="24" fill="#FFFFFF" stroke="#121212" strokeWidth="3" />
        <circle cx="32" cy="32" r="18" fill="#F4F4F5" stroke="#121212" strokeWidth="1" />

        {/* Compass Cardinal Points */}
        <rect x="30" y="12" width="4" height="4" fill="#EA4335" />
        <rect x="30" y="48" width="4" height="4" fill="#121212" />
        <rect x="12" y="30" width="4" height="4" fill="#121212" />
        <rect x="48" y="30" width="4" height="4" fill="#121212" />

        {/* Needle North (Red) & South (Blue) */}
        <path d="M32 18L38 32H26L32 18Z" fill="#EA4335" stroke="#121212" strokeWidth="1" />
        <path d="M32 46L38 32H26L32 46Z" fill="#4285F4" stroke="#121212" strokeWidth="1" />
        <circle cx="32" cy="32" r="3" fill="#FFD43B" stroke="#121212" strokeWidth="1" />
      </svg>
    </div>
  );
}
