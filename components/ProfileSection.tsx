import React from 'react';

interface ProfileSectionProps {
  avatarUrl: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ avatarUrl }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0 text-center">
        <div className="inline-block p-1 border-2 border-hacker-neon mb-2 shadow-[0_0_10px_#00FF00]">
            <img 
            src={avatarUrl} 
            alt="Marllon DevSec" 
            className="w-48 h-48 object-cover contrast-125 brightness-110 transition-all duration-500"
            />
        </div>
        <div className="text-xl uppercase tracking-widest text-hacker-neon animate-pulse mt-1 drop-shadow-md">Status: Online</div>
      </div>
      
      <div className="flex-grow space-y-4">
        <div className="border-l-4 border-hacker-neon pl-4 py-1 bg-green-900/10">
            <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">👋 Hi, I'm Marllon</h1>
            <p className="italic text-hacker-neon font-bold text-xl">“Security is a process, not a product.” — Bruce Schneier</p>
        </div>

        <div className="flex flex-wrap gap-2 text-lg font-bold text-black">
             {['Cybersecurity', 'Low-Level Programming', 'Reverse Engineering', 'Security Automation', 'Malware Research'].map((tag) => (
                 <span key={tag} className="bg-hacker-neon px-2 py-0.5 border border-black hover:bg-white hover:text-black transition-colors cursor-crosshair shadow-[2px_2px_0px_0px_rgba(0,50,0,1)]">
                     {tag}
                 </span>
             ))}
        </div>

        <p className="text-xl leading-relaxed text-hacker-neon/90 font-medium">
          I focus on low-level and system-oriented programming, OS internals, reverse engineering, security automation, malware research, and developing tools for pentesting and lab experimentation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-black/50 p-3 border border-hacker-neon shadow-[inset_0_0_10px_rgba(0,255,0,0.2)]">
                <h3 className="text-white font-bold mb-2 border-b border-hacker-neon pb-1 text-xl">🧠 Focus Areas</h3>
                <ul className="list-disc list-inside text-lg space-y-1 marker:text-hacker-neon text-hacker-neon/80">
                    <li>Low-level programming (C / C++)</li>
                    <li>Linux & Windows internals</li>
                    <li>Reverse engineering</li>
                    <li>Security automation & tooling</li>
                    <li>Malware research</li>
                    <li>Web & Arduino experiments</li>
                    <li>Memory, execution flow, and evasion studies</li>
                </ul>
            </div>
            <div className="bg-black/50 p-3 border border-hacker-neon shadow-[inset_0_0_10px_rgba(0,255,0,0.2)]">
                 <h3 className="text-white font-bold mb-2 border-b border-hacker-neon pb-1 text-xl">👤 Who I Am</h3>
                 <p className="text-lg text-hacker-neon/80 mb-2">
                    Working with IT professionally since 2021. Extensive exposure to OS and network fundamentals.
                 </p>
                 <p className="text-lg text-hacker-neon/80 mb-2">
                    Final semester Computer Science student specializing in cybersecurity.
                 </p>
                 <p className="text-lg text-hacker-neon/80">
                    Focus: Offensive security, Red Team operations, and low-level security research.
                 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;