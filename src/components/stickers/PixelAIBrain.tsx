import React from 'react';

export function PixelAIBrain({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Brain Pixel Shape */}
        <path
          d="M16 12H48V16H52V24H56V40H52V48H48V52H40V56H24V52H16V48H12V40H8V24H12V16H16V12Z"
          fill="#FEE2E2"
          stroke="#121212"
          strokeWidth="2"
        />
        
        {/* Left Neural Core (Red/Purple) */}
        <rect x="16" y="20" width="12" height="12" fill="#EA4335" stroke="#121212" strokeWidth="1" />
        <rect x="16" y="36" width="12" height="12" fill="#4285F4" stroke="#121212" strokeWidth="1" />

        {/* Right Neural Core (Yellow/Green) */}
        <rect x="36" y="20" width="12" height="12" fill="#FBBC04" stroke="#121212" strokeWidth="1" />
        <rect x="36" y="36" width="12" height="12" fill="#34A853" stroke="#121212" strokeWidth="1" />

        {/* Central Synapse Connections */}
        <path d="M28 26H36" stroke="#121212" strokeWidth="3" />
        <path d="M28 42H36" stroke="#121212" strokeWidth="3" />
        <path d="M22 32V36" stroke="#121212" strokeWidth="3" />
        <path d="M42 32V36" stroke="#121212" strokeWidth="3" />

        {/* Sparkle Pixel Dots */}
        <rect x="30" y="30" width="4" height="4" fill="#FFD43B" />
        <rect x="20" y="14" width="4" height="4" fill="#121212" />
        <rect x="40" y="14" width="4" height="4" fill="#121212" />
      </svg>
    </div>
  );
}
