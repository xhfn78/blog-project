import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'color-palette-generator',
  name: 'Tailwind CSS 컬러 팔레트 생성기 - 11단계 스케일 자동 생성',
  description: '단 하나의 기준 색상(Base Color)으로 Tailwind CSS 표준인 50~950 단계의 완벽한 컬러 팔레트를 생성합니다. HSL 알고리즘 기반의 자연스러운 명도 조절을 지원하며, 다크 모드 UI 디자인에 최적화된 색상 코드를 즉시 복사하여 프로젝트에 적용할 수 있습니다. 디자이너와 프론트엔드 개발자를 위한 필수 생산성 도구입니다.',
  category: 'generator',
  tags: ['color', 'palette', 'generator', 'tailwind', 'css', 'design-system', 'ui', 'dark-mode'],
  author: 'Vlog Team',
};
