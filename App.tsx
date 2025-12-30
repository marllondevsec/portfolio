import React, { useEffect, useState } from 'react';
import MatrixBackground from './components/MatrixBackground';
import RetroBox from './components/RetroBox';
import Navigation from './components/Navigation';
import TerminalContact from './components/TerminalContact';
import { fetchRepositories } from './services/githubService';
import { GitHubRepo } from './types';
import { Cpu, Shield, ExternalLink, Star, GitBranch, Linkedin, AlertTriangle, ArrowRight, Skull, Mail, Copy, Check } from 'lucide-react';

const App: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'profile' | 'projects'>('profile');
  const [bootSequence, setBootSequence] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchRepositories();
      setRepos(data);
      setLoading(false);
    };
    loadData();
    
    // Simulate boot up
    setTimeout(() => setBootSequence(false), 1500);
  }, []);

  if (bootSequence) {
     return (
        <div className="min-h-screen bg-black flex items-center justify-center font-terminal text-hacker-green text-2xl">
           <div className="text-left">
              <p>&gt; INITIALIZING KERNEL...</p>
              <p>&gt; MOUNTING FILESYSTEM... [OK]</p>
              <p>&gt; LOADING MARLLON_DEVSEC PROFILE...</p>
              <span className="animate-blink">_</span>
           </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-black text-terminal-light font-terminal selection:bg-hacker-green selection:text-black overflow-x-hidden">
      <MatrixBackground />

      {/* Main Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        
        {/* Header Section */}
        <header className="pt-12 pb-4 px-4 text-center relative z-20">
          <h1 className="font-pixel text-4xl md:text-6xl text-hacker-green mb-2 tracking-tighter drop-shadow-glow">
            MARLLON <span className="glitch inline-block" data-text="DEVSEC">DEVSEC</span>
          </h1>
          <div className="h-px w-32 bg-hacker-green mx-auto mb-4 shadow-neon"></div>
          <p className="font-terminal text-xl text-hacker-green/80 tracking-widest uppercase">
            Developer // Cybersecurity Engineer
          </p>
        </header>

        <Navigation currentView={view} setView={setView} />

        <main className="flex-grow max-w-5xl mx-auto w-full px-4 pb-16 transition-opacity duration-500">
          
          {/* PROFILE TAB */}
          {view === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <RetroBox id="profile" title="USER_IDENTITY_LOG">
                    <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
                    
                    {/* Left Column: Avatar & Quick Stats */}
                    <div className="flex flex-col gap-4">
                        <div className="border border-hacker-green bg-black p-1 shadow-neon relative group">
                            <img 
                                src="https://github.com/marllondevsec.png" 
                                alt="Marllon DevSec" 
                                className="w-full h-auto filter brightness-110 contrast-125"
                            />
                            {/* Scanning Line Effect over image */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hacker-green/20 to-transparent h-4 w-full animate-scanline opacity-50 pointer-events-none"></div>
                        </div>
                        
                        <div className="bg-hacker-green/5 border border-hacker-green/30 p-3 text-center">
                           <div className="font-pixel text-xs text-hacker-green mb-1">CURRENT STATUS</div>
                           <div className="text-white animate-pulse">Available for Opportunities</div>
                        </div>

                        <a 
                            href="https://www.linkedin.com/in/marllondevsec/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-blue-600/20 border border-blue-500 text-blue-300 py-3 hover:bg-blue-600 hover:text-white transition-all font-pixel text-xs hover:shadow-[0_0_15px_#2563eb]"
                        >
                            <Linkedin size={14} />
                            LINKEDIN LINK
                        </a>
                    </div>

                    {/* Right Column: Content */}
                    <div className="space-y-8">
                        {/* Quote Section */}
                        <div className="border-l-2 border-hacker-green pl-6 py-2">
                            <p className="text-2xl md:text-3xl italic text-white/90 font-light leading-tight">
                                &quot;You can't defend what you don't understand..&quot;
                            </p>
                            <p className="text-hacker-green mt-2 font-bold text-lg">- Marco Ranum</p>
                        </div>

                   {/* Bio */}
<div className="space-y-4 text-xl">
  <div className="text-white text-base leading-relaxed space-y-2">
    <p>
      <span className="text-hacker-green font-bold mr-2">root@marllon:~$</span>
      Information Technology professional with a solid foundation in{" "}
      <span className="text-hacker-green font-bold">programming</span>,{" "}
      <span className="text-hacker-green font-bold">networks</span>, and{" "}
      <span className="text-hacker-green font-bold">operating systems</span>, with hands-on experience in{" "}
      <span className="text-hacker-green font-bold">cybersecurity concepts</span>, including{" "}
      <span className="text-hacker-green font-bold">web vulnerability analysis</span> and{" "}
      <span className="text-hacker-green font-bold">reverse engineering</span>.
    </p>
    <p>
      Experienced in responsible disclosure of{" "}
      <span className="text-hacker-green font-bold">OWASP Top 10 vulnerabilities</span>. Seeking entry-level opportunities in{" "}
      <span className="text-hacker-green font-bold">IT Support</span>,{" "}
      <span className="text-hacker-green font-bold">NOC</span>,{" "}
      <span className="text-hacker-green font-bold">SOC Jr</span>, or{" "}
      <span className="text-hacker-green font-bold">Infrastructure</span>, bringing technical skills and a strong willingness to learn and grow.
    </p>
  </div>
</div>


                        {/* Skills Grid */}
                        <div>
                            <h3 className="font-pixel text-sm text-hacker-green mb-4 flex items-center gap-2 border-b border-hacker-green/30 pb-2">
                                <Cpu size={16} /> COMPLIED_SKILLSETS
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    { name: "C / C++ / Assembly", icon: true },
                                    { name: "Reverse Engineering", danger: true },
                                    { name: "Malware Analysis", danger: true },
                                    { name: "OS Internals (Win/Linux)", icon: true },
                                    { name: "Security Automation", icon: true },
                                    { name: "SOC/NOC", danger: true },
                                    { name: "Vulnerability Research", danger: true },
                                    { name: "Python", icon: true },
                                ].map((skill, i) => (
                                    <div key={i} className={`
                                        flex items-center gap-3 p-2 border border-transparent hover:border-hacker-green/50 bg-white/5 hover:bg-white/10 transition-colors
                                        ${skill.danger ? 'text-neon-red' : 'text-terminal-light'}
                                    `}>
                                        {skill.danger ? <Skull size={16} /> : <ArrowRight size={16} className="text-hacker-green" />}
                                        <span className={skill.danger ? "font-bold tracking-wide" : ""}>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                       {/* Experience Log */}
<div className="space-y-2">
  <h3 className="font-pixel text-sm text-hacker-green mb-4 flex items-center gap-2 border-b border-hacker-green/30 pb-2">
    <Shield size={16} /> CAREER_LOG
  </h3>
  <p className="text-lg text-white/80">
    Professional IT experience since <span className="text-hacker-green">2021</span>, with hands-on experience in{" "}
    <span className="text-hacker-green font-bold">systems</span>,{" "}
    <span className="text-hacker-green font-bold">networks</span>, and{" "}
    <span className="text-hacker-green font-bold">technical support</span>.
  </p>
  <p className="text-lg text-white/80">
    Currently completing a <span className="text-hacker-green font-bold">Computer Science degree</span> with a specialized thesis on{" "}
    <span className="text-hacker-green font-bold">cybersecurity methodologies</span>.
  </p>
</div>

                {/* CONTACT SECTION FOR RECRUITERS */}
                <RetroBox id="contact" title="ENCRYPTED_UPLINK">
                   <div className="flex flex-col gap-4">
                      <div className="text-center md:text-left">
                          <h3 className="text-hacker-green font-pixel text-sm flex items-center justify-center md:justify-start gap-2 mb-2">
                              <div className="w-2 h-2 bg-neon-red animate-pulse rounded-full shadow-[0_0_5px_red]"></div>
                              SECURE_CHANNEL_READY
                          </h3>
                          <p className="text-terminal-light/60 text-sm max-w-lg mb-4">
                              contact Marllon DevSec regarding recruitment.
                          </p>
                      </div>
                      <TerminalContact />
                   </div>
                </RetroBox>
            </div>
          )}

          {/* PROJECTS TAB */}
          {view === 'projects' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <RetroBox id="projects" title="PUBLIC_REPOSITORIES">
                    <div className="mb-6 border-b border-hacker-green/30 pb-4 flex justify-between items-end">
                        <div>
                            <div className="text-hacker-green font-pixel text-xs mb-1">SOURCE</div>
                            <div className="text-xl">github.com/marllondevsec</div>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="text-hacker-green font-pixel text-xs mb-1">TOTAL_FETCHED</div>
                            <div className="text-xl">{repos.length} OBJECTS</div>
                        </div>
                    </div>

                    {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-4 h-4 bg-hacker-green animate-bounce mx-1"></div>
                        <div className="inline-block w-4 h-4 bg-hacker-green animate-bounce mx-1 delay-100"></div>
                        <div className="inline-block w-4 h-4 bg-hacker-green animate-bounce mx-1 delay-200"></div>
                        <p className="mt-4 font-pixel text-xs text-hacker-green">FETCHING_DATA...</p>
                    </div>
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {repos.map((repo) => (
                        <a 
                            key={repo.id} 
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-black/50 border border-hacker-green/40 p-5 hover:border-hacker-green hover:shadow-neon transition-all duration-200 flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-pixel text-sm text-hacker-green group-hover:underline decoration-hacker-green underline-offset-4">
                                    {repo.name}
                                </h3>
                                <ExternalLink size={14} className="text-hacker-green opacity-50 group-hover:opacity-100" />
                            </div>
                            
                            <p className="text-terminal-light/80 text-lg mb-6 flex-grow leading-snug">
                            {repo.description || "Project description unavailable. Access restricted or undefined."}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm font-mono text-hacker-green/70 pt-4 border-t border-hacker-green/20">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-neon-red shadow-[0_0_5px_red]"></div>
                                    {repo.language || 'Raw Data'}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star size={12} /> {repo.stargazers_count}
                                </div>
                                <div className="flex items-center gap-1">
                                    <GitBranch size={12} /> Fork
                                </div>
                            </div>
                        </a>
                        ))}
                    </div>
                    )}
                    
                    <div className="mt-12 flex justify-center">
                        <a href="https://github.com/marllondevsec?tab=repositories" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-hacker-green px-8 py-3 hover:bg-hacker-green hover:text-black transition-colors font-pixel text-xs group">
                            <AlertTriangle size={14} className="group-hover:animate-pulse" />
                            ACCESS_FULL_DATABASE_EXTERNALLY
                        </a>
                    </div>
                </RetroBox>
            </div>
          )}

        </main>

        <footer className="border-t border-hacker-green/30 bg-black py-6 text-center z-20 font-terminal text-hacker-green/50 text-sm">
          <p className="mb-2">Security is not a product, but a process.{new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
