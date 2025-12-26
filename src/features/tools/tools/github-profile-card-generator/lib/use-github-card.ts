import { useState, useCallback, useMemo } from 'react';
import { ProfileCardOptions, GitHubStats } from '../model/types';

export function useGitHubCard() {
  const [username, setUsername] = useState('');
  const [options, setOptions] = useState<ProfileCardOptions>({
    theme: 'modern',
    showStats: true,
    showLanguageGraph: true,
    colorScheme: '#6366f1',
    borderRadius: 24,
  });

  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMockStats = useCallback((name: string) => {
    if (!name) return;
    setIsLoading(true);
    setTimeout(() => {
      setStats({
        username: name,
        totalStars: Math.floor(Math.random() * 850),
        totalCommits: Math.floor(Math.random() * 3200),
        totalPRs: Math.floor(Math.random() * 120),
        totalIssues: Math.floor(Math.random() * 45),
        contributions: Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)),
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateOption = useCallback(<K extends keyof ProfileCardOptions>(key: K, value: ProfileCardOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  }, []);

  const generatedSVG = useMemo(() => {
    if (!stats) return '';
    const { totalStars, totalCommits, totalPRs, username } = stats;
    // 실제 고품질 SVG 구조 (단순화된 예시)
    return `<svg width="450" height="220" viewBox="0 0 450 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="450" height="220" rx="${options.borderRadius}" fill="#0F172A" stroke="${options.colorScheme}" stroke-width="2"/>
      <text x="30" y="50" fill="white" font-family="Arial" font-weight="bold" font-size="20">@${username}</text>
      <text x="30" y="90" fill="white" opacity="0.7" font-size="14">Stars: ${totalStars}</text>
      <text x="30" y="120" fill="white" opacity="0.7" font-size="14">Commits: ${totalCommits}</text>
      <text x="30" y="150" fill="white" opacity="0.7" font-size="14">PRs: ${totalPRs}</text>
      <circle cx="380" cy="60" r="40" fill="${options.colorScheme}" fill-opacity="0.2"/>
      <text x="380" y="65" text-anchor="middle" fill="white" font-weight="bold" font-size="24">${username[0].toUpperCase()}</text>
    </svg>`;
  }, [stats, options]);

  return {
    username,
    setUsername,
    options,
    stats,
    isLoading,
    fetchMockStats,
    updateOption,
    generatedSVG
  };
}