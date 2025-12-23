import { ToolRegistration } from '@/shared/config/tools-registry.types';

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'json-to-ts',
  name: 'JSON to TypeScript 변환기 - Interface 및 Zod 스키마 자동 생성 도구',
  description: 'JSON 데이터를 TypeScript 인터페이스나 타입 정의로 즉시 변환하세요. 복잡한 API 응답을 위한 Zod 스키마 생성 기능을 지원하여 프론트엔드 개발 생산성과 데이터 안정성을 극대화하는 필수 도구입니다. 실시간 변환과 다양한 옵션을 제공합니다.',
  category: 'converter',
  tags: ['json', 'typescript', 'interface', 'zod', 'schema-generator', 'frontend-tools'],
  author: 'Vlog Team',
};
