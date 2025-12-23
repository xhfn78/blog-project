// src/features/tools/tools/code-lens/lib/dictionaries/markdown.ts
import { CodePattern } from '../types';

export const MARKDOWN_PATTERNS: CodePattern[] = [
  // =================================================================
  // [1] 제목 및 섹션 (Headings)
  // =================================================================
  {
    id: 'md-h1',
    regex: /^#\s+(.+)$/m,
    description: '대주제',
    template: '이 문서의 핵심 주제인 **"{0}"**을(를) 가장 큰 제목으로 명시했습니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'md-h2',
    regex: /^##\s+(.+)$/m,
    description: '소주제',
    template: '**"{0}"**이라는 제목으로 내용을 논리적으로 나누어 정리했습니다.',
    category: 'UI',
    importance: 'medium',
  },
  {
    id: 'md-h3',
    regex: /^###\s+(.+)$/m,
    description: '세부 제목',
    template: '더 구체적인 정보를 위해 **"{0}"**이라는 세부 섹션을 만들었습니다.',
    category: 'UI',
    importance: 'low',
  },

  // =================================================================
  // [2] 링크 및 미디어 (Media)
  // =================================================================
  {
    id: 'md-link',
    regex: /\*\[([^\]]+)\]\(([^)]+)\)/,
    description: '연결 링크',
    template: '**{0}** 문구를 클릭하면 **{1}** 주소로 이동하게 합니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'md-image',
    regex: /!\[([^\]]*)\]\(([^)]+)\)/,
    description: '그림/사진',
    template: '**{1}** 경로에 있는 사진을 문서에 삽입했습니다.',
    category: 'UI',
    importance: 'medium',
  },

  // =================================================================
  // [3] 목록 및 정리 (Lists)
  // =================================================================
  {
    id: 'md-list',
    regex: /^[\s]*[-*+]\s+(.+)$/m,
    description: '글머리 기호',
    template: '여러 정보를 한눈에 보기 좋게 **점(불렛 포인트)**으로 나열했습니다.',
    category: 'UI',
    importance: 'medium',
  },
  {
    id: 'md-ordered-list',
    regex: /^[\s]*\d+\.\s+(.+)$/m,
    description: '순서 목록',
    template: '**숫자를 매겨서** 순서대로 정보나 단계를 설명합니다.',
    category: 'UI',
    importance: 'medium',
  },
  {
    id: 'md-task-list',
    regex: /^[\s]*[-*+]\s+\[(x| )]\s+(.+)$/m,
    description: '체크리스트',
    template: '수행해야 할 **할 일 목록(체크박스)**이 포함되어 있습니다.',
    category: 'Logic',
    importance: 'high',
  },

  // =================================================================
  // [4] 코드 및 인용 (Formatting)
  // =================================================================
  {
    id: 'md-code-block',
    regex: /```(\w+)?/,
    description: '코드 예시',
    template: '직접 따라 해보거나 참고할 수 있는 **프로그래밍 코드 예시**를 담았습니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'md-table',
    regex: /\|(.+)\|/,
    description: '데이터 표',
    template: '비교나 정리가 필요한 정보를 **정갈한 표(Table)** 형태로 구성했습니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'md-quote',
    regex: /^>\s+(.+)$/m,
    description: '인용/강조',
    template: '중요한 참고 사항이나 **다른 곳에서 가져온 글귀**를 따로 표시했습니다.',
    category: 'UI',
    importance: 'low',
  },
  {
    id: 'md-frontmatter',
    regex: /^---\s*\n([\s\S]*?)\n---/,
    description: '문서 머리말',
    template: '문서의 **제목, 날짜, 태그 같은 요약 정보**를 맨 위에 정리해두었습니다.',
    category: 'Data',
    importance: 'high',
  }
];