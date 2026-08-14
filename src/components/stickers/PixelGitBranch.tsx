import React from 'react';

export function PixelGitBranch({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main Trunk Line */}
        <rect x="20" y="8" width="6" height="48" fill="#121212" />
        
        {/* Branch Curve */}
        <path d="M26 40C34 40 40 34 40 26V20" stroke="#121212" strokeWidth="6" fill="none" />

        {/* Nodes */}
        <circle cx="23" cy="14" r="8" fill="#EA4335" stroke="#121212" strokeWidth="2" />
        <circle cx="23" cy="50" r="8" fill="#4285F4" stroke="#121212" strokeWidth="2" />
        <circle cx="40" cy="16" r="8" fill="#34A853" stroke="#121212" strokeWidth="2" />

        {/* Inner Node Dots */}
        <rect x="21" y="12" width="4" height="4" fill="#FFFFFF" />
        <rect x="21" y="48" width="4" height="4" fill="#FFFFFF" />
        <rect x="38" y="14" width="4" height="4" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
