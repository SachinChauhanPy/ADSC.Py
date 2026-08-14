import React from 'react';

export function PixelTrophy({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Trophy Cup Head */}
        <path
          d="M16 8H48V28H44V36H36V44H44V52H20V44H28V36H20V28H16V8Z"
          fill="#FFD43B"
          stroke="#121212"
          strokeWidth="2"
        />
        {/* Cup Handles */}
        <rect x="8" y="14" width="8" height="12" fill="#FBBC04" stroke="#121212" strokeWidth="2" />
        <rect x="48" y="14" width="8" height="12" fill="#FBBC04" stroke="#121212" strokeWidth="2" />

        {/* Base Stand */}
        <rect x="16" y="48" width="32" height="10" fill="#121212" />
        <rect x="22" y="50" width="20" height="4" fill="#34A853" />

        {/* Star Badge on Cup */}
        <rect x="30" y="18" width="4" height="4" fill="#FFFFFF" />
        <rect x="28" y="20" width="8" height="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
