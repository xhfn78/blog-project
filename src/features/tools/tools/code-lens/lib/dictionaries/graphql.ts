// src/features/tools/tools/code-lens/lib/dictionaries/graphql.ts
import { CodePattern } from '../types';

export const GRAPHQL_PATTERNS: CodePattern[] = [
  // =================================================================
  // [1] 데이터 요청 및 변경 (Operations)
  // =================================================================
  {
    id: 'gql-query',
    regex: /query\s+(\w+)?/,
    description: '정보 읽기',
    template: '서버에게 내가 궁금한 정보를 **조회(Query)**해달라고 요청합니다.',
    category: 'Async',
    importance: 'high',
  },
  {
    id: 'gql-mutation',
    regex: /mutation\s+(\w+)?/,
    description: '정보 쓰기/고치기',
    template: '서버에 있는 정보를 **새로 만들거나 바꾸는(Mutation)** 요청을 보냅니다.',
    category: 'Async',
    importance: 'high',
  },
  {
    id: 'gql-subscription',
    regex: /subscription\s+(\w+)?/,
    description: '실시간 소식 듣기',
    template: '서버와 항상 연결된 채로 **새로운 소식을 실시간**으로 받아봅니다.',
    category: 'Async',
    importance: 'high',
  },

  // =================================================================
  // [2] 스키마 및 타입 정의 (Definition)
  // =================================================================
  {
    id: 'gql-type-def',
    regex: /type\s+(\w+)\s*(?:implements\s+\w+)?\s*{/,
    description: '데이터 설계도',
    template: '**{0}**이라는 데이터가 **어떻게 생겼는지 그 구조**를 정의합니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'gql-input-def',
    regex: /input\s+(\w+)\s*{/,
    description: '입력 양식 설계도',
    template: '사용자가 서버로 보낼 **데이터 꾸러미({0})의 모양**을 미리 정해둡니다.',
    category: 'Structure',
    importance: 'medium',
  },
  {
    id: 'gql-enum-def',
    regex: /enum\s+(\w+)\s*{/,
    description: '선택지 목록',
    template: '**{0}** 항목에서 **고를 수 있는 몇 가지 선택지들**을 나열합니다.',
    category: 'Data',
    importance: 'low',
  },
  {
    id: 'gql-interface-union',
    regex: /(interface|union)\s+(\w+)/,
    description: '공통/복합 타입',
    template: '여러 데이터가 **공통으로 가지는 특징이나 복합적인 관계**를 설정합니다.',
    category: 'Structure',
    importance: 'medium',
  },

  // =================================================================
  // [3] 필드 및 지시어 (Advanced)
  // =================================================================
  {
    id: 'gql-fragment',
    regex: /fragment\s+(\w+)\s+on\s+(\w+)/,
    description: '정보 조각 재사용',
    template: '**{1}** 정보 중에서 자주 쓰는 것들을 **"{0}" 조각**으로 묶어 다시 씁니다.',
    category: 'Structure',
    importance: 'medium',
  },
  {
    id: 'gql-variables',
    regex: /\$(\w+):\s*(\w+)!?/,
    description: '가변 데이터(변수)',
    template: '고정된 값이 아닌, **상황에 따라 바뀔 수 있는 정보 주머니({0})**를 사용합니다.',
    category: 'Data',
    importance: 'medium',
  },
  {
    id: 'gql-directive',
    regex: /@(\w+)/,
    description: '특수 명령(지시어)',
    template: '**@{0}** 명령을 내려서 데이터를 가져오는 방식에 특별한 규칙을 줍니다.',
    category: 'Logic',
    importance: 'low',
  }
];
