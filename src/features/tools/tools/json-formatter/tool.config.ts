import { ToolRegistration } from '@/shared/config/tools-registry';

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'json-formatter',

  name: 'JSON 포맷터 - 압축 해제 및 구조 시각화 도구',

  description:
    'API 응답이나 설정 파일의 압축된 JSON 데이터를 읽기 쉽게 정리하고 구조를 시각화하는 개발 도구입니다. ' +
    '복잡한 JSON 객체의 중첩 구조를 한눈에 파악할 수 있도록 들여쓰기를 자동 조정하고, 문법 오류를 실시간으로 검증합니다. ' +
    '프론트엔드 및 백엔드 개발자가 API 디버깅, 설정 파일 관리, 데이터 구조 분석 작업을 수행할 때 필수적인 도구입니다. ' +
    '2-space, 4-space, Tab 등 다양한 들여쓰기 옵션을 지원하며, 압축(minify)과 정리(beautify) 모드를 즉시 전환할 수 있습니다. ' +
    '문법 하이라이팅을 통해 키(key), 값(value), 문자열, 숫자를 색상으로 구분하여 가독성을 극대화하고, ' +
    '잘못된 쉼표, 따옴표 누락 등의 일반적인 JSON 오류를 즉시 발견할 수 있습니다. ' +
    '브라우저 환경에서 완전히 동작하여 외부 서버로 민감한 데이터를 전송하지 않으므로 개인정보 보호가 보장됩니다.',

  category: 'formatter',

  tags: [
    'json-formatter',
    'json-beautifier',
    'api-debugging',
    'json-validation',
    'developer-tools',
    'syntax-highlighting',
    'json-viewer',
    'web-development',
  ],

  author: 'V-Blog Team',
};
