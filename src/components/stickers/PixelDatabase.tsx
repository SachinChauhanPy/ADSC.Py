import React from 'react';

export function PixelDatabase({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Tier 1 Cylinder Top */}
        <rect x="12" y="8" width="40" height="12" fill="#FEF08A" stroke="#121212" strokeWidth="2" />
        <rect x="18" y="12" width="8" height="4" fill="#FBBC04" />
        
        {/* Tier 2 Cylinder Middle */}
        <rect x="12" y="24" width="40" height="12" fill="#FEF08A" stroke="#121212" strokeWidth="2" />
        <rect x="18" y="28" width="8" height="4" fill="#FBBC04" />

        {/* Tier 3 Cylinder Bottom */}
        <rect x="12" y="40" width="40" height="12" fill="#FEF08A" stroke="#121212" strokeWidth="2" />
        <rect x="18" y="44" width="8" height="4" fill="#FBBC04" />

        {/* Indicator Lights */}
        <rect x="44" y="12" width="4" height="4" fill="#34A853" />
        <rect x="44" y="28" width="4" height="4" fill="#34A853" />
        <rect x="44" y="44" width="4" height="4" fill="#4285F4" />
      </svg>
    </div>
  );
}
