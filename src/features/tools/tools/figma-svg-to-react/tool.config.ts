import { ToolConfig } from "@/shared/config/tools-registry.types";

export const config: ToolConfig = {
  slug: 'figma-svg-to-react',
  name: 'Figma SVG to React 컴포넌트 변환기 - 피그마 디자인을 코드로 즉시 전환',
  description:
    '피그마(Figma)에서 복사한 SVG 소스 코드를 깨끗하고 재사용 가능한 React(JSX/TSX) 컴포넌트로 자동 변환해주는 프론트엔드 개발 도구입니다. ' +
    '단순한 코드 변환을 넘어 camelCase 속성 자동 전환, 불필요한 SVG 메타데이터 제거, TypeScript 타입 정의 생성을 동시에 처리하여 디자인 시스템 구축 시간을 70% 이상 단축시킵니다. ' +
    '디자이너가 내보낸 원본 SVG의 복잡한 구조를 정리하고, SVG 아이콘이나 일러스트를 Next.js 및 Vite 프로젝트에서 즉시 임포트하여 사용할 수 있는 클린 코드로 최적화합니다. ' +
    'currentColor 지원을 통한 유연한 색상 제어, 컴포넌트 이름 자동 추천, React Props 인터페이스 자동 생성 기능을 제공하며, 모든 변환 작업은 브라우저 로컬 환경에서 수행되어 외부 서버 전송 없이 보안을 유지합니다. ' +
    '프론트엔드 개발자와 UI 디자이너 간의 협업 효율을 극대화하고, 번거로운 수동 코드 수정 작업을 혁신적으로 줄여주는 필수 생산성 유틸리티입니다.',
  category: 'converter',
  tags: [
    'figma-to-react',
    'svg-to-jsx',
    'svg-to-tsx',
    'react-svg-component',
    'frontend-development',
    'design-system-tool',
    'svg-optimization',
    'typescript-svg'
  ],
  author: 'V-Log Team',
};
