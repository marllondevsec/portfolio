import React from 'react';
import { Terminal, Code } from 'lucide-react';

interface NavigationProps {
  currentView: 'profile' | 'projects';
  setView: (view: 'profile' | 'projects') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-black/90 border-b border-hacker-green/50 backdrop-blur-md px-4 py-4 mb-8 shadow-neon">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="font-pixel text-hacker-green text-xs md:text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-hacker-green animate-blink"></span>
          SYSTEM_READY...
        </div>

        <div className="flex space-x-2 bg-hacker-dim/30 p-1 border border-hacker-green/30 rounded-sm">
          <button 
            onClick={() => setView('profile')} 
            className={`
              flex items-center gap-2 px-6 py-2 font-pixel text-xs transition-all duration-300 border
              ${currentView === 'profile' 
                ? 'bg-hacker-green text-black border-hacker-green shadow-[0_0_10px_rgba(0,255,0,0.4)]' 
                : 'bg-transparent text-hacker-green border-transparent hover:bg-hacker-green/10 hover:border-hacker-green/50'}
            `}
          >
            <Terminal size={12} />
            IDENTITY
          </button>
          
          <button 
            onClick={() => setView('projects')} 
            className={`
              flex items-center gap-2 px-6 py-2 font-pixel text-xs transition-all duration-300 border
              ${currentView === 'projects' 
                ? 'bg-hacker-green text-black border-hacker-green shadow-[0_0_10px_rgba(0,255,0,0.4)]' 
                : 'bg-transparent text-hacker-green border-transparent hover:bg-hacker-green/10 hover:border-hacker-green/50'}
            `}
          >
            <Code size={12} />
            DATABASE
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;