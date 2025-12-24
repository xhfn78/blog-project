import { CodePattern, ScenarioPattern } from '../types';

export const JS_TS_PATTERNS: CodePattern[] = [
  // [1] 기본 문법 및 흐름 제어 (Core Syntax)
  { 
    id: 'js-const-let', 
    regex: /\b(const|let)\b/g, 
    description: '변수 선언', 
    template: '**const/let**: 데이터를 담는 바구니를 만듭니다.', 
    analogy: '한 번 붙이면 떼기 힘든 **"박제된 라벨(const)"**과 언제든 갈아끼울 수 있는 **"포스트잇(let)"**의 차이입니다.',
    category: 'Core', 
    importance: 'high',
    tips: ['기본적으로 const를 쓰고, 값이 바뀔 때만 let을 쓰는 것이 버그 예방에 좋습니다.']
  },
  { 
    id: 'js-arrow-fn', 
    regex: /=>/g, 
    description: '화살표 함수', 
    template: '**Arrow Function**: 함수를 짧고 간결하게 표현하는 현대적인 방식입니다.', 
    analogy: '긴 편지지 대신 **"핵심만 적은 쪽지"**를 전달하는 것과 같습니다.',
    category: 'Core', 
    importance: 'high',
    tips: ['this 바인딩 문제를 해결해주어 리액트에서 매우 자주 쓰입니다.']
  },
  { 
    id: 'js-destructuring', 
    regex: /const\s*{[^}]+}\s*=|const\s*\[[^\]]+\]\s*=/g, 
    description: '구조 분해 할당', 
    template: '**Destructuring**: 객체나 배열 안의 필요한 알맹이만 쏙쏙 뽑아냅니다.', 
    analogy: '선물 꾸러미에서 **"내가 원하는 초콜릿만 골라서 꺼내는 것"**과 같습니다.',
    category: 'Core', 
    importance: 'high' 
  },
  { 
    id: 'js-spread', 
    regex: /\.\.\./g, 
    description: '전개 연산자(Spread)', 
    template: '**Spread**: 배열이나 객체의 내용을 낱개로 펼치거나 복사합니다.', 
    analogy: '상자 속 물건들을 바닥에 **"촤르륵 펼쳐놓는 것"** 혹은 기존 상자 내용을 새 상자에 그대로 옮기는 것과 같습니다.',
    category: 'Core', 
    importance: 'high' 
  },
  { 
    id: 'js-optional-chaining', 
    regex: /\?\./g, 
    description: '옵셔널 체이닝', 
    template: '**.**: 데이터가 비어있을 경우 에러 없이 안전하게 넘어갑니다.', 
    analogy: '방 문을 열기 전에 **"노크를 해서 안에 사람이 있는지 먼저 확인"**하고 없으면 그냥 돌아가는 매너 있는 확인법입니다.',
    category: 'Core', 
    importance: 'high',
    tips: ['undefined나 null 에러로 앱이 죽는 것을 방지하는 최고의 도구입니다.']
  },
  { 
    id: 'js-nullish-coalescing', 
    regex: /\?\?/g, 
    description: '널 병합 연산자', 
    template: '**??**: 데이터가 없을 때만 미리 정해둔 기본값을 사용합니다.', 
    category: 'Core', 
    importance: 'medium',
    tips: ['0이나 빈 문자열("")은 값으로 인정하고, 오직 null이나 undefined만 걸러내고 싶을 때 씁니다.']
  },
  { id: 'js-template-literal', regex: /`[^`]*\${[^}]+}[^`]*`/g, description: '템플릿 리터럴', template: '**`${}`**: 문자열 사이에 변수를 아주 쉽게 끼워 넣을 수 있습니다.', category: 'Core', importance: 'medium' },

  // [2] 데이터 가공 및 배열 메서드 (Data Transformation)
  { 
    id: 'js-array-map', 
    regex: /\.map\s*\(/g, 
    description: '배열 전체 변환', 
    template: '**.map()**: 모든 항목을 하나씩 꺼내 규칙에 맞게 변형한 새 배열을 만듭니다.', 
    analogy: '모든 학생에게 **"교복을 입혀서"** 새로운 학생 명단을 만드는 과정과 같습니다.',
    category: 'Data', 
    importance: 'high' 
  },
  { 
    id: 'js-array-filter', 
    regex: /\.filter\s*\(/g, 
    description: '원하는 항목 추출', 
    template: '**.filter()**: 조건에 맞는 데이터만 골라내어 새로운 목록을 만듭니다.', 
    analogy: '채반으로 콩을 걸러내듯, **"내가 원하는 것만 남기고 나머지는 버리는"** 작업입니다.',
    category: 'Data', 
    importance: 'high' 
  },
  { 
    id: 'js-array-reduce', 
    regex: /\.reduce\s*\(/g, 
    description: '데이터 누적 합산', 
    template: '**.reduce()**: 여러 데이터를 하나로 합치거나 복잡한 형태로 재가공합니다.', 
    analogy: '여러 재료를 냄비에 넣고 끓여 **"하나의 진한 육수"**를 우려내는 과정입니다.',
    category: 'Data', 
    importance: 'medium' 
  },
  { id: 'js-array-find', regex: /\.find\s*\(/g, description: '특정 항목 찾기', template: '**.find()**: 목록에서 조건에 딱 맞는 첫 번째 데이터 하나를 찾아옵니다.', category: 'Data', importance: 'medium' },
  { id: 'js-array-includes', regex: /\.includes\s*\(/g, description: '포함 여부 확인', template: '**.includes()**: 목록 안에 특정 값이 들어있는지 참/거짓으로 알려줍니다.', category: 'Data', importance: 'low' },

  // [3] 비동기 처리 및 통신 (Async)
  { id: 'js-async', regex: /\basync\b/g, description: '비동기 선언', template: '**async**: 시간이 걸리는 작업이 포함된 함수임을 나타냅니다.', category: 'Async', importance: 'high' },
  { 
    id: 'js-await', 
    regex: /\bawait\b/g, 
    description: '결과 대기', 
    template: '**await**: 응답이 올 때까지 다음 줄로 넘어가지 않고 차분히 기다립니다.', 
    analogy: '카페에서 **"진동벨이 울릴 때까지 카운터 앞에서 대기하는 것"**과 같습니다.',
    category: 'Async', 
    importance: 'high' 
  },
  { id: 'js-promise', regex: /new\s+Promise/g, description: '약속(Promise) 생성', template: '**Promise**: 비동기 작업의 미래 결과를 담을 약속 객체를 직접 만듭니다.', category: 'Async', importance: 'medium' },
  { id: 'js-try-catch', regex: /try\s*{[^}]*}\s*catch/g, description: '에러 예외 처리', template: '**try-catch**: 코드 실행 중 문제가 생겨도 프로그램이 죽지 않게 보호합니다.', category: 'Logic', importance: 'high' },
  { id: 'js-fetch', regex: /\bfetch\s*\(/g, description: '네트워크 요청', template: '**fetch**: 멀리 있는 서버에 데이터를 요청하거나 정보를 보냅니다.', category: 'Async', importance: 'high' },

  // [4] TypeScript 특화 (TS Features)
  { 
    id: 'ts-interface', 
    regex: /\binterface\b/g, 
    description: '데이터 타입 정의', 
    template: '**interface**: 데이터가 어떤 모양이어야 하는지 설계도를 그립니다.', 
    analogy: '프라모델을 조립하기 전의 **"부품 조립 설명서"**와 같습니다.',
    category: 'TS', 
    importance: 'high' 
  },
  { id: 'ts-type', regex: /\btype\s+\w+\s*=/g, description: '타입 별칭', template: '**type**: 복잡한 데이터 구조에 새로운 이름을 붙여 재사용합니다.', category: 'TS', importance: 'high' },
  { 
    id: 'ts-generic', 
    regex: /<\s*[A-Z][A-Za-z0-9]*\s*>/g, 
    description: '범용 타입(Generic)', 
    template: '**Generic**: 데이터 타입을 쓸 때 정하는 유연한 방식입니다.', 
    analogy: '내용물이 무엇이든 담을 수 있는 **"투명한 보관 상자"**와 같습니다.',
    category: 'TS', 
    importance: 'high' 
  },
  { id: 'ts-utility', regex: /\b(Partial|Pick|Omit|Readonly|Record)<[^>]+>/g, description: '유틸리티 타입', template: '**Utility Type**: 기존 타입을 변형하여 새 타입을 만듭니다.', category: 'TS', importance: 'medium' },

  // [5] 리액트 생태계 (React)
  { 
    id: 'react-useState', 
    regex: /\buseState\b/g, 
    description: '상태 기억', 
    template: '**useState**: 변화하는 정보를 저장하고 화면을 다시 그립니다.', 
    analogy: '뇌의 **"단기 기억 장치"**와 같아서, 정보가 바뀌면 몸(화면)이 즉각 반응합니다.',
    category: 'React', 
    importance: 'high'
  },
  { id: 'react-useEffect', regex: /\buseEffect\b/g, description: '자동 작업(Effect)', template: '**useEffect**: 컴포넌트가 나타나거나 데이터가 변할 때 특정 코드를 실행합니다.', category: 'React', importance: 'high' },
  { id: 'react-useMemo', regex: /\buseMemo\b/g, description: '계산 결과 저장', template: '**useMemo**: 복잡한 계산 결과를 저장해두고 똑같은 연산을 반복하지 않습니다.', category: 'React', importance: 'medium' },
  { id: 'react-useCallback', regex: /\buseCallback\b/g, description: '함수 기억', template: '**useCallback**: 함수 자체를 기억하여 자식 컴포넌트의 불필요한 렌더링을 막습니다.', category: 'React', importance: 'medium' },
  { id: 'react-useRef', regex: /\buseRef\b/g, description: '직접 접근/값 유지', template: '**useRef**: 화면 요소에 직접 접근하거나, 렌더링과 상관없는 값을 유지합니다.', category: 'React', importance: 'medium' },
  { id: 'react-useContext', regex: /\buseContext\b/g, description: '전역 데이터 접근', template: '**useContext**: 여러 단계 아래의 컴포넌트로 데이터를 한 번에 보냅니다.', category: 'React', importance: 'high' },
  { id: 'react-query', regex: /useQuery|useMutation/g, description: '서버 상태 관리', template: '**React Query**: 서버 데이터를 캐싱하고 로딩/에러 상태를 아주 쉽게 관리합니다.', category: 'React', importance: 'high' },
  { id: 'state-zustand', regex: /\bcreate\s*\(\(set\)\s*=>/g, description: '중앙 집중 상태 관리', template: '**Zustand**: 전역 저장소를 구축하여 여러 화면이 데이터를 공유하게 합니다.', category: 'React', importance: 'medium' },

  // [6] 최적화 및 디버깅
  { id: 'util-memo', regex: /\bmemo\s*\(/g, description: '컴포넌트 기억', template: '**React.memo**: 내가 가진 정보가 그대로면 부모가 변해도 다시 그리지 않고 쉽니다.', category: 'Optimization', importance: 'medium' },
  { id: 'util-console', regex: /console\.(log|error|warn|table)/g, description: '로그 기록', template: '**console**: 시스템 내부 상황을 출력하여 확인합니다.', category: 'Debug', importance: 'low' },
  { id: 'util-debugger', regex: /\bdebugger\b/g, description: '코드 일시정지', template: '**debugger**: 실행 중인 코드를 강제로 멈추고 한 줄씩 검사하게 합니다.', category: 'Debug', importance: 'low' },

  // [7] Promise 고급 패턴
  { id: 'promise-all', regex: /Promise\.all\(/g, description: 'Promise 병렬 처리', template: '**Promise.all**: 여러 비동기 작업을 동시에 실행하고 모두 완료되면 결과를 받습니다.', category: 'Async', importance: 'high' },
  { id: 'promise-race', regex: /Promise\.race\(/g, description: 'Promise 경주', template: '**Promise.race**: 여러 작업 중 가장 빠르게 완료된 하나만 취합니다.', category: 'Async', importance: 'medium' },
  { id: 'promise-allsettled', regex: /Promise\.allSettled\(/g, description: '모든 결과 수집', template: '**Promise.allSettled**: 성공/실패 상관없이 모든 작업 결과를 수집합니다.', category: 'Async', importance: 'high' },
  { id: 'promise-any', regex: /Promise\.any\(/g, description: '첫 성공 대기', template: '**Promise.any**: 여러 작업 중 첫 번째로 성공한 결과만 취합니다.', category: 'Async', importance: 'medium' },
  { id: 'promise-finally', regex: /\.finally\(/g, description: '최종 정리', template: '**finally**: 성공이든 실패든 마지막에 반드시 실행할 코드를 정의합니다.', category: 'Async', importance: 'high' },
  { id: 'promise-then-chain', regex: /\.then\([^)]+\)\.then\(/g, description: 'Promise 체이닝', template: '**then 체인**: 비동기 작업을 순차적으로 연결하여 실행합니다.', category: 'Async', importance: 'high' },

  // [8] Generator & Iterator
  { id: 'generator-function', regex: /function\s*\*/g, description: 'Generator 함수', template: '**Generator**: 실행을 일시정지했다가 재개할 수 있는 특수 함수입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'yield', regex: /\byield\b/g, description: '값 반환 및 일시정지', template: '**yield**: Generator 내부에서 값을 반환하고 실행을 멈춥니다.', category: 'Advanced', importance: 'medium' },
  { id: 'iterator', regex: /\[Symbol\.iterator\]/g, description: '반복 가능 객체', template: '**Iterator**: for...of 루프에서 사용할 수 있는 반복 가능한 객체를 정의합니다.', category: 'Advanced', importance: 'low' },

  // [9] Class 고급
  { id: 'class-declaration', regex: /\bclass\s+\w+/g, description: '클래스 선언', template: '**class**: 객체 지향 프로그래밍의 설계도를 만듭니다.', category: 'OOP', importance: 'high' },
  { id: 'constructor', regex: /\bconstructor\s*\(/g, description: '생성자', template: '**constructor**: 클래스 인스턴스가 만들어질 때 실행되는 초기화 함수입니다.', category: 'OOP', importance: 'high' },
  { id: 'extends', regex: /\bextends\b/g, description: '상속', template: '**extends**: 다른 클래스의 기능을 물려받아 확장합니다.', category: 'OOP', importance: 'high' },
  { id: 'super', regex: /\bsuper\b/g, description: '부모 호출', template: '**super**: 부모 클래스의 메서드나 생성자를 호출합니다.', category: 'OOP', importance: 'medium' },
  { id: 'static', regex: /\bstatic\s+/g, description: '정적 메서드', template: '**static**: 인스턴스가 아닌 클래스 자체에 속한 메서드입니다.', category: 'OOP', importance: 'medium' },
  { id: 'private-field', regex: /#\w+/g, description: '프라이빗 필드', template: '**#필드**: 클래스 외부에서 접근할 수 없는 비공개 속성입니다.', category: 'OOP', importance: 'medium' },
  { id: 'getter', regex: /\bget\s+\w+\s*\(/g, description: 'Getter', template: '**get**: 속성처럼 보이지만 실행되는 함수입니다.', category: 'OOP', importance: 'medium' },
  { id: 'setter', regex: /\bset\s+\w+\s*\(/g, description: 'Setter', template: '**set**: 값 할당 시 자동으로 실행되는 함수입니다.', category: 'OOP', importance: 'medium' },

  // [10] Proxy & Reflect
  { id: 'proxy', regex: /new\s+Proxy\(/g, description: 'Proxy 객체', template: '**Proxy**: 객체의 기본 동작을 가로채고 커스터마이징합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'reflect', regex: /Reflect\./g, description: 'Reflect API', template: '**Reflect**: 객체 조작을 위한 저수준 메서드를 제공합니다.', category: 'Advanced', importance: 'low' },

  // [11] Symbol
  { id: 'symbol', regex: /Symbol\(/g, description: '유일한 식별자', template: '**Symbol**: 절대 중복되지 않는 고유한 값을 만듭니다.', category: 'Advanced', importance: 'low' },
  { id: 'symbol-for', regex: /Symbol\.for\(/g, description: '전역 Symbol', template: '**Symbol.for**: 같은 키로 항상 같은 Symbol을 반환하는 전역 레지스트리입니다.', category: 'Advanced', importance: 'low' },

  // [12] WeakMap & WeakSet
  { id: 'weakmap', regex: /new\s+WeakMap\(/g, description: 'WeakMap', template: '**WeakMap**: 키가 가비지 컬렉션될 수 있는 Map입니다.', category: 'Advanced', importance: 'low' },
  { id: 'weakset', regex: /new\s+WeakSet\(/g, description: 'WeakSet', template: '**WeakSet**: 값이 가비지 컬렉션될 수 있는 Set입니다.', category: 'Advanced', importance: 'low' },

  // [13] Module 패턴
  { id: 'import', regex: /\bimport\b/g, description: '모듈 가져오기', template: '**import**: 다른 파일의 코드를 가져와 사용합니다.', category: 'Module', importance: 'high' },
  { id: 'export-default', regex: /\bexport\s+default\b/g, description: '기본 내보내기', template: '**export default**: 파일당 하나만 기본으로 내보냅니다.', category: 'Module', importance: 'high' },
  { id: 'export-named', regex: /\bexport\s+{/g, description: '이름있는 내보내기', template: '**export {}**: 여러 개를 이름과 함께 내보냅니다.', category: 'Module', importance: 'high' },
  { id: 'dynamic-import', regex: /import\s*\(/g, description: '동적 Import', template: '**import()**: 필요할 때만 모듈을 로드하여 성능을 개선합니다.', category: 'Module', importance: 'high' },

  // [14] 배열 메서드 고급
  { id: 'array-some', regex: /\.some\s*\(/g, description: '조건 일부 만족', template: '**some**: 하나라도 조건에 맞으면 true를 반환합니다.', category: 'Data', importance: 'medium' },
  { id: 'array-every', regex: /\.every\s*\(/g, description: '조건 전체 만족', template: '**every**: 모두 조건에 맞아야 true를 반환합니다.', category: 'Data', importance: 'medium' },
  { id: 'array-flat', regex: /\.flat\s*\(/g, description: '배열 평탄화', template: '**flat**: 중첩된 배열을 한 단계씩 풀어헤칩니다.', category: 'Data', importance: 'medium' },
  { id: 'array-flatmap', regex: /\.flatMap\s*\(/g, description: 'Map + Flat', template: '**flatMap**: map과 flat을 동시에 수행합니다.', category: 'Data', importance: 'medium' },
  { id: 'array-sort', regex: /\.sort\s*\(/g, description: '배열 정렬', template: '**sort**: 배열을 오름차순/내림차순으로 정렬합니다.', category: 'Data', importance: 'medium' },
  { id: 'array-reverse', regex: /\.reverse\s*\(/g, description: '배열 뒤집기', template: '**reverse**: 배열 순서를 거꾸로 뒤집습니다.', category: 'Data', importance: 'low' },
  { id: 'array-slice', regex: /\.slice\s*\(/g, description: '배열 자르기', template: '**slice**: 배열의 일부를 복사하여 새 배열을 만듭니다.', category: 'Data', importance: 'medium' },
  { id: 'array-splice', regex: /\.splice\s*\(/g, description: '배열 수정', template: '**splice**: 배열의 중간을 잘라내거나 추가합니다.', category: 'Data', importance: 'medium' },
  { id: 'array-join', regex: /\.join\s*\(/g, description: '배열 결합', template: '**join**: 배열 요소를 문자열로 합칩니다.', category: 'Data', importance: 'medium' },
  { id: 'array-concat', regex: /\.concat\s*\(/g, description: '배열 합치기', template: '**concat**: 여러 배열을 하나로 합칩니다.', category: 'Data', importance: 'low' },

  // [15] 객체 메서드
  { id: 'object-keys', regex: /Object\.keys\(/g, description: '객체 키 추출', template: '**Object.keys**: 객체의 모든 키를 배열로 반환합니다.', category: 'Data', importance: 'high' },
  { id: 'object-values', regex: /Object\.values\(/g, description: '객체 값 추출', template: '**Object.values**: 객체의 모든 값을 배열로 반환합니다.', category: 'Data', importance: 'high' },
  { id: 'object-entries', regex: /Object\.entries\(/g, description: '객체 항목 추출', template: '**Object.entries**: 객체를 [키, 값] 쌍의 배열로 변환합니다.', category: 'Data', importance: 'high' },
  { id: 'object-assign', regex: /Object\.assign\(/g, description: '객체 병합', template: '**Object.assign**: 여러 객체를 하나로 합칩니다.', category: 'Data', importance: 'high' },
  { id: 'object-freeze', regex: /Object\.freeze\(/g, description: '객체 동결', template: '**Object.freeze**: 객체를 읽기 전용으로 만듭니다.', category: 'Data', importance: 'medium' },
  { id: 'object-seal', regex: /Object\.seal\(/g, description: '객체 봉인', template: '**Object.seal**: 새 속성 추가를 막지만 수정은 가능합니다.', category: 'Data', importance: 'low' },

  // [16] 문자열 메서드
  { id: 'string-includes', regex: /\.includes\s*\(/g, description: '문자열 포함 여부', template: '**includes**: 특정 문자열이 포함되어 있는지 확인합니다.', category: 'Data', importance: 'high' },
  { id: 'string-startswith', regex: /\.startsWith\s*\(/g, description: '시작 문자 확인', template: '**startsWith**: 특정 문자로 시작하는지 확인합니다.', category: 'Data', importance: 'medium' },
  { id: 'string-endswith', regex: /\.endsWith\s*\(/g, description: '끝 문자 확인', template: '**endsWith**: 특정 문자로 끝나는지 확인합니다.', category: 'Data', importance: 'medium' },
  { id: 'string-split', regex: /\.split\s*\(/g, description: '문자열 분할', template: '**split**: 구분자를 기준으로 문자열을 쪼개 배열로 만듭니다.', category: 'Data', importance: 'high' },
  { id: 'string-trim', regex: /\.trim\s*\(/g, description: '공백 제거', template: '**trim**: 문자열 양쪽 끝의 공백을 제거합니다.', category: 'Data', importance: 'medium' },
  { id: 'string-replace', regex: /\.replace\s*\(/g, description: '문자열 치환', template: '**replace**: 특정 문자를 다른 문자로 바꿉니다.', category: 'Data', importance: 'high' },
  { id: 'string-replaceall', regex: /\.replaceAll\s*\(/g, description: '전체 치환', template: '**replaceAll**: 일치하는 모든 문자를 바꿉니다.', category: 'Data', importance: 'medium' },
  { id: 'string-match', regex: /\.match\s*\(/g, description: '정규식 매칭', template: '**match**: 정규식과 일치하는 부분을 찾습니다.', category: 'Data', importance: 'medium' },
  { id: 'string-search', regex: /\.search\s*\(/g, description: '문자열 검색', template: '**search**: 정규식과 일치하는 첫 위치를 반환합니다.', category: 'Data', importance: 'low' },

  // [17] Next.js 전용
  { id: 'nextjs-use-client', regex: /'use client'/g, description: 'Client Component', template: '**use client**: 클라이언트에서 실행되는 React 컴포넌트임을 선언합니다.', category: 'NextJS', importance: 'high' },
  { id: 'nextjs-use-server', regex: /'use server'/g, description: 'Server Action', template: '**use server**: 서버에서만 실행되는 함수임을 선언합니다.', category: 'NextJS', importance: 'high' },
  { id: 'nextjs-use-router', regex: /useRouter\(/g, description: 'Next.js Router', template: '**useRouter**: Next.js의 라우팅 기능을 사용합니다.', category: 'NextJS', importance: 'high' },
  { id: 'nextjs-use-pathname', regex: /usePathname\(/g, description: '현재 경로', template: '**usePathname**: 현재 페이지 경로를 가져옵니다.', category: 'NextJS', importance: 'medium' },
  { id: 'nextjs-use-searchparams', regex: /useSearchParams\(/g, description: 'URL 파라미터', template: '**useSearchParams**: URL 쿼리 스트링을 읽습니다.', category: 'NextJS', importance: 'medium' },
  { id: 'nextjs-redirect', regex: /\bredirect\s*\(/g, description: 'Server 리다이렉트', template: '**redirect**: 서버에서 다른 페이지로 이동시킵니다.', category: 'NextJS', importance: 'medium' },
  { id: 'nextjs-notfound', regex: /notFound\s*\(/g, description: '404 페이지', template: '**notFound**: 404 에러 페이지를 표시합니다.', category: 'NextJS', importance: 'medium' },

  // [18] Error 처리 고급
  { id: 'error-throw', regex: /\bthrow\b/g, description: '에러 발생', template: '**throw**: 의도적으로 에러를 발생시킵니다.', category: 'Error', importance: 'high' },
  { id: 'error-custom', regex: /class\s+\w+\s+extends\s+Error/g, description: '커스텀 에러', template: '**Custom Error**: 자신만의 에러 타입을 정의합니다.', category: 'Error', importance: 'medium' },
  { id: 'error-instanceof', regex: /instanceof\s+Error/g, description: '에러 타입 확인', template: '**instanceof Error**: 에러 종류를 구분합니다.', category: 'Error', importance: 'medium' },

  // [19] 정규식
  { id: 'regex-test', regex: /\.test\s*\(/g, description: '정규식 테스트', template: '**test**: 문자열이 패턴과 일치하는지 확인합니다.', category: 'Regex', importance: 'medium' },
  { id: 'regex-exec', regex: /\.exec\s*\(/g, description: '정규식 실행', template: '**exec**: 정규식 매칭 결과를 상세히 반환합니다.', category: 'Regex', importance: 'low' },
  { id: 'regex-pattern', regex: /\/[\^$.*+?{}[\]\\|()]+\//g, description: '정규식 패턴', template: '**Regex**: 문자열 패턴 매칭을 위한 정규 표현식입니다.', category: 'Regex', importance: 'medium' },

  // [20] Date & Time
  { id: 'date-new', regex: /new\s+Date\(/g, description: 'Date 객체', template: '**Date**: 날짜와 시간을 다루는 객체입니다.', category: 'Data', importance: 'medium' },
  { id: 'date-now', regex: /Date\.now\(/g, description: '현재 시간', template: '**Date.now**: 현재 시각의 타임스탬프를 반환합니다.', category: 'Data', importance: 'medium' },

  // [21] 함수형 프로그래밍
  { id: 'fn-curry', regex: /=>\s*\([^)]*\)\s*=>/g, description: '커링(Currying)', template: '**Currying**: 여러 인자를 받는 함수를 하나씩 받는 함수로 변환합니다.', category: 'FP', importance: 'low' },
  { id: 'fn-compose', regex: /compose|pipe/g, description: '함수 합성', template: '**Compose/Pipe**: 여러 함수를 연결하여 데이터 파이프라인을 만듭니다.', category: 'FP', importance: 'low' },

  // [22] 디자인 패턴
  { id: 'pattern-singleton', regex: /static\s+instance/g, description: '싱글톤 패턴', template: '**Singleton**: 클래스의 인스턴스를 하나만 생성하도록 보장합니다.', category: 'Pattern', importance: 'medium' },
  { id: 'pattern-observer', regex: /addEventListener|subscribe/g, description: '옵저버 패턴', template: '**Observer**: 이벤트 발생 시 구독자에게 자동으로 알립니다.', category: 'Pattern', importance: 'medium' },
  { id: 'pattern-factory', regex: /create[A-Z]\w+/g, description: '팩토리 패턴', template: '**Factory**: 객체 생성 로직을 캡슐화합니다.', category: 'Pattern', importance: 'low' },

  // [23] 성능 최적화
  { id: 'perf-settimeout', regex: /setTimeout\(/g, description: '지연 실행', template: '**setTimeout**: 일정 시간 후 코드를 실행합니다.', category: 'Async', importance: 'medium' },
  { id: 'perf-setinterval', regex: /setInterval\(/g, description: '반복 실행', template: '**setInterval**: 일정 간격으로 코드를 반복 실행합니다.', category: 'Async', importance: 'medium' },
  { id: 'perf-requestanimationframe', regex: /requestAnimationFrame\(/g, description: '애니메이션 프레임', template: '**requestAnimationFrame**: 브라우저 리페인트 직전에 실행하여 부드러운 애니메이션을 만듭니다.', category: 'Performance', importance: 'medium' },
  { id: 'perf-debounce', regex: /debounce|Debounce/g, description: '디바운스', template: '**Debounce**: 연속된 이벤트를 마지막 한 번만 처리합니다.', category: 'Performance', importance: 'high' },
  { id: 'perf-throttle', regex: /throttle|Throttle/g, description: '쓰로틀', template: '**Throttle**: 일정 시간마다 한 번씩만 실행되도록 제한합니다.', category: 'Performance', importance: 'high' },

  // [24] DOM 조작
  { id: 'dom-queryselector', regex: /querySelector\(/g, description: 'DOM 요소 선택', template: '**querySelector**: CSS 선택자로 DOM 요소를 찾습니다.', category: 'DOM', importance: 'medium' },
  { id: 'dom-queryselectorall', regex: /querySelectorAll\(/g, description: 'DOM 요소 다중 선택', template: '**querySelectorAll**: 조건에 맞는 모든 요소를 찾습니다.', category: 'DOM', importance: 'medium' },
  { id: 'dom-getbyid', regex: /getElementById\(/g, description: 'ID로 요소 찾기', template: '**getElementById**: ID로 특정 요소를 찾습니다.', category: 'DOM', importance: 'low' },

  // [25] 테스트
  { id: 'test-describe', regex: /\bdescribe\s*\(/g, description: '테스트 그룹', template: '**describe**: 관련 테스트를 그룹으로 묶습니다.', category: 'Test', importance: 'medium' },
  { id: 'test-it', regex: /\b(it|test)\s*\(/g, description: '개별 테스트', template: '**it/test**: 하나의 테스트 케이스를 정의합니다.', category: 'Test', importance: 'medium' },
  { id: 'test-expect', regex: /\bexpect\s*\(/g, description: '테스트 검증', template: '**expect**: 예상 결과를 검증합니다.', category: 'Test', importance: 'medium' },
  { id: 'test-mock', regex: /\b(jest\.fn|vi\.fn|mock)\(/g, description: '함수 모킹', template: '**Mock**: 실제 함수 대신 가짜 함수로 테스트합니다.', category: 'Test', importance: 'medium' }
];

export const SCENARIO_PATTERNS: ScenarioPattern[] = [
  {
    id: 'scen-rendering-optimization',
    requiredKeywords: ['useMemo', 'useCallback', 'memo'],
    title: '⚡ 고성능 렌더링 최적화',
    description: '불필요한 계산과 화면 그리기를 최소화하여 사용자에게 부드러운 경험을 제공하는 고급 기법입니다.',
    category: 'Optimization'
  },
  {
    id: 'scen-data-fetching-flow',
    requiredKeywords: ['fetch|axios', 'useEffect|useQuery'],
    title: '📡 실시간 데이터 통신 흐름',
    description: '서버와 대화하며 최신 정보를 가져오고 로딩/에러 상태까지 처리하는 네트워크 통신 로직입니다.',
    category: 'Network'
  },
  {
    id: 'scen-global-state-management',
    requiredKeywords: ['create', 'set', 'Zustand|Redux'],
    title: '🌍 전역 상태 저장소 아키텍처',
    description: '애플리케이션 전체가 공유하는 거대한 데이터 저장소를 구축하여 정보의 흐름을 중앙 관리합니다.',
    category: 'Architecture'
  },
  {
    id: 'scen-custom-hooks-logic',
    requiredKeywords: ['use', 'return'],
    title: '🧩 나만의 논리 도구(Custom Hooks)',
    description: '반복되는 복잡한 기능을 나만의 도구(Hook)로 만들어 재사용성을 높이고 코드를 깔끔하게 정리한 구조입니다.',
    category: 'Design Pattern'
  },
  {
    id: 'scen-crud-lifecycle',
    requiredKeywords: ['fetch|axios', 'map', 'filter|set'],
    title: '📝 데이터 관리(CRUD) 사이클',
    description: '서버에서 데이터를 가져와 목록을 보여주고, 필터링하거나 수정/삭제하는 데이터 중심의 전체 라이프사이클입니다.',
    category: 'Business Logic'
  },
  {
    id: 'scen-error-resilience',
    requiredKeywords: ['try', 'catch', 'finally|error'],
    title: '🛡️ 안정적인 에러 방어 체계',
    description: '예기치 못한 오류가 발생해도 시스템이 멈추지 않고 사용자에게 적절한 안내를 제공하는 견고한 예외 처리 구조입니다.',
    category: 'Reliability'
  }
];