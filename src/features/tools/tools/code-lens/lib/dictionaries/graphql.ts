import { CodePattern } from '../types';

export const GRAPHQL_PATTERNS: CodePattern[] = [
  // [1] 기본 요청 타입 (Operations)
  { 
    id: 'gql-query', 
    regex: /\bquery\b/gi, 
    description: '데이터 조회 요청', 
    template: '**Query**: 서버에서 원하는 정보를 읽어오기 위한 요청입니다.', 
    analogy: '메뉴판을 보고 **"이 음식들 가져다주세요"**라고 주문하는 것과 같습니다.',
    category: 'Data', 
    importance: 'high' 
  },
  { 
    id: 'gql-mutation', 
    regex: /\bmutation\b/gi, 
    description: '데이터 변경 요청', 
    template: '**Mutation**: 서버의 정보를 **수정, 추가, 삭제**할 때 사용하는 요청입니다.', 
    analogy: '게시판에 **"새 글을 쓰거나 내용을 고치는 것"**과 같습니다.',
    category: 'Data', 
    importance: 'high' 
  },
  { id: 'gql-subscription', regex: /\bsubscription\b/gi, description: '실시간 구독 요청', template: '**Subscription**: 서버에 변화가 생겼을 때 **실시간으로 소식**을 받기 위한 통로입니다.', category: 'Async', importance: 'medium' },

  // [2] 쿼리 구성 요소 (Request Components)
  { 
    id: 'gql-fragment', 
    regex: /\bfragment\b/gi, 
    description: '필드 세트 재사용', 
    template: '**Fragment**: 자주 사용하는 필드 묶음을 이름 붙여서 이곳저곳에서 재사용합니다.', 
    analogy: '매번 긴 주소를 쓰지 않고 **"집 주소"**라고 한 번에 불러오는 것과 같습니다.',
    category: 'Structure', 
    importance: 'medium' 
  },
  { id: 'gql-variables', regex: /\$\w+/g, description: '쿼리 변수 사용', template: '**Variable**: 쿼리 내용에 매번 다른 값을 넣기 위해 사용하는 **입력 변수**입니다.', category: 'Logic', importance: 'medium' },
  { id: 'gql-arguments', regex: /\(\w+\s*:/g, description: '인자값 전달', template: '**Arguments**: 특정 데이터만 골라내거나 정렬하기 위해 전달하는 **상세 조건**입니다.', category: 'Logic', importance: 'high' },
  { id: 'gql-alias', regex: /\w+\s*:\s*\w+/g, description: '필드 별칭', template: '**Alias**: 서버에서 주는 필드 이름이 마음에 안 들 때 **나만의 이름으로 바꿔서** 받습니다.', category: 'Structure', importance: 'low' },

  // [3] 스키마 정의 (Schema & Types) - 고급
  { id: 'gql-type', regex: /\btype\s+\w+\s*{/gi, description: '객체 타입 정의', template: '**Type Definition**: 서버에서 제공하는 데이터가 어떤 모양인지 설계도를 그립니다.', category: 'TS', importance: 'high' },
  { id: 'gql-enum', regex: /\benum\s+\w+\s*{/gi, description: '열거형 정의', template: '**Enum**: 미리 정해진 몇 가지 선택지 중 하나만 고를 수 있게 제한합니다.', category: 'TS', importance: 'medium' },
  { id: 'gql-directive', regex: /@\w+/g, description: '쿼리 제어 지시어', template: '**Directive**: 특정 조건일 때만 필드를 포함하는 등 **쿼리의 동작을 직접 제어**합니다.', category: 'Advanced', importance: 'low' }
];
