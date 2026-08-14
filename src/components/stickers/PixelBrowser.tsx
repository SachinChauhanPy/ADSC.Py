import React from 'react';

export function PixelBrowser({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Browser Outer Frame */}
        <rect x="6" y="8" width="52" height="48" fill="#FFFFFF" stroke="#121212" strokeWidth="2" />
        {/* Header Bar */}
        <rect x="6" y="8" width="52" height="12" fill="#E4E4E7" stroke="#121212" strokeWidth="2" />
        
        {/* Window Dots */}
        <rect x="10" y="12" width="4" height="4" fill="#EA4335" />
        <rect x="16" y="12" width="4" height="4" fill="#FBBC04" />
        <rect x="22" y="12" width="4" height="4" fill="#34A853" />

        {/* Address Bar */}
        <rect x="28" y="11" width="26" height="6" fill="#FFFFFF" stroke="#121212" strokeWidth="1" />
        <rect x="30" y="13" width="16" height="2" fill="#4285F4" />

        {/* Web Content Mock */}
        <rect x="10" y="24" width="20" height="14" fill="#4285F4" stroke="#121212" strokeWidth="1" />
        <rect x="34" y="24" width="20" height="4" fill="#121212" />
        <rect x="34" y="30" width="16" height="2" fill="#71717A" />
        <rect x="34" y="34" width="14" height="2" fill="#71717A" />

        {/* Footer Code Bar */}
        <rect x="10" y="44" width="44" height="8" fill="#FFD43B" stroke="#121212" strokeWidth="1" />
        <rect x="14" y="47" width="24" height="2" fill="#121212" />
      </svg>
    </div>
  );
}
