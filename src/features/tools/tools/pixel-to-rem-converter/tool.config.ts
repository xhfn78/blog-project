import { ToolRegistration } from '@/shared/config/tools-registry';

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'pixel-to-rem-converter',
  name: 'PX to REM 변환기 - 반응형 웹 개발을 위한 필수 도구',
  description:
    '웹 개발자가 가장 빈번하게 사용하는 픽셀(PX) 단위를 상대 단위인 REM으로 즉시 변환해주는 필수 유틸리티 도구입니다. ' +
    '반응형 웹 디자인과 접근성 표준(WCAG)을 준수하기 위해 고정된 픽셀 대신 루트 글꼴 크기(Root Font Size)에 비례하는 REM 단위를 사용하는 것이 현대 웹 개발의 표준입니다. ' +
    '이 도구는 기본 픽셀 값(Base Size)을 사용자가 자유롭게 설정(예: 16px, 14px 등)할 수 있으며, 입력 즉시 변환된 REM 값을 실시간으로 제공합니다. ' +
    '반대로 REM 값을 PX로 역변환하는 양방향 계산 기능도 지원하며, Tailwind CSS 설정이나 Styled Components 작성 시 필요한 수치를 빠르게 확보하여 개발 생산성을 크게 향상시킵니다. ' +
    '별도의 설치 없이 브라우저에서 바로 실행되며, 디자이너와 프론트엔드 개발자 간의 소통 오류를 줄여주는 정확한 계산 결과를 보장합니다.',
  category: 'converter',
  tags: [
    'px-to-rem',
    'pixel-converter',
    'css-unit',
    'responsive-design',
    'web-accessibility',
    'frontend-tool',
    'rem-to-px'
  ],
  author: 'V-Blog Team',
};
