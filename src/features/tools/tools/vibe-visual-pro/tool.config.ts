import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'vibe-visual-pro', // IMPORTANT: MUST BE UNIQUE
  name: 'VibeVisual PRO (텍스트 인포그래픽 제작 도구) - 실시간 시각화 엔진',
  description: '텍스트를 실시간으로 고품질 인포그래픽 이미지로 변환하세요. HTML5 Canvas 기반의 강력한 렌더링과 서버리스(Zero-Cost) 공유 기능을 통해 아이디어를 시각화하고 즉시 공유할 수 있습니다.',
  category: 'generator', // 'converter', 'generator', 'formatter', or 'utility'
  tags: ['infographic-generator', 'visual-communication', 'text-to-image', 'canvas-api', 'serverless-share', 'design-automation'],
  author: 'Dev Toolbox Team',
};