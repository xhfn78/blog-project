// src/features/tools/tools/code-lens/lib/dictionaries/sql.ts
import { CodePattern } from '../types';

export const SQL_PATTERNS: CodePattern[] = [
  // =================================================================
  // [1] 정보 찾아보기 (SELECT)
  // =================================================================
  {
    id: 'sql-select-all',
    regex: /SELECT\s+\*\s+FROM\s+(\w+)/i,
    description: '모두 가져오기',
    template: '**{0}** 창고(테이블)에 있는 **모든 데이터를 통째로** 가져옵니다.',
    category: 'Data',
    importance: 'high',
  },
  {
    id: 'sql-select-part',
    regex: /SELECT\s+([a-zA-Z0-9_,\s]+)\s+FROM\s+(\w+)/i,
    description: '골라서 가져오기',
    template: '**{1}** 창고에서 내가 필요한 **특정 항목({0})만** 쏙 골라냅니다.',
    category: 'Data',
    importance: 'high',
  },
  
  // =================================================================
  // [2] 조건 걸기 (Where & Order)
  // =================================================================
  {
    id: 'sql-where-search',
    regex: /WHERE\s+([a-zA-Z0-9_]+)\s*(=|LIKE|>|<|IN)/i,
    description: '맞춤 검색',
    template: '**{0}** 항목이 내가 말한 **조건에 딱 맞는 정보만 따로** 걸러냅니다.',
    category: 'Logic',
    importance: 'high',
  },
  {
    id: 'sql-order-rank',
    regex: /ORDER\s+BY\s+([a-zA-Z0-9_]+)/i,
    description: '줄 세우기',
    template: '**{0}** 항목을 기준으로 데이터를 **가지런히 정렬**합니다.',
    category: 'Logic',
    importance: 'medium',
  },

  // =================================================================
  // [3] 정보 넣고 고치기 (DML)
  // =================================================================
  {
    id: 'sql-insert-data',
    regex: /INSERT\s+INTO\s+(\w+)/i,
    description: '새 정보 추가',
    template: '**{0}** 창고에 **새로운 정보를 정식으로 등록**합니다.',
    category: 'Data',
    importance: 'high',
  },
  {
    id: 'sql-update-data',
    regex: /UPDATE\s+(\w+)\s+SET/i,
    description: '내용 고치기',
    template: '**{0}**에 이미 들어있는 정보를 **최신 내용으로 수정**합니다.',
    category: 'Data',
    importance: 'high',
  },
  {
    id: 'sql-delete-data',
    regex: /DELETE\s+FROM\s+(\w+)/i,
    description: '정보 삭제',
    template: '**{0}**에서 해당 정보를 **영구적으로 삭제**합니다 (주의!).',
    category: 'Data',
    importance: 'high',
  },

  // =================================================================
  // [4] 정보 창고 잇기 (JOIN)
  // =================================================================
  {
    id: 'sql-join-connect',
    regex: /JOIN\s+(\w+)/i,
    description: '창고 합치기',
    template: '서로 다른 **{0} 창고를 연결**해서 더 방대한 정보를 만듭니다.',
    category: 'Logic',
    importance: 'high',
  }
];
