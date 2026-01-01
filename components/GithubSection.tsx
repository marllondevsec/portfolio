import React, { useEffect, useState } from 'react';
import { Repo } from '../types';
import { Github, Star, GitBranch, ExternalLink } from 'lucide-react';

const GithubSection: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Changed per_page from 6 to 100 to fetch all repositories
        const response = await fetch('https://api.github.com/users/marllondevsec/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to access repository database');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError('Connection to GitHub mainframe refused.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center animate-pulse flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-t-[#00ff41] border-r-transparent border-b-[#00ff41] border-l-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-[#00ff41] font-bold text-xl tracking-widest">ESTABLISHING SECURE CONNECTION...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 border-2 border-red-500 bg-red-900/10">
        <div className="font-bold text-2xl mb-2">CRITICAL ERROR</div>
        {error}
        <br />
        <a href="https://github.com/marllondevsec" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-red-600 text-black font-bold px-4 py-2 hover:bg-red-500">
          [MANUAL OVERRIDE: VISIT GITHUB]
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {repos.map((repo) => (
        <a 
          key={repo.id} 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group h-full"
        >
          <div className="h-full border-2 border-[#00ff41]/50 bg-black p-5 transition-all duration-300 hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] hover:-translate-y-1 flex flex-col relative overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-[#00ff41] -translate-y-4 translate-x-4 rotate-45 group-hover:translate-y-[-10px] group-hover:translate-x-[10px] transition-transform"></div>

            <div className="flex items-start justify-between mb-3 border-b border-[#00ff41]/30 pb-2">
              <h4 className="text-xl font-bold text-[#00ff41] break-all group-hover:text-white transition-colors">
                {repo.name}
              </h4>
              <Github size={20} className="text-[#00ff41] opacity-70 group-hover:opacity-100" />
            </div>
            
            <p className="text-sm text-[#00ff41]/80 mb-6 flex-grow font-mono leading-relaxed">
              {repo.description || "No description provided."}
            </p>
            
            <div className="flex items-center justify-between text-xs text-[#00ff41] mt-auto font-bold">
              <div className="flex items-center space-x-4">
                  {repo.language && (
                    <div className="flex items-center">
                       <span className="w-2 h-2 bg-[#00ff41] mr-2 shadow-[0_0_5px_#00ff41]"></span>
                       {repo.language}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Star size={12} className="mr-1 fill-[#00ff41]/20" />
                    {repo.stargazers_count}
                  </div>
              </div>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default GithubSection;