import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'markdown-editor',
  name: 'Markdown 에디터 - 실시간 미리보기 및 HTML 변환',
  description: '개발자, 테크니컬 라이터, 블로거를 위한 강력한 웹 기반 Markdown 에디터입니다. 설치 없이 브라우저에서 바로 사용 가능한 이 도구는 실시간 HTML 미리보기, GFM(GitHub Flavored Markdown) 완벽 지원, 코드 블록 구문 강조(Syntax Highlighting), 그리고 파일 가져오기/내보내기 기능을 제공합니다. 작성한 문서는 로컬 스토리지에 자동 저장되어 데이터 손실 걱정 없이 안전하게 작업할 수 있으며, 클릭 한 번으로 HTML 코드를 복사하여 블로그나 CMS에 바로 붙여넣을 수 있습니다. 다크 모드 지원으로 장시간 작업에도 눈이 편안합니다.',
  category: 'formatter',
  tags: ['markdown', 'editor', 'html', 'preview', 'converter', 'developer', 'writing', 'gfm', 'syntax-highlighting'],
  author: 'Dev Toolbox Team',
};