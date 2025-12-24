import { CodePattern } from '../types';

export const SQL_PATTERNS: CodePattern[] = [
  // [1] 기본 데이터 조회 (Basic Retrieval)
  { 
    id: 'sql-select', 
    regex: /\bSELECT\b/gi, 
    description: '데이터 조회', 
    template: '**SELECT**: 테이블에서 원하는 정보를 꺼내옵니다.', 
    analogy: '거대한 도서관 서가에서 **"내가 찾는 책"**을 꺼내오는 것과 같습니다.',
    category: 'Data', 
    importance: 'high' 
  },
  { id: 'sql-from', regex: /\bFROM\b/gi, description: '조회 대상 테이블', template: '**FROM**: 데이터를 어디서 가져올지 원천 테이블을 지정합니다.', category: 'Data', importance: 'high' },
  { 
    id: 'sql-where', 
    regex: /\bWHERE\b/gi, 
    description: '조건 필터링', 
    template: '**WHERE**: 특정 조건에 맞는 데이터만 골라냅니다.', 
    analogy: '수많은 책 중에서 **"제목에 특정 단어가 들어간 것만"** 골라내는 필터와 같습니다.',
    category: 'Logic', 
    importance: 'high' 
  },
  { id: 'sql-distinct', regex: /\bDISTINCT\b/gi, description: '중복 제거', template: '**DISTINCT**: 결과물에서 중복된 값을 하나만 남기고 제거합니다.', category: 'Data', importance: 'medium' },

  // [2] 테이블 결합 (Joins) - 핵심 아키텍처
  { 
    id: 'sql-join', 
    regex: /\b(INNER\s+)?JOIN\b/gi, 
    description: '테이블 결합', 
    template: '**JOIN**: 두 개 이상의 테이블을 하나로 합쳐 풍부한 정보를 만듭니다.', 
    analogy: '서로 다른 두 조각의 **"퍼즐"**을 맞춰 하나의 완성된 그림을 만드는 것과 같습니다.',
    category: 'Structure', 
    importance: 'high',
    tips: ['조인 조건(ON)이 정확하지 않으면 엉뚱한 데이터가 섞일 수 있으니 주의하세요.']
  },
  { id: 'sql-left-join', regex: /\bLEFT\s+JOIN\b/gi, description: '왼쪽 기준 결합', template: '**LEFT JOIN**: 왼쪽 테이블의 모든 데이터를 유지하면서 오른쪽 데이터를 붙입니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-right-join', regex: /\bRIGHT\s+JOIN\b/gi, description: '오른쪽 기준 결합', template: '**RIGHT JOIN**: 오른쪽 테이블의 모든 데이터를 유지하며 결합합니다.', category: 'Structure', importance: 'medium' },

  // [3] 정렬 및 그룹화 (Sorting & Grouping)
  { id: 'sql-order-by', regex: /\bORDER\s+BY\b/gi, description: '결과 정렬', template: '**ORDER BY**: 데이터를 가나다순이나 숫자 크기순으로 정렬합니다.', category: 'Logic', importance: 'medium' },
  { 
    id: 'sql-group-by', 
    regex: /\bGROUP\s+BY\b/gi, 
    description: '데이터 그룹화', 
    template: '**GROUP BY**: 같은 값을 가진 데이터를 그룹으로 묶어 통계를 냅니다.', 
    analogy: '수많은 과일을 **"사과, 포도, 수박"**끼리 한 바구니에 모으는 것과 같습니다.',
    category: 'Data', 
    importance: 'high' 
  },
  { id: 'sql-having', regex: /\bHAVING\b/gi, description: '그룹 필터링', template: '**HAVING**: 그룹화된 결과물에 대해 추가 조건을 적용합니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-aggregate', regex: /\b(COUNT|SUM|AVG|MIN|MAX)\b/gi, description: '통계 함수', template: '**Aggregates**: 개수, 합계, 평균 등 데이터의 집계치를 계산합니다.', category: 'Data', importance: 'high' },

  // [4] 데이터 변경 (DML)
  { id: 'sql-insert', regex: /\bINSERT\s+INTO\b/gi, description: '데이터 삽입', template: '**INSERT**: 테이블에 새로운 정보를 추가합니다.', category: 'Data', importance: 'high' },
  { id: 'sql-update', regex: /\bUPDATE\b/gi, description: '데이터 수정', template: '**UPDATE**: 기존에 들어있는 정보를 새로운 값으로 바꿉니다.', category: 'Data', importance: 'high', warnings: ['WHERE 절을 빠뜨리면 테이블의 모든 데이터가 한꺼번에 바뀔 수 있으니 매우 위험합니다!'] },
  { id: 'sql-delete', regex: /\bDELETE\b/gi, description: '데이터 삭제', template: '**DELETE**: 테이블에서 불필요한 정보를 영구히 제거합니다.', category: 'Data', importance: 'high', warnings: ['삭제 전에는 반드시 SELECT로 대상 데이터를 먼저 확인하는 습관이 중요합니다.'] },

  // [5] 성능 및 최적화 (Optimization) - 고급
  { 
    id: 'sql-index', 
    regex: /\bCREATE\s+INDEX\b/gi, 
    description: '인덱스 생성', 
    template: '**INDEX**: 데이터 검색 속도를 수십 배 빠르게 만드는 색인을 만듭니다.', 
    analogy: '두꺼운 책 맨 뒤의 **"찾아보기"** 페이지를 만드는 것과 같아서, 원하는 내용을 순식간에 찾게 해줍니다.',
    category: 'Advanced', 
    importance: 'high' 
  },
  { id: 'sql-explain', regex: /\bEXPLAIN\b/gi, description: '실행 계획 분석', template: '**EXPLAIN**: 데이터베이스가 쿼리를 어떻게 처리할지 내부 전략을 미리 보여줍니다.', category: 'Advanced', importance: 'medium' },
  { 
    id: 'sql-transaction', 
    regex: /\b(BEGIN|COMMIT|ROLLBACK)\b/gi, 
    description: '트랜잭션 제어', 
    template: '**Transaction**: 여러 작업을 하나로 묶어 모두 성공하거나 모두 취소되도록 관리합니다.', 
    analogy: '은행 이체처럼 **"내 통장에서 돈이 빠지고 상대 통장에 들어가기까지"**의 과정이 한 몸처럼 움직이게 보장합니다.',
    category: 'Advanced', 
    importance: 'high' 
  },

  // [6] 서브쿼리 및 고급 문법
  { id: 'sql-subquery', regex: /\(\s*SELECT\b/gi, description: '서브쿼리', template: '**Subquery**: 쿼리 안에 또 다른 쿼리를 넣어 복잡한 조건을 처리합니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-case', regex: /\bCASE\s+WHEN\b/gi, description: '조건 분기(SQL)', template: '**CASE**: SQL 내부에서 if-else처럼 조건에 따라 다른 값을 출력합니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-cte', regex: /\bWITH\s+\w+\s+AS\b/gi, description: '임시 결과 집합(CTE)', template: '**WITH (CTE)**: 복잡한 쿼리를 가독성 좋게 임시 테이블처럼 정의하여 사용합니다.', category: 'Advanced', importance: 'high' },

  // [7] Window Functions (윈도우 함수) - 분석의 핵심
  {
    id: 'sql-row-number',
    regex: /\bROW_NUMBER\s*\(\)/gi,
    description: '행 번호 부여',
    template: '**ROW_NUMBER()**: 각 행에 순차적인 번호를 매깁니다.',
    analogy: '마라톤 참가자들에게 **"1등, 2등, 3등"** 순서대로 번호를 붙이는 것과 같습니다.',
    category: 'Advanced',
    importance: 'high',
    tips: ['PARTITION BY와 함께 사용하면 그룹별로 번호를 새로 시작할 수 있습니다.']
  },
  { id: 'sql-rank', regex: /\bRANK\s*\(\)/gi, description: '순위 부여 (동점 허용)', template: '**RANK()**: 순위를 매기되, 동점이 있으면 다음 순위를 건너뜁니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-dense-rank', regex: /\bDENSE_RANK\s*\(\)/gi, description: '순위 부여 (연속)', template: '**DENSE_RANK()**: 동점이 있어도 다음 순위를 건너뛰지 않습니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-ntile', regex: /\bNTILE\s*\(/gi, description: 'N등분', template: '**NTILE(n)**: 데이터를 n개의 균등한 그룹으로 나눕니다.', category: 'Advanced', importance: 'medium' },
  {
    id: 'sql-lag',
    regex: /\bLAG\s*\(/gi,
    description: '이전 행 값 가져오기',
    template: '**LAG()**: 현재 행의 이전 행 값을 가져옵니다.',
    analogy: '시간 여행처럼 **"어제의 값"**을 오늘 시점에서 참조하는 것과 같습니다.',
    category: 'Advanced',
    importance: 'high'
  },
  { id: 'sql-lead', regex: /\bLEAD\s*\(/gi, description: '다음 행 값 가져오기', template: '**LEAD()**: 현재 행의 다음 행 값을 가져옵니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-first-value', regex: /\bFIRST_VALUE\s*\(/gi, description: '그룹 첫 번째 값', template: '**FIRST_VALUE()**: 윈도우 프레임의 첫 번째 값을 반환합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'sql-last-value', regex: /\bLAST_VALUE\s*\(/gi, description: '그룹 마지막 값', template: '**LAST_VALUE()**: 윈도우 프레임의 마지막 값을 반환합니다.', category: 'Advanced', importance: 'medium' },
  {
    id: 'sql-partition-by',
    regex: /\bPARTITION\s+BY\b/gi,
    description: '윈도우 분할',
    template: '**PARTITION BY**: 데이터를 그룹으로 나눠 각 그룹 내에서 윈도우 함수를 적용합니다.',
    analogy: '반별로 **"각 반 내에서 1등, 2등"**을 매기는 것과 같습니다.',
    category: 'Advanced',
    importance: 'high'
  },
  { id: 'sql-over', regex: /\bOVER\s*\(/gi, description: '윈도우 정의', template: '**OVER()**: 윈도우 함수의 범위를 정의합니다.', category: 'Advanced', importance: 'high' },

  // [8] Advanced JOINs
  { id: 'sql-cross-join', regex: /\bCROSS\s+JOIN\b/gi, description: '교차 결합', template: '**CROSS JOIN**: 두 테이블의 모든 조합을 만듭니다.', category: 'Structure', importance: 'medium', warnings: ['결과 행 수가 폭발적으로 증가할 수 있습니다.'] },
  { id: 'sql-full-outer-join', regex: /\bFULL\s+OUTER\s+JOIN\b/gi, description: '완전 외부 결합', template: '**FULL OUTER JOIN**: 양쪽 테이블의 모든 데이터를 유지하며 결합합니다.', category: 'Structure', importance: 'medium' },
  { id: 'sql-self-join', regex: /\bSELF\s+JOIN\b/gi, description: '자기 결합', template: '**SELF JOIN**: 테이블을 자기 자신과 결합합니다.', category: 'Structure', importance: 'medium', tips: ['계층 구조 데이터(예: 직원-상사 관계)에 유용합니다.'] },
  { id: 'sql-lateral', regex: /\bLATERAL\b/gi, description: '측면 결합', template: '**LATERAL**: 서브쿼리가 이전 FROM 항목을 참조할 수 있게 합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'sql-natural-join', regex: /\bNATURAL\s+JOIN\b/gi, description: '자연 결합', template: '**NATURAL JOIN**: 같은 이름의 컬럼을 자동으로 매칭하여 결합합니다.', category: 'Structure', importance: 'low', warnings: ['예상치 못한 결합이 발생할 수 있어 권장하지 않습니다.'] },

  // [9] Subquery Patterns
  { id: 'sql-exists', regex: /\bEXISTS\s*\(/gi, description: '존재 여부 확인', template: '**EXISTS**: 서브쿼리 결과가 하나라도 있는지 확인합니다.', category: 'Logic', importance: 'high' },
  { id: 'sql-not-exists', regex: /\bNOT\s+EXISTS\s*\(/gi, description: '부재 여부 확인', template: '**NOT EXISTS**: 서브쿼리 결과가 없는지 확인합니다.', category: 'Logic', importance: 'high' },
  { id: 'sql-in', regex: /\bIN\s*\(/gi, description: '값 목록 포함', template: '**IN**: 값이 목록에 포함되는지 확인합니다.', category: 'Logic', importance: 'high' },
  { id: 'sql-not-in', regex: /\bNOT\s+IN\s*\(/gi, description: '값 목록 미포함', template: '**NOT IN**: 값이 목록에 없는지 확인합니다.', category: 'Logic', importance: 'high', warnings: ['NULL 값이 있으면 예상치 못한 결과가 나올 수 있습니다.'] },
  { id: 'sql-any', regex: /\bANY\s*\(/gi, description: '하나라도 만족', template: '**ANY**: 서브쿼리 결과 중 하나라도 조건을 만족하면 참입니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-all', regex: /\bALL\s*\(/gi, description: '모두 만족', template: '**ALL**: 서브쿼리 결과 모두가 조건을 만족해야 참입니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-some', regex: /\bSOME\s*\(/gi, description: '일부 만족', template: '**SOME**: ANY와 동일하게 작동합니다.', category: 'Logic', importance: 'low' },
  { id: 'sql-scalar-subquery', regex: /=\s*\(\s*SELECT\b/gi, description: '스칼라 서브쿼리', template: '**Scalar Subquery**: 단일 값을 반환하는 서브쿼리입니다.', category: 'Logic', importance: 'medium' },

  // [10] DDL (Data Definition Language)
  { id: 'sql-create-table', regex: /\bCREATE\s+TABLE\b/gi, description: '테이블 생성', template: '**CREATE TABLE**: 새로운 테이블을 만듭니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-alter-table', regex: /\bALTER\s+TABLE\b/gi, description: '테이블 변경', template: '**ALTER TABLE**: 기존 테이블 구조를 수정합니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-drop-table', regex: /\bDROP\s+TABLE\b/gi, description: '테이블 삭제', template: '**DROP TABLE**: 테이블을 완전히 삭제합니다.', category: 'Structure', importance: 'high', warnings: ['복구 불가능하니 매우 신중하게 사용하세요!'] },
  { id: 'sql-truncate', regex: /\bTRUNCATE\s+TABLE\b/gi, description: '테이블 비우기', template: '**TRUNCATE**: 테이블의 모든 데이터를 빠르게 삭제합니다.', category: 'Data', importance: 'high', warnings: ['DELETE보다 빠르지만 롤백이 불가능합니다.'] },
  { id: 'sql-create-database', regex: /\bCREATE\s+DATABASE\b/gi, description: '데이터베이스 생성', template: '**CREATE DATABASE**: 새로운 데이터베이스를 만듭니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-drop-database', regex: /\bDROP\s+DATABASE\b/gi, description: '데이터베이스 삭제', template: '**DROP DATABASE**: 데이터베이스를 완전히 삭제합니다.', category: 'Structure', importance: 'high', warnings: ['모든 테이블과 데이터가 사라집니다!'] },
  { id: 'sql-add-column', regex: /\bADD\s+COLUMN\b/gi, description: '컬럼 추가', template: '**ADD COLUMN**: 테이블에 새로운 컬럼을 추가합니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-drop-column', regex: /\bDROP\s+COLUMN\b/gi, description: '컬럼 삭제', template: '**DROP COLUMN**: 테이블에서 컬럼을 제거합니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-modify-column', regex: /\b(MODIFY|ALTER)\s+COLUMN\b/gi, description: '컬럼 수정', template: '**MODIFY/ALTER COLUMN**: 컬럼의 타입이나 제약조건을 변경합니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-primary-key', regex: /\bPRIMARY\s+KEY\b/gi, description: '기본 키', template: '**PRIMARY KEY**: 테이블에서 각 행을 고유하게 식별하는 컬럼입니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-foreign-key', regex: /\bFOREIGN\s+KEY\b/gi, description: '외래 키', template: '**FOREIGN KEY**: 다른 테이블의 기본 키를 참조하여 관계를 맺습니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-unique', regex: /\bUNIQUE\b/gi, description: '유일 제약', template: '**UNIQUE**: 컬럼 값이 중복되지 않도록 보장합니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-check', regex: /\bCHECK\s*\(/gi, description: '검사 제약', template: '**CHECK**: 컬럼 값이 특정 조건을 만족하도록 강제합니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-not-null', regex: /\bNOT\s+NULL\b/gi, description: 'NULL 금지', template: '**NOT NULL**: 컬럼에 NULL 값이 들어가지 못하게 합니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-default', regex: /\bDEFAULT\b/gi, description: '기본값', template: '**DEFAULT**: 값을 지정하지 않으면 자동으로 들어갈 기본값을 설정합니다.', category: 'Structure', importance: 'medium' },

  // [11] Views & Materialized Views
  { id: 'sql-create-view', regex: /\bCREATE\s+VIEW\b/gi, description: '뷰 생성', template: '**CREATE VIEW**: 쿼리 결과를 테이블처럼 사용할 수 있는 가상 테이블을 만듭니다.', category: 'Structure', importance: 'high' },
  { id: 'sql-drop-view', regex: /\bDROP\s+VIEW\b/gi, description: '뷰 삭제', template: '**DROP VIEW**: 뷰를 삭제합니다.', category: 'Structure', importance: 'medium' },
  { id: 'sql-materialized-view', regex: /\bMATERIALIZED\s+VIEW\b/gi, description: '구체화된 뷰', template: '**MATERIALIZED VIEW**: 쿼리 결과를 물리적으로 저장하는 뷰입니다.', category: 'Advanced', importance: 'high', tips: ['복잡한 쿼리를 미리 계산해두어 성능을 크게 향상시킵니다.'] },
  { id: 'sql-refresh-view', regex: /\bREFRESH\s+MATERIALIZED\s+VIEW\b/gi, description: '뷰 갱신', template: '**REFRESH MATERIALIZED VIEW**: 구체화된 뷰의 데이터를 최신 상태로 갱신합니다.', category: 'Advanced', importance: 'medium' },

  // [12] Indexes Advanced
  { id: 'sql-unique-index', regex: /\bCREATE\s+UNIQUE\s+INDEX\b/gi, description: '유일 인덱스', template: '**UNIQUE INDEX**: 중복값을 허용하지 않는 인덱스를 생성합니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-drop-index', regex: /\bDROP\s+INDEX\b/gi, description: '인덱스 삭제', template: '**DROP INDEX**: 인덱스를 삭제합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'sql-clustered-index', regex: /\bCLUSTERED\s+INDEX\b/gi, description: '클러스터형 인덱스', template: '**CLUSTERED INDEX**: 데이터를 물리적으로 정렬하여 저장하는 인덱스입니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-nonclustered-index', regex: /\bNONCLUSTERED\s+INDEX\b/gi, description: '비클러스터형 인덱스', template: '**NONCLUSTERED INDEX**: 데이터와 별도로 인덱스를 저장합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'sql-bitmap-index', regex: /\bBITMAP\s+INDEX\b/gi, description: '비트맵 인덱스', template: '**BITMAP INDEX**: 카디널리티가 낮은 컬럼에 효율적인 인덱스입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'sql-fulltext-index', regex: /\bFULLTEXT\s+INDEX\b/gi, description: '전문 검색 인덱스', template: '**FULLTEXT INDEX**: 텍스트 검색을 위한 특수 인덱스입니다.', category: 'Advanced', importance: 'medium' },

  // [13] Triggers
  { id: 'sql-create-trigger', regex: /\bCREATE\s+TRIGGER\b/gi, description: '트리거 생성', template: '**CREATE TRIGGER**: 특정 이벤트 발생 시 자동으로 실행되는 코드를 만듭니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-drop-trigger', regex: /\bDROP\s+TRIGGER\b/gi, description: '트리거 삭제', template: '**DROP TRIGGER**: 트리거를 삭제합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'sql-before-after', regex: /\b(BEFORE|AFTER)\s+(INSERT|UPDATE|DELETE)\b/gi, description: '트리거 타이밍', template: '**BEFORE/AFTER**: 트리거가 이벤트 전/후에 실행되도록 지정합니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-for-each-row', regex: /\bFOR\s+EACH\s+ROW\b/gi, description: '행별 트리거', template: '**FOR EACH ROW**: 영향받는 각 행마다 트리거를 실행합니다.', category: 'Advanced', importance: 'medium' },

  // [14] Stored Procedures & Functions
  { id: 'sql-create-procedure', regex: /\bCREATE\s+PROCEDURE\b/gi, description: '저장 프로시저 생성', template: '**CREATE PROCEDURE**: 재사용 가능한 SQL 코드 블록을 만듭니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-call-exec', regex: /\b(CALL|EXEC)\s+/gi, description: '프로시저 실행', template: '**CALL/EXEC**: 저장 프로시저를 실행합니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-create-function', regex: /\bCREATE\s+FUNCTION\b/gi, description: '함수 생성', template: '**CREATE FUNCTION**: 값을 반환하는 사용자 정의 함수를 만듭니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-return', regex: /\bRETURN\b/gi, description: '값 반환', template: '**RETURN**: 함수나 프로시저에서 값을 반환합니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-declare', regex: /\bDECLARE\b/gi, description: '변수 선언', template: '**DECLARE**: 프로시저나 함수 내에서 변수를 선언합니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-set-var', regex: /\bSET\s+@/gi, description: '변수 할당', template: '**SET**: 변수에 값을 할당합니다.', category: 'Logic', importance: 'medium' },

  // [15] PostgreSQL Specific
  { id: 'sql-serial', regex: /\bSERIAL\b/gi, description: '자동 증가 (PostgreSQL)', template: '**SERIAL**: 자동으로 증가하는 정수 타입입니다.', category: 'Type', importance: 'high' },
  { id: 'sql-bigserial', regex: /\bBIGSERIAL\b/gi, description: '큰 자동 증가', template: '**BIGSERIAL**: 더 큰 범위의 자동 증가 정수입니다.', category: 'Type', importance: 'medium' },
  { id: 'sql-array', regex: /\bARRAY\b/gi, description: '배열 타입', template: '**ARRAY**: PostgreSQL의 배열 타입입니다.', category: 'Type', importance: 'medium' },
  { id: 'sql-jsonb', regex: /\bJSONB\b/gi, description: 'JSON 바이너리', template: '**JSONB**: 바이너리로 저장되는 JSON 타입으로 인덱싱이 가능합니다.', category: 'Type', importance: 'high', tips: ['일반 JSON보다 쿼리 성능이 훨씬 좋습니다.'] },
  { id: 'sql-hstore', regex: /\bHSTORE\b/gi, description: '키-값 저장', template: '**HSTORE**: 키-값 쌍을 저장하는 PostgreSQL 타입입니다.', category: 'Type', importance: 'medium' },
  { id: 'sql-generate-series', regex: /\bGENERATE_SERIES\s*\(/gi, description: '연속 값 생성', template: '**GENERATE_SERIES**: 연속된 숫자나 날짜 시퀀스를 생성합니다.', category: 'Data', importance: 'high' },
  { id: 'sql-unnest', regex: /\bUNNEST\s*\(/gi, description: '배열 펼치기', template: '**UNNEST**: 배열을 행으로 펼칩니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-copy', regex: /\bCOPY\b/gi, description: '데이터 복사', template: '**COPY**: 테이블과 파일 간 대량 데이터를 빠르게 복사합니다.', category: 'Data', importance: 'high' },
  { id: 'sql-on-conflict', regex: /\bON\s+CONFLICT\b/gi, description: '충돌 처리 (UPSERT)', template: '**ON CONFLICT**: 중복 키 충돌 시 업데이트하는 UPSERT 문법입니다.', category: 'Data', importance: 'high', tips: ['INSERT와 UPDATE를 한 번에 처리할 수 있습니다.'] },
  { id: 'sql-returning', regex: /\bRETURNING\b/gi, description: '삽입/수정 결과 반환', template: '**RETURNING**: INSERT/UPDATE/DELETE 후 영향받은 행의 값을 반환합니다.', category: 'Data', importance: 'high' },

  // [16] MySQL Specific
  { id: 'sql-auto-increment', regex: /\bAUTO_INCREMENT\b/gi, description: '자동 증가 (MySQL)', template: '**AUTO_INCREMENT**: MySQL의 자동 증가 속성입니다.', category: 'Type', importance: 'high' },
  { id: 'sql-limit', regex: /\bLIMIT\b/gi, description: '결과 개수 제한', template: '**LIMIT**: 반환할 행의 최대 개수를 제한합니다.', category: 'Logic', importance: 'high' },
  { id: 'sql-offset', regex: /\bOFFSET\b/gi, description: '시작 위치', template: '**OFFSET**: 결과의 시작 위치를 지정합니다.', category: 'Logic', importance: 'high', tips: ['LIMIT과 함께 페이지네이션에 사용됩니다.'] },
  { id: 'sql-show-tables', regex: /\bSHOW\s+TABLES\b/gi, description: '테이블 목록 조회', template: '**SHOW TABLES**: 데이터베이스의 모든 테이블을 조회합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-describe', regex: /\b(DESCRIBE|DESC)\s+/gi, description: '테이블 구조 조회', template: '**DESCRIBE/DESC**: 테이블의 컬럼 정보를 조회합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-replace-into', regex: /\bREPLACE\s+INTO\b/gi, description: '교체 삽입', template: '**REPLACE INTO**: 중복이 있으면 삭제 후 삽입합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-insert-ignore', regex: /\bINSERT\s+IGNORE\b/gi, description: '오류 무시 삽입', template: '**INSERT IGNORE**: 중복 키 오류를 무시하고 삽입합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-on-duplicate-key', regex: /\bON\s+DUPLICATE\s+KEY\s+UPDATE\b/gi, description: '중복 키 업데이트', template: '**ON DUPLICATE KEY UPDATE**: 중복 키가 있으면 업데이트합니다.', category: 'Data', importance: 'high' },

  // [17] Performance & Optimization
  { id: 'sql-vacuum', regex: /\bVACUUM\b/gi, description: '공간 회수', template: '**VACUUM**: 삭제된 행의 공간을 회수하고 테이블을 최적화합니다.', category: 'Advanced', importance: 'high', tips: ['PostgreSQL에서 주기적으로 실행해야 성능이 유지됩니다.'] },
  { id: 'sql-analyze', regex: /\bANALYZE\b/gi, description: '통계 갱신', template: '**ANALYZE**: 테이블의 통계 정보를 갱신하여 쿼리 최적화를 돕습니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-reindex', regex: /\bREINDEX\b/gi, description: '인덱스 재구성', template: '**REINDEX**: 손상되거나 비효율적인 인덱스를 재구성합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'sql-cluster', regex: /\bCLUSTER\b/gi, description: '물리적 정렬', template: '**CLUSTER**: 테이블 데이터를 인덱스 순서로 물리적으로 재정렬합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'sql-set-statistics', regex: /\bSET\s+STATISTICS\b/gi, description: '통계 상세도', template: '**SET STATISTICS**: 컬럼의 통계 샘플링 상세도를 조정합니다.', category: 'Advanced', importance: 'low' },
  { id: 'sql-hint', regex: /\/\*\+\s*HINT/gi, description: '쿼리 힌트', template: '**Query Hint**: 옵티마이저에게 실행 계획을 제안합니다.', category: 'Advanced', importance: 'medium', warnings: ['과도한 힌트 사용은 오히려 성능을 악화시킬 수 있습니다.'] },
  { id: 'sql-partition', regex: /\bPARTITION\s+BY\s+(RANGE|LIST|HASH)\b/gi, description: '테이블 파티션', template: '**PARTITION BY**: 대용량 테이블을 작은 파티션으로 나눕니다.', category: 'Advanced', importance: 'high', tips: ['쿼리 성능과 관리 효율성을 크게 향상시킵니다.'] },
  { id: 'sql-with-no-lock', regex: /\bWITH\s+\(NOLOCK\)/gi, description: '잠금 없이 읽기', template: '**WITH (NOLOCK)**: 잠금 없이 데이터를 읽습니다.', category: 'Advanced', importance: 'medium', warnings: ['더티 리드가 발생할 수 있습니다.'] },
  { id: 'sql-isolation-level', regex: /\bSET\s+TRANSACTION\s+ISOLATION\s+LEVEL\b/gi, description: '격리 수준 설정', template: '**ISOLATION LEVEL**: 트랜잭션의 격리 수준을 설정합니다.', category: 'Advanced', importance: 'high' },
  { id: 'sql-lock-table', regex: /\bLOCK\s+TABLE\b/gi, description: '테이블 잠금', template: '**LOCK TABLE**: 테이블에 명시적 잠금을 겁니다.', category: 'Advanced', importance: 'medium' },

  // [18] String Functions
  { id: 'sql-concat', regex: /\bCONCAT\s*\(/gi, description: '문자열 연결', template: '**CONCAT()**: 여러 문자열을 하나로 연결합니다.', category: 'Data', importance: 'high' },
  { id: 'sql-substring', regex: /\bSUBSTRING\s*\(/gi, description: '부분 문자열', template: '**SUBSTRING()**: 문자열의 일부를 추출합니다.', category: 'Data', importance: 'high' },
  { id: 'sql-trim', regex: /\bTRIM\s*\(/gi, description: '공백 제거', template: '**TRIM()**: 문자열 앞뒤 공백을 제거합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-upper', regex: /\bUPPER\s*\(/gi, description: '대문자 변환', template: '**UPPER()**: 문자열을 대문자로 변환합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-lower', regex: /\bLOWER\s*\(/gi, description: '소문자 변환', template: '**LOWER()**: 문자열을 소문자로 변환합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-replace', regex: /\bREPLACE\s*\(/gi, description: '문자열 치환', template: '**REPLACE()**: 문자열 내의 특정 부분을 다른 것으로 바꿉니다.', category: 'Data', importance: 'high' },
  { id: 'sql-length', regex: /\b(LENGTH|LEN)\s*\(/gi, description: '문자열 길이', template: '**LENGTH/LEN()**: 문자열의 길이를 반환합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-position', regex: /\bPOSITION\s*\(/gi, description: '문자열 위치', template: '**POSITION()**: 부분 문자열의 위치를 찾습니다.', category: 'Data', importance: 'medium' },

  // [19] Date Functions
  { id: 'sql-now', regex: /\bNOW\s*\(\)/gi, description: '현재 시각', template: '**NOW()**: 현재 날짜와 시간을 반환합니다.', category: 'Data', importance: 'high' },
  { id: 'sql-current-date', regex: /\bCURRENT_DATE\b/gi, description: '현재 날짜', template: '**CURRENT_DATE**: 현재 날짜만 반환합니다.', category: 'Data', importance: 'high' },
  { id: 'sql-current-time', regex: /\bCURRENT_TIME\b/gi, description: '현재 시간', template: '**CURRENT_TIME**: 현재 시간만 반환합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-date-trunc', regex: /\bDATE_TRUNC\s*\(/gi, description: '날짜 절삭', template: '**DATE_TRUNC()**: 날짜를 지정한 단위로 절삭합니다.', category: 'Data', importance: 'high', tips: ['월별, 일별 집계에 매우 유용합니다.'] },
  { id: 'sql-extract', regex: /\bEXTRACT\s*\(/gi, description: '날짜 부분 추출', template: '**EXTRACT()**: 날짜에서 년, 월, 일 등을 추출합니다.', category: 'Data', importance: 'high' },
  { id: 'sql-age', regex: /\bAGE\s*\(/gi, description: '날짜 차이', template: '**AGE()**: 두 날짜 간의 차이를 계산합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-interval', regex: /\bINTERVAL\b/gi, description: '시간 간격', template: '**INTERVAL**: 날짜 연산에 사용할 시간 간격을 나타냅니다.', category: 'Data', importance: 'high' },
  { id: 'sql-date-add', regex: /\bDATE_ADD\s*\(/gi, description: '날짜 더하기', template: '**DATE_ADD()**: 날짜에 일정 기간을 더합니다.', category: 'Data', importance: 'high' },

  // [20] Advanced Operators
  { id: 'sql-like', regex: /\bLIKE\b/gi, description: '패턴 매칭', template: '**LIKE**: 문자열이 패턴과 일치하는지 확인합니다.', category: 'Logic', importance: 'high', tips: ['%는 0개 이상의 문자, _는 정확히 1개 문자를 의미합니다.'] },
  { id: 'sql-ilike', regex: /\bILIKE\b/gi, description: '대소문자 무시 패턴', template: '**ILIKE**: 대소문자를 구분하지 않는 LIKE입니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-similar-to', regex: /\bSIMILAR\s+TO\b/gi, description: '정규식 패턴', template: '**SIMILAR TO**: SQL 표준 정규식 패턴 매칭입니다.', category: 'Logic', importance: 'medium' },
  { id: 'sql-between', regex: /\bBETWEEN\b/gi, description: '범위 확인', template: '**BETWEEN**: 값이 지정한 범위 안에 있는지 확인합니다.', category: 'Logic', importance: 'high' },
  { id: 'sql-is-null', regex: /\bIS\s+NULL\b/gi, description: 'NULL 확인', template: '**IS NULL**: 값이 NULL인지 확인합니다.', category: 'Logic', importance: 'high', tips: ['= NULL은 작동하지 않습니다. 반드시 IS NULL을 사용하세요.'] },
  { id: 'sql-is-not-null', regex: /\bIS\s+NOT\s+NULL\b/gi, description: 'NULL 아님 확인', template: '**IS NOT NULL**: 값이 NULL이 아닌지 확인합니다.', category: 'Logic', importance: 'high' },
  { id: 'sql-coalesce', regex: /\bCOALESCE\s*\(/gi, description: 'NULL 대체', template: '**COALESCE()**: 여러 값 중 NULL이 아닌 첫 번째 값을 반환합니다.', category: 'Logic', importance: 'high', tips: ['NULL 처리의 필수 도구입니다.'] },
  { id: 'sql-nullif', regex: /\bNULLIF\s*\(/gi, description: '조건부 NULL', template: '**NULLIF()**: 두 값이 같으면 NULL을, 다르면 첫 번째 값을 반환합니다.', category: 'Logic', importance: 'medium' },

  // [21] Set Operations
  { id: 'sql-union', regex: /\bUNION\b/gi, description: '합집합', template: '**UNION**: 두 쿼리 결과를 합치되 중복을 제거합니다.', category: 'Data', importance: 'high' },
  { id: 'sql-union-all', regex: /\bUNION\s+ALL\b/gi, description: '합집합 (중복 허용)', template: '**UNION ALL**: 중복을 포함하여 모든 결과를 합칩니다.', category: 'Data', importance: 'high', tips: ['UNION보다 빠릅니다.'] },
  { id: 'sql-intersect', regex: /\bINTERSECT\b/gi, description: '교집합', template: '**INTERSECT**: 두 쿼리 결과의 공통 부분만 반환합니다.', category: 'Data', importance: 'medium' },
  { id: 'sql-except', regex: /\bEXCEPT\b/gi, description: '차집합', template: '**EXCEPT**: 첫 번째 쿼리에는 있지만 두 번째 쿼리에는 없는 결과를 반환합니다.', category: 'Data', importance: 'medium' },

  // [22] Scenario Patterns (복잡한 실무 쿼리)
  {
    id: 'scenario-running-total',
    regex: /SUM\s*\([^)]+\)\s+OVER\s*\(\s*ORDER\s+BY/gi,
    description: '누적 합계 계산',
    template: '**누적 합계**: 윈도우 함수로 순차적인 누적 합계를 계산합니다.',
    analogy: '매일의 **"매출 누적액"**을 계산하는 것처럼, 이전까지의 모든 값을 더한 결과를 보여줍니다.',
    category: 'Scenario',
    importance: 'high',
    tips: ['재무 분석, 재고 추적 등에 필수적입니다.']
  },
  {
    id: 'scenario-recursive-cte',
    regex: /WITH\s+RECURSIVE\s+\w+/gi,
    description: '재귀 쿼리 (계층 구조)',
    template: '**재귀 CTE**: 조직도, 카테고리 트리 같은 계층 구조를 쿼리합니다.',
    analogy: '**"CEO → 부장 → 과장 → 사원"** 같은 조직 구조를 한 번에 펼쳐 보는 것과 같습니다.',
    category: 'Scenario',
    importance: 'high',
    tips: ['무한 루프 방지를 위해 종료 조건이 필수입니다.']
  },
  {
    id: 'scenario-pivot',
    regex: /CASE\s+WHEN.*END.*GROUP\s+BY/gis,
    description: '피벗 변환',
    template: '**피벗**: 행을 열로 변환하여 크로스탭 형태로 만듭니다.',
    analogy: '엑셀의 **"피벗 테이블"**처럼 데이터를 재배열하는 것과 같습니다.',
    category: 'Scenario',
    importance: 'high',
    tips: ['보고서 작성에 매우 유용합니다.']
  },
  {
    id: 'scenario-rank-top-n',
    regex: /ROW_NUMBER.*OVER.*PARTITION/gis,
    description: '그룹별 상위 N개',
    template: '**그룹별 Top-N**: 각 카테고리에서 상위 N개 항목만 추출합니다.',
    analogy: '각 학급에서 **"성적 1등~3등만"** 뽑아내는 것과 같습니다.',
    category: 'Scenario',
    importance: 'high',
    tips: ['랭킹, 베스트셀러 분석 등에 필수입니다.']
  },
  {
    id: 'scenario-data-migration',
    regex: /INSERT\s+INTO.*SELECT.*FROM/gis,
    description: '데이터 마이그레이션',
    template: '**데이터 이전**: 한 테이블에서 다른 테이블로 데이터를 복사합니다.',
    analogy: '이사할 때 **"구 집에서 새 집으로 짐을 옮기는"** 것과 같습니다.',
    category: 'Scenario',
    importance: 'high',
    tips: ['대량 데이터 이전 시 트랜잭션 크기를 조절하세요.']
  }
];
