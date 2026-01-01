import React, { useState, useEffect } from 'react';
import MatrixBackground from './components/MatrixBackground';
import GlitchText from './components/GlitchText';
import TerminalWindow from './components/TerminalWindow';
import CVSection from './components/CVSection';
import GithubSection from './components/GithubSection';
import FeedSection from './components/FeedSection';
import ContactSection from './components/ContactSection';
import ContributionGraph from './components/ContributionGraph';
import LatestArticle from './components/LatestArticle';
import ScreenTransition from './components/ScreenTransition';
import { INTRO_QUOTE, INTRO_AUTHOR, FEED_CONTENT } from './data/content';
import { Linkedin, Github, Hash, ChevronRight, GitCommit, FileText, ExternalLink, Activity } from 'lucide-react';
import { Repo, FeedItem } from './types';

// Helper type for the unified activity feed
type ActivityItem = {
  type: 'REPO' | 'POST';
  id: string | number;
  title: string;
  date: Date;
  description: string;
  url?: string; // For repos
  tags?: string[]; // For posts
};

function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'cv' | 'projects' | 'feed' | 'contact'>('home');
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);
  const [visitCount, setVisitCount] = useState<number>(0);
  const [timeString, setTimeString] = useState<string>('00:00');
  const [dateString, setDateString] = useState<string>('');
  
  // New state for transition
  const [isNavigating, setIsNavigating] = useState(false);

  // Initialize Visit Counter & Time
  useEffect(() => {
    // 1. Visit Counter (Reset logic using a new key)
    const storageKey = 'portfolio_visits_v2_reset'; 
    const storedVisits = localStorage.getItem(storageKey);
    
    // Start at 0 if no data found
    let currentCount = storedVisits ? parseInt(storedVisits) : 0;
    
    // Increment count for current session
    currentCount++;
    
    // Save and set
    localStorage.setItem(storageKey, currentCount.toString());
    setVisitCount(currentCount);

    // 2. Set Time and Date
    const now = new Date();
    setTimeString(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    
    // Format: 31-Dec-2025
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('en-GB', { month: 'short' });
    const year = now.getFullYear();
    setDateString(`${day}-${month}-${year}`);

  }, []);

  // Fetch and merge recent activities (Repos + Feed Posts)
  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        // 1. Process Feed Content
        const feedItems: ActivityItem[] = FEED_CONTENT.map(item => ({
          type: 'POST',
          id: item.id,
          title: item.title,
          date: new Date(item.date),
          description: item.content.substring(0, 80) + "...",
          tags: item.tags
        }));

        // 2. Fetch GitHub Repos (Just the latest 5 to sort)
        const res = await fetch('https://api.github.com/users/marllondevsec/repos?sort=updated&per_page=5');
        let repoItems: ActivityItem[] = [];
        
        if (res.ok) {
          const repos: Repo[] = await res.json();
          repoItems = repos.map(repo => ({
            type: 'REPO',
            id: repo.id,
            title: repo.name,
            date: new Date(repo.updated_at),
            description: repo.description || "Repository updated",
            url: repo.html_url
          }));
        }

        // 3. Merge and Sort by Date Descending
        const combined = [...feedItems, ...repoItems].sort((a, b) => b.date.getTime() - a.date.getTime());
        
        // 4. Take top 4
        setRecentActivities(combined.slice(0, 4));

      } catch (error) {
        console.error("Failed to fetch recent activity", error);
      }
    };

    fetchRecentData();
  }, []);

  const navItems = [
    { id: 'home', label: 'ROOT_ACCESS' },
    { id: 'cv', label: 'CV' },
    { id: 'projects', label: 'REPOSITORIES' },
    { id: 'feed', label: 'ARTICLES' },
    { id: 'contact', label: 'CONTACT_UPLINK' },
  ];

  // Enhanced Navigation Handler with Glitch Effect
  const handleNavigation = (sectionId: typeof activeSection) => {
    if (activeSection === sectionId || isNavigating) return;

    // 1. Trigger Glitch
    setIsNavigating(true);

    // 2. Change content after short delay (mid-glitch)
    setTimeout(() => {
      setActiveSection(sectionId);
    }, 150);

    // 3. Remove Glitch overlay
    setTimeout(() => {
      setIsNavigating(false);
    }, 400); // slightly longer than animation to ensure clean unmount
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'cv':
        return <CVSection />;
      case 'projects':
        return <GithubSection />;
      case 'feed':
        return <FeedSection />;
      case 'contact':
        return <ContactSection />;
      case 'home':
      default:
        return (
          <div className="space-y-8 pb-4">
             {/* 1. Quote Section */}
             <div className="p-6 border-l-4 border-[#00ff41] bg-[#00ff41]/5">
                <p className="text-2xl md:text-3xl italic text-white font-light tracking-wide">
                  &quot;{INTRO_QUOTE}&quot;
                </p>
                <p className="mt-4 text-right text-[#00ff41] font-bold uppercase tracking-widest">{INTRO_AUTHOR}</p>
             </div>

             {/* 2. Main Terminal / Profile Section (MOVED UP) */}
             <div className="bg-black border-2 border-[#00ff41] p-6 shadow-neon font-mono text-sm md:text-base">
                <div className="flex items-center gap-2 mb-4 border-b border-[#00ff41]/30 pb-2">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   <span className="ml-2 text-[#00ff41]/50 text-xs">root@terminal: ~</span>
                </div>

                <div className="mb-2">
                  <span className="text-[#00ff41] font-bold">root@marllon:~$</span> <span className="text-white typing-effect">cat user_profile.txt</span>
                </div>
                <div className="text-[#00ff41] mb-6 whitespace-pre-wrap pl-4 border-l border-[#00ff41]/30 leading-loose">
                  {`Hello, visitor. Welcome to my website.
Here you'll find my projects, experiments, and technical work gathered in one place, along with some information about me.

If it isn't already clear from the aesthetics, I simply love retro computing and the underground side of the internet.
I still don't know at what point humanity decided it was a good idea to abandon the wonderful GeoCities aesthetic in favor of Corporate Memphis.`}
                </div>

                <div className="mt-6 animate-pulse">
                   <span className="text-[#00ff41] font-bold">root@marllon:~$</span> <span className="inline-block w-3 h-5 bg-[#00ff41] align-middle ml-1"></span>
                </div>
             </div>

             {/* 3. GitHub Profile & Chart Dedicated Container */}
             <div className="bg-black border-2 border-[#00ff41] p-6 md:p-8 shadow-neon relative overflow-hidden group">
                 {/* Decorative corners */}
                 <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff41]"></div>
                 <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff41]"></div>

                 <div className="text-[#00ff41] text-xs font-bold mb-6 flex items-center gap-2 uppercase tracking-[0.2em] opacity-80">
                    <span className="w-2 h-2 bg-[#00ff41] animate-pulse rounded-full"></span>
                    <span>:: USER_ACTIVITY_MONITOR ::</span>
                    <div className="h-[1px] bg-[#00ff41]/30 flex-grow"></div>
                 </div>
                 
                 {/* Custom Graph Component */}
                 <div className="pt-2">
                    <ContributionGraph />
                 </div>
                 
                 <div className="mt-4 text-[10px] text-[#00ff41]/40 font-mono text-right">
                    SECURE_CONNECTION: ESTABLISHED // DATA_ENCRYPTED
                 </div>
             </div>

             {/* 4. RECENT ACTIVITIES & ARTICLES */}
             <div>
                <h3 className="text-xl text-[#00ff41] font-bold mb-4 flex items-center gap-2 tracking-widest">
                   <Activity size={20} /> ACTIVITY_LOG & UPDATES
                </h3>
                
                {/* LATEST ARTICLE HIGHLIGHT (NEW) */}
                <LatestArticle onReadMore={() => handleNavigation('feed')} />

                {/* LOG LIST (EXISTING) */}
                <div className="border border-[#00ff41]/50 bg-black/80 relative">
                  <div className="absolute top-0 left-0 bg-[#00ff41]/20 text-[#00ff41] px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                     SYSTEM_DIRECTORY_LOG
                  </div>
                  
                  <div className="pt-8 pb-2 px-4">
                     {recentActivities.length === 0 ? (
                        <div className="text-[#00ff41]/50 text-center py-4 text-xs animate-pulse">Scanning for recent changes...</div>
                     ) : (
                        <div className="divide-y divide-[#00ff41]/20">
                           {recentActivities.map((item, idx) => (
                              <div key={`${item.type}-${item.id}`} className="py-3 flex items-start gap-4 hover:bg-[#00ff41]/5 transition-colors group cursor-default">
                                 <div className="text-[#00ff41] mt-1 shrink-0">
                                    {item.type === 'REPO' ? <GitCommit size={16} /> : <FileText size={16} />}
                                 </div>
                                 <div className="flex-grow min-w-0">
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                                       <span className="text-[#00ff41]/50 text-[10px] font-mono border border-[#00ff41]/20 px-1">
                                          {item.date.toISOString().split('T')[0]}
                                       </span>
                                       <h4 className="text-white font-bold text-sm md:text-base truncate group-hover:text-[#00ff41] transition-colors">
                                          {item.title}
                                       </h4>
                                       {item.type === 'REPO' && (
                                          <span className="text-[10px] text-black bg-[#00ff41] px-1 rounded-[1px] font-bold w-fit">UPDATED</span>
                                       )}
                                       {item.type === 'POST' && (
                                          <span className="text-[10px] text-[#00ff41] border border-[#00ff41] px-1 rounded-[1px] font-bold w-fit">NEW POST</span>
                                       )}
                                    </div>
                                    <p className="text-[#00ff41]/70 text-xs mt-1 truncate font-mono">
                                       {item.description}
                                    </p>
                                 </div>
                                 {item.type === 'REPO' ? (
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#00ff41] opacity-50 hover:opacity-100 transition-opacity">
                                       <ExternalLink size={14} />
                                    </a>
                                 ) : (
                                    <button onClick={() => handleNavigation('feed')} className="text-[#00ff41] opacity-50 hover:opacity-100 transition-opacity">
                                       <ChevronRight size={14} />
                                    </button>
                                 )}
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen text-[#00ff41] selection:bg-[#00ff41] selection:text-black font-['VT323']">
      <MatrixBackground />
      
      <ScreenTransition isActive={isNavigating} />

      {/* Top Decor Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#00ff41] z-50 shadow-[0_0_10px_#00ff41]"></div>
      
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl relative z-10">
        
        {/* Header */}
        <header className="mb-12 border-2 border-[#00ff41] bg-black p-8 shadow-neon relative overflow-hidden flex flex-col md:flex-row justify-between items-end md:items-center">
          
          {/* Header Glitch Background Elements (Moved to Right Side) */}
          <div className="absolute top-0 right-0 p-2 text-xs text-[#00ff41]/30 font-mono hidden md:block z-20 text-right">
             SYSTEM_ID: M-SEC-01<br/>
             KERNEL: 5.14.0-kali
          </div>

          {/* 3D Cyber Grid Decoration (Right Side Only - approx 50%) */}
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full cyber-grid-container z-0 pointer-events-none">
              {/* Backlight Glow for Visibility - Centered on Right */}
              <div className="absolute top-1/2 right-0 w-3/4 h-3/4 bg-[#00ff41]/20 blur-[100px] rounded-full mix-blend-screen -translate-y-1/2 translate-x-1/4"></div>

              {/* Smoother Fade Gradient: Black (Left) -> Transparent (Right) to merge with main background */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
              
              {/* The Grid Animation */}
              <div className="cyber-grid-3d"></div>
              
              {/* Directional Glow: Right to Left (Replaces Bottom-Up) */}
              <div className="absolute inset-y-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#00ff41]/20 to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Left Content (Title) - High Z-index to sit above grid fade */}
          <div className="w-full relative z-20">
             <div className="text-xs md:text-sm text-[#00ff41] mb-1 tracking-[0.5em] uppercase animate-pulse">
               System Breach Detected...
             </div>
             {/* Massive Title with Heavy Glitch */}
             <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none text-white drop-shadow-[0_0_10px_rgba(0,255,65,0.8)] mb-2">
               MARLLON<br className="md:hidden" />
               {/* Added margin-left (md:ml-8) to separate text on desktop */}
               <span className="glitch-heavy text-[#00ff41] md:ml-8" data-text="DEVSEC">DEVSEC</span>
             </h1>
             
             <div className="h-2 w-32 bg-[#00ff41] mt-4 mb-4"></div>
             <p className="text-xl md:text-2xl text-[#00ff41] tracking-widest font-bold">
               [ CYBERSECURITY OPERATIVE ]
             </p>
          </div>

          {/* Right Content (Links) - High Z-index */}
          <div className="flex space-x-4 mt-8 md:mt-0 shrink-0 relative z-20">
            <a href="https://github.com/marllondevsec" target="_blank" rel="noopener noreferrer" className="group relative px-6 py-3 border-2 border-[#00ff41] bg-black hover:bg-[#00ff41] transition-colors overflow-hidden">
              <div className="relative z-10 flex items-center gap-2 group-hover:text-black font-bold text-lg">
                 <Github size={24} /> <span>GITHUB</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/marllondevsec/" target="_blank" rel="noopener noreferrer" className="group relative px-6 py-3 border-2 border-[#00ff41] bg-black hover:bg-[#00ff41] transition-colors overflow-hidden">
              <div className="relative z-10 flex items-center gap-2 group-hover:text-black font-bold text-lg">
                 <Linkedin size={24} /> <span>LINKEDIN</span>
              </div>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Navigation Sidebar */}
          <nav className="lg:col-span-1 space-y-4">
            <div className="bg-black/90 border-2 border-[#00ff41] shadow-neon p-1">
               <div className="bg-[#00ff41] text-black font-bold p-2 mb-2 flex justify-between items-center">
                 <span className="uppercase tracking-widest">MENU_v2.0</span>
                 <Hash size={16} />
               </div>
               <ul className="space-y-1 p-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.id as any)}
                      className={`w-full text-left px-4 py-3 font-bold uppercase tracking-wider flex justify-between items-center group transition-all duration-200 ${
                        activeSection === item.id 
                        ? 'bg-[#00ff41] text-black shadow-[0_0_10px_#00ff41]' 
                        : 'text-[#00ff41] hover:bg-[#00ff41]/20 border border-transparent hover:border-[#00ff41]'
                      }`}
                    >
                      <span>{`> ${item.label}`}</span>
                      {activeSection === item.id && <ChevronRight size={16} className="animate-pulse" />}
                    </button>
                  </li>
                ))}
               </ul>
            </div>
            
            {/* UPDATED SERVER STATS / VISITOR COUNTER */}
            <div className="bg-black/90 border border-[#00ff41] p-4 hidden lg:block text-[#00ff41] text-xs font-mono shadow-neon opacity-80 leading-relaxed">
                <div className="mb-3 border-b border-[#00ff41]/30 pb-1 font-bold tracking-widest">SERVER_STATS</div>
                
                <div className="flex justify-between">
                    <span>Visitors:</span>
                    <span>{visitCount.toString().padStart(9, '0')}</span>
                </div>
                
                <div className="flex justify-between">
                    <span>You are visitor:</span>
                    <span>#{visitCount}</span>
                </div>
                
                <div className="flex justify-between">
                    <span>Server time:</span>
                    <span>{timeString} GMT</span>
                </div>
                
                <div className="flex justify-between">
                    <span>Last modified:</span>
                    <span>{dateString}</span>
                </div>
                
                <div className="flex justify-between mt-2">
                    <span>{`> STATUS:`}</span>
                    <span className="text-[#00ff41] font-bold animate-pulse">ONLINE</span>
                </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="lg:col-span-3 min-h-[600px]">
            <TerminalWindow 
              title={activeSection === 'home' ? 'bash_terminal' : `executing_${activeSection}.exe`}
              className="h-auto"
            >
              <div key={activeSection} className="animate-fade-in h-full">
                {renderContent()}
              </div>
            </TerminalWindow>
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-[#00ff41] text-sm font-mono border-t border-[#00ff41] pt-6 bg-black/80 pb-6">
          <p className="tracking-[0.3em] font-bold">&copy; {new Date().getFullYear()} MARLLON_DEVSEC. SYSTEM SECURED.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
