import { GitHubRepo } from '../types';

const USERNAME = 'marllondevsec';

export const fetchRepositories = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&direction=desc`);
    
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const data: GitHubRepo[] = await response.json();
    // Filter out forks if desired, currently returning all
    return data;
  } catch (error) {
    console.error("Failed to fetch repositories", error);
    return [];
  }
};
