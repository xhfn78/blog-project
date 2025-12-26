import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'json-to-table',
  name: 'JSON 테이블 변환기 - 자동 마스킹 및 엑셀 내보내기',
  description: '복잡한 중첩 JSON 데이터를 엑셀처럼 편집 가능한 테이블로 즉시 변환하세요. 개인정보 자동 마스킹, 대용량 데이터 처리, 안전한 CSV/Excel 내보내기를 지원합니다. 개발자와 데이터 분석가를 위한 최고의 JSON 시각화 및 편집 도구입니다.',
  category: 'converter',
  tags: ['json', 'table', 'converter', 'excel', 'csv', 'security', 'masking', 'developer-tool', 'data-visualization'],
  author: 'Vlog Team',
};
