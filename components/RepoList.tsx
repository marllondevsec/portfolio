import React, { useEffect, useState } from 'react';
import { fetchRepos } from '../services/githubService';
import { GitHubRepo } from '../types';

const RepoList: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      const data = await fetchRepos('marllondevsec');
      setRepos(data);
      setLoading(false);
    };
    loadRepos();
  }, []);

  if (loading) {
    return <div className="p-4 text-center animate-pulse text-hacker-neon text-xl">Scanning GitHub Database... [||||||    ]</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {repos.map((repo) => (
        <a 
            key={repo.id} 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group"
        >
            <div className="h-full border border-hacker-neon bg-black p-3 hover:bg-hacker-dim hover:border-hacker-red transition-all cursor-pointer relative overflow-hidden shadow-[0_0_5px_rgba(0,255,0,0.2)] hover:shadow-[0_0_15px_#FF0000]">
                <div className="absolute top-0 right-0 p-1">
                    <span className="text-[12px] text-hacker-neon border border-hacker-neon px-1 group-hover:border-hacker-red group-hover:text-hacker-red font-bold">{repo.language || 'N/A'}</span>
                </div>
                {/* Changed to vibrant red for links */}
                <h3 className="font-bold text-xl text-hacker-red group-hover:text-white mb-2 font-mono underline decoration-hacker-red/30">
                    ./{repo.name}
                </h3>
                <p className="text-sm text-hacker-neon/70 group-hover:text-hacker-neon mb-3 line-clamp-2">
                    {repo.description || "No description available in archives."}
                </p>
                <div className="flex justify-between items-center text-sm text-hacker-neon group-hover:text-white mt-auto font-bold">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>📅 {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
            </div>
        </a>
      ))}
    </div>
  );
};

export default RepoList;