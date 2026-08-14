import React from 'react';

export function PixelBook({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Book Cover Back */}
        <rect x="8" y="12" width="48" height="40" fill="#306998" stroke="#121212" strokeWidth="2" />
        
        {/* Pages */}
        <rect x="12" y="10" width="40" height="40" fill="#FFFFFF" stroke="#121212" strokeWidth="2" />
        <rect x="16" y="18" width="16" height="3" fill="#EA4335" />
        <rect x="16" y="24" width="28" height="2" fill="#A1A1AA" />
        <rect x="16" y="28" width="24" height="2" fill="#A1A1AA" />
        <rect x="16" y="32" width="28" height="2" fill="#A1A1AA" />
        
        {/* Python Bookmark Ribbon */}
        <rect x="36" y="8" width="8" height="26" fill="#FFD43B" stroke="#121212" strokeWidth="1" />
        <polygon points="36,34 40,30 44,34 44,8 36,8" fill="#FFD43B" />
      </svg>
    </div>
  );
}
