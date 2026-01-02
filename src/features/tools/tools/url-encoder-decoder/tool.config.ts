import { ToolRegistration } from '@/shared/config/tools-registry';

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'url-encoder-decoder',
  name: 'URL 인코더/디코더 - 특수문자 깨짐 방지 및 파라미터 변환',
  description:
    '웹 개발 및 디버깅 과정에서 필수적인 URL 인코딩(Percent Encoding)과 디코딩을 실시간으로 수행하는 무료 온라인 도구입니다. ' +
    '한글, 공백, 특수문자가 포함된 URL 파라미터를 안전하게 전송하기 위해 인코딩하거나, 로그에서 추출한 난독화된 URL을 원래 형태로 복원할 때 유용합니다. ' +
    'encodeURIComponent와 encodeURI의 차이를 명확히 구분하여 처리할 수 있으며, 깨진 한글 파라미터를 즉시 복구하여 가독성을 높여줍니다. ' +
    'API 테스트, 쿼리 스트링 분석, 데이터 마이그레이션 작업 시 발생할 수 있는 인코딩 오류를 사전에 방지하세요. ' +
    '모든 데이터는 서버로 전송되지 않고 브라우저 내에서 안전하게 처리됩니다.',
  category: 'utility',
  tags: [
    'url-encoder',
    'url-decoder',
    'percent-encoding',
    'query-string',
    'utf-8',
    'developer-utility',
    'debug-tool',
    'uri-component'
  ],
  author: 'V-Blog Team',
};
