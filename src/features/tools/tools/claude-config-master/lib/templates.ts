/**
 * 다운로드 가능한 템플릿 파일들
 */

export interface TemplateFile {
  filename: string;
  content: string;
  description: string;
}

export interface ConfigExample {
  id: string;
  title: string;
  description: string;
  code: string;
}

// .clauderc 템플릿
export const CLAUDERC_TEMPLATE = `{
  "model": "claude-sonnet-4.5",
  "temperature": 0.7,
  "maxTokens": 4096,
  "includePatterns": [
    "src/**/*.{ts,tsx,js,jsx}",
    "*.md",
    "package.json"
  ],
  "excludePatterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    ".next/**",
    "*.log"
  ]
}`;

// CLAUDE.md 템플릿
export const CLAUDE_MD_TEMPLATE = `# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**[Project Name]** is [brief description of what your project does].

## Key Commands

### Development
\`\`\`bash
npm run dev          # Start development server
npm run build        # Production build
npm run test         # Run tests
npm run lint         # Run linter
\`\`\`

## Architecture

### Project Structure
\`\`\`
src/
├── components/      # React components
├── lib/            # Utility functions
├── pages/          # Next.js pages (or routes/)
└── styles/         # CSS/styling files
\`\`\`

## Tech Stack Summary

- **Framework**: [e.g., Next.js 15, React, Vue]
- **Language**: [e.g., TypeScript]
- **Styling**: [e.g., Tailwind CSS]
- **State Management**: [e.g., Zustand, Redux]
- **Testing**: [e.g., Vitest, Jest]

## Important Patterns

### Coding Conventions
- Use TypeScript strict mode
- Follow ESLint rules configured in .eslintrc
- Write tests for new features
- Use meaningful variable names
- Prefer functional components and hooks

### Don'ts
- Don't commit directly to main branch
- Don't skip type checking
- Don't use \`any\` type unless absolutely necessary
- Don't commit without running tests

## Development Notes

- **Branch Strategy**: Feature branches → main
- **Commit Convention**: Conventional commits (feat:, fix:, docs:, chore:)
`;

// .claudeignore 템플릿
export const CLAUDEIGNORE_TEMPLATE = `# Dependencies
node_modules/
.pnp/
.pnp.js

# Build outputs
dist/
build/
.next/
out/
.vercel/

# Cache
.cache/
.turbo/
.eslintcache

# Environment
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Testing
coverage/
.nyc_output/

# Temporary files
*.tmp
*.temp
`;

// 템플릿 파일 객체
export const TEMPLATES: Record<string, TemplateFile> = {
  clauderc: {
    filename: '.clauderc',
    content: CLAUDERC_TEMPLATE,
    description: 'Claude Code 기본 설정 파일',
  },
  claudeMd: {
    filename: 'CLAUDE.md',
    content: CLAUDE_MD_TEMPLATE,
    description: 'Claude Code 프로젝트 가이드 문서',
  },
  claudeignore: {
    filename: '.claudeignore',
    content: CLAUDEIGNORE_TEMPLATE,
    description: 'Claude Code 제외 파일 패턴',
  },
};

// 5가지 설정 예제
export const CONFIG_EXAMPLES: ConfigExample[] = [
  {
    id: 'frontend',
    title: '프론트엔드 프로젝트용',
    description: 'React, Next.js, Vue 등 프론트엔드 프로젝트에 최적화된 설정입니다. UI 컴포넌트와 스타일 파일에 집중합니다.',
    code: `{
  "model": "claude-sonnet-4.5",
  "temperature": 0.7,
  "maxTokens": 4096,
  "includePatterns": [
    "src/**/*.{ts,tsx,js,jsx}",
    "components/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "pages/**/*.{ts,tsx}",
    "styles/**/*.{css,scss}",
    "*.config.{js,ts}",
    "package.json"
  ],
  "excludePatterns": [
    "node_modules/**",
    ".next/**",
    "dist/**",
    "build/**",
    "public/**",
    "*.test.{ts,tsx}",
    "*.spec.{ts,tsx}"
  ]
}`,
  },
  {
    id: 'backend',
    title: '백엔드 API 프로젝트용',
    description: 'Node.js, Express, Fastify 등 백엔드 API 프로젝트에 최적화된 설정입니다. 비즈니스 로직과 라우팅에 집중합니다.',
    code: `{
  "model": "claude-sonnet-4.5",
  "temperature": 0.7,
  "maxTokens": 4096,
  "includePatterns": [
    "src/**/*.{ts,js}",
    "routes/**/*.{ts,js}",
    "controllers/**/*.{ts,js}",
    "models/**/*.{ts,js}",
    "services/**/*.{ts,js}",
    "middleware/**/*.{ts,js}",
    "*.config.{js,ts}",
    "package.json"
  ],
  "excludePatterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    "logs/**",
    "*.log",
    "*.test.{ts,js}",
    "*.spec.{ts,js}"
  ]
}`,
  },
  {
    id: 'budget',
    title: '토큰 절약형 (저예산)',
    description: '토큰 사용량을 최소화하기 위해 엄격한 필터와 낮은 maxTokens를 사용합니다. 비용이 중요한 프로젝트에 적합합니다.',
    code: `{
  "model": "claude-haiku-4.5",
  "temperature": 0.5,
  "maxTokens": 2048,
  "includePatterns": [
    "src/**/*.{ts,tsx}",
    "package.json"
  ],
  "excludePatterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    ".next/**",
    "**/*.test.*",
    "**/*.spec.*",
    "**/*.stories.*",
    "*.config.*",
    "*.md",
    "public/**",
    "assets/**"
  ]
}`,
  },
  {
    id: 'performance',
    title: '성능 우선형 (고예산)',
    description: '최대한의 컨텍스트와 높은 토큰 제한으로 가장 정확한 답변을 얻습니다. 성능과 정확도가 중요한 프로젝트에 적합합니다.',
    code: `{
  "model": "claude-opus-4.5",
  "temperature": 0.8,
  "maxTokens": 8192,
  "includePatterns": [
    "src/**/*",
    "tests/**/*",
    "docs/**/*",
    "*.md",
    "*.json",
    "*.config.*"
  ],
  "excludePatterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    ".next/**",
    "*.log"
  ]
}`,
  },
  {
    id: 'vlog',
    title: 'Vlog 프로젝트 (실전 예제)',
    description: '현재 Vlog 프로젝트에 사용 중인 설정입니다. Feature-Sliced Design 구조의 Next.js 16 프로젝트에 최적화되어 있습니다.',
    code: `{
  "model": "claude-sonnet-4.5",
  "temperature": 0.7,
  "maxTokens": 4096,
  "includePatterns": [
    "src/**/*.{ts,tsx}",
    "src/features/tools/tools/**/tool.config.ts",
    "src/shared/ui/**/*.{ts,tsx}",
    "CLAUDE.md",
    "package.json",
    "tsconfig.json",
    "tailwind.config.ts"
  ],
  "excludePatterns": [
    "node_modules/**",
    ".next/**",
    "dist/**",
    "workthrough/**",
    "**/*.test.{ts,tsx}",
    "**/*.spec.{ts,tsx}",
    ".doc/**",
    "*.log"
  ]
}`,
  },
];
