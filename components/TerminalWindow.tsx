import React, { ReactNode } from 'react';
import { Terminal, Minus, X, Square } from 'lucide-react';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`border-2 border-neon retro-grid shadow-neon flex flex-col ${className}`}>
      <div className="flex items-center justify-between bg-[#00ff41]/10 border-b-2 border-neon p-2 relative z-10 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Terminal size={16} className="text-neon" />
          <span className="text-lg font-bold text-neon tracking-widest uppercase shadow-black drop-shadow-md">{title}</span>
        </div>
        <div className="flex space-x-3 pr-2">
          <Minus size={16} className="text-neon hover:text-white cursor-pointer transition-colors" />
          <Square size={14} className="text-neon hover:text-white cursor-pointer transition-colors" />
          <X size={16} className="text-red-500 hover:text-red-400 cursor-pointer transition-colors" />
        </div>
      </div>
      {/* Changed to allow scrolling and prevent clipping */}
      <div className="p-4 md:p-6 overflow-x-hidden overflow-y-auto custom-scrollbar relative z-10 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;