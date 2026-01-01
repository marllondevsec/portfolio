import React from 'react';

interface ScreenTransitionProps {
  isActive: boolean;
}

const ScreenTransition: React.FC<ScreenTransitionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Base Layer - Full Screen Invert/Flash */}
      <div className="absolute inset-0 bg-white mix-blend-difference animate-screen-glitch opacity-0"></div>
      
      {/* Noise/Color Layer */}
      <div className="absolute inset-0 bg-[#00ff41] mix-blend-overlay opacity-20 animate-screen-glitch" style={{ animationDelay: '0.05s' }}></div>
      
      {/* Scanline Distortion */}
      <div className="absolute inset-0 bg-black mix-blend-hard-light animate-screen-glitch opacity-50" style={{ 
        backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 255, 65, 0.5) 50%)',
        backgroundSize: '100% 4px',
        animationDuration: '0.2s'
      }}></div>
      
      {/* Text Artifacts (Optional visual chaos) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00ff41] font-bold text-9xl opacity-20 animate-pulse mix-blend-exclusion">
         SYSTEM_RELOAD
      </div>
    </div>
  );
};

export default ScreenTransition;