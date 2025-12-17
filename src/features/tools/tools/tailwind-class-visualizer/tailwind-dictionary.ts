// src/features/tools/tools/tailwind-class-visualizer/tailwind-dictionary.ts

export type TailwindClassCategory =
  | 'Layout'
  | 'Flexbox & Grid'
  | 'Spacing'
  | 'Sizing'
  | 'Typography'
  | 'Backgrounds'
  | 'Borders'
  | 'Effects'
  | 'Interactivity'
  | 'SVG'
  | 'Accessibility'
  | 'Custom or Other';

export type TailwindClassInfo = {
  category: TailwindClassCategory;
  description: string;
};

type TailwindDictionary = {
  [key: string]: TailwindClassInfo;
};

export const TAILWIND_DICTIONARY: TailwindDictionary = {
  // Layout
  'container': { category: 'Layout', description: '반응형 고정 폭 컨테이너.' },
  'block': { category: 'Layout', description: '블록 레벨 요소로 표시.' },
  'inline-block': { category: 'Layout', description: '인라인 레벨 블록 요소로 표시.' },
  'inline': { category: 'Layout', description: '인라인 레벨 요소로 표시.' },
  'flex': { category: 'Layout', description: '플렉스 컨테이너로 표시.' },
  'inline-flex': { category: 'Layout', description: '인라인 플렉스 컨테이너로 표시.' },
  'grid': { category: 'Layout', description: '그리드 컨테이너로 표시.' },
  'inline-grid': { category: 'Layout', description: '인라인 그리드 컨테이너로 표시.' },
  'hidden': { category: 'Layout', description: '요소를 숨깁니다 (`display: none`).' },
  'float-left': { category: 'Layout', description: '요소를 왼쪽에 부동 정렬.' },
  'float-right': { category: 'Layout', description: '요소를 오른쪽에 부동 정렬.' },
  'float-none': { category: 'Layout', description: '부동 정렬 제거.' },
  'clear-left': { category: 'Layout', description: '왼쪽 부동 요소 아래로 이동.' },
  'clear-right': { category: 'Layout', description: '오른쪽 부동 요소 아래로 이동.' },
  'clear-both': { category: 'Layout', description: '양쪽 부동 요소 아래로 이동.' },
  'clear-none': { category: 'Layout', description: 'clear 속성 제거.' },
  'z-0': { category: 'Layout', description: 'z-index: 0.' },
  'z-10': { category: 'Layout', description: 'z-index: 10.' },
  'z-20': { category: 'Layout', description: 'z-index: 20.' },
  'z-30': { category: 'Layout', description: 'z-index: 30.' },
  'z-40': { category: 'Layout', description: 'z-index: 40.' },
  'z-50': { category: 'Layout', description: 'z-index: 50.' },
  'z-auto': { category: 'Layout', description: 'z-index: auto.' },

  // Flexbox & Grid
  'flex-row': { category: 'Flexbox & Grid', description: '플렉스 아이템을 가로로 배치.' },
  'flex-col': { category: 'Flexbox & Grid', description: '플렉스 아이템을 세로로 배치.' },
  'flex-wrap': { category: 'Flexbox & Grid', description: '플렉스 아이템을 여러 줄로 감쌈.' },
  'flex-nowrap': { category: 'Flexbox & Grid', description: '플렉스 아이템을 한 줄로 유지.' },
  'justify-start': { category: 'Flexbox & Grid', description: '메인 축 시작점에 정렬.' },
  'justify-end': { category: 'Flexbox & Grid', description: '메인 축 끝점에 정렬.' },
  'justify-center': { category: 'Flexbox & Grid', description: '메인 축 중앙에 정렬.' },
  'justify-between': { category: 'Flexbox & Grid', description: '메인 축 양쪽 끝에 정렬 (균등 분배).' },
  'justify-around': { category: 'Flexbox & Grid', description: '메인 축 주변에 공간 분배.' },
  'justify-evenly': { category: 'Flexbox & Grid', description: '메인 축 주변에 균등하게 공간 분배.' },
  'items-start': { category: 'Flexbox & Grid', description: '교차 축 시작점에 정렬.' },
  'items-end': { category: 'Flexbox & Grid', description: '교차 축 끝점에 정렬.' },
  'items-center': { category: 'Flexbox & Grid', description: '교차 축 중앙에 정렬.' },
  'items-baseline': { category: 'Flexbox & Grid', description: '교차 축 baseline에 정렬.' },
  'items-stretch': { category: 'Flexbox & Grid', description: '교차 축을 채우도록 늘림.' },
  'gap-0': { category: 'Flexbox & Grid', description: '그리드/플렉스 아이템 간 간격 0.' },
  'gap-px': { category: 'Flexbox & Grid', description: '그리드/플렉스 아이템 간 간격 1px.' },
  'gap-x-4': { category: 'Flexbox & Grid', description: '가로 간격 1rem.' },
  'gap-y-4': { category: 'Flexbox & Grid', description: '세로 간격 1rem.' },
  'grid-cols-1': { category: 'Flexbox & Grid', description: '1개 열 그리드.' },
  'grid-cols-2': { category: 'Flexbox & Grid', description: '2개 열 그리드.' },
  'grid-cols-3': { category: 'Flexbox & Grid', description: '3개 열 그리드.' },
  'grid-rows-1': { category: 'Flexbox & Grid', description: '1개 행 그리드.' },
  'grid-rows-2': { category: 'Flexbox & Grid', description: '2개 행 그리드.' },

  // Spacing (Padding, Margin)
  'p-0': { category: 'Spacing', description: '모든 방향 패딩 0.' },
  'p-px': { category: 'Spacing', description: '모든 방향 패딩 1px.' },
  'p-1': { category: 'Spacing', description: '모든 방향 패딩 0.25rem.' },
  'pt-4': { category: 'Spacing', description: '상단 패딩 1rem.' },
  'pr-4': { category: 'Spacing', description: '오른쪽 패딩 1rem.' },
  'pb-4': { category: 'Spacing', description: '하단 패딩 1rem.' },
  'pl-4': { category: 'Spacing', description: '왼쪽 패딩 1rem.' },
  'px-4': { category: 'Spacing', description: '좌우 패딩 1rem.' },
  'py-4': { category: 'Spacing', description: '상하 패딩 1rem.' },
  'm-0': { category: 'Spacing', description: '모든 방향 마진 0.' },
  'm-px': { category: 'Spacing', description: '모든 방향 마진 1px.' },
  'm-1': { category: 'Spacing', description: '모든 방향 마진 0.25rem.' },
  'mt-4': { category: 'Spacing', description: '상단 마진 1rem.' },
  'mr-4': { category: 'Spacing', description: '오른쪽 마진 1rem.' },
  'mb-4': { category: 'Spacing', description: '하단 마진 1rem.' },
  'ml-4': { category: 'Spacing', description: '왼쪽 마진 1rem.' },
  'mx-4': { category: 'Spacing', description: '좌우 마진 1rem.' },
  'my-4': { category: 'Spacing', description: '상하 마진 1rem.' },
  'space-x-4 > * + *': { category: 'Spacing', description: '수평 자식 요소 간 간격 1rem.' },
  'space-y-4 > * + *': { category: 'Spacing', description: '수직 자식 요소 간 간격 1rem.' },

  // Sizing
  'w-full': { category: 'Sizing', description: '너비 100%.' },
  'h-full': { category: 'Sizing', description: '높이 100%.' },
  'w-px': { category: 'Sizing', description: '너비 1px.' },
  'h-px': { category: 'Sizing', description: '높이 1px.' },
  'min-h-screen': { category: 'Sizing', description: '최소 높이 화면 전체.' },
  'max-w-md': { category: 'Sizing', description: '최대 너비 medium.' },

  // Typography
  'font-sans': { category: 'Typography', description: 'sans-serif 폰트.' },
  'font-serif': { category: 'Typography', description: 'serif 폰트.' },
  'font-mono': { category: 'Typography', description: 'monospace 폰트.' },
  'text-sm': { category: 'Typography', description: '폰트 크기 small.' },
  'text-base': { category: 'Typography', description: '폰트 크기 base.' },
  'text-lg': { category: 'Typography', description: '폰트 크기 large.' },
  'text-xl': { category: 'Typography', description: '폰트 크기 extra large.' },
  'font-bold': { category: 'Typography', description: '글자 굵기 bold.' },
  'font-normal': { category: 'Typography', description: '글자 굵기 normal.' },
  'italic': { category: 'Typography', description: '이탤릭체.' },
  'not-italic': { category: 'Typography', description: '이탤릭체 해제.' },
  'text-left': { category: 'Typography', description: '텍스트 왼쪽 정렬.' },
  'text-center': { category: 'Typography', description: '텍스트 중앙 정렬.' },
  'text-right': { category: 'Typography', description: '텍스트 오른쪽 정렬.' },
  'text-justify': { category: 'Typography', description: '텍스트 양쪽 정렬.' },
  'underline': { category: 'Typography', description: '밑줄.' },
  'line-through': { category: 'Typography', description: '중앙선.' },
  'no-underline': { category: 'Typography', description: '밑줄 없음.' },
  'uppercase': { category: 'Typography', description: '모든 글자 대문자.' },
  'lowercase': { category: 'Typography', description: '모든 글자 소문자.' },
  'capitalize': { category: 'Typography', description: '각 단어 첫 글자 대문자.' },
  'normal-case': { category: 'Typography', description: '대소문자 변환 없음.' },
  'text-red-500': { category: 'Typography', description: '텍스트 색상 빨강 500.' },
  'text-blue-500': { category: 'Typography', description: '텍스트 색상 파랑 500.' },
  'text-green-500': { category: 'Typography', description: '텍스트 색상 초록 500.' },
  'text-gray-500': { category: 'Typography', description: '텍스트 색상 회색 500.' },
  'text-white': { category: 'Typography', description: '텍스트 색상 흰색.' },
  'text-black': { category: 'Typography', description: '텍스트 색상 검정.' },
  'leading-none': { category: 'Typography', description: '줄 간격 none.' },
  'leading-tight': { category: 'Typography', description: '줄 간격 tight.' },
  'leading-snug': { category: 'Typography', description: '줄 간격 snug.' },
  'leading-normal': { category: 'Typography', description: '줄 간격 normal.' },
  'leading-relaxed': { category: 'Typography', description: '줄 간격 relaxed.' },
  'leading-loose': { category: 'Typography', description: '줄 간격 loose.' },

  // Backgrounds
  'bg-white': { category: 'Backgrounds', description: '배경 흰색.' },
  'bg-black': { category: 'Backgrounds', description: '배경 검정.' },
  'bg-gray-100': { category: 'Backgrounds', description: '배경 회색 100.' },
  'bg-blue-500': { category: 'Backgrounds', description: '배경 파랑 500.' },
  'bg-red-500': { category: 'Backgrounds', description: '배경 빨강 500.' },
  'bg-green-500': { category: 'Backgrounds', description: '배경 초록 500.' },
  'bg-cover': { category: 'Backgrounds', description: '배경 이미지 커버.' },
  'bg-contain': { category: 'Backgrounds', description: '배경 이미지 포함.' },
  'bg-center': { category: 'Backgrounds', description: '배경 이미지 중앙.' },
  'bg-left': { category: 'Backgrounds', description: '배경 이미지 왼쪽.' },
  'bg-right': { category: 'Backgrounds', description: '배경 이미지 오른쪽.' },
  'bg-no-repeat': { category: 'Backgrounds', description: '배경 이미지 반복 없음.' },
  'bg-repeat': { category: 'Backgrounds', description: '배경 이미지 반복.' },

  // Borders
  'border': { category: 'Borders', description: '모든 면에 테두리.' },
  'border-t': { category: 'Borders', description: '상단 테두리.' },
  'border-b': { category: 'Borders', description: '하단 테두리.' },
  'border-l': { category: 'Borders', description: '왼쪽 테두리.' },
  'border-r': { category: 'Borders', description: '오른쪽 테두리.' },
  'border-0': { category: 'Borders', description: '테두리 없음.' },
  'border-2': { category: 'Borders', description: '테두리 두께 2px.' },
  'border-4': { category: 'Borders', description: '테두리 두께 4px.' },
  'border-8': { category: 'Borders', description: '테두리 두께 8px.' },
  'border-red-500': { category: 'Borders', description: '테두리 색상 빨강 500.' },
  'border-blue-500': { category: 'Borders', description: '테두리 색상 파랑 500.' },
  'rounded': { category: 'Borders', description: '둥근 모서리 (기본값).' },
  'rounded-md': { category: 'Borders', description: '둥근 모서리 medium.' },
  'rounded-lg': { category: 'Borders', description: '둥근 모서리 large.' },
  'rounded-full': { category: 'Borders', description: '완전 둥근 모서리.' },
  'rounded-none': { category: 'Borders', description: '둥근 모서리 없음.' },

  // Effects
  'shadow': { category: 'Effects', description: '작은 그림자.' },
  'shadow-md': { category: 'Effects', description: '중간 그림자.' },
  'shadow-lg': { category: 'Effects', description: '큰 그림자.' },
  'shadow-xl': { category: 'Effects', description: '매우 큰 그림자.' },
  'shadow-none': { category: 'Effects', description: '그림자 없음.' },
  'opacity-0': { category: 'Effects', description: '투명도 0%.' },
  'opacity-25': { category: 'Effects', description: '투명도 25%.' },
  'opacity-50': { category: 'Effects', description: '투명도 50%.' },
  'opacity-75': { category: 'Effects', description: '투명도 75%.' },
  'opacity-100': { category: 'Effects', description: '투명도 100%.' },

  // Interactivity
  'cursor-pointer': { category: 'Interactivity', description: '커서 포인터.' },
  'pointer-events-none': { category: 'Interactivity', description: '포인터 이벤트 무시.' },
  'pointer-events-auto': { category: 'Interactivity', description: '포인터 이벤트 허용.' },
  'select-none': { category: 'Interactivity', description: '텍스트 선택 불가.' },
  'select-text': { category: 'Interactivity', description: '텍스트 선택 가능.' },
  'resize': { category: 'Interactivity', description: '양방향 크기 조절.' },
  'resize-x': { category: 'Interactivity', description: '가로 크기 조절.' },
  'resize-y': { category: 'Interactivity', description: '세로 크기 조절.' },
  'resize-none': { category: 'Interactivity', description: '크기 조절 불가.' },
  'outline-none': { category: 'Interactivity', description: '포커스 아웃라인 없음.' },
  'outline': { category: 'Interactivity', description: '포커스 아웃라인.' },

  // Transforms
  'rotate-0': { category: 'Effects', description: '회전 0도.' },
  'rotate-45': { category: 'Effects', description: '회전 45도.' },
  'scale-0': { category: 'Effects', description: '크기 0%.' },
  'scale-100': { category: 'Effects', description: '크기 100%.' },
  'translate-x-full': { category: 'Effects', description: 'X축으로 100% 이동.' },
};
