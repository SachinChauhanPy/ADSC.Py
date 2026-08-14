import React from 'react';

export function PixelLaptop({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Laptop Screen Frame */}
        <rect x="12" y="10" width="40" height="30" fill="#121212" rx="2" />
        <rect x="14" y="12" width="36" height="26" fill="#18181B" />
        
        {/* Screen Code Lines */}
        <rect x="18" y="16" width="16" height="3" fill="#4285F4" />
        <rect x="18" y="22" width="22" height="3" fill="#34A853" />
        <rect x="18" y="28" width="12" height="3" fill="#FFD43B" />

        {/* Laptop Base Keyboard */}
        <path d="M4 42H60L54 54H10L4 42Z" fill="#D4D4D8" stroke="#121212" strokeWidth="2" />
        <rect x="22" y="44" width="20" height="4" fill="#A1A1AA" stroke="#121212" strokeWidth="1" />
      </svg>
    </div>
  );
}
