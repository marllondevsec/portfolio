import React, { useState, useEffect } from 'react';
import MatrixRain from './components/MatrixRain';
import RetroWindow from './components/RetroWindow';
import ProfileSection from './components/ProfileSection';
import RepoList from './components/RepoList';
import { fetchProfileImage } from './services/githubService';
import { TabState } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabState>(TabState.PROFILE);
  const [avatar, setAvatar] = useState('https://picsum.photos/200');

  useEffect(() => {
    fetchProfileImage('marllondevsec').then(setAvatar);
  }, []);

  return (
    <div className="min-h-screen relative font-mono selection:bg-hacker-neon selection:text-black">
      <MatrixRain />
      
      {/* Scanline overlay effect */}
      <div className="scanline"></div>
      
      <style>{`
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        .scanline {
            width: 100%;
            height: 100px;
            z-index: 50;
            background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0, 255, 0, 0.2) 50%, rgba(0,0,0,0) 100%);
            opacity: 0.1;
            position: fixed;
            bottom: 100%;
            animation: scanline 10s linear infinite;
            pointer-events: none;
        }
        @keyframes scanline {
            0% { bottom: 100%; }
            100% { bottom: -100px; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto p-4 md:p-8 relative z-10">
        
        {/* Header / Logo */}
        <header className="mb-8 p-4 border-2 border-hacker-neon bg-black/80 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,0,0.3)]">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
             <div>
                <p className="text-sm text-hacker-neon mb-1 animate-pulse">root@marllon:~/portfolio# ./init_display.sh</p>
                
                {/* Logo Container */}
                <div className="flex flex-col md:flex-row items-start md:items-baseline gap-1 md:gap-4 mt-2">
                    {/* Part 1: MARLLON_ */}
                    <div className="glitch-wrapper">
                        <h1 className="glitch text-6xl md:text-8xl font-black tracking-tighter" data-text="MARLLON_">
                            MARLLON_
                        </h1>
                    </div>

                    {/* Part 2: DEVSEC (Highlighted Block) */}
                    <div className="relative group cursor-default">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-hacker-neon blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        {/* The Block */}
                        <div className="relative bg-hacker-neon text-black px-4 py-1 transform -skew-x-12 border-2 border-black group-hover:skew-x-0 transition-all duration-300 shadow-[4px_4px_0px_rgba(0,50,0,1)]">
                             <h1 className="text-5xl md:text-7xl font-black tracking-tighter flex items-center gap-2">
                                <span className="text-3xl opacity-50 select-none">{'{'}</span>
                                DEVSEC
                                <span className="text-3xl opacity-50 select-none">{'}'}</span>
                             </h1>
                             
                             {/* Decorative tech bits on the block */}
                             <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
                             <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>
                             <div className="absolute top-0 right-2 w-8 h-[1px] bg-black/50"></div>
                             <div className="absolute bottom-0 left-2 w-8 h-[1px] bg-black/50"></div>
                        </div>
                    </div>
                </div>

             </div>
             <div className="text-right hidden md:block">
                 <p className="text-hacker-neon text-sm">KERNEL: 5.15.0-SEC-HARDENED</p>
                 <p className="text-hacker-neon text-sm">UPTIME: 999999 HRS</p>
                 <p className="text-hacker-neon text-sm font-bold text-shadow">ENCRYPTED CONNECTION ESTABLISHED</p>
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t border-hacker-neon pt-2">
            <p className="text-sm md:text-base text-hacker-neon font-bold uppercase tracking-widest bg-hacker-neon text-black px-2 py-0.5">
              ACCESS_LEVEL: ROOT_ADMIN
            </p>
            <div className="w-full md:w-1/2 text-sm text-hacker-neon bg-hacker-dim/30 border border-hacker-neon p-1 mt-2 md:mt-0 overflow-hidden whitespace-nowrap">
               <div style={{ animation: 'marquee 20s linear infinite', display: 'inline-block' }}>
                   *** LATEST RESEARCH: Malware Evasion Techniques in Windows 11 *** NEW REPO DEPLOYED *** SECURITY IS A PROCESS, NOT A PRODUCT ***
               </div>
            </div>
          </div>
        </header>

        {/* Navigation - Pseudo Desktop */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button 
            onClick={() => setActiveTab(TabState.PROFILE)}
            className={`px-6 py-2 text-xl font-bold border-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${activeTab === TabState.PROFILE ? 'bg-hacker-neon text-black border-hacker-neon' : 'bg-black text-hacker-neon border-hacker-neon hover:bg-hacker-neon hover:text-black'}`}
          >
            [ BIO.EXE ]
          </button>
          <button 
            onClick={() => setActiveTab(TabState.PROJECTS)}
            className={`px-6 py-2 text-xl font-bold border-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${activeTab === TabState.PROJECTS ? 'bg-hacker-neon text-black border-hacker-neon' : 'bg-black text-hacker-neon border-hacker-neon hover:bg-hacker-neon hover:text-black'}`}
          >
            [ REPOS.DIR ]
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Window */}
          <div className="lg:col-span-2">
            {activeTab === TabState.PROFILE && (
              <RetroWindow title="User_Profile.md" isActive={true}>
                <ProfileSection avatarUrl={avatar} />
              </RetroWindow>
            )}

            {activeTab === TabState.PROJECTS && (
              <RetroWindow title="GitHub_Repositories" isActive={true}>
                <RepoList />
              </RetroWindow>
            )}
          </div>

          {/* Sidebar Widgets (Always Visible on Desktop) */}
          <div className="space-y-6">
            <RetroWindow title="System_Status" className="text-sm" isActive={false}>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-hacker-neon">CPU_USAGE:</span>
                        <span className="text-white font-bold">12%</span>
                    </div>
                    <div className="w-full bg-hacker-dim h-4 border border-hacker-neon">
                        <div className="bg-hacker-neon h-full w-[12%] shadow-[0_0_5px_#00FF00]"></div>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-hacker-neon">RAM_ALLOC:</span>
                        <span className="text-white font-bold">64MB</span>
                    </div>
                    <div className="w-full bg-hacker-dim h-4 border border-hacker-neon">
                        <div className="bg-hacker-neon h-full w-[45%] shadow-[0_0_5px_#00FF00]"></div>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t border-hacker-neon/30">
                        <span className="text-hacker-neon">NET_SEC:</span>
                        <span className="text-hacker-neon animate-pulse font-bold bg-hacker-neon text-black px-1">ENCRYPTED</span>
                    </div>
                </div>
            </RetroWindow>

            <RetroWindow title="Quick_Links" className="text-sm" isActive={false}>
                <ul className="space-y-2">
                    <li>
                        <a href="https://github.com/marllondevsec" target="_blank" rel="noreferrer" className="group flex items-center text-hacker-red hover:text-white px-1 transition-colors text-lg font-bold">
                             <span className="w-2 h-2 bg-hacker-red mr-2 group-hover:bg-white animate-pulse"></span> {'>'} GitHub Profile
                        </a>
                    </li>
                    <li>
                         <a href="https://www.linkedin.com/in/marllondevsec/" target="_blank" rel="noreferrer" className="group flex items-center text-hacker-red hover:text-white px-1 transition-colors text-lg font-bold">
                             <span className="w-2 h-2 bg-hacker-red mr-2 group-hover:bg-white animate-pulse"></span> {'>'} LinkedIn
                         </a>
                    </li>
                    <li>
                         <a href="#" className="group flex items-center text-hacker-red hover:text-white px-1 transition-colors pointer-events-none opacity-50 text-lg font-bold">
                             <span className="w-2 h-2 bg-hacker-red mr-2 group-hover:bg-white"></span> {'>'} PGP Key
                         </a>
                    </li>
                </ul>
            </RetroWindow>

            <div className="flex justify-center">
                 <img src="https://media.tenor.com/On7KVXzevlAAAAAC/under-construction-90s.gif" alt="Under Construction" className="w-32 opacity-80 filter hue-rotate-90 saturate-200" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-hacker-neon pt-4 text-center text-sm text-hacker-neon/80">
            <p className="animate-pulse">COPYRIGHT © 2024 MARLLON_DEVSEC. ALL RIGHTS RESERVED.</p>
            <p>OPTIMIZED FOR NETSCAPE NAVIGATOR 4.0 @ 800x600</p>
        </footer>
      </div>
    </div>
  );
}

export default App;