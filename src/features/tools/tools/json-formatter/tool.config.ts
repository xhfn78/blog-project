import { ToolRegistration } from "@/shared/config/tools-registry";

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'json-formatter',
  name: 'JSON 포맷터 & 검증기 - Prettier for JSON',
  description: '지저분한 JSON 데이터를 보기 좋게 정렬(Beautify)하고 문법 오류를 검증(Validate)합니다. 트리 뷰 시각화, 최소화(Minify), 파일 업로드 기능을 제공하는 개발자 필수 도구입니다.',
  category: 'formatter',
  tags: ['json', 'formatter', 'validator', 'beautifier', 'developer-tool', 'parser', 'json-viewer'],
  author: 'Dev Toolbox Team',
};