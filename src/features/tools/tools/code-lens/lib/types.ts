// src/features/tools/tools/code-lens/lib/types.ts

export type Language = 'html' | 'css' | 'javascript' | 'typescript' | 'json' | 'sql' | 'markdown' | 'yaml' | 'graphql' | 'unknown';

export interface CodePattern {
  id: string;
  regex: RegExp;
  description: string;
  template?: string; 
  category: 'Structure' | 'Logic' | 'Style' | 'Type' | 'Data' | 'Async' | 'UI' | 'Unknown';
  importance: 'high' | 'medium' | 'low';
}

export interface AnalysisResult {
  language: Language;
  title: string;
  sections: {
    title: string;
    content: string[];
  }[];
  keywords: string[];
}