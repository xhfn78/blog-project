import { ToolRegistration } from "@/shared/config/tools-registry";

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'tailwind-class-visualizer',
  name: 'Tailwind Class Visualizer - 실시간 CSS 분석 및 미리보기',
  description: 'Tailwind CSS 클래스가 실제 CSS 속성으로 어떻게 변환되는지 실시간으로 시각화합니다. 복잡한 유틸리티 클래스의 조합 결과를 미리 확인하고 학습할 수 있는 개발자 필수 도구입니다.',
  category: 'utility',
  tags: ['tailwind', 'css', 'visualizer', 'preview', 'learning', 'developer-tool'],
  author: 'V-Log Team',
};
