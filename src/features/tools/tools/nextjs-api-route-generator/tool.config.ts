import { ToolRegistration } from '@/shared/config/tools-registry';

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'nextjs-api-route-generator',
  name: 'Next.js API Route 생성기 - App Router 대응 핸들러 자동 작성',
  description:
    'Next.js 14+ App Router 환경에 최적화된 API Route 핸들러 코드를 자동으로 생성해주는 생산성 도구입니다. ' +
    'GET, POST, PUT, DELETE 등 필요한 HTTP 메서드만 선택하면 표준화된 Request/Response 처리 로직이 포함된 TypeScript 코드를 즉시 만들어줍니다. ' +
    'Zod를 이용한 Request Body 검증, 에러 처리(try-catch) 블록, NextRequest/NextResponse 타입 정의가 기본으로 포함되어 있어 반복적인 보일러플레이트 작성 시간을 획기적으로 줄여줍니다. ' +
    '백엔드 로직을 빠르게 프로토타이핑하거나 일관된 코드 스타일을 유지하고 싶은 프론트엔드/풀스택 개발자에게 강력히 추천합니다. ' +
    '생성된 코드는 바로 복사하여 route.ts 파일에 붙여넣기만 하면 작동합니다.',
  category: 'generator',
  tags: [
    'nextjs',
    'api-route',
    'code-generator',
    'typescript',
    'app-router',
    'backend',
    'boilerplate',
    'zod-validation'
  ],
  author: 'V-Blog Team',
};
