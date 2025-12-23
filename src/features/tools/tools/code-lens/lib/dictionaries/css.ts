// src/features/tools/tools/code-lens/lib/dictionaries/css.ts
import { CodePattern } from '../types';
import { TAILWIND_DICTIONARY } from '../../../../tools/tailwind-class-visualizer/tailwind-dictionary';

// 1. 기존 CSS 패턴 (비개발자 친화적 설명)
const GENERIC_CSS_PATTERNS: CodePattern[] = [
  {
    id: 'layout-flex',
    regex: /display:\s*flex/,
    description: '나란히 배치',
    template: '내부 요소들을 **가로(혹은 세로)로 가지런히 정렬**합니다.',
    category: 'Style',
    importance: 'high',
  },
  {
    id: 'layout-grid',
    regex: /display:\s*grid/,
    description: '바둑판 배치',
    template: '화면을 **가로세로 격자 모양으로 나누어 체계적으로 배치**합니다.',
    category: 'Style',
    importance: 'high',
  },
  {
    id: 'spacing-gap',
    regex: /gap:\s*(\d+|[0-9.]+(px|rem|em|%))/,
    description: '사이 간격',
    template: '서로 너무 붙어 있지 않게 **아이템들 사이에 일정한 틈**을 줍니다.',
    category: 'Style',
    importance: 'medium',
  },
  {
    id: 'style-rounded',
    regex: /border-radius:\s*(\d+|[0-9.]+(px|rem|em|%))/,
    description: '부드러운 모서리',
    template: '상자의 뾰족한 **모서리를 둥글게 깎아 부드러운 인상**을 줍니다.',
    category: 'Style',
    importance: 'medium',
  },
  {
    id: 'style-shadow',
    regex: /box-shadow:\s*([^;]+)/,
    description: '그림자 효과',
    template: '바닥에서 둥둥 떠 있는 것처럼 보이게 **멋진 그림자**를 줍니다.',
    category: 'UI',
    importance: 'low',
  },
  {
    id: 'anim-keyframes',
    regex: /@keyframes\s+(\w+)/,
    description: '움직임 설계',
    template: '**\"{0}\"**이라는 이름의 **부드러운 애니메이션 동작**을 만듭니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'media-pc-only',
    regex: /@media\s*\(\s*min-width:\s*(\d+px)\s*\)/,
    description: '큰 화면 전용',
    template: '화면 너비가 **{0} 이상인 큰 기기(PC 등)**에서만 보이게 합니다.',
    category: 'Logic',
    importance: 'high',
  }
];

// 2. Tailwind CSS 패턴 (Human-Friendly)
const TAILWIND_PATTERNS: CodePattern[] = Object.entries(TAILWIND_DICTIONARY).map(([className, info]) => {
  const escapedClassName = className.replace(/-/g, '\\-').replace(/\//g, '\\/').replace(/\./g, '\\.');
  
  let friendlyDesc = info.description
    .replace('요소', '대상')
    .replace('설정합니다', '합니다')
    .replace('배치합니다', '나열합니다')
    .replace('여백', '공간')
    .replace('컨테이너', '박스');

  // 핵심 키워드 보강
  if (className === 'absolute') friendlyDesc = '주변과 상관없이 **내가 원하는 자리에 딱 붙박이로** 둡니다.';
  if (className === 'relative') friendlyDesc = '자식들이 길을 잃지 않게 **든든한 기준점 역할**을 합니다.';
  if (className === 'hidden') friendlyDesc = '화면에서 **잠시 모습을 감추어 보이지 않게** 합니다.';
  if (className.includes('w-full')) friendlyDesc = '가로 너비를 **꽉 채워서 시원하게** 보여줍니다.';
  if (className.includes('hover:')) friendlyDesc = '마우스를 **올렸을 때만 색깔이 변하게** 합니다.';

  return {
    id: `tw-${className}`,
    regex: new RegExp(`\\b${escapedClassName}\\b`),
    description: friendlyDesc,
    template: `**${className}**: ${friendlyDesc}`,
    category: 'Style',
    importance: 'medium',
  };
});

export const CSS_PATTERNS: CodePattern[] = [
  ...GENERIC_CSS_PATTERNS,
  ...TAILWIND_PATTERNS
];
