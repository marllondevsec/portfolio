import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, className = "", children }) => {
  return (
    <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto ${className}`}>
      {title && (
        <div className="mb-12 flex items-center gap-4">
          <h2 className="text-3xl font-bold text-white font-sans tracking-tight">
            <span className="text-accent font-mono mr-2">0x{id.toUpperCase()}</span>
            {title}
          </h2>
          <div className="h-px bg-gray-800 flex-grow max-w-xs"></div>
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;