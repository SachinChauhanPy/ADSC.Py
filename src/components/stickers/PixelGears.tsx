import React from 'react';

export function PixelGears({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Big Gear (Green) */}
        <rect x="12" y="12" width="28" height="28" fill="#34A853" stroke="#121212" strokeWidth="2" />
        <rect x="8" y="20" width="36" height="12" fill="#34A853" stroke="#121212" strokeWidth="2" />
        <rect x="20" y="8" width="12" height="36" fill="#34A853" stroke="#121212" strokeWidth="2" />
        <circle cx="26" cy="26" r="6" fill="#FFFFFF" stroke="#121212" strokeWidth="2" />

        {/* Small Gear (Yellow) */}
        <rect x="36" y="34" width="18" height="18" fill="#FFD43B" stroke="#121212" strokeWidth="2" />
        <rect x="32" y="39" width="26" height="8" fill="#FFD43B" stroke="#121212" strokeWidth="2" />
        <rect x="41" y="30" width="8" height="26" fill="#FFD43B" stroke="#121212" strokeWidth="2" />
        <circle cx="45" cy="43" r="4" fill="#FFFFFF" stroke="#121212" strokeWidth="2" />
      </svg>
    </div>
  );
}
