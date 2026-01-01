import React, { useState } from 'react';
import { CV_CONTENT } from '../data/content';
import { Briefcase, Cpu, GraduationCap, User, Wrench } from 'lucide-react';

type Tab = 'overview' | 'skills' | 'tools' | 'experience' | 'education';

const CVSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'PROFILE', icon: <User size={18} /> },
    { id: 'skills', label: 'SKILLS', icon: <Cpu size={18} /> },
    { id: 'tools', label: 'ARSENAL', icon: <Wrench size={18} /> },
    { id: 'experience', label: 'EXPERIENCE', icon: <Briefcase size={18} /> },
    { id: 'education', label: 'ACADEMIC', icon: <GraduationCap size={18} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[450px]">
      {/* Sidebar / Tabs */}
      <div className="md:w-1/4 border-b-2 md:border-b-0 md:border-r-2 border-neon p-2 flex md:flex-col overflow-x-auto gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-3 p-3 text-left w-full font-bold tracking-wider transition-all duration-200 uppercase cursor-pointer select-none ${
              activeTab === tab.id 
                ? 'bg-[#00ff41] text-black shadow-[0_0_10px_#00ff41]' 
                : 'text-[#00ff41] hover:bg-[#00ff41]/20 border border-transparent hover:border-[#00ff41]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="md:w-3/4 p-6 overflow-y-auto max-h-[600px] custom-scrollbar">
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <h3 className="text-2xl mb-6 border-b border-dashed border-[#00ff41] pb-2 text-neon text-neon-bright">
              {`> PROFESSIONAL_SUMMARY`}
            </h3>
            {/* Added solid black container for readability */}
            <div className="bg-black border border-[#00ff41]/30 p-6 shadow-[0_0_10px_rgba(0,0,0,0.8)]">
              <p className="text-lg leading-relaxed text-[#00ff41] opacity-90 font-medium whitespace-pre-line">
                {CV_CONTENT.summary}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="animate-fade-in">
             <h3 className="text-2xl mb-6 border-b border-dashed border-[#00ff41] pb-2 text-neon text-neon-bright">
               {`> TECHNICAL_CAPABILITIES`}
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {CV_CONTENT.skills.map((skill, idx) => (
                 <div key={idx} className="flex items-center space-x-2 group cursor-default">
                   <span className="text-[#00ff41] group-hover:text-white animate-pulse">{`>>`}</span>
                   {/* Changed from transparent bg to solid black bg */}
                   <span className="bg-black px-3 py-2 w-full border border-[#00ff41]/50 group-hover:border-[#00ff41] group-hover:shadow-[0_0_5px_rgba(0,255,65,0.3)] transition-all text-neon">
                     {skill}
                   </span>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="animate-fade-in">
             <h3 className="text-2xl mb-4 border-b border-dashed border-[#00ff41] pb-2 text-neon text-neon-bright">
               {`> CYBER_SECURITY_ARSENAL`}
             </h3>
             <p className="text-[#00ff41] text-lg mb-6 font-mono opacity-90">
                Here are some of the tools I am most familiar with:
             </p>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
               {CV_CONTENT.tools.map((tool, idx) => (
                 <div key={idx} className="bg-black border border-[#00ff41]/40 px-3 py-2 text-sm text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all cursor-crosshair group flex items-center">
                   <span className="mr-2 opacity-50 group-hover:opacity-100">{`./`}</span>
                   <span className="font-mono font-bold tracking-wide">{tool}</span>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="animate-fade-in space-y-8">
            <h3 className="text-2xl mb-6 border-b border-dashed border-[#00ff41] pb-2 text-neon text-neon-bright">
              {`> WORK_HISTORY`}
            </h3>
            {CV_CONTENT.experience.map((job, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-[#00ff41]/50 hover:border-[#00ff41] transition-colors">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-[#00ff41] rounded-none rotate-45"></div>
                
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <span className="text-xl font-bold text-neon-bright">{job.role}</span>
                  <span className="text-sm bg-[#00ff41] text-black px-2 py-0.5 font-bold">[{job.period}]</span>
                </div>
                
                <div className="text-[#00ff41] mb-3 font-semibold tracking-wide">
                  @{job.company}
                </div>
                
                {/* Added solid black container for readability */}
                <div className="bg-black border border-[#00ff41]/30 p-4 shadow-sm">
                  <p className="text-[#00ff41]/80 leading-relaxed whitespace-pre-line font-mono text-sm md:text-base">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="animate-fade-in space-y-8">
            <h3 className="text-2xl mb-6 border-b border-dashed border-[#00ff41] pb-2 text-neon text-neon-bright">
              {`> EDUCATION_&_CERTIFICATES`}
            </h3>
            {CV_CONTENT.education.map((edu, idx) => (
              <div key={idx} className="bg-[#00ff41]/5 p-6 border border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all">
                 <h4 className="text-xl font-bold text-neon-bright mb-1">{edu.degree}</h4>
                 <div className="text-[#00ff41] mb-4 text-sm uppercase tracking-wider opacity-80">{edu.institution}</div>
                 <div className="p-3 bg-black border border-[#00ff41]/30">
                    <p className="text-[#00ff41]/90 whitespace-pre-line text-sm">{edu.details}</p>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CVSection;