import { GitHubRepo } from '../types';

export const fetchRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    const data = await response.json();
    return data as GitHubRepo[];
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
};

export const fetchProfileImage = async (username: string): Promise<string> => {
    return `https://github.com/${username}.png`;
}