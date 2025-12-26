export type CardTheme = 'modern' | 'glassmorphism' | 'cyberpunk' | 'minimal';

export interface GitHubStats {
  username: string;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  contributions: number[]; // 최근 7일 기여도 데이터 예시
}

export interface ProfileCardOptions {
  theme: CardTheme;
  showStats: boolean;
  showLanguageGraph: boolean;
  colorScheme: string;
  borderRadius: number;
}

export interface ProfileCardState extends ProfileCardOptions {
  stats: GitHubStats;
  isLoading: boolean;
  error: string | null;
}
