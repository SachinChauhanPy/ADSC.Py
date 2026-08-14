import React from 'react';
import { PixelPython } from './PixelPython';
import { PixelTerminal } from './PixelTerminal';
import { PixelBrowser } from './PixelBrowser';
import { PixelAIBrain } from './PixelAIBrain';
import { PixelDatabase } from './PixelDatabase';
import { PixelCompass } from './PixelCompass';
import { PixelTrophy } from './PixelTrophy';
import { PixelGitBranch } from './PixelGitBranch';
import { PixelCommunity } from './PixelCommunity';
import { PixelBook } from './PixelBook';
import { PixelGears } from './PixelGears';
import { PixelLaptop } from './PixelLaptop';

export {
  PixelPython,
  PixelTerminal,
  PixelBrowser,
  PixelAIBrain,
  PixelDatabase,
  PixelCompass,
  PixelTrophy,
  PixelGitBranch,
  PixelCommunity,
  PixelBook,
  PixelGears,
  PixelLaptop
};


export function RenderSticker({ name, className }: { name: string; className?: string }) {
  switch (name.toLowerCase()) {
    case 'python':
      return <PixelPython className={className} />;
    case 'terminal':
      return <PixelTerminal className={className} />;
    case 'browser':
      return <PixelBrowser className={className} />;
    case 'brain':
    case 'ai':
      return <PixelAIBrain className={className} />;
    case 'database':
    case 'data':
      return <PixelDatabase className={className} />;
    case 'compass':
    case 'map':
      return <PixelCompass className={className} />;
    case 'trophy':
    case 'hackathon':
      return <PixelTrophy className={className} />;
    case 'git':
    case 'branch':
      return <PixelGitBranch className={className} />;
    case 'community':
    case 'people':
      return <PixelCommunity className={className} />;
    case 'book':
    case 'learning':
      return <PixelBook className={className} />;
    case 'gears':
    case 'automation':
      return <PixelGears className={className} />;
    case 'laptop':
    case 'dev':
      return <PixelLaptop className={className} />;
    default:
      return <PixelPython className={className} />;
  }
}
