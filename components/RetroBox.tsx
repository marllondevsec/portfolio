import React from 'react';
import { SectionProps } from '../types';

const RetroBox: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="mb-12 relative w-full">
      {/* Outer Glow */}
      <div className="absolute -inset-1 bg-hacker-green/20 blur-sm rounded-sm"></div>
      
      <div className="relative bg-black/95 border border-hacker-green p-1 shadow-[0_0_10px_rgba(0,255,0,0.1)]">
        {/* Header Bar */}
        <div className="bg-hacker-green/10 border-b border-hacker-green p-2 flex justify-between items-center mb-0">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-hacker-green"></div>
             <span className="font-pixel text-xs md:text-sm text-hacker-green tracking-wider">{title}.EXE</span>
          </div>
          <div className="text-[10px] font-mono text-hacker-green/60">PID: {Math.floor(Math.random() * 9000) + 1000}</div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 font-terminal text-terminal-light text-xl leading-relaxed relative min-h-[300px]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
          
          <div className="relative z-20">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetroBox;