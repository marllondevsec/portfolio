import React from 'react';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  isActive?: boolean;
  onClick?: () => void;
}

const RetroWindow: React.FC<RetroWindowProps> = ({ title, children, className = '', isActive = true, onClick }) => {
  return (
    <div 
        onClick={onClick}
        className={`border-2 border-hacker-neon bg-black mb-6 w-full shadow-[0px_0px_10px_0px_rgba(0,255,0,0.3)] ${className} ${isActive ? 'z-10' : 'z-0 opacity-90'}`}
    >
      {/* Title Bar */}
      <div className={`flex items-center justify-between px-2 py-1 ${isActive ? 'bg-hacker-neon' : 'bg-green-900'} border-b-2 border-hacker-neon`}>
        <div className="flex items-center gap-2">
            <span className={`w-3 h-3 bg-black rounded-full border border-black`}></span>
            <span className={`font-mono font-bold uppercase tracking-wider text-sm ${isActive ? 'text-black' : 'text-hacker-neon'}`}>
            {title}
            </span>
        </div>
        <div className="flex gap-1">
            <div className="w-4 h-4 border border-black bg-hacker-neon flex items-center justify-center text-[10px] leading-none text-black cursor-pointer hover:bg-white hover:text-black">_</div>
            <div className="w-4 h-4 border border-black bg-hacker-neon flex items-center justify-center text-[10px] leading-none text-black cursor-pointer hover:bg-white hover:text-black">X</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-hacker-neon">
        {children}
      </div>
    </div>
  );
};

export default RetroWindow;