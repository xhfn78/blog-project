import { ToolRegistration } from "@/shared/config/tools-registry";

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'code-snapshot',
  name: '코드 스냅샷 생성기 - 소셜 미디어용 이미지 제작 도구',
  description:
    '개발자를 위한 강력한 코드 스냅샷 생성기. 코드를 아름다운 이미지로 변환하여 블로그, 트위터, 깃허브에 공유하고, 프로젝트의 가독성을 높여보세요. 다양한 테마, 언어 하이라이팅, 윈도우 스타일을 지원합니다. 생산성을 극대화하세요!',
  category: 'generator',
  tags: ['code', 'screenshot', 'image', 'social-media', 'syntax-highlight', 'github', 'twitter'],
  author: '바이브코딩 팀',
};