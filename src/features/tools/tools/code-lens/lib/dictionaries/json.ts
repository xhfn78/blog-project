// src/features/tools/tools/code-lens/lib/dictionaries/json.ts
import { CodePattern } from '../types';

export const JSON_PATTERNS: CodePattern[] = [
  // =================================================================
  // [1] npm 설정 (package.json)
  // =================================================================
  {
    id: 'npm-scripts',
    regex: /"scripts"\s*:\s*{/,
    description: '명령어 가이드',
    template: '터미널에서 바로 실행할 수 있는 **프로젝트 전용 명령어들(빌드, 실행 등)**입니다.',
    category: 'Logic',
    importance: 'high',
  },
  {
    id: 'npm-deps',
    regex: /"dependencies"\s*:\s*{/,
    description: '필수 도구함',
    template: '이 프로젝트를 실행하기 위해 **반드시 필요한 외부 소프트웨어 목록**입니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'npm-author',
    regex: /"author"\s*:\s*"([^"]+)"/,
    description: '만든 사람',
    template: '이 멋진 프로그램을 만든 **제작자({0})**의 정보입니다.',
    category: 'Data',
    importance: 'low',
  },

  // =================================================================
  // [2] TypeScript 설정 (tsconfig.json)
  // =================================================================
  {
    id: 'ts-compiler',
    regex: /"compilerOptions"\s*:\s*{/,
    description: '번역 세부 규칙',
    template: '컴퓨터가 코드를 읽기 좋게 **번역할 때 지켜야 할 옵션들**을 정해두었습니다.',
    category: 'Logic',
    importance: 'high',
  },
  {
    id: 'ts-strict-check',
    regex: /"strict"\s*:\s*true/,
    description: '깐깐한 검사',
    template: '작은 실수도 용납하지 않도록 **매우 정밀한 문법 검사 기능을 켰습니다.**',
    category: 'Logic',
    importance: 'high',
  },

  // =================================================================
  // [3] 일반 데이터 정보 (API Responses)
  // =================================================================
  {
    id: 'json-id',
    regex: /"id"\s*:\s*([^,}]+)/,
    description: '고유 번호',
    template: '정보가 겹치지 않게 **하나뿐인 번호표({0})**를 붙여 관리합니다.',
    category: 'Data',
    importance: 'low',
  },
  {
    id: 'json-user-info',
    regex: /"name"|"email"|"phone"/,
    description: '개인 신상 정보',
    template: '사용자의 **이름이나 연락처 같은 소중한 정보**를 담고 있습니다.',
    category: 'Data',
    importance: 'medium',
  },
  {
    id: 'json-status-ok',
    regex: /"success"\s*:\s*true|"status"\s*:\s*200/,
    description: '성공 알림',
    template: '작업이 **아무런 문제 없이 아주 잘 끝났음**을 알려줍니다.',
    category: 'Data',
    importance: 'high',
  },
  {
    id: 'json-list-data',
    regex: /"(\w+)"\s*:\s*\[/,
    description: '데이터 목록',
    template: '**{0}** 항목에 여러 정보를 **순서대로 쭉 나열한 리스트**를 보관합니다.',
    category: 'Data',
    importance: 'medium',
  }
];
