import React from 'react';

export function PixelPython({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`inline-block relative filter drop-shadow-[2px_2px_0px_#121212] pixel-sticker-interactive ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Pixel Grid Python Emblem */}
        {/* Upper Snake (Blue) */}
        <path
          d="M20 4H40V8H44V16H40V20H20V24H12V32H20V36H8V20H12V12H16V8H20V4Z"
          fill="#306998"
        />
        <path
          d="M20 4H36V8H40V16H36V20H20V16H16V8H20V4Z"
          fill="#3776AB"
        />
        {/* Python Eye */}
        <rect x="22" y="8" width="4" height="4" fill="#FFFFFF" />
        <rect x="24" y="9" width="2" height="2" fill="#121212" />

        {/* Lower Snake (Yellow) */}
        <path
          d="M44 28H52V32H56V44H52V48H48V52H44V56H24V60H20V44H44V40H48V32H44V28Z"
          fill="#FFD43B"
        />
        <path
          d="M28 44H44V40H48V32H44V28H28V32H24V40H28V44Z"
          fill="#FFE873"
        />
        {/* Python Lower Eye */}
        <rect x="38" y="50" width="4" height="4" fill="#FFFFFF" />
        <rect x="38" y="51" width="2" height="2" fill="#121212" />

        {/* Crisp Pixel Outlines */}
        <path
          d="M20 4H40V8H44V16H40V20H28V24H12V32H8V20H12V12H16V8H20V4Z"
          stroke="#121212"
          strokeWidth="2"
        />
        <path
          d="M44 28H52V32H56V44H52V48H44V56H24V60H20V44H44V40H48V32H44V28Z"
          stroke="#121212"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
